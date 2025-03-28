"use client";

import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Mount check to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Placeholder button while mounting
  if (!mounted) {
    return (
      <button
        className="flex items-center justify-center rounded-md p-2 text-muted-foreground" // Use muted foreground for placeholder
        aria-label="Loading theme toggle"
        disabled // Disable while loading
      >
        <Sun className="h-5 w-5" /> {/* Basic icon */}
      </button>
    );
  }

  // Main theme toggle button
  return (
    <button
      onClick={cycleTheme}
      // Updated hover background and focus ring
      className="flex items-center justify-center rounded-md p-2 text-foreground dark:text-dark-fg hover:bg-muted dark:hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background transition-colors"
      aria-label="Toggle theme"
    >
      {/* Updated icon colors and hover states */}
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-accent dark:text-accent-dark hover:opacity-80 transition-opacity" />
      ) : theme === "dark" ? (
        <Moon className="h-5 w-5 text-primary dark:text-primary-dark hover:opacity-80 transition-opacity" />
      ) : (
        <Monitor className="h-5 w-5 text-foreground/70 dark:text-dark-fg/70 hover:opacity-80 transition-opacity" />
      )}
    </button>
  );
}
