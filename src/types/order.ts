export type OrderCategory = "Dizayn" | "Video" | "Veb";

export const ORDER_CATEGORIES: OrderCategory[] = ["Dizayn", "Video", "Veb"];

/** Filtr uchun "Barchasi" + kategoriyalar */
export const FILTER_CATEGORIES = ["Barchasi", ...ORDER_CATEGORIES] as const;
export type FilterCategory = (typeof FILTER_CATEGORIES)[number];

export interface Order {
  /** Ko'rsatiladigan kod, masalan "B01" */
  id: string;
  title: string;
  category: OrderCategory;
  /** Budjet — so'mda (butun son) */
  budget: number;
  /** Qisqa tavsif (kartada) */
  summary: string;
  /** To'liq tavsif (tafsilot sahifasida) */
  description: string;
  /** Talab qilinadigan ko'nikmalar */
  skills: string[];
  /** Taxminiy muddat */
  deadline: string;
}

export interface Proposal {
  orderId: string;
  orderTitle: string;
  name: string;
  portfolioUrl: string;
  message?: string;
}
