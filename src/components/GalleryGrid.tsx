"use client";

import { useState } from "react";
import { isVideoUrl } from "@/lib/media";
import type { GalleryItem } from "@/lib/types";

type ViewMode = "card" | "list";

function CardIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className={active ? "text-brand" : "text-muted"}
    >
      <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="2" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="10" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ListIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className={active ? "text-brand" : "text-muted"}
    >
      <rect x="2" y="3" width="14" height="2.5" rx="1" fill="currentColor" />
      <rect x="2" y="7.75" width="14" height="2.5" rx="1" fill="currentColor" />
      <rect x="2" y="12.5" width="14" height="2.5" rx="1" fill="currentColor" />
    </svg>
  );
}

function MediaThumb({
  item,
  className,
}: {
  item: GalleryItem;
  className?: string;
}) {
  const video = isVideoUrl(item.imageUrl);
  if (video) {
    return (
      <div className={`relative bg-black ${className || ""}`}>
        <video
          src={item.imageUrl}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-[11px] font-medium text-white">
          Video
        </span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.imageUrl}
      alt={item.title}
      className={`object-cover ${className || ""}`}
    />
  );
}

export function GalleryGrid({
  items,
  emptyLabel,
  gridTitle,
  cardViewLabel,
  listViewLabel,
}: {
  items: GalleryItem[];
  emptyLabel: string;
  gridTitle: string;
  cardViewLabel: string;
  listViewLabel: string;
}) {
  const [active, setActive] = useState<GalleryItem | null>(null);
  const [view, setView] = useState<ViewMode>("card");

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <h2 className="font-display text-[1.85rem] font-semibold leading-tight text-ink md:text-[2.1rem]">
          {gridTitle}
        </h2>
        <div
          className="inline-flex items-center overflow-hidden rounded border border-line bg-white"
          role="group"
          aria-label="View mode"
        >
          <button
            type="button"
            onClick={() => setView("card")}
            aria-pressed={view === "card"}
            title={cardViewLabel}
            className={`inline-flex h-9 w-9 items-center justify-center transition ${
              view === "card" ? "bg-brand/8" : "hover:bg-mist"
            }`}
          >
            <span className="sr-only">{cardViewLabel}</span>
            <CardIcon active={view === "card"} />
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            title={listViewLabel}
            className={`inline-flex h-9 w-9 items-center justify-center border-l border-line transition ${
              view === "list" ? "bg-brand/8" : "hover:bg-mist"
            }`}
          >
            <span className="sr-only">{listViewLabel}</span>
            <ListIcon active={view === "list"} />
          </button>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted">{emptyLabel}</p>
      ) : view === "card" ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group w-full overflow-hidden border border-line bg-surface text-left transition hover:border-brand/40"
              >
                <MediaThumb
                  item={item}
                  className="aspect-[4/3] w-full transition duration-300 group-hover:scale-[1.02]"
                />
                <div className="p-3">
                  <p className="text-[14px] font-semibold text-ink">
                    {item.title}
                  </p>
                  {item.description.trim() ? (
                    <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-muted">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="divide-y divide-line border border-line bg-white">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="flex w-full items-center gap-4 px-3 py-3 text-left transition hover:bg-mist/60"
              >
                <MediaThumb
                  item={item}
                  className="h-16 w-24 shrink-0 rounded-sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-ink">
                    {item.title}
                  </p>
                  {item.description.trim() ? (
                    <p className="mt-1 line-clamp-1 text-[12px] text-muted">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-auto bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {isVideoUrl(active.imageUrl) ? (
              <video
                src={active.imageUrl}
                className="max-h-[70vh] w-full bg-black object-contain"
                controls
                playsInline
                autoPlay
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.imageUrl}
                alt={active.title}
                className="max-h-[70vh] w-full object-contain bg-black"
              />
            )}
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-semibold text-ink">
                  {active.title}
                </h2>
                <button
                  type="button"
                  className="text-sm text-muted hover:text-ink"
                  onClick={() => setActive(null)}
                >
                  닫기
                </button>
              </div>
              {active.description.trim() ? (
                <p className="whitespace-pre-line text-[14px] leading-7 text-muted">
                  {active.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
