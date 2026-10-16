import { z } from "zod";
import type { Locale } from "@/i18n/config";

const MSG = {
  uz: {
    nameMin: "Ism kamida 2 ta harfdan iborat bo'lsin",
    nameMax: "Ism juda uzun",
    urlRequired: "Portfolio havolasi majburiy",
    urlInvalid: "To'g'ri havola kiriting",
    urlScheme: "Havola http:// yoki https:// bilan boshlanishi kerak",
    msgMax: "Xabar 500 belgidan oshmasin",
    emailInvalid: "To'g'ri email manzil kiriting",
    codeInvalid: "Kod 6 ta raqamdan iborat bo'lishi kerak",
  },
  ru: {
    nameMin: "Имя должно содержать минимум 2 буквы",
    nameMax: "Имя слишком длинное",
    urlRequired: "Ссылка на портфолио обязательна",
    urlInvalid: "Введите корректную ссылку",
    urlScheme: "Ссылка должна начинаться с http:// или https://",
    msgMax: "Сообщение не должно превышать 500 символов",
    emailInvalid: "Введите корректный email",
    codeInvalid: "Код должен состоять из 6 цифр",
  },
  en: {
    nameMin: "Name must be at least 2 characters",
    nameMax: "Name is too long",
    urlRequired: "Portfolio link is required",
    urlInvalid: "Enter a valid link",
    urlScheme: "Link must start with http:// or https://",
    msgMax: "Message must not exceed 500 characters",
    emailInvalid: "Enter a valid email address",
    codeInvalid: "The code must be 6 digits",
  },
} satisfies Record<Locale, Record<string, string>>;

/**
 * Taklif formasi validatsiyasi (tilga mos xabarlar bilan).
 * Talablar: ism majburiy, havola http:// yoki https:// bilan boshlanishi shart.
 */
export function makeProposalSchema(locale: Locale = "uz") {
  const m = MSG[locale];
  return z.object({
    name: z.string().trim().min(2, { message: m.nameMin }).max(60, { message: m.nameMax }),
    portfolioUrl: z
      .string()
      .trim()
      .min(1, { message: m.urlRequired })
      .url({ message: m.urlInvalid })
      .refine((v) => /^https?:\/\//i.test(v), { message: m.urlScheme }),
    message: z.string().trim().max(500, { message: m.msgMax }).optional().or(z.literal("")),
  });
}

/** Standart (o'zbekcha) sxema — testlar va eski importlar uchun. */
export const proposalSchema = makeProposalSchema("uz");
export type ProposalInput = z.infer<typeof proposalSchema>;

export function makeEmailSchema(locale: Locale = "uz") {
  return z.string().trim().toLowerCase().email({ message: MSG[locale].emailInvalid }).max(254);
}

export function makeCodeSchema(locale: Locale = "uz") {
  return z.string().trim().regex(/^\d{6}$/, { message: MSG[locale].codeInvalid });
}
