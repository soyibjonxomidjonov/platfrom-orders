"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  CalendarClock,
  FileText,
  Layers,
  ListChecks,
  LogIn,
  Send,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { CategoryBadge } from "@/components/ui/badge";
import { ProposalModal } from "./ProposalModal";
import { FavoriteButton } from "./FavoriteButton";
import { JobArtwork } from "./JobArtwork";
import { SEED_ORDERS } from "@/data/seed-orders";
import { localizeOrder } from "@/data/order-translations";
import { formatPrice } from "@/i18n/config";
import { categoryLabel } from "@/i18n/categories";
import { useLocale } from "@/i18n/LocaleProvider";
import { ordersMessages } from "@/i18n/messages/orders";
import type { Order } from "@/types/order";

export function OrderDetails({
  order: rawOrder,
  canApply,
  userName,
}: {
  order: Order;
  canApply: boolean;
  userName: string | null;
}) {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = ordersMessages[locale].details;
  const order = localizeOrder(rawOrder, locale);
  const reduced = useReducedMotion();
  const related = SEED_ORDERS.filter((o) => o.id !== order.id)
    .sort((a, b) => Number(b.category === order.category) - Number(a.category === order.category))
    .slice(0, 2)
    .map((o) => localizeOrder(o, locale));

  const fade = (delay = 0) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay },
        };

  return (
    <div className="od-page">
      <div className="site-container">
        <Link href="/orders" className="od-back">
          <ArrowLeft size={16} />
          {t.back}
        </Link>

        <div className="od-grid">
          {/* Asosiy ustun */}
          <div className="min-w-0">
            <motion.div className="od-cover" {...fade(0)}>
              <JobArtwork order={order} />
              <span className="order-code">{order.id}</span>
              <div className="od-cover-fav">
                <FavoriteButton orderId={order.id} />
              </div>
            </motion.div>

            <motion.header className="od-head" {...fade(0.05)}>
              <div className="od-head-meta">
                <CategoryBadge category={order.category} />
                <span className="od-chip">
                  <CalendarClock size={14} /> {order.deadline}
                </span>
              </div>
              <h1>{order.title}</h1>
              <p className="od-lead">{order.summary}</p>
            </motion.header>

            <motion.section className="od-block" {...fade(0.1)}>
              <h2>
                <FileText size={19} /> {t.description}
              </h2>
              <p>{order.description}</p>
            </motion.section>

            <motion.section className="od-block" {...fade(0.15)}>
              <h2>
                <Sparkles size={19} /> {t.skills}
              </h2>
              <div className="od-skills">
                {order.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </motion.section>

            <motion.section className="od-block" {...fade(0.2)}>
              <h2>
                <ListChecks size={19} /> {t.howTo}
              </h2>
              <ol className="od-steps">
                {t.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </motion.section>
          </div>

          {/* Yon panel */}
          <motion.aside className="od-aside" {...fade(0.08)}>
            <div className="od-summary">
              <div className="od-budget-label">{t.budget}</div>
              <div className="od-budget">{formatPrice(order.budget, locale)}</div>

              <dl className="od-facts">
                <div>
                  <dt>
                    <Layers size={15} /> {t.category}
                  </dt>
                  <dd>{categoryLabel(order.category, locale)}</dd>
                </div>
                <div>
                  <dt>
                    <CalendarClock size={15} /> {t.deadline}
                  </dt>
                  <dd>{order.deadline}</dd>
                </div>
                <div>
                  <dt>
                    <Wallet size={15} /> {t.code}
                  </dt>
                  <dd>{order.id}</dd>
                </div>
              </dl>

              <div className="od-cta">
                {canApply ? (
                  <button type="button" className="od-apply" onClick={() => setOpen(true)}>
                    <Send size={18} />
                    {t.apply}
                  </button>
                ) : (
                  <Link
                    href={`/login?callbackUrl=${encodeURIComponent(`/orders/${order.id}`)}`}
                    className="od-apply"
                  >
                    <LogIn size={18} />
                    {t.loginToApply}
                  </Link>
                )}
                <div className="od-fav">
                  <FavoriteButton orderId={order.id} variant="inline" />
                </div>
              </div>

              <p className="od-note">
                <ShieldCheck size={16} />
                {canApply
                  ? userName
                    ? t.noteSignedIn(userName)
                    : t.noteNoName
                  : t.noteLogin}
              </p>
            </div>

            <div className="od-ai-hint">
              <span className="od-ai-icon">
                <Bot size={18} />
              </span>
              <div>
                <strong>{t.aiTitle}</strong>
                {t.aiText}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* O'xshash buyurtmalar */}
        <section className="od-related" aria-labelledby="related-title">
          <h2 id="related-title">{t.related}</h2>
          <div className="od-related-grid">
            {related.map((o) => (
              <Link key={o.id} href={`/orders/${o.id}`} className="od-related-card">
                <div className="od-related-thumb">
                  <JobArtwork order={o} />
                </div>
                <div className="min-w-0">
                  <CategoryBadge category={o.category} />
                  <strong className="mt-2">{o.title}</strong>
                  <span>
                    {formatPrice(o.budget, locale)} <ArrowUpRight size={13} className="inline" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {canApply && (
        <ProposalModal
          order={rawOrder}
          open={open}
          onClose={() => setOpen(false)}
          defaultName={userName ?? ""}
        />
      )}
    </div>
  );
}
