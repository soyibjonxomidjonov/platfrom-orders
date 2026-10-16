import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { consumeTicket } from "@/lib/otp";

/**
 * Auth.js (NextAuth v5) — Google orqali kirish.
 * Foydalanuvchi va akkauntlar PostgreSQL'ga (Prisma adapter) saqlanadi,
 * sessiya esa JWT orqali (tez, har so'rovda DB'ga murojaat qilmaydi).
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    /**
     * Email + 6 xonali kod. Kodning o'zi verifyEmailCode() da tekshiriladi;
     * bu yerga faqat bir martalik, 2 daqiqalik "ticket" keladi.
     */
    Credentials({
      id: "email-code",
      name: "Email code",
      credentials: { email: {}, ticket: {} },
      async authorize(creds) {
        const email = typeof creds?.email === "string" ? creds.email.trim().toLowerCase() : "";
        const ticket = typeof creds?.ticket === "string" ? creds.ticket : "";
        if (!email || !ticket) return null;
        if (!(await consumeTicket(email, ticket))) return null;

        const user = await prisma.user.upsert({
          where: { email },
          update: { emailVerified: new Date() },
          create: { email, name: email.split("@")[0], emailVerified: new Date() },
        });
        return { id: user.id, email: user.email, name: user.name, image: user.image };
      },
    }),
  ],
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) token.sub = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.sub && session.user) session.user.id = token.sub;
      return session;
    },
  },
});

/** Taklif yuborish uchun login majburiymi (.env: REQUIRE_LOGIN_FOR_PROPOSALS). */
export function proposalsRequireLogin(): boolean {
  return process.env.REQUIRE_LOGIN_FOR_PROPOSALS !== "false";
}

/** Xavfsiz ichki qaytish manzili (open-redirect'dan himoya). */
export function safeCallbackUrl(url: string | undefined | null, fallback = "/dashboard"): string {
  if (!url || !url.startsWith("/") || url.startsWith("//")) return fallback;
  return url;
}
