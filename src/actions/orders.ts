"use server";

import { SEED_ORDERS, getOrderById } from "@/data/seed-orders";
import type { FilterCategory, Order } from "@/types/order";

/**
 * Buyurtmalarni olish. Prototipda seed ma'lumotdan ishlaydi.
 * 3-bosqichda bu yerda prisma.order.findMany() ishlatiladi.
 */
export async function getOrders(
  filter: FilterCategory = "Barchasi",
): Promise<Order[]> {
  if (filter === "Barchasi") return SEED_ORDERS;
  return SEED_ORDERS.filter((o) => o.category === filter);
}

export async function getOrder(id: string): Promise<Order | null> {
  return getOrderById(id) ?? null;
}
