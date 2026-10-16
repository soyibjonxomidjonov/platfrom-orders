"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFavorites, toggleFavorite } from "@/lib/favorites-store";
import { useLocale } from "@/i18n/LocaleProvider";
import { ordersMessages } from "@/i18n/messages/orders";

export function FavoriteButton({
  orderId,
  className,
  variant = "overlay",
}: {
  orderId: string;
  className?: string;
  variant?: "overlay" | "inline";
}) {
  const [fav, setFav] = useState(false);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = ordersMessages[useLocale()].favorite;
  const label = fav ? t.remove : t.add;

  useEffect(() => {
    const sync = () => setFav(getFavorites().includes(orderId));
    sync();
    window.addEventListener("favorites:changed", sync);
    return () => window.removeEventListener("favorites:changed", sync);
  }, [orderId]);

  return (
    <button
      type="button"
      aria-pressed={fav}
      disabled={busy}
      aria-label={label}
      title={label}
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBusy(true);
        const res = await toggleFavorite(orderId);
        setBusy(false);
        if (res === "unauthorized") {
          router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-colors cursor-pointer disabled:opacity-60",
        variant === "overlay"
          ? "h-9 w-9 bg-card/80 backdrop-blur border border-border hover:bg-card"
          : "h-10 w-10 border border-border hover:bg-muted",
        className,
      )}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all",
          fav ? "fill-[#e5484d] text-[#e5484d] scale-110" : "text-muted-foreground",
        )}
      />
    </button>
  );
}
