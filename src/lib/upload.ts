import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { getUploadsDir } from "./paths";

const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

const MAX_BYTES = 5 * 1024 * 1024;

export async function ensureUploadsDir() {
  await fs.mkdir(getUploadsDir(), { recursive: true });
}

export function isAllowedImageType(type: string) {
  return ALLOWED.has(type);
}

export async function saveUploadedImage(file: File) {
  if (!isAllowedImageType(file.type)) {
    throw new Error("jpg, png, webp, gif만 업로드할 수 있습니다.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("파일 크기는 5MB 이하여야 합니다.");
  }

  await ensureUploadsDir();
  const ext = EXT[file.type] || ".bin";
  const name = `${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
  const target = path.join(getUploadsDir(), name);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(target, buffer);

  return {
    filename: name,
    url: `/uploads/${name}`,
    size: buffer.length,
    type: file.type,
  };
}

export function resolveUploadPath(filename: string) {
  const safe = path.basename(filename);
  if (safe !== filename || safe.includes("..")) {
    return null;
  }
  return path.join(getUploadsDir(), safe);
}
