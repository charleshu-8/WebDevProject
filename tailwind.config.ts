import type { Config } from "tailwindcss";

const config: Config = {
  important: true, // have tailwind take priority
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        "darker-blue": "#07326A",
        "dark-mode-blue-highlight": "#96C0F8",
        "darkest-blue": "#0F2A50",
        "dim-white": "#E8F1FC",
        "even-darker-blue": "#0F2A50",
        "very-light-gray": "#EDEDED",
        "secondary": "#78A1CC",
        "gray-shadow":"#d9d9d9",
        "stark-white": "#FAFCFF",
      },
    },
  },
  plugins: [],
};
export default config;
