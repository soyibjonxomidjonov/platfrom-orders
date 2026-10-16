import { createHash, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";

/**
 * Email orqali kirish kodlari (OTP).
 * - Kod ochiq holda saqlanmaydi: VerificationToken jadvalida faqat sha256 xeshi.
 * - 10 daqiqa amal qiladi, 5 ta noto'g'ri urinishdan so'ng bekor qilinadi.
 * - Qayta yuborish: 60 soniyada 1 marta, bir emailga soatiga 5 tagacha, IP bo'yicha soatiga 15 tagacha.
 * - Kod tasdiqlangach 2 daqiqalik bir martalik "ticket" beriladi — Auth.js shuni tekshiradi.
 * Hisoblagichlar xotirada (bitta server instansiyasi uchun yetarli).
 */
const CODE_TTL_MS = 10 * 60 * 1000;
const TICKET_TTL_MS = 2 * 60 * 1000;
const MAX_ATTEMPTS = 5;
export const RESEND_COOLDOWN_S = 60;
const MAX_PER_EMAIL_HOUR = 5;
const MAX_PER_IP_HOUR = 15;
const HOUR = 60 * 60 * 1000;

type OtpState = { attempts: Map<string, number>; sends: Map<string, number[]> };
const g = globalThis as unknown as { __ymOtp?: OtpState };
const state: OtpState = (g.__ymOtp ??= { attempts: new Map(), sends: new Map() });

const codeId = (email: string) => `otp:${email}`;
const ticketId = (email: string) => `ticket:${email}`;

function hash(value: string): string {
  return createHash("sha256").update(`${process.env.AUTH_SECRET ?? ""}:${value}`).digest("hex");
}

function recent(key: string, windowMs: number): number[] {
  const now = Date.now();
  const list = (state.sends.get(key) ?? []).filter((t) => now - t < windowMs);
  state.sends.set(key, list);
  return list;
}

/** Yana kod yuborish mumkinmi? Mumkin bo'lmasa — necha soniyadan keyin. */
export function canSendCode(email: string, ip: string): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now();
  const byEmail = recent(`e:${email}`, HOUR);
  const last = byEmail[byEmail.length - 1];
  if (last && now - last < RESEND_COOLDOWN_S * 1000) {
    return { ok: false, retryAfter: Math.ceil((RESEND_COOLDOWN_S * 1000 - (now - last)) / 1000) };
  }
  if (byEmail.length >= MAX_PER_EMAIL_HOUR) {
    return { ok: false, retryAfter: Math.ceil((HOUR - (now - byEmail[0])) / 1000) };
  }
  const byIp = recent(`i:${ip}`, HOUR);
  if (byIp.length >= MAX_PER_IP_HOUR) {
    return { ok: false, retryAfter: Math.ceil((HOUR - (now - byIp[0])) / 1000) };
  }
  return { ok: true };
}

/** Yangi 6 xonali kod yaratadi va xeshini saqlaydi (eskilari o'chiriladi). */
export async function issueCode(email: string, ip: string): Promise<string> {
  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  await prisma.verificationToken.deleteMany({ where: { identifier: codeId(email) } });
  await prisma.verificationToken.create({
    data: { identifier: codeId(email), token: hash(`${email}:${code}`), expires: new Date(Date.now() + CODE_TTL_MS) },
  });
  state.attempts.delete(email);
  recent(`e:${email}`, HOUR).push(Date.now());
  recent(`i:${ip}`, HOUR).push(Date.now());
  return code;
}

/** Email yuborilmasa — kodni bekor qilish (soxta "yuborildi" bo'lmasligi uchun). */
export async function revokeCode(email: string): Promise<void> {
  await prisma.verificationToken.deleteMany({ where: { identifier: codeId(email) } });
}

export type CodeCheck = "ok" | "invalid" | "expired" | "too_many";

export async function checkCode(email: string, code: string): Promise<CodeCheck> {
  const row = await prisma.verificationToken.findFirst({ where: { identifier: codeId(email) } });
  if (!row) return "expired";
  if (row.expires.getTime() < Date.now()) {
    await revokeCode(email);
    return "expired";
  }

  const attempts = (state.attempts.get(email) ?? 0) + 1;
  state.attempts.set(email, attempts);

  const expected = Buffer.from(row.token, "hex");
  const given = Buffer.from(hash(`${email}:${code}`), "hex");
  const match = expected.length === given.length && timingSafeEqual(expected, given);

  if (!match) {
    if (attempts >= MAX_ATTEMPTS) {
      await revokeCode(email);
      state.attempts.delete(email);
      return "too_many";
    }
    return "invalid";
  }

  await revokeCode(email);
  state.attempts.delete(email);
  return "ok";
}

/** Kod tasdiqlangandan keyin Auth.js uchun bir martalik ticket. */
export async function issueTicket(email: string): Promise<string> {
  const ticket = randomBytes(32).toString("hex");
  await prisma.verificationToken.deleteMany({ where: { identifier: ticketId(email) } });
  await prisma.verificationToken.create({
    data: { identifier: ticketId(email), token: hash(ticket), expires: new Date(Date.now() + TICKET_TTL_MS) },
  });
  return ticket;
}

export async function consumeTicket(email: string, ticket: string): Promise<boolean> {
  const where = { identifier_token: { identifier: ticketId(email), token: hash(ticket) } };
  const row = await prisma.verificationToken.findUnique({ where });
  if (!row) return false;
  await prisma.verificationToken.delete({ where });
  return row.expires.getTime() > Date.now();
}
