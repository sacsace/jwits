import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo";

export async function createLocaleMetadata(
  params: Promise<{ locale: string }>,
  pathWithoutLocale: string,
  pick: (dict: ReturnType<typeof getDictionary>) => {
    title: string;
    description: string;
  }
): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const { title, description } = pick(dict);
  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title,
    description,
  });
}
