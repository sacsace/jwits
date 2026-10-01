"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { toNameCase } from "@/lib/text";
import type { ClientCompany } from "@/lib/types";

const empty: Omit<ClientCompany, "id"> = {
  name: "",
  location: "",
  note: "",
  logoUrl: "",
  order: 1,
  published: true,
};

export default function AdminClientsPage() {
  const [items, setItems] = useState<ClientCompany[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/clients?all=1");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...form, name: toNameCase(form.name) };
    if (editingId) {
      await fetch("/api/clients", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, id: editingId }),
      });
    } else {
      await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setForm({ ...empty, order: items.length + 1 });
    setEditingId(null);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch(`/api/clients?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display text-xl font-bold text-ink">주요 고객사</h1>
      <p className="mt-1 text-[13px] text-muted">
        홈·고객사 디렉터리에 로고 카드로 노출됩니다. 회사명은 첫 글자 대문자로
        자동 정리됩니다.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-2.5 admin-panel p-4">
        <h2 className="text-[15px] font-semibold text-ink">
          {editingId ? "고객사 수정" : "고객사 등록"}
        </h2>
        <input
          className="admin-input"
          placeholder="회사명"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          onBlur={() =>
            setForm((prev) => ({ ...prev, name: toNameCase(prev.name) }))
          }
          required
        />
        <div className="grid gap-2.5 md:grid-cols-2">
          <input
            className="admin-input"
            placeholder="지역 (선택)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
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
        <textarea
          className="admin-input min-h-20"
          placeholder="설명 (선택)"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
        <ImageUploadField
          label="로고 (선택)"
          value={form.logoUrl}
          onChange={(logoUrl) => setForm({ ...form, logoUrl })}
        />
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-[13px] text-ink">
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

      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-2 admin-panel px-3.5 py-2.5 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              {item.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logoUrl}
                  alt=""
                  className="h-8 w-8 shrink-0 rounded object-contain bg-surface"
                />
              ) : null}
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium leading-snug text-ink">
                  {item.name}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-muted">
                  순서 {item.order}
                  {item.location.trim() ? ` · ${item.location}` : ""}
                  {" · "}
                  {item.published ? "공개" : "비공개"}
                  {item.note.trim() ? ` · ${item.note}` : ""}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                className="admin-btn admin-btn-ghost-light"
                onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    name: item.name,
                    location: item.location,
                    note: item.note,
                    logoUrl: item.logoUrl,
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
