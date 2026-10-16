"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS, type Locale } from "@/i18n/config";

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function choose(next: Locale) {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next;
    startTransition(() => router.refresh());
  }

  return (
    <div
      role="group"
      aria-label="Til / Язык / Language"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border bg-muted/50 p-0.5",
        pending && "opacity-60",
        className,
      )}
    >
      <Globe size={14} className="mx-1.5 text-muted-foreground" aria-hidden="true" />
      {LOCALES.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={locale === l}
          aria-label={LOCALE_LABELS[l].name}
          title={LOCALE_LABELS[l].name}
          onClick={() => choose(l)}
          className={cn(
            "h-7 min-w-8 cursor-pointer rounded-full px-2 text-xs font-semibold transition-colors",
            locale === l ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {LOCALE_LABELS[l].short}
        </button>
      ))}
    </div>
  );
}
