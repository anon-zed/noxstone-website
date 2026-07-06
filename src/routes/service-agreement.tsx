import { createFileRoute } from "@tanstack/react-router";
import { Download, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/service-agreement")({
  head: () => ({
    meta: [
      { title: "Service Agreement & Client Terms — Noxstone Lawn & Landscape" },
      {
        name: "description",
        content:
          "Noxstone's client-friendly service agreement: scheduling, payment, property access, damage concerns, and more.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Service Agreement — Noxstone Lawn & Landscape" },
      {
        property: "og:description",
        content: "Clear expectations. Professional service. Protected property.",
      },
      { property: "og:url", content: "https://noxstone.com/service-agreement" },
      { rel: "canonical", href: "https://noxstone.com/service-agreement" },
    ],
  }),
  component: ServiceAgreementPage,
});

const sections: { id: string; title: string; body: string; bullets?: string[] }[] = [
  {
    id: "services-provided",
    title: "1. Services Provided",
    body: "Noxstone provides lawn care, landscape maintenance, cleanup, and related outdoor services as requested by the client and accepted by Noxstone.",
    bullets: [
      "Typical lawn care may include mowing, trimming, edging, and blowing off hard surfaces.",
      "Landscape work, cleanup, installation, or specialty services will be priced separately unless included in the approved quote.",
      "The exact scope, price, and frequency are based on the approved quote, estimate, invoice, written message, or service plan.",
    ],
  },
  {
    id: "scheduling",
    title: "2. Scheduling and Route-Based Service",
    body: "Noxstone operates on a route-based schedule so that service can be completed efficiently and consistently.",
    bullets: [
      "Requested days or times will be considered, but exact arrival windows are not guaranteed unless confirmed in writing.",
      "Service may be rescheduled because of rain, excessive heat, wet turf, unsafe conditions, equipment issues, staffing, or route changes.",
      "Same-day service is not guaranteed and depends on availability.",
    ],
  },
  {
    id: "client-responsibilities",
    title: "3. Client Responsibilities",
    body: "To help us complete the work safely and efficiently, the client agrees to prepare the property before service.",
    bullets: [
      "Remove toys, hoses, furniture, tools, trash, loose objects, and other obstacles from the service area.",
      "Remove pet waste before mowing or lawn service.",
      "Secure pets indoors, in a kennel, or away from the work area.",
      "Unlock gates or provide access instructions before the scheduled service.",
      "Clearly mark or disclose sprinkler heads, irrigation components, drain caps, low-voltage lighting, wiring, invisible dog fence lines, shallow utilities, septic components, and any other hidden or fragile items.",
    ],
  },
  {
    id: "hidden-hazards",
    title: "4. Hidden Hazards and Property Conditions",
    body: "Noxstone will take reasonable care while servicing the property. However, Noxstone is not responsible for damage caused by hidden, unmarked, improperly installed, poorly maintained, or pre-existing property conditions.",
    bullets: [
      "Examples include unmarked sprinkler heads, buried wiring, shallow irrigation, hidden rocks, exposed roots, unstable edging, rotten fence boards, loose pavers, fragile lawn decor, or objects hidden in tall grass.",
      "If a known hazard exists, please point it out before service begins so we can work around it when possible.",
    ],
  },
  {
    id: "overgrowth",
    title: "5. Overgrowth and Excessive Conditions",
    body: "Pricing assumes normal service conditions unless otherwise stated. Extra charges may apply when a property requires additional time, labor, equipment wear, hauling, or cleanup.",
    bullets: [
      "Examples include excessively tall grass, heavy weeds, thick growth, storm debris, neglected beds, wet or matted turf, or areas that cannot be maintained safely at normal speed.",
      "When practical, Noxstone will notify the client before completing work that requires an additional charge.",
    ],
  },
  {
    id: "payment",
    title: "6. Payment Terms",
    body: "",
    bullets: [
      "Payment is due upon receipt of invoice unless another payment schedule is agreed to in writing.",
      "Accepted payment methods may include cash, check, credit card, debit card, ACH, or other approved electronic payment methods.",
      "Invoices more than 30 days past due may be subject to a late fee of $25 or 10% of the outstanding balance, whichever is greater, for each month the balance remains overdue, where allowed by law.",
      "Noxstone may pause or discontinue service on accounts with unpaid balances.",
      "The client is responsible for reasonable costs of collection if an unpaid account is sent to collections or legal recovery, where allowed by law.",
    ],
  },
  {
    id: "auto-pay",
    title: "7. Recurring Billing and Auto-Pay",
    body: "For recurring service, the client may choose to keep a payment method on file for automatic billing.",
    bullets: [
      "By enrolling in auto-pay, the client authorizes Noxstone to charge the approved payment method for completed services or the agreed billing cycle.",
      "The client is responsible for keeping payment information current.",
      "Failed payments may result in delayed service, paused service, cancellation, or applicable late fees.",
      "Auto-pay may be cancelled with written notice before the next billing cycle.",
    ],
  },
  {
    id: "cancellations",
    title: "8. Cancellations, Access Issues, and Skipped Visits",
    body: "",
    bullets: [
      "Please provide at least 24 hours notice to cancel or reschedule a visit.",
      "Late cancellations, locked gates, unsecured animals, blocked access, or other client-caused no-access situations may result in a $25 fee or the normal visit minimum, at Noxstone's discretion.",
      "If service is skipped because of weather or route conditions, Noxstone will make reasonable efforts to complete service as soon as practical.",
    ],
  },
  {
    id: "damage",
    title: "9. Damage Concerns",
    body: "If the client believes Noxstone caused property damage, the client should notify Noxstone as soon as possible, preferably within 48 hours of service, so the concern can be reviewed while the facts are still fresh.",
    bullets: [
      "Please include a description of the concern, the service date, and photos if available.",
      "Noxstone reserves the right to inspect and verify the concern before repair, replacement, or compensation is offered.",
      "Noxstone will be responsible for verified damage directly caused by Noxstone's negligence, subject to the limitations in this agreement and applicable law.",
      "Noxstone is not responsible for damage caused by hidden hazards, unmarked items, pre-existing conditions, normal turf stress, poor lawn health, drainage problems, grading issues, pests, disease, drought, or weather.",
    ],
  },
  {
    id: "weather",
    title: "10. Weather and Turf Conditions",
    body: "Service may be delayed, modified, or rescheduled when conditions make the work unsafe or likely to damage the property.",
    bullets: [
      "This may include rain, lightning, excessive heat, saturated soil, standing water, soft turf, high winds, or unsafe work conditions.",
      "Noxstone may adjust mowing height, skip certain areas, or delay service to protect the property and equipment.",
    ],
  },
  {
    id: "photos",
    title: "11. Photos and Marketing",
    body: "Noxstone may take before-and-after photos or short videos of the work area for documentation, portfolio use, website content, social media, or advertising.",
    bullets: [
      "Noxstone will not publish the client's name, address, house number, license plates, or other personally identifying information without separate permission.",
      "The client may opt out of marketing photos or videos at any time by giving written notice.",
    ],
  },
  {
    id: "ending-service",
    title: "12. Ending Service",
    body: "Either party may end service at any time with proper notice.",
    bullets: [
      "The client may cancel future service with at least 24 hours notice.",
      "Noxstone may refuse, pause, or discontinue service due to non-payment, unsafe conditions, aggressive animals, inaccessible areas, repeated cancellations, abusive behavior, or violations of this agreement.",
      "The client remains responsible for any completed work, approved charges, or outstanding balances.",
    ],
  },
  {
    id: "liability",
    title: "13. Limitation of Liability",
    body: "To the fullest extent permitted by law, Noxstone is not responsible for indirect, incidental, special, or consequential damages, including loss of use, loss of income, or unrelated property issues. For ordinary service disputes, Noxstone's responsibility is limited to verified direct damage caused by Noxstone's negligence or the amount required by applicable law.",
  },
  {
    id: "governing-law",
    title: "14. Governing Law",
    body: "This agreement is governed by the laws of the State of Oklahoma.",
  },
  {
    id: "acceptance",
    title: "15. Agreement Acceptance",
    body: "The client accepts these terms by signing this agreement, approving a quote or estimate, scheduling service, providing written or electronic confirmation, making payment, or allowing Noxstone to perform service after receiving these terms.",
  },
  {
    id: "entire-agreement",
    title: "16. Entire Agreement",
    body: "This agreement, together with any approved quote, estimate, invoice, written message, or service plan, represents the understanding between the client and Noxstone for the services provided. If there is a conflict between a specific written quote and this agreement, the specific written quote controls for pricing and scope.",
  },
];

const summaryPoints = [
  "Please clear toys, debris, pet waste, and obstacles before service.",
  "Service days may shift due to weather, route efficiency, equipment issues, or unsafe conditions.",
  "Payment is due upon invoice unless another written arrangement is made.",
  "Hidden or unmarked hazards, overgrown lawns, late cancellations, or unpaid balances may result in extra charges, delayed service, or paused service.",
  "Noxstone takes reasonable care on every property and will review any good-faith damage concern promptly.",
];

function ServiceAgreementPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-primary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Noxstone — Lawn &amp; Landscape
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Service Agreement &amp; Client Terms
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Clear expectations. Professional service. Protected property.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            This agreement explains how Noxstone handles scheduling, service expectations, payment,
            property access, and damage concerns. It is written to keep things clear and fair for
            both the client and Noxstone. Specific services, pricing, and frequency will be
            confirmed in the approved quote, estimate, invoice, message, or written agreement.
          </p>
          <div className="mt-6">
            <a
              href="/noxstone-service-agreement.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--hairline)] px-4 py-2 text-sm font-semibold hover:border-primary"
            >
              <Download className="h-4 w-4 text-primary" />
              Download PDF
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-[var(--hairline)] bg-surface p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                On this page
              </p>
              <nav className="mt-3 flex flex-col gap-1.5 text-sm">
                <a href="#summary" className="text-muted-foreground hover:text-primary">
                  Simple Summary
                </a>
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="text-muted-foreground hover:text-primary"
                  >
                    {s.title}
                  </a>
                ))}
                <a href="#client-info" className="text-muted-foreground hover:text-primary">
                  Client &amp; Company Info
                </a>
              </nav>
            </div>
          </aside>

          <div className="space-y-10">
            <div
              id="summary"
              className="scroll-mt-24 rounded-2xl border border-[var(--hairline)] bg-surface p-6"
            >
              <h2 className="text-xl font-bold tracking-tight">Simple Summary</h2>
              <ul className="mt-4 space-y-2.5">
                {summaryPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{s.title}</h2>
                {s.body ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                ) : null}
                {s.bullets ? (
                  <ul className="mt-4 space-y-2.5">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span className="text-foreground/90">{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}

            <article id="client-info" className="scroll-mt-24">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Client and Company Information
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                The signed copy of this agreement records the following details. These fields are
                completed at the time of service signup.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--hairline)] bg-surface p-5 text-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Client
                  </p>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    <li>Client name</li>
                    <li>Service address</li>
                    <li>Phone / email</li>
                    <li>Signature &amp; date</li>
                  </ul>
                </div>
                <div className="rounded-xl border border-[var(--hairline)] bg-surface p-5 text-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Company
                  </p>
                  <ul className="mt-3 space-y-2 text-muted-foreground">
                    <li>Noxstone LLC</li>
                    <li>Trade name: Noxstone — Lawn &amp; Landscape</li>
                    <li>noxstone.com · (405) 888-8277 · mail@noxstone.com</li>
                    <li>Representative signature &amp; date</li>
                  </ul>
                </div>
              </div>
            </article>

            <p className="rounded-xl border border-[var(--hairline)] bg-surface-elevated p-4 text-xs text-muted-foreground">
              <strong>Business note:</strong> This template is designed to be client-friendly, but
              it should be reviewed by a qualified Oklahoma attorney before relying on it as legal
              advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
