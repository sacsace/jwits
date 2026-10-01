export const locales = ["ko", "en", "zh", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ko";

export const localeLabels: Record<Locale, string> = {
  ko: "한국어",
  en: "English",
  zh: "中文",
  ja: "日本語",
};

/** BCP 47 / Open Graph locale tags */
export const localeHtmlLang: Record<Locale, string> = {
  ko: "ko",
  en: "en",
  zh: "zh-CN",
  ja: "ja",
};

export const localeOgLocale: Record<Locale, string> = {
  ko: "ko_KR",
  en: "en_US",
  zh: "zh_CN",
  ja: "ja_JP",
};

export const LOCALE_COOKIE = "jwits_locale";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Prefer OS/browser language via Accept-Language. */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((part) => {
      const [rawTag, rawQ] = part.trim().split(";q=");
      return {
        tag: (rawTag || "").toLowerCase(),
        q: rawQ ? Number(rawQ) : 1,
      };
    })
    .filter((item) => item.tag)
    .sort((a, b) => b.q - a.q);

  for (const { tag } of preferred) {
    if (tag === "ko" || tag.startsWith("ko-")) return "ko";
    if (tag === "en" || tag.startsWith("en-")) return "en";
    if (tag === "ja" || tag.startsWith("ja-")) return "ja";
    if (tag === "zh" || tag.startsWith("zh-")) return "zh";
  }

  return defaultLocale;
}
