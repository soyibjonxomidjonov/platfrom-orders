import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { OrderGrid } from "@/components/home/OrderGrid";
import { SEED_ORDERS } from "@/data/seed-orders";
import { localizeOrders } from "@/data/order-translations";
import { getLocale } from "@/i18n/server";
import { landingMessages } from "@/i18n/messages/landing";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return { title: landingMessages[locale].ordersPage.metaTitle };
}

export default async function OrdersPage() {
  const locale = await getLocale();
  const t = landingMessages[locale].ordersPage;
  return (
    <div className="marketplace-section min-h-[70vh]">
      <div className="site-container pt-8">
        <nav aria-label={t.breadcrumbAria} className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">{t.home}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{t.orders}</span>
        </nav>
      </div>
      <OrderGrid orders={localizeOrders(SEED_ORDERS, locale)} />
    </div>
  );
}
