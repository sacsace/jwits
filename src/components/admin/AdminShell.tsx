"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/content", label: "사이트 콘텐츠" },
  { href: "/admin/greeting", label: "대표 인사말" },
  { href: "/admin/team", label: "팀원" },
  { href: "/admin/clients", label: "주요 고객사" },
  { href: "/admin/news", label: "뉴스" },
  { href: "/admin/projects", label: "실적" },
  { href: "/admin/inquiries", label: "문의" },
  { href: "/admin/settings", label: "계정 설정" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-shell h-screen overflow-hidden">
      <div className="mx-auto flex h-full max-w-[96rem]">
        <aside className="admin-sidebar hidden h-full w-64 shrink-0 flex-col p-5 md:flex">
          <div className="shrink-0">
            <Link href="/admin" className="inline-flex items-center gap-2.5">
              <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white">
                <Image
                  src="/logo.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </span>
              <span className="font-display text-sm font-bold leading-tight text-white">
                JW Industrial Tech Services
              </span>
            </Link>
            <p className="mt-1 text-xs text-white/55">Admin</p>
          </div>

          <nav className="mt-8 flex flex-1 flex-col gap-1 overflow-y-auto">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-white font-semibold text-[#1f3554]"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 shrink-0 space-y-2 border-t border-white/15 pt-5">
            <Link
              href="/ko"
              className="block text-sm text-white/55 hover:text-white"
            >
              ← 사이트 보기
            </Link>
            <button
              type="button"
              onClick={logout}
              className="admin-btn admin-btn-ghost w-full"
            >
              로그아웃
            </button>
          </div>
        </aside>

        <div className="flex min-h-0 flex-1 flex-col bg-white">
          <div className="shrink-0 border-b border-line px-5 py-3 md:hidden">
            <div className="flex flex-wrap gap-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-line px-3 py-1 text-xs text-ink"
                >
                  {item.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-line px-3 py-1 text-xs text-ink"
              >
                로그아웃
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5 md:p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
