"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { BrandLogo } from "@/components/illustrations";
import { useLocale } from "@/i18n/LocaleProvider";
import { commonMessages } from "@/i18n/messages/common";
import "@/styles/navigation.css";

export const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/orders", key: "orders" },
  { href: "/#qanday-ishlaydi", key: "how" },
  { href: "/#ai-yordamchi", key: "ai" },
  { href: "/proposals", key: "proposals" },
] as const;

export function Navbar({ isAuthed = false }: { isAuthed?: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hash, setHash] = useState("");
  const t = commonMessages[useLocale()].nav;

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const activeHref = pathname === "/" ? `/${hash}` : pathname;

  return (
    <header className="ym-header">
      <div className="ym-nav-shell">
        <Link href="/" className="ym-brand" aria-label="YoshlarMakon">
          <BrandLogo className="ym-brand-icon" />
          <span className="ym-wordmark">
            Yoshlar<span>Makon</span>
          </span>
        </Link>

        <nav aria-label={t.mainNav} className="ym-desktop-nav">
          {NAV_LINKS.map((link) => {
            const active = link.href === "/" || link.href.includes("#")
              ? activeHref === link.href
              : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setHash(link.href.includes("#") ? `#${link.href.split("#")[1]}` : "")}
                aria-current={active ? (link.href.includes("#") ? "location" : "page") : undefined}
                className={cn(
                  "ym-nav-link",
                  active && "is-active",
                )}
              >
                {t[link.key]}
              </Link>
            );
          })}
        </nav>

        <div className="ym-nav-actions">
          <LanguageSwitcher className="ym-language-control" />
          <div className="ym-theme-control">
            <ThemeToggle />
          </div>
          <Link href={isAuthed ? "/dashboard" : "/login"} className="ym-account-link">
            <span className="nav-login">
              {isAuthed ? t.cabinet : t.login} <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </Link>
          <MobileMenu open={menuOpen} setOpen={setMenuOpen} isAuthed={isAuthed} activeHref={activeHref} />
        </div>
      </div>
    </header>
  );
}
