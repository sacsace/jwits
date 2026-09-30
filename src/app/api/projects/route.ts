import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { getAdminSession } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { ProjectItem } from "@/lib/types";

export async function GET() {
  const data = await readStore();
  return NextResponse.json(data.projects);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Omit<ProjectItem, "id">;
  const item: ProjectItem = { ...body, id: uuid() };
  await updateStore((data) => ({
    ...data,
    projects: [item, ...data.projects],
  }));
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = (await request.json()) as ProjectItem;
  await updateStore((data) => ({
    ...data,
    projects: data.projects.map((p) => (p.id === item.id ? item : p)),
  }));
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await updateStore((data) => ({
    ...data,
    projects: data.projects.filter((p) => p.id !== id),
  }));
  return NextResponse.json({ ok: true });
}
