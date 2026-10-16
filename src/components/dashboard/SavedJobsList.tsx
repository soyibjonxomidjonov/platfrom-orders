"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeartOff } from "lucide-react";
import { CategoryBadge } from "@/components/ui/badge";
import { JobArtwork } from "@/components/orders/JobArtwork";
import { FavoriteButton } from "@/components/orders/FavoriteButton";
import { ensureFavoritesLoaded, favoritesLoaded, getFavorites } from "@/lib/favorites-store";
import { SEED_ORDERS } from "@/data/seed-orders";
import { formatPrice } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { localizeOrders } from "@/data/order-translations";
import { commonMessages } from "@/i18n/messages/common";
import type { Order } from "@/types/order";

export function SavedJobsList() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const locale = useLocale();
  const t = commonMessages[locale].saved;

  useEffect(() => {
    const load = () => {
      if (!favoritesLoaded()) return;
      const ids = getFavorites();
      setOrders(SEED_ORDERS.filter((o) => ids.includes(o.id)));
    };
    void ensureFavoritesLoaded().then(load);
    window.addEventListener("favorites:changed", load);
    return () => window.removeEventListener("favorites:changed", load);
  }, []);

  if (orders === null) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <HeartOff className="h-6 w-6" />
        </span>
        <p className="text-sm text-muted-foreground">
          {t.empty}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {localizeOrders(orders, locale).map((o) => (
        <div key={o.id} className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <Link href={`/orders/${o.id}`} className="h-16 w-24 shrink-0 overflow-hidden rounded-xl">
            <JobArtwork order={o} />
          </Link>
          <div className="min-w-0 flex-1">
            <CategoryBadge category={o.category} />
            <Link href={`/orders/${o.id}`} className="mt-1 block truncate font-semibold hover:text-primary">
              {o.title}
            </Link>
            <div className="text-sm text-muted-foreground">{formatPrice(o.budget, locale)}</div>
          </div>
          <FavoriteButton orderId={o.id} variant="inline" />
        </div>
      ))}
    </div>
  );
}
