"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      className="w-full max-w-md space-y-4 border border-white/10 bg-white/5 p-8"
    >
      <div>
        <p className="text-xs text-white/50">JW Industrial Tech Services</p>
        <h1 className="mt-2 font-display text-3xl font-bold">관리자 로그인</h1>
      </div>
      <label className="block text-sm">
        <span className="mb-1.5 block text-white/60">아이디</span>
        <input name="username" required className="admin-input" autoComplete="username" />
      </label>
      <label className="block text-sm">
        <span className="mb-1.5 block text-white/60">비밀번호</span>
        <input
          name="password"
          type="password"
          required
          className="admin-input"
          autoComplete="current-password"
        />
      </label>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" disabled={loading} className="admin-btn w-full">
        {loading ? "확인 중..." : "로그인"}
      </button>
    </form>
  );
}
