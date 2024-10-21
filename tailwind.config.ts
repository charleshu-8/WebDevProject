import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Light mode
        "light-text": "#030C17", // Black
        "light-background": "#FAFCFF", // White
        "light-primary": "#073269", // Dark Blue
        "light-secondary": "#749DC8", // Light Blue
        "light-accent": "#C59C34", // Gold

        // Dark mode
        "dark-text": "#E8F1FC", // White
        "dark-background": "#000205", // Black
        "dark-primary": "#96C0F8", // Light Blue
        "dark-secondary": "#073269", // Dark Blue
        "dark-accent": "#CBA13A", // Gold

        // Misc.
        "extra-light-gray": "#EDEDED",
        "extra-gray": "#49454f",
        "extra-dark-gray": "#2b2a2d",
      },
    },
  },
  plugins: [],
};

export default config;
