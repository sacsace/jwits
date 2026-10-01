"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { isVideoUrl } from "@/lib/media";
import type { GalleryItem } from "@/lib/types";

const empty: Omit<GalleryItem, "id"> = {
  title: "",
  description: "",
  imageUrl: "",
  order: 1,
  published: true,
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/gallery?all=1");
    setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.imageUrl.trim()) {
      alert("이미지 또는 동영상을 업로드해 주세요.");
      return;
    }
    if (editingId) {
      await fetch("/api/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editingId }),
      });
    } else {
      await fetch("/api/gallery", {
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
    await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display text-xl font-bold text-ink">갤러리</h1>
      <p className="mt-1 text-[13px] text-muted">
        현장·프로젝트 사진과 동영상을 등록하고 공개 페이지에 노출합니다.
      </p>

      <form onSubmit={onSubmit} className="mt-5 space-y-2.5 admin-panel p-4">
        <h2 className="text-[15px] font-semibold text-ink">
          {editingId ? "갤러리 수정" : "갤러리 등록"}
        </h2>
        <input
          className="admin-input"
          placeholder="제목"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          className="admin-input min-h-20"
          placeholder="설명 (선택)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <ImageUploadField
          label="이미지 / 동영상"
          mode="media"
          value={form.imageUrl}
          onChange={(imageUrl) => setForm({ ...form, imageUrl })}
        />
        <input
          type="number"
          className="admin-input max-w-xs"
          placeholder="정렬 순서"
          value={form.order}
          onChange={(e) =>
            setForm({ ...form, order: Number(e.target.value) || 1 })
          }
          min={1}
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

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const video = isVideoUrl(item.imageUrl);
          return (
            <li key={item.id} className="admin-panel overflow-hidden">
              {item.imageUrl ? (
                video ? (
                  <video
                    src={item.imageUrl}
                    className="aspect-[4/3] w-full object-cover bg-black"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover"
                  />
                )
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-surface text-sm text-muted">
                  미디어 없음
                </div>
              )}
              <div className="space-y-2 p-3">
                <p className="text-[13px] font-medium text-ink">{item.title}</p>
                <p className="text-[11px] text-muted">
                  순서 {item.order} · {item.published ? "공개" : "비공개"}
                  {video ? " · 동영상" : item.imageUrl ? " · 이미지" : ""}
                </p>
                {item.description.trim() ? (
                  <p className="line-clamp-2 text-[12px] text-muted">
                    {item.description}
                  </p>
                ) : null}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    className="admin-btn admin-btn-ghost-light"
                    onClick={() => {
                      setEditingId(item.id);
                      setForm({
                        title: item.title,
                        description: item.description,
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
              </div>
            </li>
          );
        })}
      </ul>
    </AdminShell>
  );
}
