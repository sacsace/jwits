import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { ClientDirectoryGrid } from "@/components/ClientDirectoryGrid";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { createLocaleMetadata } from "@/lib/page-meta";
import { readStore } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createLocaleMetadata(params, "/clients", (dict) => ({
    title: dict.clientsPage.title,
    description: dict.clientsPage.description,
  }));
}

export default async function ClientsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const data = await readStore();
  const clients = [...data.clients]
    .filter((c) => c.published)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-paper">
      <PageHero
        title={dict.clientsPage.title}
        description={dict.clientsPage.description}
      />

      <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <p className="mb-4 text-[13px] text-muted">
          <Link href={`/${locale}/about`} className="hover:text-brand">
            {dict.nav.about}
          </Link>
          <span className="mx-2 text-line">/</span>
          <span className="text-ink">{dict.nav.clients}</span>
        </p>

        <div className="rounded-xl border border-line bg-white p-5 shadow-sm md:p-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
            {dict.clientsPage.eyebrow}
          </p>
          <SectionHeading
            title={dict.clientsPage.directoryTitle}
            description={dict.clientsPage.directoryDesc}
          />
          <ClientDirectoryGrid
            clients={clients}
            emptyLabel={dict.clientsPage.emptyLabel}
            noLogoLabel={dict.clientsPage.noLogoLabel}
          />
        </div>
      </section>
    </div>
  );
}
