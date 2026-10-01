import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getSiteUrl, localizedPath } from "@/lib/seo";

const paths = [
  "",
  "/about",
  "/services",
  "/projects",
  "/clients",
  "/gallery",
  "/news",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const site = getSiteUrl();
  const now = new Date();

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site}${localizedPath(locale, path)}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${site}${localizedPath(l, path)}`])
        ),
      },
    }))
  );
}
