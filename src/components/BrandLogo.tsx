import Link from "next/link";
import Image from "next/image";

type BrandLogoProps = {
  href?: string;
  size?: "sm" | "md" | "lg";
  /** mark: 원형 JW 마크 / horizontal: 가로형 워드마크 */
  variant?: "mark" | "horizontal";
  showName?: boolean;
  inverted?: boolean;
  className?: string;
  name?: string;
};

const markSizes = {
  sm: { width: 28, height: 28, text: "text-sm" },
  md: { width: 36, height: 36, text: "text-[15px]" },
  lg: { width: 56, height: 56, text: "text-xl md:text-2xl" },
};

const wordmarkSize = {
  sm: {
    main: "text-[11px] md:text-[12px]",
    sub: "mt-0.5 text-[7px] tracking-[0.38em] md:text-[8px]",
  },
  md: {
    main: "text-[12px] md:text-[14px]",
    sub: "mt-1 text-[8px] tracking-[0.4em] md:text-[9px]",
  },
  lg: {
    main: "text-[16px] md:text-[20px]",
    sub: "mt-1.5 text-[10px] tracking-[0.42em] md:text-[12px]",
  },
};

function HorizontalWordmark({
  inverted,
  size,
  className = "",
}: {
  inverted?: boolean;
  size: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = wordmarkSize[size];
  return (
    <span
      className={`inline-flex max-w-full flex-col leading-none ${
        inverted ? "text-white" : "text-ink"
      } ${className}`}
      aria-label="JW Industrial Tech Services Private Limited"
    >
      <span
        className={`font-display font-bold uppercase tracking-[0.02em] ${s.main}`}
      >
        JW Industrial Tech Services
      </span>
      <span
        className={`font-medium uppercase ${
          inverted ? "text-white/75" : "text-muted"
        } ${s.sub}`}
      >
        Private Limited
      </span>
    </span>
  );
}

export function BrandLogo({
  href = "/",
  size = "md",
  variant = "mark",
  showName = true,
  inverted = false,
  className = "",
  name = "JW Industrial Tech Services",
}: BrandLogoProps) {
  const content =
    variant === "horizontal" ? (
      <HorizontalWordmark inverted={inverted} size={size} className={className} />
    ) : (
      <span className={`inline-flex max-w-full items-center gap-2.5 ${className}`}>
        <span
          className={`relative inline-flex shrink-0 overflow-hidden rounded-full ${
            inverted ? "bg-white p-0.5" : ""
          }`}
          style={{
            width: markSizes[size].width,
            height: markSizes[size].height,
          }}
        >
          <Image
            src="/logo.png"
            alt={`${name} logo`}
            fill
            sizes={`${markSizes[size].width}px`}
            className="object-cover"
            priority={size !== "sm"}
          />
        </span>
        {showName && (
          <span
            className={`font-display font-bold leading-tight tracking-tight ${
              inverted ? "text-white" : "text-brand"
            } ${markSizes[size].text}`}
          >
            {name}
          </span>
        )}
      </span>
    );

  if (!href) return content;
  return <Link href={href}>{content}</Link>;
}
