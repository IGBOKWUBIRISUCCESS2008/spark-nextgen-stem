import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";

export const Route = createFileRoute("/blog")({
  component: Blog,
  head: () => ({
    meta: [
      { title: "Blog — STEM IN YOU" },
      { name: "description", content: "STEM articles, news and resources from the STEM IN YOU team." },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
});

const posts = [
  { title: "Why the Girl Child Belongs in STEM", excerpt: "Breaking gender bias starts in the classroom — here's how we're doing it.", date: "Feb 2, 2026" },
  { title: "5 Simple Experiments You Can Do at Home", excerpt: "Bring STEM into your living room with these easy, low-cost experiments.", date: "Jan 20, 2026" },
  { title: "How Mentorship Changes Everything", excerpt: "The single biggest predictor of student success in STEM? A mentor.", date: "Jan 5, 2026" },
];

function Blog() {
  return (
    <>
      <PageHeader eyebrow="Blog" title="Ideas & inspiration" subtitle="Stories, research and practical guides from our community." />
      <PageBody>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="h-40 rounded-xl bg-gradient-brand opacity-80" />
              <div className="mt-4 text-xs text-muted-foreground">{p.date}</div>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <button className="mt-4 text-sm font-semibold text-primary">Read more →</button>
            </article>
          ))}
        </div>
      </PageBody>
    </>
  );
}
