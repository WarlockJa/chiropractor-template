"use server";

import { cookies, headers } from "next/headers";
import { Locale, defaultLocale, locales } from "@/i18n/config";
import languageParser from "accept-language-parser";

// In this function the locale is first read from a cookie.
// if no cookie set, or found locale does not exist in locales
// reading accept-language header to identify preferred locale
// if accept-language data undefined falling back to defaultLangauge
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const lngCookie = cookies().get(COOKIE_NAME)?.value;
  const acceptLanguage = headers().get("accept-language");

  // @ts-ignore includes does not like narrowing parameter string to literal values
  return lngCookie && locales.includes(lngCookie)
    ? lngCookie
    : (languageParser.pick(
        // @ts-ignore pick does not like narrowing parameter string to literal values
        locales,
        acceptLanguage,
      ) ?? defaultLocale);
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}
