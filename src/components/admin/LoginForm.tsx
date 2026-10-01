"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "로그인 실패");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md space-y-4 rounded-xl border border-line bg-white p-8 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-line bg-white">
          <Image src="/logo.png" alt="" fill className="object-cover" sizes="40px" />
        </span>
        <div>
          <p className="text-xs text-muted">JW Industrial Tech Services</p>
          <h1 className="font-display text-2xl font-bold text-ink">관리자 로그인</h1>
        </div>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">아이디</span>
        <input name="username" required className="admin-input" autoComplete="username" />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-muted">비밀번호</span>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            className="admin-input pr-16"
            autoComplete="current-password"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-[12px] text-muted hover:text-ink"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="admin-btn w-full">
        {loading ? "확인 중..." : "로그인"}
      </button>
    </form>
  );
}
