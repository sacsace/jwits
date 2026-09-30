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
        <div className="overflow-x-auto border border-line">
          <table className="min-w-[960px] w-full border-collapse text-left text-[12px]">
            <thead>
              <tr className="bg-[#1f3554] text-white">
                <th className="px-2.5 py-2.5 font-semibold">YYYY</th>
                <th className="px-2.5 py-2.5 font-semibold">MM</th>
                <th className="px-2.5 py-2.5 font-semibold">PLACE</th>
                <th className="px-2.5 py-2.5 font-semibold">Related Auto</th>
                <th className="px-2.5 py-2.5 font-semibold">Customer</th>
                <th className="px-2.5 py-2.5 font-semibold">Work Type</th>
                <th className="px-2.5 py-2.5 font-semibold">Manufacturing</th>
                <th className="px-2.5 py-2.5 font-semibold">Detail</th>
                <th className="px-2.5 py-2.5 font-semibold">Project Name</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr
                  key={project.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#eef4fb]"}
                >
                  <td className="px-2.5 py-2 align-top text-ink">{project.year}</td>
                  <td className="px-2.5 py-2 align-top text-ink">{project.month}</td>
                  <td className="px-2.5 py-2 align-top text-ink">{project.place}</td>
                  <td className="px-2.5 py-2 align-top text-ink">
                    {project.relatedAuto}
                  </td>
                  <td className="px-2.5 py-2 align-top text-ink">
                    {project.customer || "—"}
                  </td>
                  <td className="px-2.5 py-2 align-top text-ink">
                    {project.workType || "—"}
                  </td>
                  <td className="px-2.5 py-2 align-top text-ink">
                    {project.manufacturing}
                  </td>
                  <td className="px-2.5 py-2 align-top text-ink">
                    {project.workDetail || "—"}
                  </td>
                  <td className="px-2.5 py-2 align-top font-medium text-ink">
                    {project.projectName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
