"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { ProjectItem } from "@/lib/types";

const empty: Omit<ProjectItem, "id"> = {
  year: String(new Date().getFullYear()),
  month: "",
  place: "",
  relatedAuto: "",
  customer: "",
  workType: "",
  manufacturing: "",
  workDetail: "",
  projectName: "",
  published: true,
  featured: false,
};

export default function AdminProjectsPage() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/projects");
    const data = (await res.json()) as ProjectItem[];
    setItems(
      [...data].sort((a, b) => {
        const y = Number(b.year) - Number(a.year);
        if (y !== 0) return y;
        return a.month.localeCompare(b.month);
      })
    );
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
      <h1 className="font-display text-xl font-bold text-ink">프로젝트 관리</h1>
      <p className="mt-1 text-[13px] text-muted">
        프로젝트 테이블을 등록·수정합니다.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-2.5 admin-panel p-4">
        <h2 className="text-[15px] font-semibold text-ink">
          {editingId ? "프로젝트 수정" : "프로젝트 등록"}
        </h2>
        <div className="grid gap-2.5 md:grid-cols-4">
          <input
            className="admin-input"
            placeholder="YYYY"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="MM / 기간"
            value={form.month}
            onChange={(e) => setForm({ ...form, month: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="PLACE"
            value={form.place}
            onChange={(e) => setForm({ ...form, place: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="Related Automobile"
            value={form.relatedAuto}
            onChange={(e) => setForm({ ...form, relatedAuto: e.target.value })}
            required
          />
        </div>
        <div className="grid gap-2.5 md:grid-cols-2">
          <input
            className="admin-input"
            placeholder="Customer (선택)"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
          />
          <input
            className="admin-input"
            placeholder="Manufacturing"
            value={form.manufacturing}
            onChange={(e) =>
              setForm({ ...form, manufacturing: e.target.value })
            }
            required
          />
        </div>
        <div className="grid gap-2.5 md:grid-cols-2">
          <input
            className="admin-input"
            placeholder="Work Type (DEVELOPMENT/MAINTENANCE, 선택)"
            value={form.workType}
            onChange={(e) => setForm({ ...form, workType: e.target.value })}
          />
          <input
            className="admin-input"
            placeholder="Work Detail (MECH. INSTALL 등, 선택)"
            value={form.workDetail}
            onChange={(e) => setForm({ ...form, workDetail: e.target.value })}
          />
        </div>
        <input
          className="admin-input"
          placeholder="PROJECT NAME"
          value={form.projectName}
          onChange={(e) => setForm({ ...form, projectName: e.target.value })}
          required
        />
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-[13px] text-ink">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
            />
            공개
          </label>
          <label className="flex items-center gap-2 text-[13px] text-ink">
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

      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-2 admin-panel px-3.5 py-2.5 md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate text-[13px] font-medium text-ink">
                {item.projectName}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">
                {item.year} {item.month} · {item.place} · {item.relatedAuto}
                {item.customer.trim() ? ` · ${item.customer}` : ""}
                {item.workType.trim() ? ` · ${item.workType}` : ""}
                {" · "}
                {item.manufacturing}
                {item.featured ? " · 메인" : ""}
                {!item.published ? " · 비공개" : ""}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="admin-btn admin-btn-ghost-light"
                onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    year: item.year,
                    month: item.month,
                    place: item.place,
                    relatedAuto: item.relatedAuto,
                    customer: item.customer,
                    workType: item.workType,
                    manufacturing: item.manufacturing,
                    workDetail: item.workDetail,
                    projectName: item.projectName,
                    published: item.published,
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
