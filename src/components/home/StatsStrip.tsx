import { BriefcaseBusiness, Shapes, Wallet } from "lucide-react";
import { SEED_ORDERS } from "@/data/seed-orders";
import { formatPrice } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { landingMessages } from "@/i18n/messages/landing";

export async function StatsStrip() {
  const locale = await getLocale();
  const t = landingMessages[locale].stats;
  const stats = [
    { Icon: BriefcaseBusiness, value: t.ordersValue(SEED_ORDERS.length), label: t.ordersLabel, tone: "blue" },
    { Icon: Shapes, value: t.categoriesValue(new Set(SEED_ORDERS.map((order) => order.category)).size), label: t.categoriesLabel, tone: "purple" },
    { Icon: Wallet, value: t.budgetValue(formatPrice(Math.max(...SEED_ORDERS.map((order) => order.budget)), locale)), label: t.budgetLabel, tone: "peach" },
  ];
  return <section className="site-container stats-section" aria-label={t.aria}><div className="stats-strip">{stats.map(({ Icon, value, label, tone }) => <div className="stat-item" key={label}><span className={`stat-icon ${tone}`}><Icon size={24} /></span><div><strong>{value}</strong><p>{label}</p></div></div>)}</div></section>;
}
