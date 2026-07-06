## Goal

Build a modern, professional multi-page marketing site for **Noxstone — Lawn & Landscape**, matching the dark/green brand style of the uploaded print materials and using the uploaded logo. Supports light + dark mode with a header toggle, header Client Login link to Jobber, and a Service Agreement page reachable only from the footer.

## Pages / Routes

```
Header:
/                                Home
/services                        Services hub
/services/lawn-maintenance       SEO detail page
/services/landscape-maintenance  SEO detail page
/services/property-cleanup       SEO detail page
/contact                         Contact + embedded Jobber form
Client Login                     External link to Jobber (not a real route)

Footer-only (not in header):
/service-agreement               Service Agreement & Client Terms
```

No About page. Each internal route has unique `head()` metadata (title, description, og:title, og:description, og:url) and a canonical link on the leaf. `LocalBusiness` JSON-LD lives on `__root.tsx`. `sitemap.xml` server route includes all internal routes (excluding `/service-agreement` is optional — include it since it's still publicly linked). `public/robots.txt` allows everything.

## Brand & design system

Brand pulled from the door hanger / business card. Dark = primary, light = faithful inverse with same green accents.

**Shared tokens (oklch in `src/styles.css`)**:
- Primary green: `#3aa635`
- Deep brand green: `#1f5a1a`
- Soft moss highlight: `#7fc97a`

**Dark mode (default)**: near-black bg `#0d0d0d`, surface `#161616`, white text, low-opacity green hairlines.
**Light mode**: warm off-white bg, white surface, near-black text, same green accents.

**Theme toggle**: `ThemeProvider` adds/removes `.dark` on `<html>`, persisted in `localStorage`, default dark. `ThemeToggle` (Sun/Moon icon) in header.

**Typography**: Inter (Google Fonts, 400/500/600/700/800), tight tracking on headlines, comfortable body line-height.

**Visual motifs**: thin green rounded-rectangle outlines, green circular icon badges, leaf-divider sections, white/foreground word + green emphasis word in hero headline.

**Imagery**: generated lawn/property photos in `src/assets/`, framed with green hairline. Logo: `user-uploads://Noxstone_L_L_Logo.png` → `src/assets/noxstone-logo.png`, used in header + footer.

## Shared components

- `SiteHeader` — sticky nav, logo left, **icon + label** nav links (works as a row across desktop, drawer on mobile):
  - Home — `Home`
  - Services — `Scissors`
  - Contact — `Mail`
  - Client Login — `LogIn` (external `<a>` to `https://clienthub.getjobber.com/client_hubs/407dd587-a4ef-41b0-8650-1cb1a30bc552/login/new?source=share_login`, `target="_blank"`, `rel="noopener noreferrer"`)
  - Right cluster: `ThemeToggle` (Sun/Moon) + green "Request a quote" pill (`Sparkles`) → `/contact`
- `SiteFooter` — logo, service areas, phone `(405) 888-8277`, email `mail@noxstone.com`, copyright. Includes secondary link row with **Service Agreement** (`/service-agreement`) and Client Login.
- `SectionDivider`, `ServiceCard`, `FeatureRow`, `CTASection`, `ThemeProvider`, `useTheme`, `ThemeToggle`.

All wrapped in `__root.tsx` with `<Outlet />`.

## Page content (from current site copy)

- **Home**: eyebrow "Trusted Local Experts" → headline "Professional **Lawn & Landscape** Maintenance in Pottawatomie County" → service-areas line → CTA → 3 service cards → "Built for Clean, Consistent Property Care" intro → "Why Property Owners Choose Us" 4-feature grid → testimonials (Rayshawn W., Charli F.) → final CTA.
- **Services hub**: intro + 3 service cards → CTA.
- **Service detail pages**: hero, expanded description, "What's included" bullets (mowing/edging/trimming/blowing; shrub trim/bed maintenance/weed control/mulch refresh; leaf cleanup/seasonal cleanups/debris removal/overgrowth cleanup), service-area mention, CTA.
- **Contact**: phone, email, service-area list, **embedded Jobber form**.

## Jobber form on /contact

Wired via TanStack Start `head()` on `/contact`:
- `head().links`: stylesheet `https://d3ey4dbjkt2f6s.cloudfront.net/assets/external/work_request_embed.css`
- `head().scripts`: `src=https://d3ey4dbjkt2f6s.cloudfront.net/assets/static_link/work_request_embed_snippet.js`, `clienthub_id="407dd587-a4ef-41b0-8650-1cb1a30bc552-2730432"`, `form_url="https://clienthub.getjobber.com/client_hubs/407dd587-a4ef-41b0-8650-1cb1a30bc552/public/work_request/embedded_work_request_form?form_id=2730432"`
- Render target `<div id="407dd587-a4ef-41b0-8650-1cb1a30bc552-2730432" />` inside a dark/green-hairline card.

## /service-agreement page (footer-linked, not in header)

Renders the uploaded "Service Agreement & Client Terms" as on-site, styled, readable HTML — not an embedded PDF — so it themes correctly and is SEO-friendly. Content sections:

- Page header: "Service Agreement & Client Terms" + subhead "Clear expectations. Professional service. Protected property." + intro paragraph.
- "Simple Summary" callout list (bullet pills with green icon).
- Sections 1–16 from the PDF, each as `<h2>` + paragraph + bullet list where applicable:
  1. Services Provided
  2. Scheduling and Route-Based Service
  3. Client Responsibilities
  4. Hidden Hazards and Property Conditions
  5. Overgrowth and Excessive Conditions
  6. Payment Terms
  7. Recurring Billing and Auto-Pay
  8. Cancellations, Access Issues, and Skipped Visits
  9. Damage Concerns
  10. Weather and Turf Conditions
  11. Photos and Marketing
  12. Ending Service
  13. Limitation of Liability
  14. Governing Law
  15. Agreement Acceptance
  16. Entire Agreement
- "Client and Company Information" placeholder block (visual reference of fields shown in PDF — name, service address, phone/email, signature/date — purely informational on the public page, not a fillable form).
- Footer note: "This template is designed to be client-friendly, but should be reviewed by a qualified Oklahoma attorney before relying on it as legal advice."
- Sticky sidebar (desktop) with section anchor links for quick navigation; collapses on mobile.
- Optional "Download PDF" button: copy the uploaded PDF to `public/noxstone-service-agreement.pdf` and link to it.
- `head()` meta sets title "Service Agreement — Noxstone Lawn & Landscape", own description, and `<meta name="robots" content="index, follow">`. Canonical `/service-agreement`.

Route is reachable only via the footer link (not in header nav or mobile drawer).

## Technical details

- Inter via `<link>` in `__root.tsx`.
- `ThemeProvider` mounted in `__root.tsx`; class applied to `<html>`.
- shadcn `Button`, `Card`, `Sheet`, `Input` used as needed.
- Lucide icons throughout (nav, services, features, theme toggle).
- Replace `src/routes/index.tsx` placeholder; add the new route files; update `__root.tsx` shell with header + `<Outlet />` + footer + sitewide meta + JSON-LD.
- `src/routes/sitemap[.]xml.ts` listing all 7 internal routes including `/service-agreement`; `public/robots.txt` with `Allow: /`.
- PDF copied to `public/noxstone-service-agreement.pdf` for download.

## Out of scope

- About page.
- Backend/database (Jobber handles forms; client login is external).
