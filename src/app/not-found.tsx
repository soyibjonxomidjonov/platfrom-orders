import Link from "next/link";
import { SearchX } from "lucide-react";
import { getLocale } from "@/i18n/server";
import type { Messages } from "@/i18n/config";

const MSG: Messages<{ title: string; text: string; home: string; orders: string }> = {
  uz: { title: "Sahifa topilmadi", text: "Siz qidirgan sahifa mavjud emas yoki ko‘chirilgan.", home: "Bosh sahifa", orders: "Buyurtmalar" },
  ru: { title: "Страница не найдена", text: "Страница, которую вы ищете, не существует или была перемещена.", home: "Главная", orders: "Заказы" },
  en: { title: "Page not found", text: "The page you’re looking for doesn’t exist or has been moved.", home: "Home", orders: "Jobs" },
};

export default async function NotFound() {
  const t = MSG[await getLocale()];
  return (
    <div className="site-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-primary">
        <SearchX size={30} />
      </span>
      <p className="mt-6 text-sm font-semibold tracking-widest text-primary">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-3 max-w-md text-muted-foreground">{t.text}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-xl border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-muted">
          {t.home}
        </Link>
        <Link href="/orders" className="rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">
          {t.orders}
        </Link>
      </div>
    </div>
  );
}
