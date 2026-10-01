import Link from "next/link";

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="font-display text-[1.85rem] font-semibold leading-tight text-ink md:text-[2.1rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-7 text-muted">{description}</p>
      )}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  tone = "brand",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "brand" | "light";
}) {
  const isLight = tone === "light";

  return (
    <Link
      href={href}
      style={{
        backgroundColor: isLight ? "#ffffff" : "#1f3554",
        color: isLight ? "#1f3554" : "#ffffff",
      }}
      className="inline-flex min-h-11 min-w-[9.5rem] items-center justify-center px-5 py-3 text-sm font-semibold no-underline transition hover:opacity-90"
    >
      {children}
    </Link>
  );
}

export function GhostButton({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      style={
        light
          ? { color: "#ffffff", borderColor: "rgba(255,255,255,0.55)" }
          : { color: "#1a1d24", borderColor: "#d5d9e0" }
      }
      className="inline-flex min-h-11 min-w-[9.5rem] items-center justify-center border px-5 py-3 text-sm font-semibold no-underline transition hover:opacity-90"
    >
      {children}
    </Link>
  );
}

export function PageHero({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <section className="page-banner px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl whitespace-pre-line text-[15px] leading-7 text-white/80">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
