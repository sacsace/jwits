"use client";

import { useMemo, useState } from "react";
import type { ProjectItem } from "@/lib/types";

type Props = {
  projects: ProjectItem[];
  searchPlaceholder: string;
  emptyLabel: string;
  resultLabelTemplate: string;
};

function matches(project: ProjectItem, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    project.year,
    project.month,
    project.place,
    project.relatedAuto,
    project.customer,
    project.workType,
    project.manufacturing,
    project.workDetail,
    project.projectName,
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export function ProjectsTable({
  projects,
  searchPlaceholder,
  emptyLabel,
  resultLabelTemplate,
}: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => projects.filter((p) => matches(p, query)),
    [projects, query]
  );

  const resultLabel = resultLabelTemplate
    .replace("{filtered}", String(filtered.length))
    .replace("{total}", String(projects.length));

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full border border-line bg-white px-3 py-2 text-[13px] text-ink outline-none placeholder:text-muted focus:border-brand sm:max-w-md"
          aria-label={searchPlaceholder}
        />
        <p className="text-[12px] text-muted">
          {resultLabel}
        </p>
      </div>

      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[1280px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="bg-[#1f3554] text-white">
              {[
                "YYYY",
                "MM",
                "PLACE",
                "Related Auto",
                "Customer",
                "Work Type",
                "Manufacturing",
                "Detail",
                "Project Name",
              ].map((label) => (
                <th
                  key={label}
                  className="whitespace-nowrap px-2.5 py-2.5 font-semibold"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="bg-white px-2.5 py-8 text-center text-muted"
                >
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              filtered.map((project, i) => (
                <tr
                  key={project.id}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#eef4fb]"}
                >
                  <td className="whitespace-nowrap px-2.5 py-2 text-ink">
                    {project.year}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-2 text-ink">
                    {project.month}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-2 text-ink">
                    {project.place}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-2 text-ink">
                    {project.relatedAuto}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-2 text-ink">
                    {project.customer || "—"}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-2 text-ink">
                    {project.workType || "—"}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-2 text-ink">
                    {project.manufacturing}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-2 text-ink">
                    {project.workDetail || "—"}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-2 font-medium text-ink">
                    {project.projectName}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
