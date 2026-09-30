"use client";

export function HeroVideo() {
  return (
    <div className="hero-photo__media" aria-hidden>
      <video
        className="hero-photo__video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
