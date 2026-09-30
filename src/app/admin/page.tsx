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
      label: "실적",
      value: data.projects.length,
      href: "/admin/projects",
      hint: "프로젝트 포트폴리오",
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
        <h1 className="font-display text-3xl font-bold">대시보드</h1>
        <p className="mt-2 text-white/60">
          JW Industrial Tech Services 홍보 사이트 콘텐츠와 문의를 관리합니다.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:border-white/30"
            >
              <p className="text-sm text-white/55">{card.label}</p>
              <p className="mt-2 font-display text-3xl font-bold text-white">
                {card.value}
              </p>
              <p className="mt-2 text-xs text-white/40">{card.hint}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-white/10 bg-white/5 p-5">
          <h2 className="font-display text-xl font-semibold">최근 문의</h2>
          {data.inquiries.length === 0 ? (
            <p className="mt-4 text-sm text-white/50">접수된 문의가 없습니다.</p>
          ) : (
            <ul className="mt-4 divide-y divide-white/10">
              {data.inquiries.slice(0, 5).map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-white/45">{item.company || item.email}</p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs ${
                      item.status === "new"
                        ? "bg-accent/25 text-[#f0b4ad]"
                        : "bg-white/10 text-white/60"
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
