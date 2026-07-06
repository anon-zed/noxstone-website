# Deployment

This site is a static Vite SPA deployed to **Cloudflare Pages**. The contact form submits to a **Cloudflare Pages Function** at `/api/contact`, which proxies leads to Matrix at `https://matrixhq.app/api/public/leads`.

## Local development

### Frontend only

```bash
bun install
bun run dev
```

Vite serves the React app at `http://localhost:5173`. The contact form will not work without the Pages Function running.

### Full stack (static build + Pages Function)

1. Copy `.env.example` to `.dev.vars` and fill in your Matrix credentials:

```bash
cp .env.example .dev.vars
```

2. Build and start the Pages dev server:

```bash
bun run build
bun run pages:dev
```

3. Open the URL shown by Wrangler (usually `http://localhost:8788`), go to `/contact`, and submit a test lead. Confirm it appears in Matrix under the `noxstone` organization.

## Environment variables

Set these in **Cloudflare Pages → Settings → Environment variables** for both Production and Preview:

| Variable | Description |
|----------|-------------|
| `MATRIX_API_KEY` | Public API key from Matrix → Leads → Public API (`mx_...`) |
| `MATRIX_ORG_SLUG` | Business organization slug in Matrix (default: `noxstone`) |
| `MATRIX_LEADS_URL` | `https://matrixhq.app/api/public/leads` |

For local testing, put the same values in `.dev.vars` (gitignored).

Never expose these in client-side code or `VITE_` / `PUBLIC_` prefixed variables.

## Cloudflare Pages setup

1. Push this repo to GitHub.
2. In **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**, select the repository.
3. Configure the build:

| Setting | Value |
|---------|-------|
| Framework preset | None |
| Build command | `bun run build` |
| Build output directory | `dist/client` |
| Root directory | `/` |

4. Add the environment variables listed above.
5. Deploy. Cloudflare will rebuild on every push to `main`.
6. Attach your custom domain (`noxstone.com`, `www.noxstone.com`) under **Custom domains** if DNS is on Cloudflare.

## Architecture

```
Browser  →  POST /api/contact  →  Cloudflare Pages Function (functions/api/contact.ts)
                                        ↓
                               POST https://matrixhq.app/api/public/leads
                               Header: X-API-Key
```

The browser never talks to Matrix directly, so CORS configuration on Matrix is optional for this setup.

## Matrix checklist

- Confirm the business org slug matches `MATRIX_ORG_SLUG` (e.g. `noxstone`).
- Generate a Public API key in Matrix (Leads → Public API tab).
- Test a submission after deploy and verify the lead appears in Matrix CRM.

## SPA routing

Client-side routes (`/services`, `/contact`, etc.) are handled by `public/_redirects`, which serves `index.html` for all non-file paths. Static assets and `/api/contact` are served before the catch-all rule.
