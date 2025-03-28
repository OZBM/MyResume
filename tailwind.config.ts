import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Ensure dark mode is enabled via class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define colors using HSL values for easy reference with CSS variables
        // Light Theme Colors
        'light-bg': 'hsl(220, 20%, 98%)',
        'light-fg': 'hsl(220, 15%, 25%)',
        'light-card': 'hsl(0, 0%, 100%)',
        'light-border': 'hsl(220, 15%, 90%)', // Added a light border color

        // Dark Theme Colors
        'dark-bg': 'hsl(230, 25%, 12%)', // Space Blue / Near Black
        'dark-fg': 'hsl(220, 15%, 88%)', // Silver-Gray
        'dark-card': 'hsl(230, 20%, 18%)',
        'dark-border': 'hsl(230, 20%, 30%)', // Added a dark border color

        // Shared Accent Colors (adjust lightness slightly for dark mode if needed)
        'primary': 'hsl(260, 85%, 60%)', // Electric Violet
        'primary-dark': 'hsl(260, 85%, 65%)', // Slightly lighter for dark mode contrast
        'secondary': 'hsl(180, 70%, 55%)', // Bright Cyan
        'secondary-dark': 'hsl(180, 70%, 60%)', // Slightly lighter for dark mode contrast
        'accent': 'hsl(30, 90%, 60%)', // Warm Orange
        'accent-dark': 'hsl(30, 90%, 65%)', // Slightly lighter for dark mode contrast
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Add potential animations/keyframes here later if needed
    },
  },
  plugins: [],
};
export default config;
