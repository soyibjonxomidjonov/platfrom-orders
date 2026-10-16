"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart, Search, SlidersHorizontal } from "lucide-react";
import { CategoryFilter } from "./CategoryFilter";
import { OrderCard } from "@/components/orders/OrderCard";
import { EmptyStateArt } from "@/components/illustrations";
import { Button } from "@/components/ui/button";
import { getFavorites } from "@/lib/favorites-store";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import { categoryLabel } from "@/i18n/categories";
import { landingMessages } from "@/i18n/messages/landing";
import {
  FILTER_CATEGORIES,
  type FilterCategory,
  type Order,
} from "@/types/order";

type Sort = "default" | "budget-desc" | "budget-asc";

const SORTS: { value: Sort; key: "sortDefault" | "sortBudgetDesc" | "sortBudgetAsc" }[] = [
  { value: "default", key: "sortDefault" },
  { value: "budget-desc", key: "sortBudgetDesc" },
  { value: "budget-asc", key: "sortBudgetAsc" },
];

/**
 * Buyurtmalar bo'limi: qidiruv + kategoriya filtri + saralash + sevimlilar.
 * Kategoriya/qidiruv/saralash bir-birini buzmaydi; kategoriya mantig'i asosiy.
 */
export function OrderGrid({ orders }: { orders: Order[] }) {
  const locale = useLocale();
  const t = landingMessages[locale].grid;
  const [active, setActive] = useState<FilterCategory>("Barchasi");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("default");
  const [favOnly, setFavOnly] = useState(false);
  const [favs, setFavs] = useState<string[]>([]);

  useEffect(() => {
    const selectCategory = (event: Event) => {
      const category = (event as CustomEvent<FilterCategory>).detail;
      if (FILTER_CATEGORIES.includes(category)) {
        setActive(category);
        setQuery("");
        setFavOnly(false);
      }
    };
    window.addEventListener("yoshlarmakon:category", selectCategory);
    return () => window.removeEventListener("yoshlarmakon:category", selectCategory);
  }, []);

  useEffect(() => {
    const sync = () => setFavs(getFavorites());
    sync();
    window.addEventListener("favorites:changed", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("favorites:changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { Barchasi: orders.length };
    for (const cat of FILTER_CATEGORIES) {
      if (cat === "Barchasi") continue;
      c[cat] = orders.filter((o) => o.category === cat).length;
    }
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = orders;

    // 1) Kategoriya (asosiy filtr — buzilmaydi)
    if (active !== "Barchasi") list = list.filter((o) => o.category === active);

    // 2) Faqat sevimlilar
    if (favOnly) list = list.filter((o) => favs.includes(o.id));

    // 3) Qidiruv: sarlavha, kategoriya, qisqa tavsif, ko'nikmalar
    if (q) {
      list = list.filter((o) =>
        [o.title, o.category, categoryLabel(o.category, locale), o.summary, ...o.skills]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }

    // 4) Saralash
    if (sort === "budget-desc")
      list = [...list].sort((a, b) => b.budget - a.budget);
    else if (sort === "budget-asc")
      list = [...list].sort((a, b) => a.budget - b.budget);

    return list;
  }, [orders, active, favOnly, favs, query, sort, locale]);

  function reset() {
    setActive("Barchasi");
    setQuery("");
    setSort("default");
    setFavOnly(false);
  }

  return (
    <section id="buyurtmalar" className="site-container landing-section">
      <div className="section-heading">
        <span className="eyebrow">{t.eyebrow}</span>
        <h2>
          {t.title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t.subtitle}
        </p>
      </div>

      {/* Boshqaruv paneli */}
      <div className="marketplace-controls mb-7 flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchAria}
              className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                aria-label={t.sortAria}
                className="h-11 appearance-none rounded-lg border border-input bg-background pl-9 pr-8 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {t[s.key]}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={() => setFavOnly((v) => !v)}
              aria-pressed={favOnly}
              className={cn(
                "flex h-11 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-colors cursor-pointer",
                favOnly
                  ? "border-[var(--cat-dizayn)] bg-[var(--cat-dizayn)]/10 text-[var(--cat-dizayn)]"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <Heart
                className={cn("h-4 w-4", favOnly && "fill-current")}
              />
              <span className="hidden sm:inline">{t.favorites}</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <CategoryFilter active={active} onChange={setActive} counts={counts} />
          <span className="text-sm text-muted-foreground" role="status" aria-live="polite">
            {t.results(filtered.length)}
          </span>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((order, i) => (
            <OrderCard key={order.id} order={order} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Bo'sh holat */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <EmptyStateArt className="h-40 w-40" />
          <div>
            <p className="font-semibold">{t.emptyTitle}</p>
            <p className="text-sm text-muted-foreground">
              {t.emptyText}
            </p>
          </div>
          <Button variant="outline" onClick={reset}>
            {t.reset}
          </Button>
        </div>
      )}
    </section>
  );
}
