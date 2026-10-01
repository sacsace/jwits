import type { Metadata } from "next";
import Link from "next/link";
import { AdminShell } from "@/components/admin/AdminShell";
import { readStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "관리자",
};

export default async function AdminDashboardPage() {
  const data = await readStore();
  const newInquiries = data.inquiries.filter((i) => i.status === "new").length;

  const cards = [
    {
      label: "뉴스",
      value: data.news.length,
      href: "/admin/news",
      hint: "게시글 관리",
    },
    {
      label: "고객사",
      value: data.clients.length,
      href: "/admin/clients",
      hint: "주요 고객사",
    },
    {
      label: "프로젝트",
      value: data.projects.length,
      href: "/admin/projects",
      hint: "프로젝트 포트폴리오",
    },
    {
      label: "갤러리",
      value: data.gallery.length,
      href: "/admin/gallery",
      hint: "사진 관리",
    },
    {
      label: "새 문의",
      value: newInquiries,
      href: "/admin/inquiries",
      hint: `전체 ${data.inquiries.length}건`,
    },
    {
      label: "콘텐츠",
      value: "Edit",
      href: "/admin/content",
      hint: "히어로·회사정보",
    },
  ];

  return (
    <AdminShell>
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">대시보드</h1>
        <p className="mt-2 text-muted">
          JW Industrial Tech Services 홍보 사이트 콘텐츠와 문의를 관리합니다.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="admin-panel p-5 transition hover:border-[#1f3554]/40"
            >
              <p className="text-sm text-muted">{card.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-brand">
                {card.value}
              </p>
              <p className="mt-2 text-xs text-muted">{card.hint}</p>
            </Link>
          ))}
        </div>

        <div className="admin-panel mt-10 p-5">
          <h2 className="font-display text-xl font-semibold text-ink">최근 문의</h2>
          {data.inquiries.length === 0 ? (
            <p className="mt-4 text-sm text-muted">접수된 문의가 없습니다.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {data.inquiries.slice(0, 5).map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-ink">{item.name}</p>
                    <p className="text-muted">{item.company || item.email}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      item.status === "new"
                        ? "bg-red-50 text-red-700"
                        : "bg-paper text-muted"
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
