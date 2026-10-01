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

function normalizeStore(raw: Partial<AppData>): {
  data: AppData;
  clientsChanged: boolean;
} {
  const projects = isNewProjectSchema(raw.projects)
    ? raw.projects
    : defaultData.projects;

  const { clients, changed: clientsChanged } = normalizeClients(
    raw.clients ?? defaultData.clients
  );

  return {
    clientsChanged,
    data: {
      ...defaultData,
      ...raw,
      content: {
        ...defaultData.content,
        ...(raw.content ?? {}),
        company: {
          ...defaultData.content.company,
          ...(raw.content?.company ?? {}),
        },
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
  const { data: normalized, clientsChanged } = normalizeStore(parsed);

  if (
    !parsed.greeting ||
    !parsed.team ||
    !parsed.clients ||
    !isNewProjectSchema(parsed.projects) ||
    clientsChanged
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
