import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-pink">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
          <span className="text-gradient-brand">{title}</span>
        </h1>
        {subtitle && <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
      </div>
    </section>
  );
}

export function PageBody({ children }: { children: ReactNode }) {
  return <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">{children}</section>;
}
