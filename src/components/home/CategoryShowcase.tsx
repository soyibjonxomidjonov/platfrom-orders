"use client";

import { ArrowUpRight, Code2, Palette, Video } from "lucide-react";
import { SEED_ORDERS } from "@/data/seed-orders";
import type { OrderCategory } from "@/types/order";
import { useLocale } from "@/i18n/LocaleProvider";
import { categoryLabel } from "@/i18n/categories";
import { landingMessages } from "@/i18n/messages/landing";

const CATEGORIES = [
  { name: "Dizayn" as const, Icon: Palette, tone: "design" },
  { name: "Video" as const, Icon: Video, tone: "video" },
  { name: "Veb" as const, Icon: Code2, tone: "web" },
];

export function CategoryShowcase() {
  const locale = useLocale();
  const t = landingMessages[locale].categories;
  function selectCategory(category: OrderCategory) {
    window.dispatchEvent(new CustomEvent("yoshlarmakon:category", { detail: category }));
  }
  return <section id="yonalishlar" className="category-section"><div className="site-container landing-section">
    <div className="section-heading section-heading-row"><div><span className="eyebrow">{t.eyebrow}</span><h2>{t.titleLine1}<br /> {t.titleLine2}</h2></div><p>{t.textLine1}<br /> {t.textLine2}</p></div>
    <div className="category-grid">{CATEGORIES.map(({ name, Icon, tone }) => <a key={name} href="/orders" onClick={() => selectCategory(name)} className={`category-card ${tone}`}><div className="category-card-top"><span className="category-art"><Icon size={42} strokeWidth={1.5} /></span><span className="category-count">{t.count(SEED_ORDERS.filter(order => order.category === name).length)}</span></div><h3>{categoryLabel(name, locale)}</h3><p>{t.items[name].text}</p><div className="category-bottom"><span>{t.items[name].skills}</span><ArrowUpRight size={22} /></div></a>)}</div>
  </div></section>;
}
