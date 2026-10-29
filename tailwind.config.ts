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
        brand: {
          orange: "#E84A0C",
          "orange-deep": "#C13A08",
          "orange-light": "#FF6B35",
          dark: "#1C1208",
          blue: "#5B9BD5",
          teal: "#6BBF8E",
          amber: "#F5A623",
        },
        news: {
          red: "#D32F2F",
          breaking: "#E84A0C",
        },
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
        sarala: ["Sarala", "sans-serif"],
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-down": "slideDown 0.3s ease-in-out",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "Sarala, sans-serif",
            lineHeight: "1.8",
            fontSize: "1.125rem",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
