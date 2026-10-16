"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOrderById } from "@/data/seed-orders";

export async function getMyFavoriteIds(): Promise<{ authed: boolean; ids: string[] }> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { authed: false, ids: [] };
  const rows = await prisma.favorite.findMany({
    where: { userId },
    select: { orderId: true },
    orderBy: { id: "asc" },
  });
  return { authed: true, ids: rows.map((r) => r.orderId) };
}

export async function toggleFavoriteAction(
  orderId: string,
): Promise<{ status: "ok"; ids: string[] } | { status: "unauthorized" } | { status: "error" }> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { status: "unauthorized" };
  if (!getOrderById(orderId)) return { status: "error" };

  try {
    const key = { userId_orderId: { userId, orderId } };
    const existing = await prisma.favorite.findUnique({ where: key, select: { id: true } });
    if (existing) await prisma.favorite.delete({ where: key });
    else await prisma.favorite.create({ data: { userId, orderId } });

    const rows = await prisma.favorite.findMany({ where: { userId }, select: { orderId: true } });
    revalidatePath("/dashboard");
    return { status: "ok", ids: rows.map((r) => r.orderId) };
  } catch (err) {
    console.error("[toggleFavorite]", err);
    return { status: "error" };
  }
}
