import {
  Home,
  Briefcase,
  Mail,
  Menu,
  Sparkles,
  Scissors,
  Trees,
  Leaf,
  ChevronDown,
  X,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const LOGO_URL = "/noxstone-icon-logo.png";

const serviceItems = [
  { to: "/services/lawn-maintenance", label: "Lawn Maintenance", icon: Scissors },
  { to: "/services/landscape-maintenance", label: "Landscape Maintenance", icon: Trees },
  { to: "/services/property-cleanup", label: "Property Cleanup", icon: Leaf },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = typeof window === "undefined" ? "/" : window.location.pathname;
  const promoText =
    "Christmas light installation is now booking for the holiday season. Request a quote to reserve your spot!";
  const navClass = (href: string, exact = false) => {
    const isActive = exact
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
    return [
      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-primary",
      isActive ? "text-primary bg-accent/40" : "",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--hairline)] bg-background/80 backdrop-blur-md">
      <a
        href="/contact"
        className="block overflow-hidden bg-primary py-1.5 text-sm font-medium text-primary-foreground"
        aria-label={promoText}
      >
        <div className="promo-marquee flex whitespace-nowrap">
          <span className="promo-marquee-item">{promoText}</span>
          <span className="promo-marquee-item" aria-hidden="true">
            {promoText}
          </span>
        </div>
      </a>

      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="/" className="flex items-center gap-2.5">
          <img
            src={LOGO_URL}
            alt="Noxstone Lawn & Landscape"
            className="h-10 w-10 object-contain"
          />
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight">NOXSTONE</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Lawn &amp; Landscape
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          <a href="/" className={navClass("/", true)}>
            <Home className="h-4 w-4" />
            Home
          </a>

          <div className="relative group">
            <a href="/services" className={navClass("/services")}>
              <Briefcase className="h-4 w-4" />
              Services
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </a>
            <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <div className="min-w-[220px] rounded-xl border border-[var(--hairline)] bg-background p-1.5 shadow-lg">
                <a
                  href="/services"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-primary"
                >
                  <Briefcase className="h-4 w-4 text-primary" />
                  All Services
                </a>
                <div className="my-1 h-px bg-[var(--hairline)]" />
                {serviceItems.map(({ to, label, icon: Icon }) => (
                  <a
                    key={to}
                    href={to}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent hover:text-primary"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/contact" className={navClass("/contact")}>
            <Mail className="h-4 w-4" />
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="/contact"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:scale-[1.02]"
          >
            <Sparkles className="h-4 w-4" />
            Request a quote
          </a>

          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)]"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <button
            type="button"
            aria-label="Close menu backdrop"
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-dvh w-72 max-w-[85vw] flex-col border-l border-[var(--hairline)] bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Menu</p>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-7 flex flex-col gap-1">
              <a
                href="/"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2.5 rounded-lg px-3 py-3 text-base font-medium hover:bg-accent"
              >
                <Home className="h-5 w-5 text-primary" />
                Home
              </a>
              <a
                href="/services"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2.5 rounded-lg px-3 py-3 text-base font-medium hover:bg-accent"
              >
                <Briefcase className="h-5 w-5 text-primary" />
                Services
              </a>
              <div className="ml-8 flex flex-col gap-1">
                {serviceItems.map(({ to, label, icon: Icon }) => (
                  <a
                    key={to}
                    href={to}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-primary"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </a>
                ))}
              </div>
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2.5 rounded-lg px-3 py-3 text-base font-medium hover:bg-accent"
              >
                <Mail className="h-5 w-5 text-primary" />
                Contact
              </a>
              <a
                href="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Sparkles className="h-4 w-4" />
                Request a quote
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
