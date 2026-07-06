import { Link } from "@tanstack/react-router";
import { Sparkles, Phone } from "lucide-react";

export function CTASection({
  title = "Ready for a property that looks effortless?",
  subtitle = "Request a free quote and we'll put your address on the route.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--hairline)] bg-surface p-8 sm:p-14 text-center">
          <div
            className="absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-primary/20 blur-3xl"
            aria-hidden
          />
          <p className="relative text-xs uppercase tracking-[0.22em] text-primary">Get started</p>
          <h2 className="relative mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="relative mt-3 text-base text-muted-foreground">{subtitle}</p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              <Sparkles className="h-4 w-4" />
              Request a quote
            </Link>
            <a
              href="tel:+14058888277"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] bg-transparent px-5 py-2.5 text-sm font-semibold text-foreground hover:border-primary"
            >
              <Phone className="h-4 w-4 text-primary" />
              (405) 888-8277
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
