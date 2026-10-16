import { cookies, headers } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";

/**
 * Joriy til (server): avval cookie, keyin brauzer Accept-Language, so'ng "uz".
 * Server komponentlar va server action'larda ishlatiladi.
 */
export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const fromCookie = jar.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (await headers()).get("accept-language")?.toLowerCase() ?? "";
  if (accept.startsWith("ru")) return "ru";
  if (accept.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}
