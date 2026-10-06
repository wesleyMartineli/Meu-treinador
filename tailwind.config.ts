import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#000000",
          secondary: "#0E0E0E",
        },
        card: {
          DEFAULT: "#141414",
          hover: "#1A1A1A",
        },
        border: {
          DEFAULT: "#242424",
          subtle: "#181818",
          strong: "#333333",
        },
        mt: {
          bg: "#000000",
          bgSecondary: "#0E0E0E",
          card: "#141414",
          cardHover: "#1A1A1A",
          border: "#242424",
          gray: "#777777",
          grayLight: "#B8B8B8",
          white: "#F5F5F5",
          orange: "#FF6500",
          orangeHover: "#FF8A00",
          orangeDark: "#CC5100",
        },
        primary: {
          DEFAULT: "#FF6500",
          50: "#FFF5ED",
          100: "#FFE6D4",
          200: "#FFC8A8",
          300: "#FFA373",
          400: "#FF8A00",
          500: "#FF6500",
          600: "#E65700",
          700: "#BD4500",
          800: "#943600",
          900: "#7A2E00",
        },
        surface: {
          DEFAULT: "#121212",
          card: "#181818",
          elevated: "#1E1E1E",
          border: "#292929",
          subtle: "#101010",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "subtle": "0 2px 10px rgba(0, 0, 0, 0.4)",
        "orange-glow": "0 0 25px rgba(255, 101, 0, 0.15)",
        "orange-glow-sm": "0 0 12px rgba(255, 101, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
