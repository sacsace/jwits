import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { HtmlLang } from "@/components/HtmlLang";
import { getDictionary } from "@/i18n/dictionaries";
import {
  isLocale,
  localeHtmlLang,
  locales,
  type Locale,
} from "@/i18n/config";
import { buildPageMetadata, organizationJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return buildPageMetadata({ locale: raw });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const jsonLd = organizationJsonLd(locale);

  return (
    <>
      <HtmlLang locale={localeHtmlLang[locale]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader locale={locale} dict={dict} />
      <main>{children}</main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
