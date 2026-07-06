import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Scissors,
  Trees,
  Leaf,
  ShieldCheck,
  Clock,
  MapPin,
  ThumbsUp,
  Sparkles,
  Star,
} from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { CTASection } from "@/components/cta-section";
import heroImg from "@/assets/hero-lawn.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Noxstone - Lawn & Landscape" },
      {
        name: "description",
        content:
          "Trusted lawn care, landscape maintenance, and property cleanup in Shawnee and Pottawatomie County, OK. Professional, reliable, route-based service.",
      },
      { property: "og:title", content: "Noxstone - Lawn & Landscape" },
      {
        property: "og:description",
        content:
          "Professional lawn and landscape maintenance across Pottawatomie County, Oklahoma.",
      },
      { property: "og:url", content: "https://noxstone.com/" },
      { property: "og:image", content: "https://noxstone.com/og.jpg" },
      { rel: "canonical", href: "https://noxstone.com/" },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    to: "/services/lawn-maintenance",
    title: "Lawn Maintenance",
    description:
      "Mowing, edging, trimming, and clean blow-off for crisp, route-consistent weekly service.",
    icon: Scissors,
  },
  {
    to: "/services/landscape-maintenance",
    title: "Landscape Maintenance",
    description:
      "Shrub trimming, weed control, bed maintenance, and mulch refresh that keeps beds sharp.",
    icon: Trees,
  },
  {
    to: "/services/property-cleanup",
    title: "Property Cleanup",
    description:
      "Leaf cleanup, storm debris removal, and seasonal resets for neglected or overgrown areas.",
    icon: Leaf,
  },
] as const;

const features = [
  {
    icon: ShieldCheck,
    title: "Professional & Insured",
    text: "Reliable crews, professional equipment, and reasonable care on every visit.",
  },
  {
    icon: Clock,
    title: "Route-Based Reliability",
    text: "Consistent weekly or bi-weekly service so your property always looks dialed in.",
  },
  {
    icon: MapPin,
    title: "Local to Pottawatomie County",
    text: "Serving Shawnee, Tecumseh, McLoud, and surrounding communities.",
  },
  {
    icon: ThumbsUp,
    title: "Clear, Fair Pricing",
    text: "Written quotes, transparent terms, and no surprise charges.",
  },
];

const testimonials = [
  {
    name: "Rayshawn W.",
    quote:
      "Noxstone keeps my yard looking sharp every single week. Easy to work with and always on time.",
  },
  {
    name: "Charli F.",
    quote:
      "They cleaned up a really overgrown property and now it's the best looking lot on the block.",
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Freshly mowed lawn at a Pottawatomie County home"
            width={1920}
            height={1280}
            className="h-full w-full object-cover opacity-30 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/85 to-background" />
        </div>
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline)] bg-surface/60 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Trusted Local Experts
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Professional <span className="text-primary">Lawn &amp; Landscape</span> Maintenance in
            Pottawatomie County
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Noxstone delivers clean, consistent property care for homes and businesses across
            Shawnee, Tecumseh, McLoud, and the surrounding area.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
            >
              <Sparkles className="h-4 w-4" />
              Request a free quote
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-5 py-3 text-sm font-semibold hover:border-primary"
            >
              View services
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">What we do</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built for clean, consistent property care
            </h2>
            <p className="mt-3 text-muted-foreground">
              From weekly mowing to full property resets — one local team, one professional
              standard.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.to} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-surface-elevated py-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Why Noxstone</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Why property owners choose us
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--hairline)] bg-surface p-6"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--hairline)] bg-accent/40 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-background py-20">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Reviews</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Trusted by local property owners
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-[var(--hairline)] bg-surface p-6"
              >
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-3 text-base leading-relaxed text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
                  — {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
