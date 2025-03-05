"use client";

import { useTheme } from "@/components/ui/theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "system"> = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5 text-secondary hover:text-primary transition-colors" />
      ) : theme === "dark" ? (
        <Moon className="h-5 w-5 text-white hover:text-primary transition-colors" />
      ) : (
        <Monitor className="h-5 w-5 text-secondary dark:text-white hover:text-primary transition-colors" />
      )}
    </button>
  );
}
