import { StrictMode, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { ThemeProvider } from "./components/theme-provider";
import { ContactPage } from "./routes/contact";
import { FormTestPage } from "./routes/form-test";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);

function StaticPageShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </ThemeProvider>
  );
}

function isPlainLeftClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.altKey && !event.ctrlKey && !event.shiftKey;
}

function getInternalPath(anchor: HTMLAnchorElement) {
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;

  const url = new URL(anchor.href);
  if (url.origin !== window.location.origin) return null;

  return `${url.pathname}${url.search}${url.hash}`;
}

function App() {
  const [path, setPath] = useState(
    () => `${window.location.pathname}${window.location.search}${window.location.hash}`,
  );
  const pathname = window.location.pathname;
  const router = useMemo(
    () => (pathname === "/contact" || pathname === "/form-test" ? null : getRouter()),
    [path, pathname],
  );

  useEffect(() => {
    function syncPath() {
      setPath(`${window.location.pathname}${window.location.search}${window.location.hash}`);
      window.scrollTo({ top: 0, left: 0 });
    }

    function handleClick(event: MouseEvent) {
      if (!isPlainLeftClick(event)) return;
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const nextPath = getInternalPath(anchor);
      if (!nextPath) return;

      event.preventDefault();
      if (
        nextPath !== `${window.location.pathname}${window.location.search}${window.location.hash}`
      ) {
        window.history.pushState(null, "", nextPath);
      }
      syncPath();
    }

    window.addEventListener("popstate", syncPath);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("popstate", syncPath);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  if (pathname === "/contact") {
    return (
      <StaticPageShell>
        <ContactPage />
      </StaticPageShell>
    );
  }

  if (pathname === "/form-test") {
    return <FormTestPage />;
  }

  return router ? <RouterProvider key={path} router={router} /> : null;
}

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
