import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { Mail, Linkedin } from "lucide-react";
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const contactEmail = "contact@steminyou.com";
  return (
    <>
      <PageHeader eyebrow="Contact" title="Let's talk" subtitle="Questions, ideas or partnerships — we'd love to hear from you." />
      <PageBody>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${contactEmail}`} className="hover:text-primary">{contactEmail}</a>
                </li>
                <li className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5 text-primary" />
                  <a href="https://www.linkedin.com/in/precious-chioma-igbokwubiri-9a6502186" target="_blank" rel="noreferrer" className="hover:text-primary">
                    Precious Chioma Igbokwubiri
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {sent ? (
            <div className="rounded-3xl bg-gradient-soft p-10 text-center">
              <h3 className="text-xl font-bold text-gradient-brand">Message sent</h3>
              <p className="mt-2 text-muted-foreground">Thanks — your message has been delivered to {contactEmail}.</p>
            </div>
          ) : (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setError(null);
                setSending(true);
                const form = e.currentTarget;
                const data = new FormData(form);
                const name = String(data.get("name") ?? "").trim();
                const email = String(data.get("email") ?? "").trim();
                const phone = String(data.get("phone") ?? "").trim();
                const message = String(data.get("message") ?? "").trim();

                try {
                  const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    body: JSON.stringify({
                      name,
                      email,
                      phone,
                      message,
                      _subject: `Website enquiry from ${name || "STEM IN YOU visitor"}`,
                    }),
                  });

                  if (!response.ok) throw new Error("Unable to send message");

                  setSent(true);
                  form.reset();
                } catch {
                  const subject = encodeURIComponent(`Website enquiry from ${name || "STEM IN YOU visitor"}`);
                  const body = encodeURIComponent(
                    [
                      `Name: ${name}`,
                      `Email: ${email}`,
                      `Phone: ${phone || "N/A"}`,
                      "",
                      "Message:",
                      message,
                    ].join("\n"),
                  );

                  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
                  setError("Direct send failed on this browser. We opened your email app instead.");
                } finally {
                  setSending(false);
                }
              }}
              className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-soft"
            >
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <div>
                <label className="mb-1.5 block text-sm font-semibold">Message</label>
                <textarea name="message" rows={5} required className="w-full rounded-xl border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <button
                disabled={sending}
                className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? "Sending..." : "Send message"}
              </button>
              <p className="text-xs text-muted-foreground">
                Sends directly to {contactEmail} without a database. If direct send fails, your email app will open as backup.
              </p>
              {error && <p className="text-xs text-amber-600">{error}</p>}
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
