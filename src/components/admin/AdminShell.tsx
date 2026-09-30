"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const nav = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/content", label: "사이트 콘텐츠" },
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
    <div className="admin-shell">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-60 shrink-0 border-r border-white/10 p-5 md:block">
          <Link href="/admin" className="inline-flex items-center gap-2">
            <span className="inline-flex rounded-full bg-white p-0.5">
              <img src="/logo.png" alt="" width={24} height={24} />
            </span>
            <span className="font-display text-sm font-bold leading-tight">
              JW Industrial Tech Services
            </span>
          </Link>
          <p className="mt-1 text-xs text-white/45">Admin</p>
          <nav className="mt-8 flex flex-col gap-2">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-10 space-y-2">
            <Link href="/" className="block text-sm text-white/50 hover:text-white">
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
        <div className="flex-1 p-5 md:p-8">
          <div className="mb-6 flex flex-wrap gap-2 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/15 px-3 py-1 text-xs"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/15 px-3 py-1 text-xs"
            >
              로그아웃
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
