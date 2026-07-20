import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { useRef, useState } from "react";

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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [cvStatus, setCvStatus] = useState<string | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contactEmail = "contact@steminyou.com";

  const toggle = (i: string) =>
    setSelected((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  const handleCvPick = () => {
    fileInputRef.current?.click();
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvError(null);
    setCvStatus(null);
    const file = e.target.files?.[0];

    if (!file) {
      setCvFileName(null);
      return;
    }

    const maxSizeMb = 5;
    if (file.size > maxSizeMb * 1024 * 1024) {
      setCvFileName(null);
      setCvError(`File is too large. Please upload a file smaller than ${maxSizeMb}MB.`);
      e.target.value = "";
      return;
    }

    setCvFileName(file.name);
    setCvStatus("CV selected successfully.");
  };

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
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setSending(true);
              setCvError(null);

              const form = e.currentTarget;
              const formData = new FormData(form);
              const name = String(formData.get("name") ?? "").trim();
              const email = String(formData.get("email") ?? "").trim();
              const phone = String(formData.get("phone") ?? "").trim();
              const location = String(formData.get("location") ?? "").trim();
              const bio = String(formData.get("bio") ?? "").trim();
              const cv = formData.get("cv");
              const hasCv = cv instanceof File && cv.size > 0;

              const payload = new FormData();
              payload.append("name", name);
              payload.append("email", email);
              payload.append("phone", phone);
              payload.append("location", location);
              payload.append("areasOfInterest", selected.length ? selected.join(", ") : "Not specified");
              payload.append("bio", bio);
              payload.append("_subject", `Volunteer application from ${name || "Website visitor"}`);
              payload.append("_template", "table");

              if (hasCv) {
                payload.append("cv", cv);
              }

              try {
                const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
                  method: "POST",
                  body: payload,
                });

                if (!response.ok) throw new Error("Unable to submit volunteer application");

                setSubmitted(true);
                if (hasCv) {
                  setCvStatus("CV uploaded successfully.");
                }
                setCvFileName(null);
                form.reset();
                setSelected([]);
              } catch {
                const subject = encodeURIComponent(`Volunteer application from ${name || "Website visitor"}`);
                const body = encodeURIComponent(
                  [
                    `Name: ${name}`,
                    `Email: ${email}`,
                    `Phone: ${phone || "N/A"}`,
                    `Location: ${location || "N/A"}`,
                    `Areas of interest: ${selected.length ? selected.join(", ") : "Not specified"}`,
                    "",
                    "About applicant:",
                    bio,
                    "",
                    hasCv
                      ? "CV was selected in form. Please attach the CV manually in your email app before sending."
                      : "No CV attached.",
                  ].join("\n"),
                );
                window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
                setError("Direct submission failed. Your email app has been opened as backup.");
              } finally {
                setSending(false);
              }
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
              <input
                ref={fileInputRef}
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleCvChange}
                className="sr-only"
              />
              <button
                type="button"
                onClick={handleCvPick}
                className="inline-flex rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent"
              >
                {cvFileName ? "Change CV" : "Choose CV file"}
              </button>
              <p className="mt-2 text-xs text-muted-foreground">Accepted: PDF, DOC, DOCX (max 5MB).</p>
              {cvFileName && <p className="mt-1 text-xs text-emerald-600">{cvFileName}</p>}
              {cvStatus && <p className="mt-1 text-xs text-emerald-600">{cvStatus}</p>}
              {cvError && <p className="mt-1 text-xs text-amber-600">{cvError}</p>}
            </div>
            <button
              disabled={sending}
              className="rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant disabled:cursor-not-allowed disabled:opacity-70"
            >
              {sending ? "Submitting..." : "Submit application"}
            </button>
            <p className="text-xs text-muted-foreground">
              This form sends directly to {contactEmail} without a database.
            </p>
            {error && <p className="text-xs text-amber-600">{error}</p>}
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
