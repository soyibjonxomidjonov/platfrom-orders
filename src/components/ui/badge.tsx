"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import { categoryLabel } from "@/i18n/categories";
import type { OrderCategory } from "@/types/order";

const categoryClasses: Record<OrderCategory, string> = {
  Dizayn: "bg-[var(--cat-dizayn)]/12 text-[var(--cat-dizayn)]",
  Video: "bg-[var(--cat-video)]/12 text-[var(--cat-video)]",
  Veb: "bg-[var(--cat-veb)]/12 text-[var(--cat-veb)]",
};

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        "bg-accent text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function CategoryBadge({
  category,
  className,
}: {
  category: OrderCategory;
  className?: string;
}) {
  const locale = useLocale();
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        categoryClasses[category],
        className,
      )}
    >
      {categoryLabel(category, locale)}
    </span>
  );
}
