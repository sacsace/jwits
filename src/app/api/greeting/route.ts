import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { GreetingContent } from "@/lib/types";

export async function GET() {
  const data = await readStore();
  return NextResponse.json(data.greeting);
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const greeting = (await request.json()) as GreetingContent;
  await updateStore((data) => ({ ...data, greeting }));
  return NextResponse.json({ ok: true });
}
