"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { GreetingContent } from "@/lib/types";

const empty: GreetingContent = {
  title: "대표 인사말",
  name: "",
  role: "",
  message: "",
  imageUrl: "",
  published: true,
};

export default function AdminGreetingPage() {
  const [form, setForm] = useState<GreetingContent>(empty);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/greeting")
      .then((r) => r.json())
      .then(setForm);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/greeting", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setMessage(res.ok ? "저장되었습니다." : "저장에 실패했습니다.");
  }

  return (
    <AdminShell>
      <h1 className="font-display text-xl font-bold text-ink">대표 인사말</h1>
      <p className="mt-1 text-[13px] text-muted">
        회사소개 페이지에 노출되는 대표 인사말을 관리합니다.
      </p>

      <form onSubmit={onSubmit} className="mt-5 w-full space-y-3 admin-panel p-4">
        <label className="block text-[13px]">
          <span className="mb-1 block text-muted">섹션 제목</span>
          <input
            className="admin-input"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </label>
        <div className="grid gap-3 md:grid-cols-2">
          <label className="block text-[13px]">
            <span className="mb-1 block text-muted">대표 이름</span>
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label className="block text-[13px]">
            <span className="mb-1 block text-muted">직함</span>
            <input
              className="admin-input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            />
          </label>
        </div>
        <label className="block text-[13px]">
          <span className="mb-1 block text-muted">인사말</span>
          <textarea
            className="admin-input min-h-40"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
        </label>
        <ImageUploadField
          label="사진 (선택)"
          value={form.imageUrl}
          onChange={(imageUrl) => setForm({ ...form, imageUrl })}
        />
        <label className="flex items-center gap-2 text-[13px] text-ink">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          공개
        </label>
        {message && <p className="text-[13px] text-emerald-700">{message}</p>}
        <button type="submit" className="admin-btn" disabled={saving}>
          {saving ? "저장 중..." : "저장"}
        </button>
      </form>
    </AdminShell>
  );
}
