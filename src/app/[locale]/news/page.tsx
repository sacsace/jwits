import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { readStore } from "@/lib/store";

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const data = await readStore();

  const published = data.news
    .filter((n) => n.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .map((n) => ({
      ...n,
      ...(dict.news[n.id] ?? {}),
    }));

  return (
    <div className="bg-paper">
      <PageHero title={dict.newsPage.title} />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading title={dict.newsPage.updatesTitle} />
        <div className="border-t border-line">
          {published.map((item) => (
            <article key={item.id} className="border-b border-line py-8">
              <p className="text-sm text-muted">{item.publishedAt}</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                {item.title}
              </h2>
              <p className="mt-2 text-[15px] text-ink-soft">{item.summary}</p>
              <p className="mt-4 max-w-3xl text-[14px] leading-7 text-muted">
                {item.content}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
