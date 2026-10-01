"use client";

import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    let idleId = 0;
    let timeoutId = 0;
    let cancelled = false;

    const start = () => {
      if (!cancelled) setLoad(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(start, { timeout: 900 });
    } else {
      timeoutId = window.setTimeout(start, 250);
    }

    return () => {
      cancelled = true;
      if (idleId && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!load || !ref.current) return;
    ref.current.play().catch(() => undefined);
  }, [load]);

  return (
    <div className="hero-photo__media" aria-hidden>
      <video
        ref={ref}
        className={`hero-photo__video${load ? " is-ready" : ""}`}
        muted
        loop
        playsInline
        preload="none"
      >
        {load ? <source src="/hero.mp4" type="video/mp4" /> : null}
      </video>
    </div>
  );
}
