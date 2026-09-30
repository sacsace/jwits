"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import type { SiteContent } from "@/lib/types";

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then(setContent);
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setMessage(res.ok ? "저장되었습니다." : "저장에 실패했습니다.");
  }

  if (!content) {
    return (
      <AdminShell>
        <p className="text-white/60">불러오는 중...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">사이트 콘텐츠</h1>
            <p className="mt-2 text-white/60">회사 정보와 히어로 문구를 수정합니다.</p>
          </div>
          <button type="submit" className="admin-btn" disabled={saving}>
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>
        {message && <p className="text-sm text-white/70">{message}</p>}

        <section className="space-y-3 rounded-xl border border-white/10 p-5">
          <h2 className="font-display text-xl">회사 정보</h2>
          {(
            [
              ["name", "회사명"],
              ["nameEn", "영문명"],
              ["tagline", "태그라인"],
              ["founded", "설립연도"],
              ["address", "주소"],
              ["phone", "전화"],
              ["email", "이메일"],
              ["fax", "팩스"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block text-sm">
              <span className="mb-1 block text-white/55">{label}</span>
              <input
                className="admin-input"
                value={content.company[key]}
                onChange={(e) =>
                  setContent({
                    ...content,
                    company: { ...content.company, [key]: e.target.value },
                  })
                }
              />
            </label>
          ))}
          <label className="block text-sm">
            <span className="mb-1 block text-white/55">회사 소개</span>
            <textarea
              className="admin-input min-h-28"
              value={content.company.description}
              onChange={(e) =>
                setContent({
                  ...content,
                  company: { ...content.company, description: e.target.value },
                })
              }
            />
          </label>
        </section>

        <section className="space-y-3 rounded-xl border border-white/10 p-5">
          <h2 className="font-display text-xl">히어로</h2>
          <label className="block text-sm">
            <span className="mb-1 block text-white/55">헤드라인 (줄바꿈 \\n)</span>
            <textarea
              className="admin-input min-h-24"
              value={content.hero.headline}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, headline: e.target.value },
                })
              }
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-white/55">서브 헤드라인</span>
            <textarea
              className="admin-input min-h-24"
              value={content.hero.subheadline}
              onChange={(e) =>
                setContent({
                  ...content,
                  hero: { ...content.hero, subheadline: e.target.value },
                })
              }
            />
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="block text-sm">
              <span className="mb-1 block text-white/55">CTA 1</span>
              <input
                className="admin-input"
                value={content.hero.ctaPrimary}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, ctaPrimary: e.target.value },
                  })
                }
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-white/55">CTA 2</span>
              <input
                className="admin-input"
                value={content.hero.ctaSecondary}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, ctaSecondary: e.target.value },
                  })
                }
              />
            </label>
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-white/10 p-5">
          <h2 className="font-display text-xl">미션 / 비전</h2>
          <label className="block text-sm">
            <span className="mb-1 block text-white/55">미션</span>
            <textarea
              className="admin-input min-h-24"
              value={content.about.mission}
              onChange={(e) =>
                setContent({
                  ...content,
                  about: { ...content.about, mission: e.target.value },
                })
              }
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-white/55">비전</span>
            <textarea
              className="admin-input min-h-24"
              value={content.about.vision}
              onChange={(e) =>
                setContent({
                  ...content,
                  about: { ...content.about, vision: e.target.value },
                })
              }
            />
          </label>
        </section>
      </form>
    </AdminShell>
  );
}
