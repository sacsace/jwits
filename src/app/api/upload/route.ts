import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { saveUploadedImage, saveUploadedMedia } from "@/lib/upload";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  const scope = String(form.get("scope") || "image");

  try {
    const saved =
      scope === "media"
        ? await saveUploadedMedia(file)
        : await saveUploadedImage(file);
    return NextResponse.json(saved, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "업로드 실패";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
