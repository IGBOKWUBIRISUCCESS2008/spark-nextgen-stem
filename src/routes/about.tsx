import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageBody } from "@/components/page-shell";
import { Target, Eye, Heart } from "lucide-react";
import founderImage from "@/assets/people/p.i.jpeg";
import vicePresidentImage from "@/assets/people/s.i.jpeg";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About STEM IN YOU — Our Story & Mission" },
      {
        name: "description",
        content:
          "Since 2021, STEM IN YOU has reached 400+ Nigerian students, breaking gender bias in STEM and empowering the girl child.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
});

function About() {
  const leaders = [
    {
      name: "Precious Chioma Igbokwubiri",
      role: "Founder, STEM IN YOU",
      bio: "Energy Engineer",
      image: founderImage,
      imageClassName: "object-center",
    },
    {
      name: "Shallom Chinonye Igbokwubiri",
      role: "Co-Founder, STEM IN YOU",
      bio: "Human Physiologist",
      image: vicePresidentImage,
      imageClassName: "object-[50%_35%] scale-110",
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Nurturing minds. Building futures. Empowering tomorrow."
        subtitle="STEM IN YOU is an annual campaign inspiring young Nigerians in Science, Technology, Engineering and Mathematics — with a special focus on the girl child."
      />
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-15">
        <div className="grid gap-10 md:grid-cols-2">
          {leaders.map((leader) => (
            <article
              key={leader.name}
              className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <img
                src={leader.image}
                alt={leader.name}
                className={`mx-auto h-32 w-32 rounded-full border-4 border-primary/20 object-cover shadow-soft ${leader.imageClassName}`}
                loading="lazy"
              />
              <h2 className="mt-5 text-xl font-semibold text-foreground">{leader.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{leader.role}</p>
              <p className="mt-1 text-sm font-medium text-primary">{leader.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <PageBody>
        <div className="grid gap-8 lg:grid-cols-3">
          {[
            {
              Icon: Target,
              title: "Our Mission",
              text: "To spark curiosity, creativity and innovation in the next generation of STEM leaders — and to open doors that were once closed to girls.",
            },
            {
              Icon: Eye,
              title: "Our Vision",
              text: "A Nigeria where every young person, regardless of gender or background, can imagine and pursue a future in STEM.",
            },
            {
              Icon: Heart,
              title: "Our Values",
              text: "Curiosity, equity, mentorship and impact — guiding every session, workshop and campaign we run.",
            },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-8 shadow-soft">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-xl font-semibold">{title}</h2>
              <p className="mt-2 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl bg-gradient-soft p-10">
          <h2 className="text-2xl font-bold sm:text-3xl">Our Journey</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Launched in 2021, STEM IN YOU has grown into one of Nigeria's most trusted youth-focused
            STEM initiatives. We've reached 400+ students across multiple states, delivering
            presentations, Think-Pair-Share activities, interactive demonstrations, hands-on
            experiments, quizzes, awards and mentorship. The campaign is fully certified by the
            United Nations Academic Impact. Each edition promises to be bigger, better, and more
            inclusive.
          </p>
        </div>
      </PageBody>
    </>
  );
}
