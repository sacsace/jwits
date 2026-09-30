"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { ProjectItem } from "@/lib/types";

const empty: Omit<ProjectItem, "id"> = {
  title: "",
  client: "기아자동차",
  category: "기계 설계",
  description: "",
  year: String(new Date().getFullYear()),
  featured: false,
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/projects");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (editingId) {
      await fetch("/api/projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId }),
      });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm(empty);
    setEditingId(null);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-bold text-ink">실적 관리</h1>
      <p className="mt-2 text-muted">프로젝트 포트폴리오를 등록·수정합니다.</p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-3 admin-panel p-5"
      >
        <h2 className="font-display text-xl">
          {editingId ? "실적 수정" : "실적 등록"}
        </h2>
        <input
          className="admin-input"
          placeholder="프로젝트명"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <div className="grid gap-3 md:grid-cols-3">
          <input
            className="admin-input"
            placeholder="고객사"
            value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="카테고리"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="연도"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            required
          />
        </div>
        <textarea
          className="admin-input min-h-28"
          placeholder="설명"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            메인 노출
          </label>
          <button type="submit" className="admin-btn">
            {editingId ? "수정 저장" : "등록"}
          </button>
          {editingId && (
            <button
              type="button"
              className="admin-btn admin-btn-ghost-light"
              onClick={() => {
                setEditingId(null);
                setForm(empty);
              }}
            >
              취소
            </button>
          )}
        </div>
      </form>

      <ul className="mt-8 space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 admin-panel p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-muted">
                {item.client} · {item.category} · {item.year}
                {item.featured ? " · 메인" : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="admin-btn admin-btn-ghost-light"
                onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    title: item.title,
                    client: item.client,
                    category: item.category,
                    description: item.description,
                    year: item.year,
                    featured: item.featured,
                  });
                }}
              >
                수정
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-danger"
                onClick={() => remove(item.id)}
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
