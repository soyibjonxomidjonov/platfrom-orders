import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  BriefcaseBusiness,
  Clock3,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  Send,
  Settings,
  UserRound,
} from "lucide-react";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProposalsList } from "@/components/proposals/ProposalsList";
import { SavedJobsList } from "@/components/dashboard/SavedJobsList";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { getLocale } from "@/i18n/server";
import { LOCALE_TAGS } from "@/i18n/config";
import { commonMessages, fill } from "@/i18n/messages/common";

export async function generateMetadata(): Promise<Metadata> {
  return { title: commonMessages[await getLocale()].dashboard.metaTitle };
}
export const dynamic = "force-dynamic";

const navItem =
  "flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:gap-3 lg:rounded-xl lg:border-0 lg:px-3 lg:py-2.5";

async function signOutAction() {
  "use server";
  await signOut({ redirectTo: "/" });
}

const NAV = [
  { href: "#umumiy", key: "overview", Icon: LayoutDashboard },
  { href: "#takliflar", key: "proposals", Icon: Send },
  { href: "#sevimlilar", key: "favorites", Icon: Heart },
  { href: "#sozlamalar", key: "settings", Icon: Settings },
] as const;

export default async function DashboardPage() {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) redirect("/login?callbackUrl=/dashboard");
  const locale = await getLocale();
  const t = commonMessages[locale].dashboard;

  const [proposalCount, pendingCount, favoriteCount, dbUser] = await Promise.all([
    prisma.proposal.count({ where: { userId: user.id } }),
    prisma.proposal.count({ where: { userId: user.id, status: "PENDING" } }),
    prisma.favorite.count({ where: { userId: user.id } }),
    prisma.user.findUnique({ where: { id: user.id }, select: { createdAt: true } }),
  ]);

  const stats = [
    { label: t.stats.sent, value: proposalCount, Icon: Send, tone: "purple" },
    { label: t.stats.pending, value: pendingCount, Icon: Clock3, tone: "peach" },
    { label: t.stats.favorites, value: favoriteCount, Icon: Heart, tone: "blue" },
  ];
  const firstName = user.name?.split(" ")[0] ?? t.friend;

  return (
    <div className="bg-[var(--section-surface,var(--muted))] min-h-[calc(100dvh-5rem)]">
      <div className="site-container grid gap-4 pb-28 pt-4 sm:gap-6 sm:py-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:pb-8">
        {/* Yon menyu: mobilda — profil qatori + gorizontal chiplar, desktopda — yopishqoq panel */}
        <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-3 sm:p-4">
            <div className="flex items-center gap-3 px-1 pb-3 lg:border-b lg:border-border lg:px-2 lg:pb-4">
              {user.image ? (
                <Image src={user.image} alt={user.name ?? ""} width={44} height={44} className="h-11 w-11 shrink-0 rounded-full" />
              ) : (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <UserRound size={22} />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">{user.name}</div>
                <div className="truncate text-xs text-muted-foreground">{user.email}</div>
              </div>
              <form action={signOutAction} className="lg:hidden">
                <button
                  type="submit"
                  aria-label={t.logout}
                  title={t.logout}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
                >
                  <LogOut size={18} />
                </button>
              </form>
            </div>
            <nav
              aria-label={t.nav}
              className="-mx-3 flex gap-2 overflow-x-auto border-t border-border px-3 pt-3 [scrollbar-width:none] sm:-mx-4 sm:px-4 lg:mx-0 lg:mt-3 lg:flex-col lg:gap-1 lg:overflow-visible lg:border-t-0 lg:px-0 lg:pt-0 [&::-webkit-scrollbar]:hidden"
            >
              {NAV.map(({ href, key, Icon }) => (
                <a key={href} href={href} className={navItem}>
                  <Icon size={17} className="shrink-0" /> {t.sections[key]}
                </a>
              ))}
              <Link href="/orders" className={navItem}>
                <BriefcaseBusiness size={17} className="shrink-0" /> {t.sections.orders}
              </Link>
              <Link href="/" className={navItem}>
                <Home size={17} className="shrink-0" /> {t.sections.home}
              </Link>
            </nav>
            <form action={signOutAction} className="mt-3 hidden border-t border-border pt-3 lg:block">
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10 dark:text-red-400"
              >
                <LogOut size={17} /> {t.logout}
              </button>
            </form>
          </div>
        </aside>

        {/* Asosiy kontent */}
        <div className="min-w-0 space-y-4 sm:space-y-6">
          <section id="umumiy" className="relative scroll-mt-24 overflow-hidden rounded-3xl bg-[#2a1d5c] p-5 text-white sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#7652f3]/50 blur-3xl" />
            <p className="relative text-sm text-[#d0bcff]">{t.eyebrow}</p>
            <h1 className="relative mt-2 break-words text-2xl font-bold tracking-tight sm:text-4xl">{fill(t.hello, { name: firstName })}</h1>
            <p className="relative mt-2 max-w-lg text-sm text-[#e3dcf3] sm:text-[15px]">
              {t.intro}
            </p>
            <Link
              href="/orders"
              className="relative mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#4e328f] transition-transform hover:-translate-y-0.5 sm:mt-6 sm:inline-flex sm:w-auto"
            >
              <BriefcaseBusiness size={17} /> {t.findNew}
            </Link>
          </section>

          <section className="grid grid-cols-3 gap-2 sm:gap-4" aria-label={t.stats.aria}>
            {stats.map(({ label, value, Icon, tone }) => (
              <div key={label} className="flex min-w-0 flex-col gap-2 rounded-2xl border border-border bg-card p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                <span className={`${tone} flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 sm:rounded-2xl`}>
                  <Icon size={20} />
                </span>
                <div className="min-w-0">
                  <div className="text-xl font-bold sm:text-2xl">{value}</div>
                  <div className="text-xs leading-snug text-muted-foreground sm:text-sm">{label}</div>
                </div>
              </div>
            ))}
          </section>

          <section id="takliflar" className="scroll-mt-24 rounded-3xl border border-border bg-card p-4 sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold tracking-tight sm:text-xl">{t.proposalsTitle}</h2>
              <Link href="/proposals" className="shrink-0 text-sm font-semibold text-primary hover:underline">
                {t.all}
              </Link>
            </div>
            <ProposalsList userId={user.id} limit={5} locale={locale} />
          </section>

          <section id="sevimlilar" className="scroll-mt-24 rounded-3xl border border-border bg-card p-4 sm:p-7">
            <h2 className="mb-5 text-lg font-bold tracking-tight sm:text-xl">{t.favoritesTitle}</h2>
            <SavedJobsList />
          </section>

          <section id="sozlamalar" className="scroll-mt-24 rounded-3xl border border-border bg-card p-4 sm:p-7">
            <h2 className="text-lg font-bold tracking-tight sm:text-xl">{t.settingsTitle}</h2>
            <div className="mt-5 divide-y divide-border">
              <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="min-w-0">
                  <div className="font-medium">{t.appearance}</div>
                  <div className="text-sm text-muted-foreground">{t.appearanceHint}</div>
                </div>
                <ThemeToggle />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="min-w-0">
                  <div className="font-medium">{t.languageTitle}</div>
                  <div className="text-sm text-muted-foreground">{t.languageHint}</div>
                </div>
                <LanguageSwitcher />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div className="min-w-0">
                  <div className="font-medium">{t.account}</div>
                  <div className="break-all text-sm text-muted-foreground">{user.email}</div>
                </div>
                {dbUser && (
                  <span className="text-sm text-muted-foreground">
                    {fill(t.memberSince, { date: dbUser.createdAt.toLocaleDateString(LOCALE_TAGS[locale]) })}
                  </span>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
