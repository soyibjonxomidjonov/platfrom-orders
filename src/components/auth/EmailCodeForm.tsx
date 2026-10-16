"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AlertCircle, ArrowLeft, Loader2, Mail, MailCheck, ShieldCheck } from "lucide-react";
import { requestEmailCode, verifyEmailCode } from "@/actions/email-auth";
import { useLocale } from "@/i18n/LocaleProvider";
import { commonMessages, fill } from "@/i18n/messages/common";

const inputCls =
  "w-full min-h-[52px] rounded-2xl border-[1.5px] border-input bg-background px-4 text-[15px] text-foreground transition-shadow placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15 aria-[invalid=true]:border-red-500";

export function EmailCodeForm({ callbackUrl }: { callbackUrl: string }) {
  const t = commonMessages[useLocale()].email;
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [pending, startTransition] = useTransition();
  const codeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  useEffect(() => {
    if (step === "code") codeRef.current?.focus();
  }, [step]);

  function sendCode() {
    setError(null);
    startTransition(async () => {
      const res = await requestEmailCode(email).catch(() => null);
      if (!res) return setError(t.errors.generic);
      if (!res.ok) {
        setError(res.error);
        if (res.retryAfter) setCooldown(res.retryAfter);
        return;
      }
      setEmail(res.email);
      setCode("");
      setStep("code");
      setCooldown(res.cooldown);
    });
  }

  function verify() {
    setError(null);
    startTransition(async () => {
      try {
        const res = await verifyEmailCode(email, code, callbackUrl);
        // Muvaffaqiyatda server redirect qiladi va bu yerga qaytilmaydi.
        if (res && !res.ok) {
          setError(res.error);
          if (res.expired) setCode("");
        }
      } catch (err) {
        // next/navigation redirect'i — o'tkazib yuboramiz
        if (err && typeof err === "object" && "digest" in err && String((err as { digest: unknown }).digest).startsWith("NEXT_REDIRECT")) throw err;
        setError(t.errors.generic);
      }
    });
  }

  const errorBox = error && (
    <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
      <AlertCircle size={17} className="mt-0.5 shrink-0" />
      {error}
    </p>
  );

  if (step === "email") {
    return (
      <form
        className="grid gap-3"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (!pending) sendCode();
        }}
      >
        <label htmlFor="login-email" className="text-sm font-semibold">
          {t.label}
        </label>
        <div className="relative">
          <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            id="login-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            aria-invalid={Boolean(error)}
            className={`${inputCls} pl-11`}
          />
        </div>
        {errorBox}
        <button
          type="submit"
          disabled={pending || !email.trim() || cooldown > 0}
          className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary text-[15px] font-semibold text-primary-foreground shadow-[0_8px_20px_#6541dd2b] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {pending ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
          {pending ? t.sending : cooldown > 0 ? fill(t.resendIn, { s: cooldown }) : t.send}
        </button>
      </form>
    );
  }

  return (
    <form
      className="grid gap-3"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!pending && code.length === 6) verify();
      }}
    >
      <div className="flex items-start gap-3 rounded-2xl bg-accent p-3.5 text-sm text-accent-foreground">
        <MailCheck size={20} className="mt-0.5 shrink-0" />
        <div className="min-w-0">
          {t.sentTo} <strong className="break-all">{email}</strong>
          <div className="mt-0.5 text-xs opacity-80">{t.hint}</div>
        </div>
      </div>

      <label htmlFor="login-code" className="text-sm font-semibold">
        {t.codeLabel}
      </label>
      <input
        ref={codeRef}
        id="login-code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="\d{6}"
        maxLength={6}
        value={code}
        onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
        placeholder={t.codePlaceholder}
        aria-invalid={Boolean(error)}
        className={`${inputCls} text-center font-mono text-2xl tracking-[0.5em]`}
      />
      {errorBox}
      <button
        type="submit"
        disabled={pending || code.length !== 6}
        className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary text-[15px] font-semibold text-primary-foreground shadow-[0_8px_20px_#6541dd2b] transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {pending ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
        {pending ? t.verifying : t.verify}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <button
          type="button"
          onClick={() => {
            setStep("email");
            setError(null);
          }}
          className="inline-flex cursor-pointer items-center gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={15} /> {t.change}
        </button>
        <button
          type="button"
          disabled={pending || cooldown > 0}
          onClick={sendCode}
          className="cursor-pointer font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:text-muted-foreground disabled:no-underline"
        >
          {cooldown > 0 ? fill(t.resendIn, { s: cooldown }) : t.resend}
        </button>
      </div>
    </form>
  );
}
