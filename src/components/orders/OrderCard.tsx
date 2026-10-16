"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Clock } from "lucide-react";
import { CategoryBadge } from "@/components/ui/badge";
import { FavoriteButton } from "./FavoriteButton";
import { JobArtwork } from "./JobArtwork";
import { localizeOrder } from "@/data/order-translations";
import { formatPrice } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { ordersMessages } from "@/i18n/messages/orders";
import type { Order } from "@/types/order";

export function OrderCard({ order: raw, index = 0 }: { order: Order; index?: number }) {
  const locale = useLocale();
  const t = ordersMessages[locale].card;
  const order = localizeOrder(raw, locale);
  const reducedMotion = useReducedMotion();
  return <motion.article layout initial={false} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }} transition={{ duration: reducedMotion ? 0 : 0.2, delay: Math.min(index * 0.025, 0.1) }} className="order-card">
    <div className="order-cover"><Link href={`/orders/${order.id}`} aria-label={t.detailsAria(order.title)} tabIndex={-1}><JobArtwork order={order} /></Link><span className="order-code">{order.id}</span><div className="order-favorite"><FavoriteButton orderId={order.id} /></div></div>
    <div className="order-card-body"><div className="order-meta"><CategoryBadge category={order.category} /><span><Clock size={13} /> {order.deadline}</span></div><h3><Link href={`/orders/${order.id}`}>{order.title}</Link></h3><p>{order.summary}</p><div className="order-skills">{order.skills.slice(0, 2).map(skill => <span key={skill}>{skill}</span>)}</div><div className="order-card-footer"><div><span>{t.budget}</span><strong>{formatPrice(order.budget, locale)}</strong></div><Link className="order-detail-link" href={`/orders/${order.id}`}>{t.details} <ArrowUpRight size={16} /></Link></div></div>
  </motion.article>;
}

