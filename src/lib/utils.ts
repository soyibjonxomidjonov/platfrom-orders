export type ClassValue =
  | string
  | number
  | null
  | false
  | undefined
  | ClassValue[];

/** Yengil class birlashtiruvchi (clsx o'rnига, qo'shimcha paketsiz). */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  const walk = (v: ClassValue) => {
    if (!v && v !== 0) return;
    if (Array.isArray(v)) v.forEach(walk);
    else out.push(String(v));
  };
  inputs.forEach(walk);
  return out.join(" ");
}

/** Narxni "150 000 so'm" ko'rinishida formatlash. */
export function formatSom(amount: number): string {
  return `${amount.toLocaleString("ru-RU").replace(/,/g, " ")} so'm`;
}
