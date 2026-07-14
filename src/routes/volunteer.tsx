import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { useState } from "react";

export const Route = createFileRoute("/volunteer")({
  component: Volunteer,
  head: () => ({
    meta: [
      { title: "Volunteer — STEM IN YOU" },
      { name: "description", content: "Join our volunteer community and help inspire the next generation of STEM leaders." },
    ],
    links: [{ rel: "canonical", href: "/volunteer" }],
  }),
});

const INTERESTS = ["Mentorship", "Workshop Facilitation", "Robotics", "Coding", "Content Creation", "Event Support"];

function Volunteer() {
  const [selected, setSelected] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (i: string) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <>
      <PageHeader eyebrow="Volunteer" title="Lend your time. Change a life." subtitle="Volunteers are the heartbeat of STEM IN YOU." />
      <PageBody>
        {submitted ? (
          <div className="rounded-3xl border border-border bg-gradient-soft p-10 text-center">
            <h2 className="text-2xl font-bold text-gradient-brand">Thank you!</h2>
            <p className="mt-2 text-muted-foreground">We received your application and will be in touch soon.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mx-auto max-w-2xl space-y-5 rounded-3xl border border-border bg-card p-8 shadow-soft"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Location" name="location" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Areas of interest</label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggle(i)}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      selected.includes(i) ? "bg-gradient-brand text-white shadow-soft" : "border border-border hover:bg-accent"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Tell us about yourself</label>
              <textarea name="bio" rows={4} className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold">Upload CV (optional)</label>
              <input type="file" name="cv" accept=".pdf,.doc,.docx" className="text-sm" />
            </div>
            <button className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant">
              Submit application
            </button>
          </form>
        )}
      </PageBody>
    </>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <input {...props} className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
    </label>
  );
}
