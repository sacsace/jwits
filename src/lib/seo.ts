import type { Metadata } from "next";
import {
  defaultLocale,
  localeHtmlLang,
  localeOgLocale,
  locales,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.RAILWAY_PUBLIC_DOMAIN) {
    return `https://${process.env.RAILWAY_PUBLIC_DOMAIN.replace(/\/$/, "")}`;
  }
  return "https://www.jwits.in";
}

/** pathWithoutLocale: "" | "/about" | "/projects" ... */
export function localizedPath(locale: Locale, pathWithoutLocale = "") {
  const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  return `/${locale}${suffix}`;
}

export function buildLanguageAlternates(pathWithoutLocale = "") {
  const base = getSiteUrl();
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    const hrefLang = localeHtmlLang[locale];
    languages[hrefLang] = `${base}${localizedPath(locale, pathWithoutLocale)}`;
  }
  languages["x-default"] = `${base}${localizedPath(
    defaultLocale,
    pathWithoutLocale
  )}`;

  return languages;
}

export function buildPageMetadata({
  locale,
  pathWithoutLocale = "",
  title,
  description,
}: {
  locale: Locale;
  pathWithoutLocale?: string;
  title?: string;
  description?: string;
}): Metadata {
  const dict = getDictionary(locale);
  const site = getSiteUrl();
  const path = localizedPath(locale, pathWithoutLocale);
  const url = `${site}${path}`;
  const pageTitle = title || dict.brandName;
  const pageDescription = description || dict.company.description;

  return {
    title: title ? title : { absolute: dict.brandName },
    description: pageDescription,
    metadataBase: new URL(site),
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(pathWithoutLocale),
    },
    openGraph: {
      type: "website",
      url,
      siteName: dict.brandName,
      title: pageTitle,
      description: pageDescription,
      locale: localeOgLocale[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => localeOgLocale[l]),
      images: [
        {
          url: `${site}/logo.png`,
          width: 512,
          height: 512,
          alt: dict.brandName,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description: pageDescription,
      images: [`${site}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function organizationJsonLd(locale: Locale) {
  const dict = getDictionary(locale);
  const site = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: dict.brandName,
    url: site,
    logo: `${site}/logo.png`,
    email: dict.company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: dict.company.address,
      addressCountry: "IN",
    },
    sameAs: ["https://www.msventures.in"],
  };
}
