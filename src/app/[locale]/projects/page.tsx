import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { readStore } from "@/lib/store";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const data = await readStore();

  const projects = data.projects.map((p) => ({
    ...p,
    ...(dict.projects[p.id] ?? {}),
  }));

  return (
    <div className="bg-paper">
      <PageHero
        title={dict.projectsPage.title}
        description={dict.projectsPage.description}
      />

      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading title={dict.projectsPage.portfolioTitle} />
        <ul className="border-t border-line">
          {projects.map((project) => (
            <li
              key={project.id}
              className="grid gap-3 border-b border-line py-7 md:grid-cols-[130px_1fr_160px] md:gap-8"
            >
              <p className="text-sm text-muted">{project.year}</p>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  {project.title}
                </h2>
                <p className="mt-1 text-sm text-ink-soft">{project.client}</p>
                <p className="mt-3 text-[14px] leading-7 text-muted">
                  {project.description}
                </p>
              </div>
              <p className="text-sm text-muted md:text-right">{project.category}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
