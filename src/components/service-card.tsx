import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";

export interface ServiceCardProps {
  to: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export function ServiceCard({ to, title, description, icon: Icon }: ServiceCardProps) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col rounded-2xl border border-[var(--hairline)] bg-surface p-6 transition-all hover:border-primary hover:shadow-[0_8px_40px_-12px_var(--brand)]"
    >
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--hairline)] bg-accent/40 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
        Learn more
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
