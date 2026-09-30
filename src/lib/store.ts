import { promises as fs } from "fs";
import path from "path";
import { defaultData } from "./default-data";
import type { AppData } from "./types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "store.json");

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
  return JSON.parse(raw) as AppData;
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
