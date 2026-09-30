"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { InquiryItem } from "@/lib/types";

export default function AdminInquiriesPage() {
  const [items, setItems] = useState<InquiryItem[]>([]);

  async function load() {
    const res = await fetch("/api/inquiries");
    if (res.ok) setItems(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: InquiryItem["status"]) {
    await fetch("/api/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await load();
  }

  async function remove(id: string) {
    if (!confirm("삭제하시겠습니까?")) return;
    await fetch(`/api/inquiries?id=${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl font-bold">문의 관리</h1>
      <p className="mt-2 text-white/60">사이트 문의 폼으로 접수된 내용을 확인합니다.</p>

      <div className="mt-8 space-y-4">
        {items.length === 0 && (
          <p className="text-white/50">접수된 문의가 없습니다.</p>
        )}
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-semibold">{item.name}</h2>
                <p className="mt-1 text-sm text-white/50">
                  {item.company && `${item.company} · `}
                  {item.email}
                  {item.phone && ` · ${item.phone}`}
                </p>
                <p className="mt-1 text-xs text-white/35">
                  {new Date(item.createdAt).toLocaleString("ko-KR")}
                </p>
              </div>
              <select
                className="admin-input max-w-36"
                value={item.status}
                onChange={(e) =>
                  updateStatus(item.id, e.target.value as InquiryItem["status"])
                }
              >
                <option value="new">new</option>
                <option value="read">read</option>
                <option value="replied">replied</option>
              </select>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/80">
              {item.message}
            </p>
            <button
              type="button"
              className="admin-btn admin-btn-danger mt-4"
              onClick={() => remove(item.id)}
            >
              삭제
            </button>
          </article>
        ))}
      </div>
    </AdminShell>
  );
}
