import { notFound } from "next/navigation";
import { PageHero, SectionHeading } from "@/components/ui";
import { ProjectsTable } from "@/components/ProjectsTable";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { createLocaleMetadata } from "@/lib/page-meta";
import { readStore } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createLocaleMetadata(params, "/projects", (dict) => ({
    title: dict.projectsPage.title,
    description: dict.projectsPage.description,
  }));
}

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

  const projects = [...data.projects]
    .filter((p) => p.published)
    .sort((a, b) => {
      const y = Number(b.year) - Number(a.year);
      if (y !== 0) return y;
      return a.month.localeCompare(b.month);
    });

  return (
    <div className="bg-paper">
      <PageHero
        title={dict.projectsPage.title}
        description={dict.projectsPage.description}
      />

      <section className="mx-auto max-w-6xl px-5 py-14">
        <SectionHeading title={dict.projectsPage.portfolioTitle} />
        <ProjectsTable
          projects={projects}
          searchPlaceholder={dict.projectsPage.searchPlaceholder}
          emptyLabel={dict.projectsPage.emptyLabel}
          resultLabelTemplate={dict.projectsPage.resultLabel}
        />
      </section>
    </div>
  );
}
