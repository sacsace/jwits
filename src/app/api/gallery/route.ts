import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { getAdminSession } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { GalleryItem } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  const data = await readStore();
  const gallery = [...data.gallery]
    .filter((item) => (all ? true : item.published))
    .sort((a, b) => a.order - b.order);
  return NextResponse.json(gallery);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Omit<GalleryItem, "id">;
  const item: GalleryItem = {
    ...body,
    id: uuid(),
    title: body.title ?? "",
    description: body.description ?? "",
    imageUrl: body.imageUrl ?? "",
    order: Number(body.order) || 1,
    published: Boolean(body.published),
  };

  await updateStore((data) => ({
    ...data,
    gallery: [...data.gallery, item].sort((a, b) => a.order - b.order),
  }));
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = (await request.json()) as GalleryItem;
  await updateStore((data) => ({
    ...data,
    gallery: data.gallery
      .map((g) => (g.id === item.id ? item : g))
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
    gallery: data.gallery.filter((g) => g.id !== id),
  }));
  return NextResponse.json({ ok: true });
}
