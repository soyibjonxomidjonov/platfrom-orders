import Image from "next/image";
import { ArrowDown, ArrowRight, Check, Code2, Lightbulb, Play, Sparkles, TrendingUp } from "lucide-react";
import { getLocale } from "@/i18n/server";
import { categoryLabel } from "@/i18n/categories";
import { landingMessages } from "@/i18n/messages/landing";

export async function HeroSection() {
  const locale = await getLocale();
  const t = landingMessages[locale].hero;
  return (
    <section className="landing-hero" aria-labelledby="hero-title">
      <div className="hero-grid site-container">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow"><span className="status-dot" /> {t.eyebrow}</span>
          <h1 id="hero-title">{t.titleStart} <span>{t.titleAccent}</span></h1>
          <p className="hero-description">{t.description}</p>
          <p className="hero-support">{t.supportLine1}<br className="hidden sm:block" /> {t.supportLine2}</p>
          <div className="hero-actions">
            <a href="/orders" className="landing-button primary-button">{t.ctaOrders} <ArrowRight size={18} /></a>
            <a href="#qanday-ishlaydi" className="landing-button secondary-button"><Play size={15} /> {t.ctaHow}</a>
          </div>
          <div className="hero-notes"><span><Check size={14} /> {t.noteReal}</span><span><Check size={14} /> {t.noteSmallStep}</span></div>
          <div className="hero-disciplines" aria-label={t.disciplinesAria}>
            <span>{t.disciplinesLabel}</span>
            <a href="#yonalishlar">{categoryLabel("Dizayn", locale)}</a>
            <span aria-hidden="true">✦</span>
            <a href="#yonalishlar">{categoryLabel("Video", locale)}</a>
            <span aria-hidden="true">✦</span>
            <a href="#yonalishlar">{categoryLabel("Veb", locale)}</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-image-wrap"><Image src="/images/yoshlar-hero.png" alt={t.imageAlt} width={1254} height={1254} preload sizes="(max-width: 767px) 100vw, 50vw" className="hero-image" /></div>
          <div className="idea-sticker" aria-hidden="true"><Lightbulb size={30} /><span>{t.ideaSticker}</span></div>
          <div className="code-sticker" aria-hidden="true"><Code2 size={26} /></div>
          <div className="hero-floating-note"><span className="floating-icon"><Sparkles size={22} /></span><div><strong>{t.floatingTitle}</strong><span>{t.floatingText}</span></div></div>
          <div className="growth-sticker" aria-hidden="true"><TrendingUp size={26} /><span>{t.growthSticker}</span></div>
          <span className="hero-doodle" aria-hidden="true">✳</span>
        </div>
      </div>
      <a href="#qanday-ishlaydi" className="hero-scroll"><ArrowDown size={14} /> {t.scroll}</a>
    </section>
  );
}
