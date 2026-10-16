"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { AlertCircle, Loader2, Send } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { SuccessArt } from "@/components/illustrations";
import { JobArtwork } from "./JobArtwork";
import { makeProposalSchema, type ProposalInput } from "@/lib/validators";
import { submitProposal } from "@/actions/proposals";
import { localizeOrder } from "@/data/order-translations";
import { formatPrice } from "@/i18n/config";
import { categoryLabel } from "@/i18n/categories";
import { useLocale } from "@/i18n/LocaleProvider";
import { ordersMessages } from "@/i18n/messages/orders";
import type { Order } from "@/types/order";

export function ProposalModal({
  order: rawOrder,
  open,
  onClose,
  defaultName = "",
}: {
  order: Order;
  open: boolean;
  onClose: () => void;
  defaultName?: string;
}) {
  const locale = useLocale();
  const t = ordersMessages[locale].modal;
  const order = localizeOrder(rawOrder, locale);
  const schema = useMemo(() => makeProposalSchema(locale), [locale]);
  const [done, setDone] = useState<{ name: string; orderTitle: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ProposalInput>({
    resolver: zodResolver(schema),
    defaultValues: { name: defaultName, portfolioUrl: "", message: "" },
  });

  async function onSubmit(data: ProposalInput) {
    setServerError(null);
    const res = await submitProposal(order.id, data).catch(() => null);
    if (!res) {
      setServerError(t.networkError);
      return;
    }
    if (res.status === "success") {
      setDone({ name: res.name, orderTitle: res.orderTitle });
    } else if (res.status === "unauthorized") {
      setServerError(res.message);
    } else if (res.status === "error") {
      if (res.fieldErrors) {
        for (const [k, v] of Object.entries(res.fieldErrors)) {
          setError(k as keyof ProposalInput, { message: v });
        }
      }
      setServerError(res.message);
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setDone(null);
      setServerError(null);
      reset({ name: defaultName, portfolioUrl: "", message: "" });
    }, 200);
  }

  return (
    <Modal open={open} onClose={handleClose} title={done ? undefined : t.title}>
      {done ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="pm-success"
          role="status"
          aria-live="polite"
        >
          <SuccessArt className="h-28 w-28" />
          <h3>{t.successTitle}</h3>
          <p>
            <strong>{done.name}</strong>
            {t.successRest(done.orderTitle)}
          </p>
          <div className="pm-success-actions">
            <Link href="/proposals" className="pm-link" onClick={handleClose}>
              {t.viewProposals}
            </Link>
            <button type="button" className="pm-submit" onClick={handleClose}>
              {t.close}
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          <div className="pm-job">
            <div className="pm-job-thumb">
              <JobArtwork order={order} />
            </div>
            <div className="min-w-0">
              <small>
                {order.id} · {categoryLabel(order.category, locale)}
              </small>
              <strong>{order.title}</strong>
              <em>{formatPrice(order.budget, locale)}</em>
            </div>
          </div>

          <div className="pm-field">
            <label htmlFor="pm-name" className="pm-label">
              {t.nameLabel} <b>*</b>
            </label>
            <input
              id="pm-name"
              className="pm-input"
              placeholder={t.namePlaceholder}
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "pm-name-err" : undefined}
              {...register("name")}
            />
            {errors.name && (
              <span id="pm-name-err" className="pm-error" role="alert">
                <AlertCircle size={14} /> {t.nameError}: {errors.name.message}
              </span>
            )}
          </div>

          <div className="pm-field">
            <label htmlFor="pm-url" className="pm-label">
              {t.urlLabel} <b>*</b>
            </label>
            <input
              id="pm-url"
              className="pm-input"
              type="url"
              inputMode="url"
              placeholder={t.urlPlaceholder}
              aria-invalid={!!errors.portfolioUrl}
              aria-describedby="pm-url-hint"
              {...register("portfolioUrl")}
            />
            {errors.portfolioUrl ? (
              <span id="pm-url-hint" className="pm-error" role="alert">
                <AlertCircle size={14} /> {t.urlLabel}: {errors.portfolioUrl.message}
              </span>
            ) : (
              <span id="pm-url-hint" className="pm-hint">
                {t.urlHint}
              </span>
            )}
          </div>

          {serverError && <p className="pm-server-error">{serverError}</p>}

          <div className="pm-actions">
            <button type="button" className="pm-cancel" onClick={handleClose}>
              {t.cancel}
            </button>
            <button type="submit" className="pm-submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 size={17} className="animate-spin" /> {t.submitting}
                </>
              ) : (
                <>
                  <Send size={17} /> {t.submit}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
