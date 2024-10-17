import type { Config } from "tailwindcss";

const config: Config = {
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
        "even-darker-blue": "#0F2A50",
        "very-light-gray": "#EDEDED",
        "secondary": "#78A1CC",
        "gray-shadow":"#d9d9d9",
      },
    },
  },
  plugins: [],
};
export default config;
