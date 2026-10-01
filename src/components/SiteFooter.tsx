import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { FamilySiteSelect } from "@/components/FamilySiteSelect";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const base = `/${locale}`;

  return (
    <footer className="border-t border-line bg-surface text-ink">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <BrandLogo href={base} size="md" name={dict.brandName} />
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ink">{dict.footer.links}</p>
          <div className="flex flex-col gap-2 text-sm text-muted">
            <Link href={`${base}/about`} className="hover:text-brand">
              {dict.nav.about}
            </Link>
            <Link href={`${base}/services`} className="hover:text-brand">
              {dict.nav.services}
            </Link>
            <Link href={`${base}/projects`} className="hover:text-brand">
              {dict.nav.projects}
            </Link>
            <Link href={`${base}/contact`} className="hover:text-brand">
              {dict.nav.contact}
            </Link>
            <Link href="/admin" className="hover:text-brand">
              {dict.footer.admin}
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ink">
            {dict.footer.contact}
          </p>
          <div className="space-y-2 text-sm leading-6 text-muted">
            <p>{dict.company.address}</p>
            <a
              href={`mailto:${dict.company.email}`}
              className="block hover:text-brand"
            >
              {dict.company.email}
            </a>
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold text-ink">
            {dict.footer.familySites}
          </p>
          <FamilySiteSelect label={dict.footer.familySitesPlaceholder} />
        </div>
      </div>

      <div className="border-t border-line px-5 py-4">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {dict.brandName}
          </p>
          <p>
            {dict.footer.developedBy}{" "}
            <a
              href="https://www.msventures.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink hover:text-brand"
            >
              Minsub Ventures
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
