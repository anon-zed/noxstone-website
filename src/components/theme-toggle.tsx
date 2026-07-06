import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] bg-surface text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
