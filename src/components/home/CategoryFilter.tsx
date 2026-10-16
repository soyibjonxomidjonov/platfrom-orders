"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import { categoryLabel } from "@/i18n/categories";
import { FILTER_CATEGORIES, type FilterCategory } from "@/types/order";

export function CategoryFilter({
  active,
  onChange,
  counts,
}: {
  active: FilterCategory;
  onChange: (c: FilterCategory) => void;
  counts?: Record<string, number>;
}) {
  const locale = useLocale();
  return (
    <div className="flex flex-wrap items-center gap-2">
      {FILTER_CATEGORIES.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            aria-pressed={isActive}
            onClick={() => onChange(cat)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-medium transition-colors cursor-pointer",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground border border-border",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="activeCategory"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
              />
            )}
            <span className="relative z-10">
              {categoryLabel(cat, locale)}
              {counts && counts[cat] != null && (
                <span className="ml-1.5 opacity-70">({counts[cat]})</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
