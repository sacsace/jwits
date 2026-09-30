import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { readStore } from "@/lib/store";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const data = await readStore();
  const greeting = data.greeting;
  const team = [...data.team]
    .filter((m) => m.published)
    .sort((a, b) => a.order - b.order);
  const clients = [...data.clients]
    .filter((c) => c.published)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-paper">
      <PageHero title={dict.aboutPage.title} description={dict.company.description} />

      {greeting.published && greeting.message && (
        <section className="bg-surface px-5 py-20">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[220px_1fr] md:items-start">
            <div>
              {greeting.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={greeting.imageUrl}
                  alt={greeting.name}
                  className="mx-auto h-44 w-44 rounded-full object-cover md:mx-0"
                />
              ) : (
                <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full bg-brand text-4xl font-bold text-white md:mx-0">
                  {greeting.name.slice(0, 1) || "J"}
                </div>
              )}
              <div className="mt-5 text-center md:text-left">
                <p className="font-display text-xl font-semibold text-ink">
                  {greeting.name}
                </p>
                <p className="mt-1 text-sm text-muted">{greeting.role}</p>
              </div>
            </div>
            <div>
              <SectionHeading title={greeting.title || dict.aboutPage.greetingTitle} />
              <p className="whitespace-pre-line text-[15px] leading-8 text-muted">
                {greeting.message}
              </p>
            </div>
          </div>
        </section>
      )}

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

      {team.length > 0 && (
        <section className="border-y border-line bg-surface px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={dict.aboutPage.teamTitle}
              description={dict.aboutPage.teamDesc}
            />
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <li key={member.id} className="flex gap-3.5">
                  {member.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                      {member.name.slice(0, 1)}
                    </div>
                  )}
                  <div className="min-w-0 pt-0.5">
                    <p className="font-display text-[15px] font-semibold leading-tight text-ink">
                      {member.name}
                      {member.role.trim() ? (
                        <span className="ml-2 text-[12px] font-medium text-brand">
                          {member.role}
                        </span>
                      ) : null}
                    </p>
                    {member.bio.trim() ? (
                      <p className="mt-1.5 text-[13px] leading-6 text-muted">
                        {member.bio}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {clients.length > 0 && (
        <section className="bg-paper px-5 py-14">
          <div className="mx-auto max-w-6xl">
            <SectionHeading
              title={dict.home.clientsTitle}
              description={dict.home.clientsDesc}
            />
            <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {clients.map((client) => (
                <li
                  key={client.id}
                  className="flex items-baseline justify-between gap-3 border-b border-line py-2.5"
                >
                  <span className="text-[13px] font-medium text-ink">
                    {client.name}
                  </span>
                  {client.location.trim() ? (
                    <span className="shrink-0 text-[11px] text-muted">
                      {client.location}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper px-5 py-20">
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
