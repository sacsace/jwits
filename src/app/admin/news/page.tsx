"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { NewsItem } from "@/lib/types";

const empty: Omit<NewsItem, "id"> = {
  title: "",
  summary: "",
  content: "",
  publishedAt: new Date().toISOString().slice(0, 10),
  published: true,
};

export default function AdminNewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/news?all=1");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (editingId) {
      await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId }),
      });
    } else {
      await fetch("/api/news", {
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
    await fetch(`/api/news?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-bold">뉴스 관리</h1>
      <p className="mt-2 text-white/60">홈·뉴스 페이지에 노출되는 글을 관리합니다.</p>

      <form
        onSubmit={onSubmit}
        className="mt-8 space-y-3 rounded-xl border border-white/10 p-5"
      >
        <h2 className="font-display text-xl">
          {editingId ? "뉴스 수정" : "뉴스 등록"}
        </h2>
        <input
          className="admin-input"
          placeholder="제목"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="admin-input"
          placeholder="요약"
          value={form.summary}
          onChange={(e) => setForm({ ...form, summary: e.target.value })}
          required
        />
        <textarea
          className="admin-input min-h-28"
          placeholder="본문"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="date"
            className="admin-input max-w-48"
            value={form.publishedAt}
            onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
          />
          <label className="flex items-center gap-2 text-sm">
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
              className="admin-btn admin-btn-ghost"
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
            className="flex flex-col gap-3 rounded-xl border border-white/10 p-4 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-white/45">
                {item.publishedAt} · {item.published ? "공개" : "비공개"}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="admin-btn admin-btn-ghost"
                onClick={() => {
                  setEditingId(item.id);
                  setForm({
                    title: item.title,
                    summary: item.summary,
                    content: item.content,
                    publishedAt: item.publishedAt,
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
