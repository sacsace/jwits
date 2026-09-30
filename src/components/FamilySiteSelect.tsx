"use client";

import { useEffect, useRef, useState } from "react";

const familySites = [
  {
    label: "업무 통합 시스템 (MVS)",
    href: "https://www.mvsystem.in",
  },
  {
    label: "GPS 기반 출퇴근 기록 시스템 (Heresnow)",
    href: "https://www.heresnow.in",
  },
  {
    label: "비즈니스 컨설팅 (MSV)",
    href: "https://www.msventures.in",
  },
] as const;

export function FamilySiteSelect({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <div ref={rootRef} className="relative w-full max-w-xs text-sm">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded border border-line bg-paper px-3 py-2 text-left text-ink outline-none transition hover:border-brand"
      >
        <span>{label}</span>
        <span className="text-[10px] text-muted">▼</span>
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute bottom-full z-20 mb-1 w-full overflow-hidden rounded border border-line bg-surface shadow-sm"
        >
          {familySites.map((site) => (
            <li key={site.href} role="option">
              <a
                href={site.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-ink transition hover:bg-paper hover:text-brand"
              >
                {site.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
