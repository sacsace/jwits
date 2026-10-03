import { promises as fs } from "fs";
import path from "path";
import { defaultData } from "./default-data";
import { getDataDir } from "./paths";
import { toNameCase } from "./text";
import type { AppData, ClientCompany, ProjectItem } from "./types";

const dataDir = getDataDir();
const dataFile = path.join(dataDir, "store.json");

function isNewProjectSchema(projects: unknown): projects is ProjectItem[] {
  if (!Array.isArray(projects) || projects.length === 0) return false;
  const first = projects[0] as Record<string, unknown>;
  return typeof first.projectName === "string";
}

function normalizeClients(clients: ClientCompany[]): {
  clients: ClientCompany[];
  changed: boolean;
} {
  let changed = false;
  const next = clients.map((client) => {
    const name = toNameCase(client.name || "");
    if (name !== client.name) changed = true;
    return { ...client, name };
  });
  return { clients: next, changed };
}

function normalizeProject(project: ProjectItem): ProjectItem {
  return {
    ...project,
    month: toNameCase(project.month || ""),
    place: toNameCase(project.place || ""),
    relatedAuto: toNameCase(project.relatedAuto || ""),
    customer: toNameCase(project.customer || ""),
    workType: toNameCase(project.workType || ""),
    manufacturing: toNameCase(project.manufacturing || ""),
    workDetail: toNameCase(project.workDetail || ""),
    projectName: toNameCase(project.projectName || ""),
  };
}

function normalizeProjects(projects: ProjectItem[]): {
  projects: ProjectItem[];
  changed: boolean;
} {
  let changed = false;
  const next = projects.map((project) => {
    const normalized = normalizeProject(project);
    if (
      normalized.month !== project.month ||
      normalized.place !== project.place ||
      normalized.relatedAuto !== project.relatedAuto ||
      normalized.customer !== project.customer ||
      normalized.workType !== project.workType ||
      normalized.manufacturing !== project.manufacturing ||
      normalized.workDetail !== project.workDetail ||
      normalized.projectName !== project.projectName
    ) {
      changed = true;
    }
    return normalized;
  });
  return { projects: next, changed };
}

function normalizeStore(raw: Partial<AppData>): {
  data: AppData;
  clientsChanged: boolean;
  projectsChanged: boolean;
  companyChanged: boolean;
} {
  const baseProjects = isNewProjectSchema(raw.projects)
    ? raw.projects
    : defaultData.projects;

  const { clients, changed: clientsChanged } = normalizeClients(
    raw.clients ?? defaultData.clients
  );
  const { projects, changed: projectsChanged } = normalizeProjects(baseProjects);

  const storedEmail = raw.content?.company?.email;
  const companyChanged = storedEmail === "lee@jwits.co.kr";
  const company = {
    ...defaultData.content.company,
    ...(raw.content?.company ?? {}),
    ...(companyChanged ? { email: "lee@jwits.in" } : {}),
  };

  return {
    clientsChanged,
    projectsChanged,
    companyChanged,
    data: {
      ...defaultData,
      ...raw,
      content: {
        ...defaultData.content,
        ...(raw.content ?? {}),
        company,
        hero: {
          ...defaultData.content.hero,
          ...(raw.content?.hero ?? {}),
        },
        about: {
          ...defaultData.content.about,
          ...(raw.content?.about ?? {}),
        },
        services: raw.content?.services ?? defaultData.content.services,
      },
      greeting: {
        ...defaultData.greeting,
        ...(raw.greeting ?? {}),
      },
      team: raw.team ?? defaultData.team,
      clients,
      gallery: raw.gallery ?? defaultData.gallery,
      news: raw.news ?? defaultData.news,
      projects,
      inquiries: raw.inquiries ?? defaultData.inquiries,
    },
  };
}

async function ensureStore(): Promise<void> {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(defaultData, null, 2), "utf-8");
  }
}

export async function readStore(): Promise<AppData> {
  await ensureStore();
  const raw = await fs.readFile(dataFile, "utf-8");
  const parsed = JSON.parse(raw) as Partial<AppData>;
  const { data: normalized, clientsChanged, projectsChanged, companyChanged } =
    normalizeStore(parsed);

  if (
    !parsed.greeting ||
    !parsed.team ||
    !parsed.clients ||
    !parsed.gallery ||
    !isNewProjectSchema(parsed.projects) ||
    clientsChanged ||
    projectsChanged ||
    companyChanged
  ) {
    await writeStore(normalized);
  }

  return normalized;
}

export async function writeStore(data: AppData): Promise<void> {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

export async function updateStore(
  updater: (data: AppData) => AppData
): Promise<AppData> {
  const current = await readStore();
  const next = updater(current);
  await writeStore(next);
  return next;
}
