import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { createLocaleMetadata } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createLocaleMetadata(params, "/contact", (dict) => ({
    title: dict.contactPage.title,
    description: dict.contactPage.description,
  }));
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="bg-paper">
      <PageHero
        title={dict.contactPage.title}
        description={dict.contactPage.description}
      />
      <ContactForm dict={dict} />
    </div>
  );
}
