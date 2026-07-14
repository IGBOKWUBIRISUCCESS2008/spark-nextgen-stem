import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { useState } from "react";

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

const CATEGORIES = ["All", "Workshops", "Mentorship", "Campaigns"] as const;
const IMAGES = Array.from({ length: 9 }).map((_, i) => ({
  id: i,
  cat: CATEGORIES[(i % 3) + 1],
  src: `https://images.unsplash.com/photo-${["1581091226825-a6a2a5aee158","1596496050755-c923e73e42e1","1573496359142-b8d87734a5a2","1522202176988-66273c2fd55f","1509062522246-3755977927d7","1516321318423-f06f85e504b3","1581092335397-9583eb92d232","1531482615713-2afd69097998","1517486808906-6ca8b3f04846"][i]}?w=800&auto=format&fit=crop`,
}));

function Gallery() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const shown = filter === "All" ? IMAGES : IMAGES.filter((i) => i.cat === filter);

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Moments that matter" subtitle="Snapshots from our sessions, campaigns and community." />
      <PageBody>
        <div className="mb-8 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === c ? "bg-gradient-brand text-white shadow-soft" : "border border-border hover:bg-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((img) => (
            <button
              key={img.id}
              onClick={() => setLightbox(img.src)}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <img src={img.src} alt={`${img.cat} moment`} className="h-64 w-full object-cover transition group-hover:scale-105" loading="lazy" />
            </button>
          ))}
        </div>

        {lightbox && (
          <div
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          >
            <img src={lightbox} alt="" className="max-h-[90vh] max-w-full rounded-xl" />
          </div>
        )}
      </PageBody>
    </>
  );
}
