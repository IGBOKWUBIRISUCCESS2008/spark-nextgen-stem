import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { Calendar, MapPin } from "lucide-react";

export const Route = createFileRoute("/events")({
  component: Events,
  head: () => ({
    meta: [
      { title: "Events — STEM IN YOU" },
      { name: "description", content: "Upcoming and past STEM IN YOU events, campaigns and workshops." },
    ],
    links: [{ rel: "canonical", href: "/events" }],
  }),
});

const upcoming = [
  { title: "STEM IN YOU 2026 - 4th Edition", date: "October 2026", location: "Ogun", tag: "Upcoming" },
  { title: "Girls in Robotics Workshop", date: "April 2027", location: "Lagos", tag: "Upcoming" },
];
const past = [
  { title: "STEM IN YOU 2021 - Inaugural Edition", date: "November 2021", location: "Rivers", tag: "Past" },
  { title: "STEM IN YOU 2023 - 2nd Edition", date: "October 2022", location: "Lagos", tag: "Past" },
  { title: "STEM IN YOU 2024 - 3rd Edition", date: "November 2024", location: "Rivers", tag: "Past" },
];

function Card({ e }: { e: typeof upcoming[number] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <span className="rounded-full bg-gradient-brand px-3 py-1 text-xs font-semibold text-white">{e.tag}</span>
      <h3 className="mt-4 text-lg font-semibold">{e.title}</h3>
      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> {e.date}</div>
        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {e.location}</div>
      </div>
      {e.tag === "Upcoming" && (
        <button className="mt-5 rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white">
          Register
        </button>
      )}
    </div>
  );
}

function Events() {
  return (
    <>
      <PageHeader eyebrow="Events" title="Where we're headed next" subtitle="Join us in classrooms, campuses and community halls across Nigeria." />
      <PageBody>
        <h2 className="text-2xl font-bold">Upcoming</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {upcoming.map((e) => <Card key={e.title} e={e} />)}
        </div>
        <h2 className="mt-14 text-2xl font-bold">Past editions</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {past.map((e) => <Card key={e.title} e={e} />)}
        </div>
      </PageBody>
    </>
  );
}
