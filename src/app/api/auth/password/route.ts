import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { changeAdminPassword } from "@/lib/credentials";

export async function PUT(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { currentPassword, newPassword, confirmPassword } = body as {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };

  if (!currentPassword || !newPassword || !confirmPassword) {
    return NextResponse.json(
      { error: "모든 항목을 입력해 주세요." },
      { status: 400 }
    );
  }

  if (newPassword !== confirmPassword) {
    return NextResponse.json(
      { error: "새 비밀번호 확인이 일치하지 않습니다." },
      { status: 400 }
    );
  }

  const result = await changeAdminPassword({ currentPassword, newPassword });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
