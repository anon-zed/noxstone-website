import { createFileRoute } from "@tanstack/react-router";
import { Trees } from "lucide-react";
import { ServiceDetail } from "@/components/service-detail";
import img from "@/assets/service-landscape.jpg";

export const Route = createFileRoute("/services/landscape-maintenance")({
  head: () => ({
    meta: [
      { title: "Landscape Maintenance in Pottawatomie County, OK | Noxstone" },
      {
        name: "description",
        content:
          "Shrub trimming, bed maintenance, weed control, and mulch refresh in Shawnee and surrounding Pottawatomie County, Oklahoma.",
      },
      { property: "og:title", content: "Landscape Maintenance — Noxstone Lawn & Landscape" },
      {
        property: "og:description",
        content: "Professional landscape maintenance across Pottawatomie County, Oklahoma.",
      },
      { property: "og:url", content: "https://noxstone.com/services/landscape-maintenance" },
      { rel: "canonical", href: "https://noxstone.com/services/landscape-maintenance" },
    ],
  }),
  component: () => (
    <ServiceDetail
      eyebrow="Landscape Maintenance"
      title="Sharp beds, healthy plants, clean lines"
      intro="Keep your landscaping looking intentional year-round. We trim shrubs, maintain beds, control weeds, and refresh mulch so the whole property looks dialed in."
      image={img}
      imageAlt="Trimmed shrubs in a freshly mulched landscape bed"
      icon={Trees}
      included={[
        "Shrub and ornamental trimming",
        "Bed weeding and weed-control treatment",
        "Mulch top-off and refresh",
        "Bed-edge re-cut for clean lines",
        "Light pruning of small ornamentals",
        "Seasonal bed reset and cleanup",
      ]}
    />
  ),
});
