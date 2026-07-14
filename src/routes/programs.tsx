import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import {
  GraduationCap, FlaskConical, Users, Cog, Code2, Bot, Mic, Trophy,
} from "lucide-react";

export const Route = createFileRoute("/programs")({
  component: Programs,
  head: () => ({
    meta: [
      { title: "Programs — STEM IN YOU" },
      { name: "description", content: "Explore our programs: awareness campaigns, workshops, coding, robotics, mentorship and more." },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
});

const items = [
  { Icon: GraduationCap, title: "School Awareness Campaigns", desc: "In-school talks that bring STEM to life for hundreds of students at a time." },
  { Icon: FlaskConical, title: "STEM Demonstrations", desc: "Live experiments that turn abstract concepts into unforgettable moments." },
  { Icon: Users, title: "Mentorship", desc: "One-on-one and group mentorship pairing students with STEM professionals." },
  { Icon: Cog, title: "Workshops", desc: "Hands-on sessions where students build, test and iterate." },
  { Icon: Code2, title: "Coding Sessions", desc: "From Scratch to Python — accessible coding for all levels." },
  { Icon: Bot, title: "Robotics", desc: "Designing and programming robots to solve real problems." },
  { Icon: Mic, title: "Career Talks", desc: "Inspiring stories from women and men leading in STEM." },
  { Icon: Trophy, title: "Science Competitions", desc: "Quizzes, challenges and prizes that reward curiosity." },
];

function Programs() {
  return (
    <>
      <PageHeader eyebrow="Programs" title="What we do" subtitle="A full suite of experiences designed to inspire, educate and empower." />
      <PageBody>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-elegant">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </PageBody>
    </>
  );
}
