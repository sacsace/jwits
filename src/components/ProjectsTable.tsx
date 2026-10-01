"use client";

import { useMemo, useState } from "react";
import type { ProjectItem } from "@/lib/types";

type Props = {
  projects: ProjectItem[];
  searchPlaceholder: string;
  emptyLabel: string;
  resultLabelTemplate: string;
};

type SortKey =
  | "year"
  | "month"
  | "place"
  | "relatedAuto"
  | "customer"
  | "workType"
  | "manufacturing"
  | "workDetail"
  | "projectName";

type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "year", label: "YYYY" },
  { key: "month", label: "MM" },
  { key: "place", label: "PLACE" },
  { key: "relatedAuto", label: "Related Auto" },
  { key: "customer", label: "Customer" },
  { key: "workType", label: "Work Type" },
  { key: "manufacturing", label: "Manufacturing" },
  { key: "workDetail", label: "Detail" },
  { key: "projectName", label: "Project Name" },
];

const MONTH_INDEX: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
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

function monthStart(value: string) {
  const token = value
    .trim()
    .toLowerCase()
    .split(/[~–—\-\/]/)[0]
    ?.replace(/[^a-z]/g, "");
  return token ? MONTH_INDEX[token] ?? 0 : 0;
}

function compareText(a: string, b: string) {
  return a.localeCompare(b, undefined, { sensitivity: "base", numeric: true });
}

function compareProjects(a: ProjectItem, b: ProjectItem, key: SortKey) {
  if (key === "year") {
    const yearDiff = Number(a.year || 0) - Number(b.year || 0);
    if (yearDiff !== 0) return yearDiff;
    return monthStart(a.month) - monthStart(b.month);
  }
  if (key === "month") {
    const monthDiff = monthStart(a.month) - monthStart(b.month);
    if (monthDiff !== 0) return monthDiff;
    return Number(a.year || 0) - Number(b.year || 0);
  }

  const left = a[key] || "";
  const right = b[key] || "";
  const textDiff = compareText(left, right);
  if (textDiff !== 0) return textDiff;

  const yearDiff = Number(a.year || 0) - Number(b.year || 0);
  if (yearDiff !== 0) return yearDiff;
  return monthStart(a.month) - monthStart(b.month);
}

export function ProjectsTable({
  projects,
  searchPlaceholder,
  emptyLabel,
  resultLabelTemplate,
}: Props) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("year");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function onSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(key === "year" || key === "month" ? "desc" : "asc");
  }

  const rows = useMemo(() => {
    const filtered = projects.filter((p) => matches(p, query));
    const sorted = [...filtered].sort((a, b) => {
      const diff = compareProjects(a, b, sortKey);
      return sortDir === "asc" ? diff : -diff;
    });
    return sorted;
  }, [projects, query, sortKey, sortDir]);

  const resultLabel = resultLabelTemplate
    .replace("{filtered}", String(rows.length))
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
          suppressHydrationWarning
        />
        <p className="text-[12px] text-muted">{resultLabel}</p>
      </div>

      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[1280px] border-collapse text-left text-[12px]">
          <thead>
            <tr className="bg-[#1f3554] text-white">
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                const indicator = active ? (sortDir === "asc" ? " ▲" : " ▼") : "";
                return (
                  <th key={col.key} className="whitespace-nowrap p-0 font-semibold">
                    <button
                      type="button"
                      onClick={() => onSort(col.key)}
                      className="flex w-full items-center gap-1 px-2.5 py-2.5 text-left hover:bg-white/10"
                      aria-sort={
                        active
                          ? sortDir === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                      }
                    >
                      <span>{col.label}</span>
                      <span className="text-[10px] opacity-80" aria-hidden>
                        {indicator || " ↕"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="bg-white px-2.5 py-8 text-center text-muted"
                >
                  {emptyLabel}
                </td>
              </tr>
            ) : (
              rows.map((project, i) => (
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
