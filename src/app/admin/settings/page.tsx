"use client";

import { FormEvent, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";

export default function AdminSettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const res = await fetch("/api/auth/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
    });

    const data = await res.json();
    setSaving(false);

    if (!res.ok) {
      setError(data.error || "비밀번호 변경에 실패했습니다.");
      return;
    }

    setMessage("비밀번호가 변경되었습니다.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  }

  return (
    <AdminShell>
      <div className="max-w-xl">
        <h1 className="font-display text-3xl font-bold">계정 설정</h1>
        <p className="mt-2 text-white/60">관리자 로그인 비밀번호를 변경합니다.</p>

        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6"
        >
          <label className="block text-sm">
            <span className="mb-1.5 block text-white/60">현재 비밀번호</span>
            <input
              type="password"
              className="admin-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-white/60">새 비밀번호</span>
            <input
              type="password"
              className="admin-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
            <span className="mt-1 block text-xs text-white/40">8자 이상</span>
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block text-white/60">새 비밀번호 확인</span>
            <input
              type="password"
              className="admin-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}
          {message && <p className="text-sm text-emerald-400">{message}</p>}

          <button type="submit" className="admin-btn" disabled={saving}>
            {saving ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>
      </div>
    </AdminShell>
  );
}
