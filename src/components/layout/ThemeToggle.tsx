"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/LocaleProvider";
import { commonMessages } from "@/i18n/messages/common";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "yoshlarmakon:theme";

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", theme);
}

const OPTIONS: { value: Theme; Icon: typeof Sun }[] = [
  { value: "light", Icon: Sun },
  { value: "dark", Icon: Moon },
  { value: "system", Icon: Monitor },
];

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);
  const t = commonMessages[useLocale()].theme;

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (saved === "light" || saved === "dark" || saved === "system") {
        setTheme(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  function choose(next: Theme) {
    setTheme(next);
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  // Hidratsiya mosligi uchun: mount bo'lgunча neytral ko'rinish
  const active = mounted ? theme : "system";

  return (
    <div
      role="group"
      aria-label={t.group}
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-muted/50 p-0.5"
    >
      {OPTIONS.map(({ value, Icon }) => {
        const label = t[value];
        return (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={active === value}
          title={label}
          onClick={() => choose(value)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-colors cursor-pointer",
            active === value
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
        );
      })}
    </div>
  );
}
