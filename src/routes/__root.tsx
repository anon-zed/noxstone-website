import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[var(--hairline)] px-5 py-2.5 text-sm font-semibold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://noxstone.com/#business",
      name: "Noxstone - Lawn & Landscape",
      url: "https://noxstone.com/",
      image: "https://noxstone.com/og.jpg",
      logo: "https://noxstone.com/noxstone-icon-logo.png",
      telephone: "+1-405-888-8277",
      email: "mail@noxstone.com",
      priceRange: "$$",
      description:
        "Professional lawn maintenance, landscape maintenance, and property cleanup for residential and commercial properties across Pottawatomie County, Oklahoma.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shawnee",
        addressRegion: "OK",
        addressCountry: "US",
      },
      areaServed: [
        "Pottawatomie County, Oklahoma",
        "Shawnee, Oklahoma",
        "Tecumseh, Oklahoma",
        "McLoud, Oklahoma",
        "Bethel Acres, Oklahoma",
        "Dale, Oklahoma",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "19:30",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://noxstone.com/#website",
      url: "https://noxstone.com/",
      name: "Noxstone - Lawn & Landscape",
      publisher: { "@id": "https://noxstone.com/#business" },
    },
  ],
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Noxstone - Lawn & Landscape" },
      {
        name: "description",
        content:
          "Professional lawn care, landscape maintenance, and property cleanup across Pottawatomie County, Oklahoma.",
      },
      { name: "author", content: "Noxstone LLC" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Noxstone - Lawn & Landscape" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Noxstone - Lawn & Landscape" },
      { name: "twitter:title", content: "Noxstone - Lawn & Landscape" },
      {
        property: "og:description",
        content:
          "Professional lawn care, landscape maintenance, and property cleanup across Pottawatomie County, Oklahoma.",
      },
      {
        name: "twitter:description",
        content:
          "Professional lawn care, landscape maintenance, and property cleanup across Pottawatomie County, Oklahoma.",
      },
      { property: "og:url", content: "https://noxstone.com/" },
      { property: "og:image", content: "https://noxstone.com/og.jpg" },
      {
        property: "og:image:alt",
        content: "Landscaped residential property maintained by Noxstone",
      },
      { name: "twitter:image", content: "https://noxstone.com/og.jpg" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png?v=2" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isFormTest = location.pathname === "/form-test";

  if (isFormTest) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Outlet />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <SiteHeader />
          <main className="flex-1">
            <Outlet />
          </main>
          <SiteFooter />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
