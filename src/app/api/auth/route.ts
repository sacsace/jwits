import { NextResponse } from "next/server";
import {
  createAdminToken,
  setAuthCookie,
  clearAuthCookie,
  validateCredentials,
  getAdminSession,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password, action } = body as {
    username?: string;
    password?: string;
    action?: string;
  };

  if (action === "logout") {
    await clearAuthCookie();
    return NextResponse.json({ ok: true });
  }

  if (
    !username ||
    !password ||
    !(await validateCredentials(username, password))
  ) {
    return NextResponse.json(
      { error: "아이디 또는 비밀번호가 올바르지 않습니다." },
      { status: 401 }
    );
  }

  const token = await createAdminToken(username);
  await setAuthCookie(token);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, username: session.username });
}
