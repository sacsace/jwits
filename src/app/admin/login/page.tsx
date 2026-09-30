import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "관리자 로그인",
};

export default function AdminLoginPage() {
  return (
    <div className="admin-shell flex min-h-screen items-center justify-center px-5">
      <LoginForm />
    </div>
  );
}
