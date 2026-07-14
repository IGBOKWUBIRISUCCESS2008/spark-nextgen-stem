import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { Heart } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/donate")({
  component: Donate,
  head: () => ({
    meta: [
      { title: "Donate — STEM IN YOU" },
      { name: "description", content: "Fund STEM education for young Nigerians. Every donation reaches a student." },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
});

const AMOUNTS = [5000, 10000, 25000, 50000];

function Donate() {
  const [amount, setAmount] = useState<number>(10000);
  const [custom, setCustom] = useState("");
  return (
    <>
      <PageHeader eyebrow="Donate" title="Fuel a young mind" subtitle="Every ₦1,000 helps a student experience STEM they'd never otherwise see." />
      <PageBody>
        <div className="mx-auto max-w-2xl rounded-3xl border border-border bg-card p-8 shadow-soft">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => { setAmount(a); setCustom(""); }}
                className={`rounded-2xl px-4 py-4 text-center font-semibold transition ${
                  amount === a && !custom
                    ? "bg-gradient-brand text-white shadow-soft"
                    : "border border-border hover:bg-accent"
                }`}
              >
                ₦{a.toLocaleString()}
              </button>
            ))}
          </div>
          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-semibold">Or enter custom amount (₦)</label>
            <input
              type="number"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="e.g. 20000"
            />
          </div>
          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-elegant">
            <Heart className="h-4 w-4" /> Donate ₦{(custom ? Number(custom) : amount).toLocaleString()}
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Secure payment powered by trusted partners. STEM IN YOU is a registered non-profit initiative.
          </p>
        </div>
      </PageBody>
    </>
  );
}
