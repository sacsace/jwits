import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { getAdminSession } from "@/lib/auth";
import { readStore, updateStore } from "@/lib/store";
import type { InquiryItem } from "@/lib/types";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await readStore();
  return NextResponse.json(
    [...data.inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, company, email, phone, message } = body as {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "이름, 이메일, 문의 내용은 필수입니다." },
      { status: 400 }
    );
  }

  const item: InquiryItem = {
    id: uuid(),
    name,
    company: company || "",
    email,
    phone: phone || "",
    message,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  await updateStore((data) => ({
    ...data,
    inquiries: [item, ...data.inquiries],
  }));

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, status } = (await request.json()) as {
    id: string;
    status: InquiryItem["status"];
  };

  await updateStore((data) => ({
    ...data,
    inquiries: data.inquiries.map((i) =>
      i.id === id ? { ...i, status } : i
    ),
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
    inquiries: data.inquiries.filter((i) => i.id !== id),
  }));

  return NextResponse.json({ ok: true });
}
