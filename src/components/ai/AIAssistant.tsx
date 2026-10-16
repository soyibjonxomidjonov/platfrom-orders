"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  Bot,
  Loader2,
  RotateCcw,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getOrderById } from "@/data/seed-orders";
import { localizeOrder } from "@/data/order-translations";
import { useLocale } from "@/i18n/LocaleProvider";
import { aiMessages, type AIMessages } from "@/i18n/messages/ai";

/* -------------------------------------------------------------------------- */
/*  Turlar                                                                     */
/* -------------------------------------------------------------------------- */

type Mode = "chat" | "recommend" | "explain" | "improve" | "portfolio";

interface Msg {
  role: "user" | "assistant";
  content: string;
  orderIds?: string[];
}

/** Oxirgi yuborilgan so'rovni qayta yuborish uchun saqlaymiz. */
interface LastRequest {
  mode: Mode;
  body: Record<string, unknown>;
  userLabel: string;
}

/* -------------------------------------------------------------------------- */
/*  Konstantalar                                                               */
/* -------------------------------------------------------------------------- */

/** Ko'nikma/buyurtma so'raydigan inline-input holati. */
type PromptKind = "recommend-skills" | "portfolio-skills" | null;

const CLIENT_TIMEOUT_MS = 15_000;

type QuickRun = "prompt-recommend" | "prompt-portfolio" | "explain" | "improve";

const QUICK_ACTIONS: {
  key: keyof AIMessages["quickActions"];
  run: QuickRun;
}[] = [
  { key: "recommend", run: "prompt-recommend" },
  { key: "explain", run: "explain" },
  { key: "improve", run: "improve" },
  { key: "portfolio", run: "prompt-portfolio" },
];

/* -------------------------------------------------------------------------- */
/*  Xatolik matnini status bo'yicha tanlash                                    */
/* -------------------------------------------------------------------------- */

function errorMessageForStatus(
  t: AIMessages,
  status: number,
  fallback?: string,
): string {
  if (status === 429) return t.errors.rateLimit;
  if (status === 503) return t.errors.notConfigured;
  if (status === 502) return t.errors.modelFailure;
  return fallback || t.errors.generic;
}

/* -------------------------------------------------------------------------- */
/*  Komponent                                                                  */
/* -------------------------------------------------------------------------- */

export function AIAssistant() {
  const reduceMotion = useReducedMotion();
  const locale = useLocale();
  const t = aiMessages[locale];
  // Salomlashuv joriy tildan olinadi (state'da saqlanmaydi) — til almashsa darhol yangilanadi.
  const greeting: Msg = { role: "assistant", content: t.greeting };

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const showAssistant = () => setOpen(true);
    window.addEventListener("yoshlarmakon:open-ai", showAssistant);
    return () => window.removeEventListener("yoshlarmakon:open-ai", showAssistant);
  }, []);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [canRetry, setCanRetry] = useState(false);
  const [promptKind, setPromptKind] = useState<PromptKind>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const lastRequestRef = useRef<LastRequest | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, loading, promptKind, reduceMotion]);

  /* ---- so'rovni yuborish (umumiy) ------------------------------------- */

  async function runRequest(req: LastRequest, isRetry = false) {
    if (loading) return;
    lastRequestRef.current = req;
    setCanRetry(false);

    // Foydalanuvchi xabarini qo'shamiz (retry bo'lsa qayta qo'shmaymiz).
    if (!isRetry && req.userLabel) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: req.userLabel },
      ]);
    }
    setLoading(true);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: req.mode, locale, ...req.body }),
        signal: controller.signal,
      });

      let data: {
        reply?: string;
        error?: string;
        suggestedOrderIds?: string[];
      } = {};
      try {
        data = await res.json();
      } catch {
        /* bo'sh/noto'g'ri javob */
      }

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorMessageForStatus(t, res.status, data.error),
          },
        ]);
        setCanRetry(res.status === 429 || res.status === 502 || res.status === 503);
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || t.errors.noReply,
          orderIds: Array.isArray(data.suggestedOrderIds)
            ? data.suggestedOrderIds
            : undefined,
        },
      ]);
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aborted
            ? t.errors.timeout
            : t.errors.network,
        },
      ]);
      setCanRetry(true);
    } finally {
      clearTimeout(timer);
      setLoading(false);
    }
  }

  function retry() {
    const last = lastRequestRef.current;
    if (last) void runRequest(last, true);
  }

  /* ---- yuqori darajadagi harakatlar ----------------------------------- */

  function sendChat(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    setInput("");
    setPromptKind(null);

    // Oldingi suhbat tarixini (greetingdan tashqari) yuboramiz.
    const history = messages
      .filter((m) => Boolean(m.content))
      .map((m) => ({ role: m.role, content: m.content }));

    void runRequest({
      mode: "chat",
      userLabel: content,
      body: {
        messages: [...history, { role: "user", content }],
      },
    });
  }

  function submitSkills(kind: "recommend-skills" | "portfolio-skills") {
    const skills = input.trim();
    if (!skills || loading) return;
    setInput("");
    setPromptKind(null);
    void runRequest({
      mode: kind === "recommend-skills" ? "recommend" : "portfolio",
      userLabel:
        (kind === "recommend-skills"
          ? t.skillsLabelRecommend
          : t.skillsLabelPortfolio) + skills,
      body: { skills },
    });
  }

  function handleQuickAction(run: QuickRun) {
    if (loading) return;
    if (run === "prompt-recommend") {
      setPromptKind("recommend-skills");
      setInput("");
      return;
    }
    if (run === "prompt-portfolio") {
      setPromptKind("portfolio-skills");
      setInput("");
      return;
    }
    if (run === "explain") {
      // Chat orqali: foydalanuvchidan qaysi buyurtma (B01..B06) so'raladi.
      sendChat(t.explainPrompt);
      return;
    }
    if (run === "improve") {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: t.improveInstructions,
        },
      ]);
    }
  }

  /* ---- animatsiya sozlamalari (reduced motion) ------------------------ */

  const fabMotion = reduceMotion
    ? {}
    : { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 } };

  const panelAnim = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, y: 20, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.96 },
        transition: { type: "spring" as const, damping: 26, stiffness: 320 },
      };

  const showIntro = messages.length === 0 && !promptKind;
  const displayed: Msg[] = [greeting, ...messages];

  /* --------------------------------------------------------------------- */

  return (
    <>
      {/* Floating tugma (FAB) — pastki o'ng burchak */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        {...fabMotion}
        aria-label={open ? t.fabClose : t.fabOpen}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="bot"
              initial={reduceMotion ? false : { rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { rotate: -90, opacity: 0 }}
            >
              <Bot className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            {...panelAnim}
            role="dialog"
            aria-label={t.dialogLabel}
            className="fixed bottom-24 right-5 z-50 flex h-[32rem] max-h-[calc(100vh-7rem)] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl"
          >
            {/* Sarlavha */}
            <div className="flex items-center gap-2 border-b border-border bg-primary px-4 py-3 text-primary-foreground">
              <Sparkles className="h-5 w-5 shrink-0" />
              <div className="min-w-0">
                <div className="text-sm font-semibold">{t.title}</div>
                <div className="text-xs opacity-80">{t.subtitle}</div>
              </div>
            </div>

            {/* Xabarlar */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto p-4"
            >
              {displayed.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed whitespace-pre-wrap break-words",
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm",
                    )}
                  >
                    {m.content}

                    {/* Tavsiya qilingan buyurtmalar — havolalar */}
                    {m.orderIds && m.orderIds.length > 0 && (
                      <div className="mt-2.5 flex flex-col gap-1.5">
                        {m.orderIds.map((id) => {
                          const base = getOrderById(id);
                          if (!base) return null;
                          const order = localizeOrder(base, locale);
                          return (
                            <Link
                              key={id}
                              href={`/orders/${order.id}`}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                            >
                              <span className="rounded-md bg-primary px-1.5 py-0.5 font-mono text-[10px] font-semibold text-primary-foreground">
                                {order.id}
                              </span>
                              <span className="truncate">{order.title}</span>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-muted px-3.5 py-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t.thinking}
                  </div>
                </div>
              )}

              {/* Qayta urinish tugmasi */}
              {canRetry && !loading && (
                <div className="flex justify-start">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={retry}
                    className="gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t.retry}
                  </Button>
                </div>
              )}

              {/* Boshlang'ich: tezkor amallar + namunaviy savollar */}
              {showIntro && (
                <div className="space-y-3 pt-1">
                  <div className="flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map((a) => (
                      <button
                        key={a.key}
                        onClick={() => handleQuickAction(a.run)}
                        disabled={loading}
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50 cursor-pointer"
                      >
                        {t.quickActions[a.key]}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {t.sampleQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendChat(q)}
                        disabled={loading}
                        className="rounded-full border border-dashed border-border bg-transparent px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted disabled:opacity-50 cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Inline ko'nikma so'rovi (recommend/portfolio) */}
            {promptKind && (
              <div className="border-t border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
                {promptKind === "recommend-skills"
                  ? t.skillsHintRecommend
                  : t.skillsHintPortfolio}
              </div>
            )}

            {/* Kiritish formasi */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (promptKind === "recommend-skills")
                  submitSkills("recommend-skills");
                else if (promptKind === "portfolio-skills")
                  submitSkills("portfolio-skills");
                else sendChat(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={promptKind ? t.placeholderSkills : t.placeholderChat}
                aria-label={t.inputLabel}
                className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <Button
                type="submit"
                size="icon"
                className="shrink-0 rounded-full"
                disabled={loading || !input.trim()}
                aria-label={t.send}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
