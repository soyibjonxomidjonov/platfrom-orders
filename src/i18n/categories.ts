import type { Locale } from "./config";
import type { FilterCategory } from "@/types/order";

/** Kategoriya kalitlari ma'lumotda o'zbekcha qoladi; faqat ko'rinadigan nomi tarjima qilinadi. */
const LABELS: Record<FilterCategory, Record<Locale, string>> = {
  Barchasi: { uz: "Barchasi", ru: "Все", en: "All" },
  Dizayn: { uz: "Dizayn", ru: "Дизайн", en: "Design" },
  Video: { uz: "Video", ru: "Видео", en: "Video" },
  Veb: { uz: "Veb", ru: "Веб", en: "Web" },
};

export function categoryLabel(category: FilterCategory, locale: Locale): string {
  return LABELS[category]?.[locale] ?? category;
}
