"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LOCALE_COOKIE,
  localeLabels,
  locales,
  type Locale,
} from "@/i18n/config";

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${
    60 * 60 * 24 * 365
  }; samesite=lax`;
}

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setLocaleCookie(locale);
  }, [locale]);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  function switchPath(next: Locale) {
    const parts = pathname.split("/");
    if (parts.length > 1 && locales.includes(parts[1] as Locale)) {
      parts[1] = next;
      return parts.join("/") || `/${next}`;
    }
    return `/${next}`;
  }

  function selectLocale(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    setLocaleCookie(next);
    router.push(switchPath(next));
  }

  if (!mounted) {
    return (
      <div
        className="inline-flex min-w-[7.5rem] items-center justify-between rounded border border-line bg-surface px-3 py-1.5 text-[13px] text-ink"
        aria-hidden
      >
        <span>{localeLabels[locale]}</span>
        <span className="text-[10px] text-muted">▼</span>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative inline-block text-[13px]">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Language"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-w-[7.5rem] items-center justify-between gap-2 rounded border border-line bg-surface px-3 py-1.5 text-ink outline-none transition hover:border-brand"
      >
        <span>{localeLabels[locale]}</span>
        <span className="text-[10px] text-muted">▼</span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-[60] mt-1 min-w-full overflow-hidden rounded border border-line bg-surface shadow-sm"
        >
          {locales.map((item) => (
            <li key={item} role="option" aria-selected={item === locale}>
              <button
                type="button"
                onClick={() => selectLocale(item)}
                className={`block w-full px-3 py-2 text-left transition hover:bg-paper ${
                  item === locale ? "font-semibold text-brand" : "text-ink"
                }`}
              >
                {localeLabels[item]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
