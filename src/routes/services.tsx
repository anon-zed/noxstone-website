import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { Scissors, Trees, Leaf } from "lucide-react";
import { ServiceCard } from "@/components/service-card";
import { CTASection } from "@/components/cta-section";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Noxstone Lawn & Landscape" },
      {
        name: "description",
        content:
          "Lawn maintenance, landscape maintenance, and property cleanup services across Pottawatomie County, Oklahoma.",
      },
      { property: "og:title", content: "Services — Noxstone Lawn & Landscape" },
      {
        property: "og:description",
        content:
          "Lawn maintenance, landscape maintenance, and property cleanup across Pottawatomie County, OK.",
      },
      { property: "og:url", content: "https://noxstone.com/services" },
      { rel: "canonical", href: "https://noxstone.com/services" },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    to: "/services/lawn-maintenance",
    title: "Lawn Maintenance",
    description:
      "Weekly or bi-weekly mowing, edging, trimming, and clean blow-off so your lawn always looks dialed in.",
    icon: Scissors,
  },
  {
    to: "/services/landscape-maintenance",
    title: "Landscape Maintenance",
    description:
      "Shrub trimming, bed maintenance, weed control, and mulch refresh that keeps your landscape sharp.",
    icon: Trees,
  },
  {
    to: "/services/property-cleanup",
    title: "Property Cleanup",
    description:
      "Leaf cleanup, storm debris removal, and seasonal cleanups — including overgrown property resets.",
    icon: Leaf,
  },
] as const;

function ServicesPage() {
  const pathname = useLocation({ select: (location) => location.pathname });

  if (pathname !== "/services") {
    return <Outlet />;
  }

  return (
    <>
      <section className="bg-background py-16 sm:py-20">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Services</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Professional outdoor services
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            One local crew, one standard. Explore each service to see what's included and request a
            free quote.
          </p>
        </div>
      </section>

      <section className="bg-background pb-20">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.to} {...s} />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
