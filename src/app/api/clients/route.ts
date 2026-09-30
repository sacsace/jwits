import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { getAdminSession } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { ClientCompany } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  const data = await readStore();
  const clients = [...data.clients]
    .filter((c) => (all ? true : c.published))
    .sort((a, b) => a.order - b.order);
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Omit<ClientCompany, "id">;
  const item: ClientCompany = {
    ...body,
    id: uuid(),
    location: body.location ?? "",
    note: body.note ?? "",
    logoUrl: body.logoUrl ?? "",
  };
  await updateStore((data) => ({
    ...data,
    clients: [...data.clients, item].sort((a, b) => a.order - b.order),
  }));
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = (await request.json()) as ClientCompany;
  await updateStore((data) => ({
    ...data,
    clients: data.clients
      .map((c) => (c.id === item.id ? item : c))
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
    clients: data.clients.filter((c) => c.id !== id),
  }));
  return NextResponse.json({ ok: true });
}
