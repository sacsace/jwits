"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function SiteHeader({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const base = `/${locale}`;
  const isHome = pathname === base || pathname === `${base}/`;
  const solid = !isHome || scrolled || open;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: `${base}/about`, label: dict.nav.about },
    { href: `${base}/services`, label: dict.nav.services },
    { href: `${base}/projects`, label: dict.nav.projects },
    { href: `${base}/clients`, label: dict.nav.clients },
    { href: `${base}/gallery`, label: dict.nav.gallery },
    { href: `${base}/news`, label: dict.nav.news },
    { href: `${base}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-200 ${
          solid
            ? "border-b border-line bg-surface/95 shadow-sm"
            : "border-b border-white/15 bg-black/30"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <BrandLogo
            href={base}
            size="md"
            variant="horizontal"
            name={dict.brandName}
            inverted={!solid}
          />

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-6" aria-label="Primary">
              {links.map((link) => {
                const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative pb-1 text-[13px] tracking-tight transition ${
                      solid
                        ? active
                          ? "font-semibold text-brand"
                          : "font-medium text-ink-soft hover:text-brand"
                        : active
                          ? "font-semibold text-white"
                          : "font-medium text-white/80 hover:text-white"
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full transition ${
                        active
                          ? solid
                            ? "bg-brand"
                            : "bg-white"
                          : "bg-transparent"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>
            <LanguageSwitcher locale={locale} />
          </div>

          <button
            type="button"
            className="md:hidden"
            aria-label="menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`block h-[1.5px] w-5 ${solid ? "bg-ink" : "bg-white"}`} />
            <span className={`mt-1.5 block h-[1.5px] w-5 ${solid ? "bg-ink" : "bg-white"}`} />
            <span className={`mt-1.5 block h-[1.5px] w-3.5 ${solid ? "bg-ink" : "bg-white"}`} />
          </button>
        </div>

        {open && (
          <div className="border-t border-line bg-surface px-5 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {links.map((link) => {
                const active =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-md px-2 py-2 text-[14px] transition ${
                      active
                        ? "bg-brand/8 font-semibold text-brand"
                        : "font-medium text-ink hover:bg-mist"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2">
                <LanguageSwitcher locale={locale} />
              </div>
            </div>
          </div>
        )}
      </header>
      {!isHome && <div aria-hidden className="h-[61px]" />}
    </>
  );
}
