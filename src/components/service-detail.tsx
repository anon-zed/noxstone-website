import { Link } from "@tanstack/react-router";
import { Check, MapPin, type LucideIcon } from "lucide-react";
import { CTASection } from "@/components/cta-section";

export interface ServiceDetailProps {
  eyebrow: string;
  title: string;
  intro: string;
  image: string;
  imageAlt: string;
  included: string[];
  icon: LucideIcon;
}

export function ServiceDetail({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  included,
  icon: Icon,
}: ServiceDetailProps) {
  return (
    <>
      <section className="bg-background pt-16 pb-10 sm:pt-20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-primary">
              <Icon className="h-3.5 w-3.5" /> {eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-4 max-w-xl text-muted-foreground">{intro}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Request a quote
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-5 py-2.5 text-sm font-semibold hover:border-primary"
              >
                All services
              </Link>
            </div>
            <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              Serving Pottawatomie County, OK
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--hairline)]">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-elevated py-16">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What's included</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl border border-[var(--hairline)] bg-surface p-4 text-sm"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection />
    </>
  );
}
