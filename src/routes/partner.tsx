import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { useState } from "react";

export const Route = createFileRoute("/partner")({
  component: Partner,
  head: () => ({
    meta: [
      { title: "Partner With Us — STEM IN YOU" },
      { name: "description", content: "Partner with STEM IN YOU to amplify STEM education for young Nigerians." },
    ],
    links: [{ rel: "canonical", href: "/partner" }],
  }),
});

function Partner() {
  const [sent, setSent] = useState(false);
  const contactEmail = "contact@steminyou.com";
  return (
    <>
      <PageHeader eyebrow="Partner" title="Amplify STEM together" subtitle="Corporate partners, foundations and schools — let's build the future together." />
      <PageBody>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Why partner with us?</h2>
            <ul className="mt-4 space-y-3 text-muted-foreground">
              {[
                "Reach hundreds of students across Nigeria each edition",
                "Fulfill CSR and diversity goals with measurable impact",
                "Co-brand campaigns, workshops and events",
                "Support the girl child and close the STEM gender gap",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gradient-brand" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {sent ? (
            <div className="rounded-3xl bg-gradient-soft p-10 text-center">
              <h3 className="text-xl font-bold text-gradient-brand">Message received</h3>
              <p className="mt-2 text-muted-foreground">Our team will reach out within 48 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const data = new FormData(form);
                const org = String(data.get("org") ?? "").trim();
                const contact = String(data.get("contact") ?? "").trim();
                const email = String(data.get("email") ?? "").trim();
                const details = String(data.get("details") ?? "").trim();

                const subject = encodeURIComponent(`Partnership enquiry from ${org || "Organization"}`);
                const body = encodeURIComponent(
                  [
                    `Organization: ${org}`,
                    `Contact person: ${contact}`,
                    `Email: ${email}`,
                    "",
                    "Partnership interest:",
                    details,
                  ].join("\n"),
                );

                window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
                setSent(true);
                form.reset();
              }}
              className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft"
            >
              <Field label="Organization" name="org" required />
              <Field label="Contact person" name="contact" required />
              <Field label="Email" name="email" type="email" required />
              <div>
                <label className="mb-1.5 block text-sm font-semibold">How would you like to partner?</label>
                <textarea name="details" rows={4} className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant">
                Send inquiry
              </button>
              <p className="text-xs text-muted-foreground">
                Inquiries are delivered to {contactEmail} through your email app.
              </p>
            </form>
          )}
        </div>
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
