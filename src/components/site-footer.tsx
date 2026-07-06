import { Phone, Mail, MapPin } from "lucide-react";

const LOGO_URL = "/noxstone-icon-logo.png";

const CLIENT_LOGIN_URL =
  "https://clienthub.getjobber.com/client_hubs/407dd587-a4ef-41b0-8650-1cb1a30bc552/login/new?source=share_login";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-surface-elevated">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <img src={LOGO_URL} alt="" className="h-11 w-11 object-contain" />
              <div className="leading-tight">
                <p className="text-sm font-bold tracking-tight">NOXSTONE</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Lawn &amp; Landscape
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Professional lawn and landscape maintenance for residential and commercial properties
              across Pottawatomie County, Oklahoma.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-primary">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-primary">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-primary">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={CLIENT_LOGIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  Client Login
                </a>
              </li>
              <li>
                <a href="/service-agreement" className="hover:text-primary">
                  Service Agreement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 text-primary" />
                <a href="tel:+14058888277" className="hover:text-primary">
                  (405) 888-8277
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-primary" />
                <a href="mailto:mail@noxstone.com" className="hover:text-primary">
                  mail@noxstone.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                <span>Pottawatomie County, OK</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-[var(--hairline)] pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Noxstone LLC. All rights reserved.</p>
          <p>Noxstone — Lawn &amp; Landscape · Shawnee, OK</p>
        </div>
      </div>
    </footer>
  );
}
