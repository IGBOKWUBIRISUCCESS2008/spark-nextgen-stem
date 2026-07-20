import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/stem-in-you-logo.jpeg.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/events", label: "Events" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/partner", label: "Partner" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const contactEmail = "contact@steminyou.com";
  const emailHref = `mailto:${contactEmail}?subject=${encodeURIComponent("STEM IN YOU website enquiry")}`;
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="STEM IN YOU home">
          <img src={logo.url} alt="STEM IN YOU logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-brand-pink/30" />
          <span className="hidden text-sm font-bold tracking-tight sm:block">
            <span className="text-gradient-brand">STEM IN YOU</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={emailHref}
            className="hidden rounded-full border border-primary/30 bg-background px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent sm:inline-flex"
          >
            Email Us
          </a>
          <Link
            to="/donate"
            className="hidden rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:opacity-95 sm:inline-flex"
          >
            Donate
          </Link>
          <button
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
            onClick={() => setOpen((s) => !s)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/donate"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-brand px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Donate
            </Link>
            <a
              href={emailHref}
              onClick={() => setOpen(false)}
              className="rounded-full border border-primary/30 px-4 py-2 text-center text-sm font-semibold text-primary"
            >
              Email Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
