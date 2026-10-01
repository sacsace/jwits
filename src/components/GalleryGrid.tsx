"use client";

import { useState } from "react";
import { isVideoUrl } from "@/lib/media";
import type { GalleryItem } from "@/lib/types";

export function GalleryGrid({
  items,
  emptyLabel,
}: {
  items: GalleryItem[];
  emptyLabel: string;
}) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  if (items.length === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const video = isVideoUrl(item.imageUrl);
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group w-full overflow-hidden border border-line bg-surface text-left transition hover:border-brand/40"
              >
                {video ? (
                  <div className="relative aspect-[4/3] bg-black">
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
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                )}
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
          );
        })}
      </ul>

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
