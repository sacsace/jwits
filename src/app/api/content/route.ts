import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { SiteContent } from "@/lib/types";

export async function GET() {
  const data = await readStore();
  return NextResponse.json(data.content);
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const content = (await request.json()) as SiteContent;
  await updateStore((data) => ({ ...data, content }));
  return NextResponse.json({ ok: true });
}
