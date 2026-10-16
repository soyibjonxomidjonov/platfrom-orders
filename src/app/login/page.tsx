import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AlertCircle, ArrowLeft, Check, ShieldCheck } from "lucide-react";
import { signIn, auth, safeCallbackUrl } from "@/lib/auth";
import { GoogleIcon } from "@/components/ui/google-icon";
import { BrandLogo } from "@/components/illustrations";
import { EmailCodeForm } from "@/components/auth/EmailCodeForm";
import { getLocale } from "@/i18n/server";
import { commonMessages } from "@/i18n/messages/common";

export async function generateMetadata(): Promise<Metadata> {
  return { title: commonMessages[await getLocale()].login.metaTitle };
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const { error, callbackUrl } = await searchParams;
  const target = safeCallbackUrl(callbackUrl);
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  if (session?.user) redirect(target);

  const t = commonMessages[locale].login;
  const errors = t.errors as Record<string, string>;
  const errorText = error ? (errors[error] ?? errors.default) : null;

  return (
    <div className="grid min-h-[calc(100dvh-5rem)] lg:grid-cols-2">
      {/* Chap: brend paneli (faqat desktop) */}
      <section className="relative hidden overflow-hidden bg-[#2a1d5c] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#7652f3]/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-[#3fb6e8]/20 blur-3xl" />

        <div className="relative z-10 max-w-md">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-[#d8ccff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a28aff]" /> {t.badge}
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            {t.heroA} <span className="text-[#c4b2ff]">{t.heroB}</span>
          </h1>
          <ul className="mt-8 grid gap-3">
            {t.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[15px] text-[#e3dcf3]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Check size={14} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto mt-10 w-full max-w-md">
          <div className="overflow-hidden rounded-[2rem] border-4 border-white/15 shadow-2xl">
            <Image
              src="/images/yoshlar-hero.png"
              alt={t.imageAlt}
              width={1254}
              height={1254}
              sizes="(min-width: 1024px) 40vw, 0px"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* O'ng: kirish kartasi */}
      <section className="flex items-center justify-center bg-background px-5 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={16} /> {t.back}
          </Link>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_20px_50px_#2a17551a] sm:p-9">
            <div className="flex items-center gap-2.5 text-lg font-bold">
              <BrandLogo className="h-10 w-10" />
              <span>
                Yoshlar<span className="text-primary">Makon</span>
              </span>
            </div>

            <h2 className="mt-7 text-2xl font-bold tracking-tight sm:text-3xl">{t.welcome}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{t.subtitle}</p>

            {errorText && (
              <div
                role="alert"
                className="mt-6 flex gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                {errorText}
              </div>
            )}

            <form
              className="mt-7"
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: target });
              }}
            >
              <button
                type="submit"
                className="flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border-[1.5px] border-border bg-background text-[15px] font-semibold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"
              >
                <GoogleIcon className="h-5 w-5" />
                {t.google}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="h-px flex-1 bg-border" /> {t.or} <span className="h-px flex-1 bg-border" />
            </div>

            <EmailCodeForm callbackUrl={target} />

            <Link
              href="/orders"
              className="mt-6 flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-accent px-4 text-center text-sm font-semibold text-accent-foreground transition-colors hover:bg-muted"
            >
              {t.browse}
            </Link>

            <p className="mt-5 flex gap-2 text-xs leading-relaxed text-muted-foreground">
              <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
              {t.note}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
