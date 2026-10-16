"use client";

import { ArrowUpRight, Check, Send, Sparkles } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { landingMessages } from "@/i18n/messages/landing";

export function AIHelperSection() {
  const locale = useLocale();
  const t = landingMessages[locale].ai;
  return <section id="ai-yordamchi" className="site-container ai-section"><div className="ai-panel"><div className="ai-copy"><span className="eyebrow"><Sparkles size={14} /> {t.eyebrow}</span><h2>{t.titleLine1}<br /> {t.titleLine2}</h2><p>{t.text}</p><ul>{t.bullets.map((bullet) => <li key={bullet}><Check size={16} /> {bullet}</li>)}</ul><button className="landing-button ai-button" onClick={() => window.dispatchEvent(new Event("yoshlarmakon:open-ai"))}>{t.cta} <ArrowUpRight size={18} /></button></div><div className="ai-preview" aria-label={t.previewAria}><div className="ai-preview-header"><span className="ai-bot"><Sparkles size={25} /></span><div><strong>YoshlarMakon AI</strong><span>{t.botSubtitle}</span></div><span className="ai-demo-label">{t.demoLabel}</span></div><div className="sample-user">{t.sampleUser}</div><div className="sample-ai"><Sparkles size={18} /><p>{t.sampleAi}</p></div><div className="ai-suggestion"><span>✦</span> {t.suggestion}</div><button className="ai-faux-input" onClick={() => window.dispatchEvent(new Event("yoshlarmakon:open-ai"))}><span>{t.inputPlaceholder}</span><Send size={19} /></button></div></div></section>;
}
