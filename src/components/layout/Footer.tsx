import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLogo } from "@/components/illustrations";
import { getLocale } from "@/i18n/server";
import { commonMessages } from "@/i18n/messages/common";

export async function Footer() {
  const t = commonMessages[await getLocale()].footer;
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-top">
          <div>
            <Link href="/" className="footer-brand">
              <BrandLogo className="h-9 w-9" />
              YoshlarMakon<span className="brand-dot">.</span>
            </Link>
            <p>
              {t.tagline1}
              <br />
              {t.tagline2}
            </p>
          </div>
          <div className="footer-links">
            <span>{t.platform}</span>
            <Link href="/orders">{t.orders}</Link>
            <Link href="/#yonalishlar">{t.directions}</Link>
            <Link href="/#qanday-ishlaydi">{t.how}</Link>
          </div>
          <div className="footer-links">
            <span>{t.forYou}</span>
            <Link href="/proposals">{t.myProposals}</Link>
            <Link href="/dashboard">{t.saved}</Link>
            <Link href="/#ai-yordamchi">
              {t.ai} <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} YoshlarMakon</span>
          <span>
            {t.bottom} <span className="brand-dot">✳</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
