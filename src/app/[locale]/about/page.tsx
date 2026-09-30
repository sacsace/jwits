import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export default async function AboutPage({
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
      <PageHero title={dict.aboutPage.title} description={dict.company.description} />

      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-2">
        <div>
          <SectionHeading title={dict.aboutPage.mission} />
          <p className="text-[15px] leading-7 text-muted">
            {dict.aboutPage.missionBody}
          </p>
        </div>
        <div>
          <SectionHeading title={dict.aboutPage.vision} />
          <p className="text-[15px] leading-7 text-muted">
            {dict.aboutPage.visionBody}
          </p>
        </div>
      </section>

      <section className="bg-surface px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title={dict.aboutPage.strengthsTitle}
            description={dict.aboutPage.strengthsDesc}
          />
          <div className="border-t border-line">
            {dict.strengths.map((item) => (
              <article key={item.title} className="border-b border-line py-7">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-3xl text-[14px] leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={dict.aboutPage.profileTitle} />
          <dl className="border-t border-line">
            {[
              [dict.aboutPage.labels.company, dict.brandName],
              [dict.aboutPage.labels.founded, dict.company.founded],
              [dict.aboutPage.labels.keyClient, dict.company.keyClient],
              [dict.aboutPage.labels.address, dict.company.address],
              [dict.aboutPage.labels.phone, dict.company.phone],
              [dict.aboutPage.labels.email, dict.company.email],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[140px_1fr] sm:gap-6"
              >
                <dt className="text-sm font-semibold text-ink">{label}</dt>
                <dd className="text-[15px] text-muted">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
