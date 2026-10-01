import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui";
import { GalleryGrid } from "@/components/GalleryGrid";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { createLocaleMetadata } from "@/lib/page-meta";
import { readStore } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  return createLocaleMetadata(params, "/gallery", (dict) => ({
    title: dict.galleryPage.title,
    description: dict.galleryPage.description,
  }));
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const data = await readStore();
  const items = [...data.gallery]
    .filter((item) => item.published && item.imageUrl)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="bg-paper">
      <PageHero
        title={dict.galleryPage.title}
        description={dict.galleryPage.description}
      />
      <section className="mx-auto max-w-6xl px-5 py-14">
        <GalleryGrid
          items={items}
          emptyLabel={dict.galleryPage.emptyLabel}
          gridTitle={dict.galleryPage.gridTitle}
          cardViewLabel={dict.galleryPage.cardView}
          listViewLabel={dict.galleryPage.listView}
        />
      </section>
    </div>
  );
}
