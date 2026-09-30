import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { getAdminSession } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { TeamMember } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  const data = await readStore();
  const team = [...data.team]
    .filter((m) => (all ? true : m.published))
    .sort((a, b) => a.order - b.order);
  return NextResponse.json(team);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Omit<TeamMember, "id">;
  const item: TeamMember = { ...body, id: uuid() };
  await updateStore((data) => ({
    ...data,
    team: [...data.team, item].sort((a, b) => a.order - b.order),
  }));
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = (await request.json()) as TeamMember;
  await updateStore((data) => ({
    ...data,
    team: data.team
      .map((m) => (m.id === item.id ? item : m))
      .sort((a, b) => a.order - b.order),
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
    team: data.team.filter((m) => m.id !== id),
  }));
  return NextResponse.json({ ok: true });
}
