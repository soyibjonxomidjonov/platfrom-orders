"use server";

import { revalidatePath } from "next/cache";
import { makeProposalSchema } from "@/lib/validators";
import { getLocale } from "@/i18n/server";
import { commonMessages, fill } from "@/i18n/messages/common";
import { localizeOrder } from "@/data/order-translations";
import { getOrderById } from "@/data/seed-orders";
import { auth, proposalsRequireLogin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type ProposalState =
  | { status: "idle" }
  | { status: "success"; name: string; orderTitle: string; orderId: string }
  | { status: "unauthorized"; message: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

/**
 * Taklif yuborish: login tekshiruvi → server validatsiyasi → takrorlanishni
 * tekshirish → PostgreSQL'ga saqlash. Saqlanmasa muvaffaqiyat ko'rsatilmaydi.
 */
export async function submitProposal(
  orderId: string,
  input: { name: string; portfolioUrl: string; message?: string },
): Promise<ProposalState> {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const userId = session?.user?.id ?? null;
  const m = commonMessages[locale].server;

  if (proposalsRequireLogin() && !userId) {
    return { status: "unauthorized", message: m.loginRequired };
  }

  const raw = getOrderById(orderId);
  if (!raw) return { status: "error", message: m.orderNotFound };
  const order = localizeOrder(raw, locale);

  const parsed = makeProposalSchema(locale).safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: m.checkFields, fieldErrors };
  }

  try {
    if (userId) {
      const existing = await prisma.proposal.findUnique({
        where: { userId_orderId: { userId, orderId: order.id } },
        select: { id: true },
      });
      if (existing) {
        return { status: "error", message: fill(m.duplicate, { title: order.title }) };
      }
    }

    await prisma.proposal.create({
      data: {
        orderId: order.id,
        applicantName: parsed.data.name,
        portfolioUrl: parsed.data.portfolioUrl,
        message: parsed.data.message || null,
        userId,
      },
    });
  } catch (err) {
    console.error("[submitProposal]", err);
    return { status: "error", message: m.saveFailed };
  }

  revalidatePath("/dashboard");
  revalidatePath("/proposals");

  return {
    status: "success",
    name: parsed.data.name,
    orderTitle: order.title,
    orderId: order.id,
  };
}
