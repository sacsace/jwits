import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import { resolveUploadPath } from "@/lib/upload";

export const runtime = "nodejs";

const TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ filename: string }> }
) {
  const { filename } = await context.params;
  const filePath = resolveUploadPath(filename);
  if (!filePath) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const data = await fs.readFile(filePath);
    const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
    const contentType = TYPES[ext] || "application/octet-stream";
    return new NextResponse(data, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
