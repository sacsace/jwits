import { promises as fs } from "fs";
import path from "path";
import { defaultData } from "./default-data";
import { getDataDir } from "./paths";
import type { AppData } from "./types";

const dataDir = getDataDir();
const dataFile = path.join(dataDir, "store.json");

function normalizeStore(raw: Partial<AppData>): AppData {
  return {
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
    news: raw.news ?? defaultData.news,
    projects: raw.projects ?? defaultData.projects,
    inquiries: raw.inquiries ?? defaultData.inquiries,
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
  const normalized = normalizeStore(parsed);

  if (!parsed.greeting || !parsed.team) {
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
