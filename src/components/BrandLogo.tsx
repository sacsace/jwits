import Image from "next/image";
import Link from "next/link";

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

const horizontalSizes = {
  sm: { width: 160, height: 36 },
  md: { width: 220, height: 48 },
  lg: { width: 280, height: 60 },
};

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
      <span className={`inline-flex max-w-full items-center ${className}`}>
        <Image
          src="/logo-horizontal-transparent.png"
          alt={name}
          width={horizontalSizes[size].width}
          height={horizontalSizes[size].height}
          className={`h-9 w-auto max-w-[min(70vw,240px)] object-contain object-left md:h-11 md:max-w-[280px] ${
            inverted ? "brightness-0 invert" : ""
          }`}
          priority
        />
      </span>
    ) : (
      <span className={`inline-flex max-w-full items-center gap-2.5 ${className}`}>
        <span
          className={`inline-flex shrink-0 items-center justify-center rounded-full ${
            inverted ? "bg-white p-1" : ""
          }`}
        >
          <Image
            src="/logo.png"
            alt={`${name} logo`}
            width={markSizes[size].width}
            height={markSizes[size].height}
            className="object-contain"
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
