import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/details.css";
import "@/styles/night-buttons.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/ai/AIAssistant";
import { auth } from "@/lib/auth";
import { getLocale } from "@/i18n/server";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { commonMessages } from "@/i18n/messages/common";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = commonMessages[await getLocale()];
  return { title: meta.title, description: meta.description };
}

// Flashsiz tema: sahifa chizilishidan oldin data-theme o'rnatiladi.
const themeScript = `(function(){try{var t=localStorage.getItem('yoshlarmakon:theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [session, locale] = await Promise.all([auth(), getLocale()]);
  const isAuthed = Boolean(session?.user?.id);
  return (
    <html
      lang={locale}
      translate="no"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Saytning o'z uz/ru/en tarjimasi bor — brauzer avto-tarjimasi matnni buzmasin */}
        <meta name="google" content="notranslate" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider locale={locale}>
        <Providers>
          <Navbar isAuthed={isAuthed} />
          <main className="flex-1">{children}</main>
          <Footer />
          <AIAssistant />
        </Providers>
        </LocaleProvider>
      </body>
    </html>
  );
}
