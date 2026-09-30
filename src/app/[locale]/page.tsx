import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GhostButton, PrimaryButton, SectionHeading } from "@/components/ui";
import { HeroVideo } from "@/components/HeroVideo";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { readStore } from "@/lib/store";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const data = await readStore();
  const base = `/${locale}`;

  const featured = data.projects
    .filter((p) => p.featured)
    .slice(0, 3)
    .map((p) => ({
      ...p,
      ...(dict.projects[p.id] ?? {}),
    }));

  const latestNews = data.news
    .filter((n) => n.published)
    .slice(0, 3)
    .map((n) => ({
      ...n,
      ...(dict.news[n.id] ?? {}),
    }));

  return (
    <>
      <section className="hero-photo text-white">
        <HeroVideo />
        <div className="hero-photo__shade" />
        <div className="relative mx-auto flex h-full min-h-[100dvh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:justify-center md:pb-24">
          <div className="rise">
            <Image
              src="/logo-horizontal-transparent.png"
              alt={dict.brandName}
              width={420}
              height={56}
              className="h-10 w-auto max-w-[min(88vw,420px)] object-contain object-left brightness-0 invert md:h-12"
              priority
            />
          </div>
          <h1 className="rise-delay mt-8 max-w-2xl whitespace-pre-line font-display text-3xl font-semibold leading-snug md:text-[2.75rem]">
            {dict.hero.headline}
          </h1>
          <p className="rise-delay-2 mt-5 max-w-xl text-[15px] leading-7 text-white/85 md:text-base">
            {dict.hero.subheadline}
          </p>
          <div className="rise-delay-2 mt-9 flex flex-wrap gap-3">
            <PrimaryButton href={`${base}/services`} tone="light">
              {dict.hero.ctaPrimary || "View services"}
            </PrimaryButton>
            <GhostButton href={`${base}/contact`} light>
              {dict.hero.ctaSecondary || "Contact"}
            </GhostButton>
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div>
            <SectionHeading title={dict.home.whyTitle} />
            <p className="text-[15px] leading-7 text-muted">
              {dict.company.description}
            </p>
            <p className="mt-6 text-sm text-ink">
              {dict.home.keyClient} ·{" "}
              <span className="font-semibold">{dict.company.keyClient}</span>
              <span className="mx-2 text-line">|</span>
              {dict.home.founded} {dict.company.founded}
            </p>
          </div>
          <div className="space-y-0 border-t border-line">
            {dict.strengths.map((item) => (
              <article key={item.title} className="border-b border-line py-6">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[14px] leading-7 text-muted">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper px-5 py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            title={dict.home.clientsTitle}
            description={dict.home.clientsDesc}
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dict.clients.map((client) => (
              <li
                key={client.name}
                className="border border-line bg-surface px-5 py-6"
              >
                <p className="font-display text-xl font-semibold text-ink">
                  {client.name}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-muted">
                  {client.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title={dict.home.servicesTitle}
              description={dict.home.servicesDesc}
            />
            <Link
              href={`${base}/services`}
              className="link-underline mb-10 text-sm font-semibold text-brand"
            >
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {dict.services.map((service) => (
              <article key={service.id}>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-[14px] leading-7 text-muted">
                  {service.description}
                </p>
                <p className="mt-4 text-[13px] leading-6 text-ink-soft">
                  {service.items.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title={dict.home.projectsTitle}
              description={dict.home.projectsDesc}
            />
            <Link
              href={`${base}/projects`}
              className="link-underline mb-8 text-sm font-semibold text-brand"
            >
              {dict.home.moreProjects}
            </Link>
          </div>
          <ul className="border-t border-line">
            {featured.map((project) => (
              <li
                key={project.id}
                className="grid gap-2 border-b border-line py-6 md:grid-cols-[140px_1fr_120px] md:items-baseline md:gap-8"
              >
                <p className="text-sm text-muted">{project.client}</p>
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    {project.title}
                  </p>
                  <p className="mt-2 text-[14px] leading-7 text-muted">
                    {project.description}
                  </p>
                </div>
                <p className="text-sm text-muted md:text-right">
                  {project.year}
                  <span className="mx-1.5 text-line">·</span>
                  {project.category}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading title={dict.home.newsTitle} />
          <ul className="border-t border-line">
            {latestNews.map((item) => (
              <li key={item.id} className="border-b border-line">
                <Link
                  href={`${base}/news`}
                  className="flex flex-col gap-2 py-5 transition hover:bg-surface/70 md:flex-row md:items-baseline md:justify-between md:gap-10"
                >
                  <div>
                    <p className="font-display text-[17px] font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[14px] text-muted">{item.summary}</p>
                  </div>
                  <p className="shrink-0 text-sm text-muted">{item.publishedAt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-surface px-5 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
              {dict.home.ctaTitle}
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-muted">
              {dict.home.ctaDesc}
            </p>
          </div>
          <PrimaryButton href={`${base}/contact`}>
            {dict.home.contactCta}
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
