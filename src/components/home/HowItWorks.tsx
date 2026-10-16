import { ArrowUpRight, Search, Send, Sprout } from "lucide-react";
import { getLocale } from "@/i18n/server";
import { landingMessages } from "@/i18n/messages/landing";

const STEP_STYLES = [
  { Icon: Search, tone: "purple" },
  { Icon: Send, tone: "blue" },
  { Icon: Sprout, tone: "peach" },
];

export async function HowItWorks() {
  const locale = await getLocale();
  const t = landingMessages[locale].how;
  const steps = STEP_STYLES.map((style, index) => ({ ...style, ...t.steps[index] }));
  return <section id="qanday-ishlaydi" className="site-container landing-section">
    <div className="section-heading centered"><span className="eyebrow">{t.eyebrow}</span><h2>{t.title}</h2><p>{t.subtitle}</p></div>
    <div className="steps-grid">{steps.map(({ Icon, title, text, tone }, index) => <article className="step-card" key={title}><div className="step-top"><span className={`stat-icon ${tone}`}><Icon size={25} /></span><span className="step-number">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p>{index < 2 && <ArrowUpRight className="step-arrow" size={22} aria-hidden="true" />}</article>)}</div>
  </section>;
}
