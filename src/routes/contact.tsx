import { createFileRoute } from "@tanstack/react-router";
import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { type FormEvent, useState } from "react";

const CONTACT_API_PATH = "/api/contact";
const DEFAULT_SUCCESS_MESSAGE = "Thanks - we received your request and will follow up soon.";
const DEFAULT_ERROR_MESSAGE =
  "We couldn't submit the form right now. Please try again or call us directly.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Noxstone — Request a Free Lawn Care Quote" },
      {
        name: "description",
        content:
          "Request a free quote for lawn maintenance, landscape maintenance, or property cleanup in Pottawatomie County, OK.",
      },
      { property: "og:title", content: "Contact Noxstone Lawn & Landscape" },
      {
        property: "og:description",
        content:
          "Request a free quote from Noxstone Lawn & Landscape, serving Pottawatomie County, OK.",
      },
      { property: "og:url", content: "https://noxstone.com/contact" },
      { rel: "canonical", href: "https://noxstone.com/contact" },
    ],
  }),
  component: ContactPage,
});

export function ContactPage() {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary">Contact</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Request a free quote
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tell us about your property and we'll get back to you with pricing and the next
            available service date.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-[var(--hairline)] bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Reach us
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 text-primary" />
                  <a href="tel:+14058888277" className="hover:text-primary">
                    (405) 888-8277
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 text-primary" />
                  <a href="mailto:mail@noxstone.com" className="hover:text-primary">
                    mail@noxstone.com
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Pottawatomie County, Oklahoma</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[var(--hairline)] bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Service area
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Shawnee, Tecumseh, McLoud, Bethel Acres, Dale, and surrounding Pottawatomie County
                communities.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--hairline)] bg-surface p-6">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                Hours
              </h2>
              <div className="mt-4 flex items-start gap-2.5 text-sm">
                <Clock className="mt-0.5 h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Monday-Friday</p>
                  <p className="mt-1 text-muted-foreground">9:00 AM - 7:30 PM</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-2xl border border-[var(--hairline)] bg-surface p-6 sm:p-8">
            <QuoteRequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteRequestForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now().toString());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const body = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    );

    body.page_url = window.location.href;
    body.referrer = document.referrer;

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch(CONTACT_API_PATH, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
      } | null;

      if (!response.ok || result?.ok !== true) {
        setStatus("error");
        setMessage(result?.message || DEFAULT_ERROR_MESSAGE);
        return;
      }

      form.reset();
      setFormStartedAt(Date.now().toString());
      setStatus("success");
      setMessage(result.message || DEFAULT_SUCCESS_MESSAGE);
    } catch {
      setStatus("error");
      setMessage(DEFAULT_ERROR_MESSAGE);
    }
  }

  return (
    <form
      className="space-y-5"
      action={CONTACT_API_PATH}
      method="post"
      onSubmit={handleSubmit}
      aria-busy={status === "submitting"}
    >
      <input
        type="text"
        name="company_name"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input type="hidden" name="form_started_at" value={formStartedAt} readOnly />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tell us what you need</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Share a few details and we'll follow up with your quote.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Name" name="name" autoComplete="name" required />
        <FormField label="Phone" name="phone" autoComplete="tel" required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Email" name="email" type="email" autoComplete="email" required />
        <FormField label="Property address" name="property_address" autoComplete="street-address" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          Service needed
          <select
            name="service_needed"
            required
            className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Select a service</option>
            <option value="Lawn Maintenance">Lawn Maintenance</option>
            <option value="Landscape Maintenance">Landscape Maintenance</option>
            <option value="Property Cleanup">Property Cleanup</option>
            <option value="Multiple Services">Multiple Services</option>
          </select>
        </label>

        <label className="block text-sm font-medium">
          Service frequency
          <select
            name="service_frequency"
            className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Select frequency</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-weekly">Bi-weekly</option>
            <option value="One-time">One-time</option>
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium">
        Project details
        <textarea
          name="project_details"
          rows={5}
          placeholder="Tell us about your property, timing, and anything else we should know."
          className="mt-2 w-full rounded-md border border-input bg-background px-3 py-3 text-sm"
        />
      </label>

      {status === "success" && (
        <p
          className="rounded-md border border-primary/25 bg-primary/10 px-3 py-2 text-sm text-foreground"
          role="status"
          aria-live="polite"
        >
          {message || DEFAULT_SUCCESS_MESSAGE}
        </p>
      )}

      {status === "error" && (
        <p
          className="rounded-md border border-destructive/25 bg-destructive/10 px-3 py-2 text-sm text-foreground"
          role="alert"
        >
          {message || DEFAULT_ERROR_MESSAGE}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto"
      >
        {status === "submitting" ? "Sending..." : "Request a quote"}
      </button>
    </form>
  );
}

function FormField({
  label,
  name,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm"
      />
    </label>
  );
}
