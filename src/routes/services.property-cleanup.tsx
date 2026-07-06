import { createFileRoute } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { ServiceDetail } from "@/components/service-detail";
import img from "@/assets/service-cleanup.jpg";

export const Route = createFileRoute("/services/property-cleanup")({
  head: () => ({
    meta: [
      { title: "Property Cleanup in Pottawatomie County, OK | Noxstone" },
      {
        name: "description",
        content:
          "Leaf cleanup, seasonal cleanups, storm debris removal, and overgrown property resets in Shawnee and surrounding Pottawatomie County.",
      },
      { property: "og:title", content: "Property Cleanup — Noxstone Lawn & Landscape" },
      {
        property: "og:description",
        content: "Professional property cleanup across Pottawatomie County, Oklahoma.",
      },
      { property: "og:url", content: "https://noxstone.com/services/property-cleanup" },
      { rel: "canonical", href: "https://noxstone.com/services/property-cleanup" },
    ],
  }),
  component: () => (
    <ServiceDetail
      eyebrow="Property Cleanup"
      title="Resets for neglected and seasonal properties"
      intro="From fall leaves to overgrown lots, we take properties from overwhelming to maintained. Great as a one-time reset or a recurring seasonal service."
      image={img}
      imageAlt="Crew clearing fallen leaves from a residential yard"
      icon={Leaf}
      included={[
        "Leaf cleanup and removal",
        "Spring and fall seasonal cleanups",
        "Storm debris pickup and haul-off",
        "Overgrowth cleanup and resets",
        "Bed clean-out and refresh",
        "Hard-surface blow-down",
      ]}
    />
  ),
});
