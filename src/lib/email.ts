import nodemailer, { type Transporter } from "nodemailer";
import type { Locale } from "@/i18n/config";

/** SMTP (faqat serverda). Maxfiy ma'lumotlar .env dan, brauzerga hech qachon chiqmaydi. */
export function isEmailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}

const g = globalThis as unknown as { __ymMailer?: Transporter };

function transporter(): Transporter {
  if (!g.__ymMailer) {
    const port = Number(process.env.SMTP_PORT ?? 587);
    g.__ymMailer = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }
  return g.__ymMailer;
}

/** SMTP login'ni tekshiradi (xat yubormaydi). */
export async function verifySmtp(): Promise<boolean> {
  if (!isEmailConfigured()) return false;
  try {
    await transporter().verify();
    return true;
  } catch {
    return false;
  }
}

const COPY: Record<Locale, { subject: string; title: string; intro: string; expires: string; ignore: string }> = {
  uz: {
    subject: "YoshlarMakon: kirish kodingiz",
    title: "Kirish kodi",
    intro: "YoshlarMakon’ga kirish uchun quyidagi koddan foydalaning:",
    expires: "Kod 10 daqiqa amal qiladi. Uni hech kimga bermang.",
    ignore: "Agar siz kirishni so‘ramagan bo‘lsangiz, bu xatni e’tiborsiz qoldiring.",
  },
  ru: {
    subject: "YoshlarMakon: ваш код для входа",
    title: "Код для входа",
    intro: "Используйте этот код, чтобы войти в YoshlarMakon:",
    expires: "Код действует 10 минут. Никому его не сообщайте.",
    ignore: "Если вы не запрашивали вход, просто проигнорируйте это письмо.",
  },
  en: {
    subject: "YoshlarMakon: your sign-in code",
    title: "Sign-in code",
    intro: "Use the code below to sign in to YoshlarMakon:",
    expires: "The code is valid for 10 minutes. Never share it with anyone.",
    ignore: "If you didn’t request this, you can safely ignore this email.",
  },
};

export async function sendLoginCode(to: string, code: string, locale: Locale): Promise<void> {
  const c = COPY[locale];
  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const html = `<!doctype html><html lang="${locale}"><body style="margin:0;background:#f5f3fb;font-family:Arial,Helvetica,sans-serif;color:#201d3a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background:#ffffff;border-radius:20px;border:1px solid #e9e6f1">
<tr><td style="padding:28px 32px 8px;font-size:20px;font-weight:700">Yoshlar<span style="color:#6945e9">Makon</span></td></tr>
<tr><td style="padding:8px 32px 0;font-size:22px;font-weight:700">${c.title}</td></tr>
<tr><td style="padding:10px 32px 0;font-size:15px;line-height:1.6;color:#4d4966">${c.intro}</td></tr>
<tr><td style="padding:22px 32px" align="center"><div style="display:inline-block;letter-spacing:10px;font-size:34px;font-weight:700;color:#6945e9;background:#f0ebff;border-radius:14px;padding:16px 22px 16px 32px">${code}</div></td></tr>
<tr><td style="padding:0 32px 6px;font-size:13px;line-height:1.6;color:#706d83">${c.expires}</td></tr>
<tr><td style="padding:0 32px 28px;font-size:13px;line-height:1.6;color:#706d83">${c.ignore}</td></tr>
</table></td></tr></table></body></html>`;
  const text = `${c.title}: ${code}\n\n${c.intro} ${code}\n${c.expires}\n${c.ignore}`;
  await transporter().sendMail({ from, to, subject: c.subject, text, html });
}
