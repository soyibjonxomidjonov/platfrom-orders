import Link from "next/link";
import { ExternalLink, Inbox } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getOrderById } from "@/data/seed-orders";
import { JobArtwork } from "@/components/orders/JobArtwork";
import { cn } from "@/lib/utils";
import { formatPrice, LOCALE_TAGS, type Locale } from "@/i18n/config";
import { localizeOrder } from "@/data/order-translations";
import { commonMessages } from "@/i18n/messages/common";

const STATUS_CLS = {
  PENDING: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
  ACCEPTED: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
  REJECTED: "bg-red-500/12 text-red-700 dark:text-red-300",
} as const;

/** Foydalanuvchining PostgreSQL'dagi takliflari (server komponent). */
export async function ProposalsList({ userId, limit, locale }: { userId: string; limit?: number; locale: Locale }) {
  const t = commonMessages[locale].proposals;
  const rows = await prisma.proposal.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card py-12 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <Inbox className="h-7 w-7" />
        </span>
        <div>
          <p className="font-semibold">{t.emptyTitle}</p>
          <p className="text-sm text-muted-foreground">{t.emptyText}</p>
        </div>
        <Link href="/orders" className="mt-1 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
          {t.browse}
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-3">
      {rows.map((p) => {
        const base = getOrderById(p.orderId);
        const order = base ? localizeOrder(base, locale) : undefined;
        const status = (p.status in STATUS_CLS ? p.status : "PENDING") as keyof typeof STATUS_CLS;
        return (
          <li
            key={p.id}
            className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl border border-border bg-card p-3 sm:flex sm:gap-4"
          >
            {order && (
              <Link href={`/orders/${order.id}`} className="h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-32">
                <JobArtwork order={order} />
              </Link>
            )}
            <div className="min-w-0 flex-1">
              <Link href={`/orders/${p.orderId}`} className="block truncate font-semibold hover:text-primary">
                {order?.title ?? p.orderId}
              </Link>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {p.orderId}
                {order && <> · {formatPrice(order.budget, locale)}</>} · {p.applicantName}
              </p>
              <a
                href={p.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex max-w-full items-center gap-1 truncate text-sm text-primary hover:underline"
              >
                <ExternalLink size={13} className="shrink-0" />
                <span className="truncate">{p.portfolioUrl}</span>
              </a>
            </div>
            <div className="col-span-2 flex items-center justify-between gap-3 border-t border-border pt-2 sm:col-span-1 sm:shrink-0 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
              <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", STATUS_CLS[status])}>{t.status[status]}</span>
              <time className="text-xs text-muted-foreground" dateTime={p.createdAt.toISOString()}>
                {p.createdAt.toLocaleDateString(LOCALE_TAGS[locale], { day: "2-digit", month: "2-digit", year: "numeric" })}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
