"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import type { TeamMember } from "@/lib/types";

const empty: Omit<TeamMember, "id"> = {
  name: "",
  role: "",
  bio: "",
  imageUrl: "",
  order: 1,
  published: true,
};

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/team?all=1");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (editingId) {
      await fetch("/api/team", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId }),
      });
    } else {
      await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({ ...empty, order: items.length + 1 });
    setEditingId(null);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch(`/api/team?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-bold text-ink">팀원 관리</h1>
      <p className="mt-2 text-muted">회사소개 페이지에 노출되는 팀원을 관리합니다.</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-3 admin-panel p-5">
        <h2 className="font-display text-xl text-ink">
          {editingId ? "팀원 수정" : "팀원 등록"}
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <input
            className="admin-input"
            placeholder="이름"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            className="admin-input"
            placeholder="직책 (선택)"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
        </div>
        <textarea
          className="admin-input min-h-24"
          placeholder="설명 (선택)"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <ImageUploadField
          label="사진 (선택)"
          value={form.imageUrl}
          onChange={(imageUrl) => setForm({ ...form, imageUrl })}
        />
        <div className="grid gap-3 md:grid-cols-2">
          <input
            type="number"
            className="admin-input"
            placeholder="정렬 순서"
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: Number(e.target.value) || 1 })
            }
            min={1}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-ink">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            공개
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
            <div className="flex items-start gap-3">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt=""
                  className="h-12 w-12 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-semibold text-brand">
                  {item.name.slice(0, 1)}
                </div>
              )}
              <div>
                <p className="font-medium text-ink">
                  {item.name}
                  {item.role.trim() ? ` · ${item.role}` : ""}
                </p>
                <p className="text-sm text-muted">
                  순서 {item.order} · {item.published ? "공개" : "비공개"}
                </p>
                {item.bio.trim() ? (
                  <p className="mt-1 text-sm text-muted">{item.bio}</p>
                ) : null}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="admin-btn admin-btn-ghost-light"
                onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    name: item.name,
                    role: item.role,
                    bio: item.bio,
                    imageUrl: item.imageUrl,
                    order: item.order,
                    published: item.published,
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
