import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { Phone, Mail, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — STEM IN YOU" },
      { name: "description", content: "Get in touch with the STEM IN YOU team." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk" subtitle="Questions, ideas or partnerships — we'd love to hear from you." />
      <PageBody>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-primary" /> +234 813 331 3528</li>
                <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-primary" /> hello@steminyou.org</li>
                <li className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <a href="https://www.linkedin.com/in/precious-chioma-igbokwubiri-9a6502186" target="_blank" rel="noreferrer" className="hover:text-primary">
                    Precious Chioma Igbokwubiri
                  </a>
                </li>
                <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-primary" /> Lagos, Nigeria</li>
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="flex h-72 items-center justify-center bg-gradient-soft text-muted-foreground">
                <span className="text-sm">Google Maps location placeholder</span>
              </div>
            </div>
          </div>

          {sent ? (
            <div className="rounded-3xl bg-gradient-soft p-10 text-center">
              <h3 className="text-xl font-bold text-gradient-brand">Message sent</h3>
              <p className="mt-2 text-muted-foreground">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft"
            >
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Message</label>
                <textarea rows={5} required className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant">
                Send message
              </button>
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
