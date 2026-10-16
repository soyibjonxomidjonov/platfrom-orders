"use server";

import { headers } from "next/headers";
import { AuthError } from "next-auth";
import { signIn, safeCallbackUrl } from "@/lib/auth";
import { isEmailConfigured, sendLoginCode } from "@/lib/email";
import { canSendCode, checkCode, issueCode, issueTicket, revokeCode, RESEND_COOLDOWN_S } from "@/lib/otp";
import { makeCodeSchema, makeEmailSchema } from "@/lib/validators";
import { getLocale } from "@/i18n/server";
import { commonMessages, fill } from "@/i18n/messages/common";

export type RequestCodeResult =
  | { ok: true; email: string; cooldown: number }
  | { ok: false; error: string; field?: "email"; retryAfter?: number };

export type VerifyCodeResult = { ok: false; error: string; expired?: boolean };

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
}

/** 1-qadam: emailga 6 xonali kod yuborish. Xat ketmasa — muvaffaqiyat qaytarilmaydi. */
export async function requestEmailCode(rawEmail: string): Promise<RequestCodeResult> {
  const locale = await getLocale();
  const t = commonMessages[locale].email.errors;

  const parsed = makeEmailSchema(locale).safeParse(rawEmail);
  if (!parsed.success) return { ok: false, field: "email", error: parsed.error.issues[0].message };
  const email = parsed.data;

  if (!isEmailConfigured()) return { ok: false, error: t.notConfigured };

  const ip = await clientIp();
  const allowed = canSendCode(email, ip);
  if (!allowed.ok) {
    return { ok: false, error: fill(t.rateLimited, { s: allowed.retryAfter }), retryAfter: allowed.retryAfter };
  }

  const code = await issueCode(email, ip);
  try {
    await sendLoginCode(email, code, locale);
  } catch (err) {
    console.error("[requestEmailCode] SMTP:", err instanceof Error ? err.message : err);
    await revokeCode(email);
    return { ok: false, error: t.sendFailed };
  }
  return { ok: true, email, cooldown: RESEND_COOLDOWN_S };
}

/** 2-qadam: kodni tekshirish va Auth.js sessiyasini ochish (muvaffaqiyatda redirect). */
export async function verifyEmailCode(
  rawEmail: string,
  rawCode: string,
  callbackUrl?: string,
): Promise<VerifyCodeResult> {
  const locale = await getLocale();
  const t = commonMessages[locale].email.errors;

  const email = makeEmailSchema(locale).safeParse(rawEmail);
  if (!email.success) return { ok: false, error: email.error.issues[0].message };
  const code = makeCodeSchema(locale).safeParse(rawCode);
  if (!code.success) return { ok: false, error: code.error.issues[0].message };

  const result = await checkCode(email.data, code.data);
  if (result === "invalid") return { ok: false, error: t.invalid };
  if (result === "expired") return { ok: false, error: t.expired, expired: true };
  if (result === "too_many") return { ok: false, error: t.tooMany, expired: true };

  const ticket = await issueTicket(email.data);
  try {
    await signIn("email-code", {
      email: email.data,
      ticket,
      redirectTo: safeCallbackUrl(callbackUrl),
    });
  } catch (err) {
    // Muvaffaqiyatli kirishda Next.js redirect "xatosi" otiladi — uni o'tkazib yuboramiz.
    if (err instanceof AuthError) return { ok: false, error: t.generic };
    throw err;
  }
  return { ok: false, error: t.generic };
}
