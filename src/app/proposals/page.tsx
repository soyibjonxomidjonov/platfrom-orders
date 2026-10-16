import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ProposalsList } from "@/components/proposals/ProposalsList";
import { getLocale } from "@/i18n/server";
import { commonMessages } from "@/i18n/messages/common";

export async function generateMetadata(): Promise<Metadata> {
  return { title: commonMessages[await getLocale()].proposals.metaTitle };
}
export const dynamic = "force-dynamic";

export default async function ProposalsPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) redirect("/login?callbackUrl=/proposals");
  const locale = await getLocale();
  const t = commonMessages[locale].proposals;

  return (
    <div className="site-container max-w-4xl py-10">
      <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-1 text-muted-foreground">{t.subtitle}</p>
      <div className="mt-8">
        <ProposalsList userId={userId} locale={locale} />
      </div>
    </div>
  );
}
