import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SEED_ORDERS } from "@/data/seed-orders";
import { localizeOrders } from "@/data/order-translations";
import { JobArtwork } from "@/components/orders/JobArtwork";
import { CategoryBadge } from "@/components/ui/badge";
import { formatPrice } from "@/i18n/config";
import { getLocale } from "@/i18n/server";
import { landingMessages } from "@/i18n/messages/landing";

export async function FeaturedJobs() {
  const locale = await getLocale();
  const t = landingMessages[locale].featured;
  const featured = localizeOrders(SEED_ORDERS, locale).filter((order) =>
    ["B01", "B03", "B05"].includes(order.id),
  );

  return (
    <section
      id="tanlangan-buyurtmalar"
      className="site-container landing-section"
      aria-labelledby="featured-title"
    >
      <div className="section-heading section-heading-row">
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 id="featured-title">
            {t.titleLine1}<br /> {t.titleLine2}
          </h2>
          <p>{t.subtitle}</p>
        </div>
        <a className="text-link" href="/orders">
          {t.viewAll} <ArrowRight size={17} aria-hidden="true" />
        </a>
      </div>

      <div className="featured-showcase">
        {featured.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="featured-project"
            aria-label={`${order.title} — ${formatPrice(order.budget, locale)} — ${t.detailsAria}`}
          >
            <div className="featured-project-art">
              <JobArtwork order={order} />
              <span className="order-code">{order.id}</span>
            </div>
            <div className="featured-project-body">
              <div className="featured-project-meta">
                <CategoryBadge category={order.category} />
                <span>·</span>
                <span>{order.deadline}</span>
              </div>
              <h3>{order.title}</h3>
              <p>{order.summary}</p>
              <div className="featured-project-bottom">
                <strong>{formatPrice(order.budget, locale)}</strong>
                <span>{t.details} <ArrowUpRight size={17} aria-hidden="true" /></span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <p className="featured-note">
        <CheckCircle2 size={15} aria-hidden="true" />
        {t.note}
      </p>
    </section>
  );
}
