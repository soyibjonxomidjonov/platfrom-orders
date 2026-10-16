"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NAV_LINKS } from "./Navbar";
import { useLocale } from "@/i18n/LocaleProvider";
import { commonMessages } from "@/i18n/messages/common";

export function MobileMenu({
  open,
  setOpen,
  isAuthed = false,
  activeHref,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  isAuthed?: boolean;
  activeHref?: string;
}) {
  const pathname = usePathname();
  const t = commonMessages[useLocale()].nav;

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, setOpen]);

  return (
    <div className="ym-mobile-menu">
      <Button
        variant="ghost"
        size="icon"
        aria-label={t.menu}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        className="ym-menu-trigger"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="ym-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.nav
              id="mobile-navigation"
              aria-label={t.mobileNav}
              className="ym-mobile-panel"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = link.href === "/" || link.href.includes("#")
                    ? (activeHref ?? pathname) === link.href
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? (link.href.includes("#") ? "location" : "page") : undefined}
                        className={cn(
                          "block rounded-md px-3 py-2.5 text-sm font-medium",
                          active ? "bg-accent text-accent-foreground" : "hover:bg-muted",
                        )}
                      >
                        {t[link.key]}
                      </Link>
                    </li>
                  );
                })}
                <li className="flex items-center justify-between gap-3 px-3 py-2">
                  <span className="text-sm text-muted-foreground">{t.language}</span>
                  <LanguageSwitcher />
                </li>
                <li className="flex items-center justify-between gap-3 px-3 py-2">
                  <span className="text-sm text-muted-foreground">{t.theme}</span>
                  <ThemeToggle />
                </li>
                <li className="pt-1">
                  <Link href={isAuthed ? "/dashboard" : "/login"} onClick={() => setOpen(false)}>
                    <Button className="w-full">{isAuthed ? t.cabinet : t.login}</Button>
                  </Link>
                </li>
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
