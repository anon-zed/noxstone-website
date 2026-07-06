const MAX_BODY_BYTES = 65_536;
const MIN_SUBMISSION_TIME_MS = 2500;
const GENERIC_FAILURE_MESSAGE =
  "We couldn't submit the form right now. Please try again or call us directly.";
const SUCCESS_MESSAGE = "Thanks - we received your request and will follow up soon.";

interface Env {
  MATRIX_API_KEY: string;
  MATRIX_ORG_SLUG: string;
  MATRIX_LEADS_URL: string;
}

type FieldMap = Record<string, string>;

type ValidationResult =
  | { ok: true; lead: MatrixLeadPayload }
  | { ok: false; field?: string; message: string };

interface MatrixLeadPayload {
  organizationSlug: string;
  name: string;
  email: string;
  phone: string;
  propertyAddress?: string;
  serviceNeeded: string;
  serviceFrequency?: string;
  projectDetails?: string;
  source: "WEBSITE";
  metadata?: Record<string, string>;
}

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function normalizeFields(fields: Record<string, unknown>): FieldMap {
  const normalized: FieldMap = {};

  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      normalized[key] = value.map((item) => String(item)).join(", ");
    } else if (value !== null && value !== undefined) {
      normalized[key] = String(value);
    }
  }

  return normalized;
}

function firstField(fields: FieldMap, keys: string[]): string {
  for (const key of keys) {
    const value = fields[key];
    if (value !== undefined && value.trim() !== "") {
      return value;
    }
  }

  return "";
}

function truncateString(value: string, maxLength: number): string {
  return value.slice(0, maxLength);
}

function cleanField(value: string, maxLength: number): string {
  let cleaned = value.trim().replace(/<[^>]*>/g, "");
  cleaned = cleaned.replace(/[\x00-\x1F\x7F]/g, " ");
  cleaned = cleaned.replace(/\s+/g, " ").trim();
  return truncateString(cleaned, maxLength);
}

function cleanMultilineField(value: string, maxLength: number): string {
  let cleaned = value.trim().replace(/<[^>]*>/g, "");
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  cleaned = cleaned.replace(/[ \t]+/g, " ").trim();
  return truncateString(cleaned, maxLength);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isTooFast(startedAt: string | undefined): boolean {
  if (!startedAt || startedAt.trim() === "") {
    return false;
  }

  if (!/^\d+$/.test(startedAt.trim())) {
    return false;
  }

  const elapsed = Date.now() - Number(startedAt);
  return elapsed >= 0 && elapsed < MIN_SUBMISSION_TIME_MS;
}

function validateLead(fields: FieldMap, organizationSlug: string): ValidationResult {
  const name = cleanField(firstField(fields, ["name", "customer_name", "fullName", "full_name"]), 160);
  const email = cleanField(firstField(fields, ["email"]), 255);
  const phone = cleanField(firstField(fields, ["phone", "phoneNumber", "phone_number"]), 40);
  const propertyAddress = cleanField(
    firstField(fields, ["address", "service_address", "serviceAddress", "property_address"]),
    1000,
  );
  const serviceNeeded = cleanField(
    firstField(fields, [
      "service",
      "requested_service",
      "requestedService",
      "service_type",
      "service_needed",
    ]),
    160,
  );
  const projectDetails = cleanMultilineField(
    firstField(fields, ["message", "details", "notes", "project_details"]),
    5000,
  );
  const serviceFrequency = cleanField(
    firstField(fields, ["preferred_timeframe", "preferredTimeframe", "availability", "service_frequency"]),
    120,
  );

  if (name === "") {
    return { ok: false, field: "name", message: "Please include your name." };
  }

  if (phone === "") {
    return { ok: false, field: "phone", message: "Please include your phone number." };
  }

  if (email === "") {
    return { ok: false, field: "email", message: "Please include your email address." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, field: "email", message: "Please enter a valid email address." };
  }

  if (serviceNeeded === "") {
    return { ok: false, field: "service_needed", message: "Please choose a service." };
  }

  const metadata = removeEmptyValues({
    page_url: cleanField(fields.page_url ?? "", 500),
    referrer: cleanField(fields.referrer ?? "", 500),
  });

  const lead: MatrixLeadPayload = {
    organizationSlug,
    name,
    email,
    phone,
    serviceNeeded,
    source: "WEBSITE",
    ...(propertyAddress ? { propertyAddress } : {}),
    ...(serviceFrequency ? { serviceFrequency } : {}),
    ...(projectDetails ? { projectDetails } : {}),
    ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
  };

  return { ok: true, lead };
}

function removeEmptyValues(values: Record<string, string | undefined>): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(values)) {
    if (value !== undefined && value !== "") {
      result[key] = value;
    }
  }

  return result;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const contentLength = Number(context.request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse(413, { ok: false, message: "Please shorten your message and try again." });
  }

  let fields: FieldMap;

  try {
    const contentType = context.request.headers.get("content-type") ?? "";

    if (!contentType.includes("application/json")) {
      return jsonResponse(400, { ok: false, message: "Please check the form and try again." });
    }

    const rawBody = await context.request.text();
    if (rawBody.length > MAX_BODY_BYTES) {
      return jsonResponse(413, { ok: false, message: "Please shorten your message and try again." });
    }

    const decoded = JSON.parse(rawBody) as Record<string, unknown>;
    if (!decoded || typeof decoded !== "object" || Array.isArray(decoded)) {
      return jsonResponse(400, { ok: false, message: "Please check the form and try again." });
    }

    fields = normalizeFields(decoded);
  } catch {
    return jsonResponse(400, { ok: false, message: "Please check the form and try again." });
  }

  if (cleanField(fields.company_name ?? "", 120) !== "") {
    return jsonResponse(200, { ok: true, message: SUCCESS_MESSAGE });
  }

  if (isTooFast(fields.form_started_at)) {
    return jsonResponse(400, { ok: false, message: "Please wait a moment and try again." });
  }

  const organizationSlug = (context.env.MATRIX_ORG_SLUG || "noxstone").trim();
  const validation = validateLead(fields, organizationSlug);

  if (!validation.ok) {
    return jsonResponse(400, {
      ok: false,
      message: validation.message,
      field: validation.field ?? null,
    });
  }

  const apiKey = context.env.MATRIX_API_KEY?.trim() ?? "";
  const leadsUrl = context.env.MATRIX_LEADS_URL?.trim() ?? "";

  if (!apiKey || !leadsUrl) {
    console.error("Matrix contact configuration error", {
      missing_api_key: !apiKey,
      missing_leads_url: !leadsUrl,
    });
    return jsonResponse(500, { ok: false, message: GENERIC_FAILURE_MESSAGE });
  }

  try {
    const response = await fetch(leadsUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(validation.lead),
    });

    if (response.status === 201) {
      return jsonResponse(200, { ok: true, message: SUCCESS_MESSAGE });
    }

    let errorMessage = GENERIC_FAILURE_MESSAGE;

    try {
      const errorBody = (await response.json()) as { error?: string };
      if (errorBody.error) {
        console.error("Matrix contact submission failed", {
          status: response.status,
          error: errorBody.error,
        });

        if (response.status === 400) {
          errorMessage = errorBody.error;
        }
      }
    } catch {
      console.error("Matrix contact submission failed", { status: response.status });
    }

    return jsonResponse(response.status >= 500 ? 502 : response.status, {
      ok: false,
      message: errorMessage,
    });
  } catch (error) {
    console.error("Matrix contact submission failed", { error: String(error) });
    return jsonResponse(502, { ok: false, message: GENERIC_FAILURE_MESSAGE });
  }
};
