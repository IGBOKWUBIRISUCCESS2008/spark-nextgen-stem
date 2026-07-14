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

const CATEGORIES = ["All", "Campaigns", "Workshops", "Team", "Posters"] as const;
type Cat = (typeof CATEGORIES)[number];

const IMAGES: { src: string; cat: Cat; alt: string }[] = [
  { src: g1.url, cat: "Campaigns", alt: "Student holding STEM IN YOU 3.0 flyer and mathematical instruments" },
  { src: g4.url, cat: "Campaigns", alt: "Girl at Brook Height School with STEM IN YOU souvenirs" },
  { src: g2.url, cat: "Workshops", alt: "Students attending a STEM IN YOU session in a classroom" },
  { src: g7.url, cat: "Workshops", alt: "Facilitator engaging students during a STEM presentation" },
  { src: g8.url, cat: "Workshops", alt: "Students taking notes during a STEM IN YOU activity" },
  { src: g5.url, cat: "Workshops", alt: "Outdoor school gathering during STEM IN YOU campaign" },
  { src: g9.url, cat: "Campaigns", alt: "Group of students with STEM IN YOU flyers and Girl Up / UNF banner" },
  { src: g3.url, cat: "Team", alt: "Girl Up Port Harcourt volunteers at STEM IN YOU event" },
  { src: g10.url, cat: "Team", alt: "STEM IN YOU volunteer team, Millennium Fellowship cohort" },
  { src: g6.url, cat: "Posters", alt: "STEM IN YOU 3.0 official event poster" },
];

function Gallery() {
  const [filter, setFilter] = useState<Cat>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const shown = filter === "All" ? IMAGES : IMAGES.filter((i) => i.cat === filter);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments that matter"
        subtitle="Snapshots from our sessions, campaigns and community across Nigeria."
      />
      <PageBody>
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === c
                  ? "bg-gradient-brand text-white shadow-soft"
                  : "border border-border hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((img) => (
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
