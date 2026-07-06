import { createFileRoute } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { ServiceDetail } from "@/components/service-detail";
import img from "@/assets/service-lawn.jpg";

export const Route = createFileRoute("/services/lawn-maintenance")({
  head: () => ({
    meta: [
      { title: "Lawn Maintenance in Pottawatomie County, OK | Noxstone" },
      {
        name: "description",
        content:
          "Weekly and bi-weekly lawn mowing, edging, trimming, and blow-off in Shawnee and surrounding Pottawatomie County communities.",
      },
      { property: "og:title", content: "Lawn Maintenance — Noxstone Lawn & Landscape" },
      {
        property: "og:description",
        content: "Professional lawn mowing service across Pottawatomie County, Oklahoma.",
      },
      { property: "og:url", content: "https://noxstone.com/services/lawn-maintenance" },
      { rel: "canonical", href: "https://noxstone.com/services/lawn-maintenance" },
    ],
  }),
  component: () => (
    <ServiceDetail
      eyebrow="Lawn Maintenance"
      title="Crisp, route-consistent lawn care"
      intro="Reliable weekly or bi-weekly mowing service that keeps your lawn looking sharp from spring through fall. We show up on schedule, cut at the right height, and leave hard surfaces blown clean."
      image={img}
      imageAlt="Professional lawn mower cutting fresh green grass"
      icon={Scissors}
      included={[
        "Mowing at the correct seasonal height",
        "String trimming around fences and beds",
        "Edging along driveways, walks, and curbs",
        "Blow-off of driveways, walkways, and patios",
        "Mowing pattern variation to protect turf",
        "Weekly or bi-weekly route-based scheduling",
      ]}
    />
  ),
});
