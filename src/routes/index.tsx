import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FlaskConical,
  Cpu,
  Cog,
  Sigma,
  Sparkles,
  GraduationCap,
  Users,
  Rocket,
  Code2,
  Bot,
  Mic,
  Trophy,
  ArrowRight,
  Quote,
  Heart,
} from "lucide-react";
import logo from "@/assets/stem-in-you-logo.jpeg.asset.json";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "STEM IN YOU — Empowering the Next Generation of STEM Leaders" },
      {
        name: "description",
        content:
          "Join Nigeria's leading STEM education movement. STEM IN YOU inspires and mentors young people — especially the girl child — in Science, Technology, Engineering and Mathematics.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function useCounter(target: number, duration = 1600) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return { ref, value };
}

function Counter({ to, suffix = "", label }: { to: number; suffix?: string; label: string }) {
  const { ref, value } = useCounter(to);
  return (
    <div className="rounded-2xl glass p-6 text-center shadow-soft">
      <div className="text-4xl font-bold text-gradient-brand sm:text-5xl">
        <span ref={ref}>{value.toString()}</span>
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}

const FLOAT_ICONS = [
  { Icon: FlaskConical, x: "8%", y: "18%", d: 0 },
  { Icon: Cpu, x: "82%", y: "14%", d: 0.4 },
  { Icon: Cog, x: "14%", y: "70%", d: 0.8 },
  { Icon: Sigma, x: "78%", y: "72%", d: 1.2 },
  { Icon: Rocket, x: "46%", y: "8%", d: 1.6 },
  { Icon: Sparkles, x: "50%", y: "84%", d: 2.0 },
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-soft" />
      <div className="pointer-events-none absolute inset-0">
        {FLOAT_ICONS.map(({ Icon, x, y, d }, i) => (
          <motion.div
            key={i}
            className="absolute text-primary/25"
            style={{ left: x, top: y }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: [0, -18, 0], opacity: 0.8 }}
            transition={{ duration: 6, repeat: Infinity, delay: d, ease: "easeInOut" }}
          >
            <Icon className="h-10 w-10 sm:h-14 sm:w-14" />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-24">
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex w-fit items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
          >
            <Sparkles className="h-3.5 w-3.5" /> 4th Edition • 2026
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-6xl"
          >
            Empowering the Next Generation of{" "}
            <span className="text-gradient-brand">STEM Leaders</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg text-muted-foreground"
          >
            Helping young minds discover their potential through science, technology, engineering
            and mathematics — while creating equal opportunities for girls to lead.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-elegant transition hover:opacity-95"
            >
              Join the Movement <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/volunteer"
              className="inline-flex items-center rounded-full border border-primary/30 bg-background px-6 py-3 text-sm font-semibold text-primary hover:bg-accent"
            >
              Become a Volunteer
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full border border-brand-pink/40 px-6 py-3 text-sm font-semibold text-brand-pink hover:bg-accent"
            >
              <Heart className="h-4 w-4" /> Donate Now
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-20 blur-3xl" />
          <div className="relative rounded-[2rem] glass p-6 shadow-elegant">
            <img
              src={logo.url}
              alt="STEM IN YOU logo"
              className="h-72 w-72 rounded-3xl object-cover sm:h-96 sm:w-96"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Impact() {
  const stats = [
    { to: 2021, label: "Founded" },
    { to: 400, suffix: "+", label: "Students Reached" },
    { to: 4, label: "Campaign Editions" },
    { to: 12, suffix: "+", label: "Schools Visited" },
    { to: 60, suffix: "+", label: "Volunteers" },
    { to: 45, suffix: "+", label: "STEM Sessions" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-pink">Our Impact</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Real change, one classroom at a time</h2>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((s) => (
          <Counter key={s.label} to={s.to} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </section>
  );
}

const PROGRAMS = [
  { Icon: GraduationCap, title: "School Awareness Campaigns", desc: "Bringing STEM to classrooms across Nigeria." },
  { Icon: FlaskConical, title: "STEM Demonstrations", desc: "Interactive experiments that spark wonder." },
  { Icon: Users, title: "Mentorship", desc: "Pairing students with STEM professionals." },
  { Icon: Cog, title: "Workshops", desc: "Hands-on sessions building real-world skills." },
  { Icon: Code2, title: "Coding Sessions", desc: "From first line of code to first project." },
  { Icon: Bot, title: "Robotics", desc: "Designing and building intelligent machines." },
  { Icon: Mic, title: "Career Talks", desc: "Stories from women leading in STEM." },
  { Icon: Trophy, title: "Science Competitions", desc: "Quizzes, prizes and the thrill of discovery." },
];

function Programs() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand-pink">Programs</p>
        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
          What we do to <span className="text-gradient-brand">inspire tomorrow</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PROGRAMS.map(({ Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.04 }}
            className="group rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-elegant"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-soft">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "Success Igbokwubiri",
    role: "Student, Lagos",
    text: "The STEM IN YOU session changed how I see science. I now want to become an engineer.",
  },
  {
    name: "Mr. Justice . I",
    role: "Teacher",
    text: "The team brought experiments and energy our students had never seen. Truly transformative.",
  },
  {
    name: "Mrs. Chioma",
    role: "Volunteer Mentor",
    text: "Watching girls light up when they solve a problem is the most rewarding thing I've done.",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-gradient-brand p-1 shadow-elegant">
        <div className="rounded-[calc(1.5rem-2px)] bg-background p-10 text-center sm:p-14">
          <Quote className="mx-auto h-8 w-8 text-brand-pink" />
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-6 max-w-2xl text-xl font-medium sm:text-2xl"
          >
            "{t.text}"
          </motion.p>
          <div className="mt-6 text-sm">
            <div className="font-semibold text-gradient-brand">{t.name}</div>
            <div className="text-muted-foreground">{t.role}</div>
          </div>
          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Show testimonial ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-gradient-brand" : "w-2 bg-border"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl bg-gradient-brand p-10 text-white shadow-elegant sm:p-14">
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to shape the future of STEM in Nigeria?</h2>
            <p className="mt-3 max-w-2xl text-white/90">
              Whether you volunteer, partner, or donate — every action helps a young mind believe
              that science, technology and engineering are for them.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/partner"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary hover:bg-white/90"
            >
              Partner With Us
            </Link>
            <Link
              to="/donate"
              className="rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Impact />
      <Programs />
      <Testimonials />
      <CTA />
    </>
  );
}
