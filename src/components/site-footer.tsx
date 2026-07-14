import { Link } from "@tanstack/react-router";
import { Linkedin, Phone, Mail } from "lucide-react";
import logo from "@/assets/stem-in-you-logo.jpeg.asset.json";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-gradient-soft">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="STEM IN YOU" className="h-12 w-12 rounded-full object-cover" />
            <span className="text-lg font-bold text-gradient-brand">STEM IN YOU</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Nurturing minds. Building futures. Empowering tomorrow.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              ["/about", "About Us"],
              ["/programs", "Programs"],
              ["/events", "Events"],
              ["/gallery", "Gallery"],
              ["/blog", "Blog"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Get Involved</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {[
              ["/volunteer", "Volunteer"],
              ["/partner", "Partner With Us"],
              ["/donate", "Donate"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-primary">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +234 813 331 3528
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> hello@steminyou.org
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/precious-chioma-igbokwubiri-9a6502186"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </li>
          </ul>

          <form
            className="mt-5 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing!");
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="w-full rounded-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="rounded-full bg-gradient-brand px-4 py-2 text-sm font-semibold text-white">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {new Date().getFullYear()} STEM IN YOU. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
