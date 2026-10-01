import { promises as fs } from "fs";
import path from "path";
import { randomBytes } from "crypto";
import { getUploadsDir } from "./paths";

const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const VIDEO_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

const EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov",
};

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_VIDEO_BYTES = 80 * 1024 * 1024;

export async function ensureUploadsDir() {
  await fs.mkdir(getUploadsDir(), { recursive: true });
}

export function isAllowedImageType(type: string) {
  return IMAGE_TYPES.has(type);
}

export function isAllowedVideoType(type: string) {
  return VIDEO_TYPES.has(type);
}

async function saveFile(file: File, ext: string) {
  await ensureUploadsDir();
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

export async function saveUploadedImage(file: File) {
  if (!isAllowedImageType(file.type)) {
    throw new Error("jpg, png, webp, gif만 업로드할 수 있습니다.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("이미지 파일은 5MB 이하여야 합니다.");
  }
  return saveFile(file, EXT[file.type] || ".bin");
}

/** Image or video for gallery. */
export async function saveUploadedMedia(file: File) {
  if (isAllowedImageType(file.type)) {
    return saveUploadedImage(file);
  }
  if (isAllowedVideoType(file.type)) {
    if (file.size > MAX_VIDEO_BYTES) {
      throw new Error("동영상 파일은 80MB 이하여야 합니다.");
    }
    return saveFile(file, EXT[file.type] || ".mp4");
  }
  throw new Error("jpg, png, webp, gif, mp4, webm, mov만 업로드할 수 있습니다.");
}

export function resolveUploadPath(filename: string) {
  const safe = path.basename(filename);
  if (safe !== filename || safe.includes("..")) {
    return null;
  }
  return path.join(getUploadsDir(), safe);
}
