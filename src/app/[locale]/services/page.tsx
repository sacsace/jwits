import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { createLocaleMetadata } from "@/lib/page-meta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createLocaleMetadata(params, "/services", (dict) => ({
    title: dict.servicesPage.title,
    description: dict.servicesPage.description,
  }));
}

export default async function ServicesPage({
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
        title={dict.servicesPage.title}
        description={dict.servicesPage.description}
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          title={dict.servicesPage.coreTitle}
          description={dict.servicesPage.coreDesc}
        />
        <div className="border-t border-line">
          {dict.services.map((service) => (
            <article
              key={service.id}
              className="grid gap-4 border-b border-line py-10 md:grid-cols-[220px_1fr] md:gap-10"
            >
              <h2 className="font-display text-2xl font-semibold text-ink">
                {service.title}
              </h2>
              <div>
                <p className="text-[15px] leading-7 text-muted">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.items.map((item) => (
                    <li key={item} className="text-[14px] text-ink-soft">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
