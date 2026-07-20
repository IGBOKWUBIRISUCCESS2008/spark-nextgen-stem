import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { useState } from "react";

import g1 from "@/assets/gallery-00a6e289-f57f-48f6-9879-f2a22d0f56bc.jpg.asset.json";
import g2 from "@/assets/gallery-5e55aa3a-8cb1-4da7-9aff-e1db17ff7185.jpg.asset.json";
import g3 from "@/assets/gallery-6c281d67-93cb-47a6-93dd-099cab066631.jpg.asset.json";
import g4 from "@/assets/gallery-c55e9878-11f6-48f3-8cac-e59470294269.jpg.asset.json";
import g5 from "@/assets/gallery-img-3558.jpeg.asset.json";
import g6 from "@/assets/gallery-img-5032.jpg.asset.json";
import g7 from "@/assets/gallery-img-9369.jpeg.asset.json";
import g8 from "@/assets/gallery-whatsapp-image-2022-10-12-at-8.55.39-am.jpeg.asset.json";
import g9 from "@/assets/gallery-whatsapp-image-2022-10-12-at-8.55.44-am.jpeg.asset.json";
import g10 from "@/assets/gallery-img-9435-1.jpeg.asset.json";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
  head: () => ({
    meta: [
      { title: "Gallery — STEM IN YOU" },
      { name: "description", content: "Moments from our campaigns, workshops and mentorship sessions." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
});

const imageModules = import.meta.glob(
  "@/assets/new-images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const EXISTING_IMAGES: { key: string; src: string; alt: string }[] = [
  { key: "g1", src: g1.url, alt: "STEM IN YOU gallery image" },
  { key: "g4", src: g4.url, alt: "STEM IN YOU gallery image" },
  { key: "g2", src: g2.url, alt: "STEM IN YOU gallery image" },
  { key: "g7", src: g7.url, alt: "STEM IN YOU gallery image" },
  { key: "g8", src: g8.url, alt: "STEM IN YOU gallery image" },
  { key: "g5", src: g5.url, alt: "STEM IN YOU gallery image" },
  { key: "g9", src: g9.url, alt: "STEM IN YOU gallery image" },
  { key: "g3", src: g3.url, alt: "STEM IN YOU gallery image" },
  { key: "g10", src: g10.url, alt: "STEM IN YOU gallery image" },
  { key: "g6", src: g6.url, alt: "STEM IN YOU gallery image" },
];

const REMOVED_EXISTING_IMAGE_KEYS = new Set(["g1", "g4", "g5"]);

function makeAltFromPath(path: string) {
  const fileName = path.split("/").pop() ?? "Gallery image";
  const noExtension = fileName.replace(/\.[^.]+$/, "");
  return noExtension.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim() || "Gallery image";
}

const NEW_IMAGES: { src: string; alt: string }[] = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    alt: makeAltFromPath(path),
  }));

const IMAGES: { src: string; alt: string }[] = [
  ...EXISTING_IMAGES.filter((img) => !REMOVED_EXISTING_IMAGE_KEYS.has(img.key)).map(({ src, alt }) => ({
    src,
    alt,
  })),
  ...NEW_IMAGES,
];

function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments that matter"
        subtitle="Snapshots from our sessions, campaigns and community across Nigeria."
      />
      <PageBody>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {IMAGES.map((img) => (
            <button
              key={img.src}
              onClick={() => setLightbox(img.src)}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-72 w-full object-cover transition group-hover:scale-105"
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {lightbox && (
          <div
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-label="Image preview"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          >
            <img src={lightbox} alt="" className="max-h-[90vh] max-w-full rounded-xl shadow-elegant" />
          </div>
        )}
      </PageBody>
    </>
  );
}
