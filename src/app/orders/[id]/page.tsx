import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { OrderDetails } from "@/components/orders/OrderDetails";
import { getOrderById } from "@/data/seed-orders";
import { auth, proposalsRequireLogin } from "@/lib/auth";
import { localizeOrder } from "@/data/order-translations";
import { getLocale } from "@/i18n/server";
import { ordersMessages } from "@/i18n/messages/orders";

export const dynamic = "force-dynamic";

type OrderPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: OrderPageProps): Promise<Metadata> {
  const { id } = await params;
  const order = getOrderById(id);
  const locale = await getLocale();
  return {
    title: order
      ? `${localizeOrder(order, locale).title} — YoshlarMakon`
      : ordersMessages[locale].notFound,
  };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) notFound();

  const session = await auth();
  const userName = session?.user?.name ?? null;
  const canApply = !proposalsRequireLogin() || Boolean(session?.user?.id);

  return <OrderDetails key={order.id} order={order} canApply={canApply} userName={userName} />;
}
