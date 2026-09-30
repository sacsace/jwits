import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { getAdminSession } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { NewsItem } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "1";
  const data = await readStore();
  const news = all
    ? data.news
    : data.news.filter((n) => n.published).sort((a, b) =>
        b.publishedAt.localeCompare(a.publishedAt)
      );
  return NextResponse.json(news);
}

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Omit<NewsItem, "id">;
  const item: NewsItem = { ...body, id: uuid() };
  await updateStore((data) => ({ ...data, news: [item, ...data.news] }));
  return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const item = (await request.json()) as NewsItem;
  await updateStore((data) => ({
    ...data,
    news: data.news.map((n) => (n.id === item.id ? item : n)),
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
    news: data.news.filter((n) => n.id !== id),
  }));
  return NextResponse.json({ ok: true });
}
