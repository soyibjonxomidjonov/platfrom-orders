export const LOCALES = ["uz", "ru", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "uz";
export const LOCALE_COOKIE = "ym_locale";

export const LOCALE_LABELS: Record<Locale, { short: string; name: string }> = {
  uz: { short: "UZ", name: "O‘zbekcha" },
  ru: { short: "RU", name: "Русский" },
  en: { short: "EN", name: "English" },
};

/** BCP-47 teglari: sana va son formatlash uchun. */
export const LOCALE_TAGS: Record<Locale, string> = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" };

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}

/** Har bir xabar fayli shu shaklda: { uz: T, ru: T, en: T }. */
export type Messages<T> = Record<Locale, T>;

/** Narx: "150 000 so‘m" / "150 000 сум" / "150,000 UZS". */
export function formatPrice(amount: number, locale: Locale): string {
  if (locale === "en") return `${amount.toLocaleString("en-US")} UZS`;
  const n = amount.toLocaleString("ru-RU").replace(/ |,/g, " ");
  return locale === "ru" ? `${n} сум` : `${n} so‘m`;
}
