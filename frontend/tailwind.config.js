/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B1F5E", // Deep Navy Blue
          50: "#EEF2FF",
          100: "#DCE4FF",
          200: "#B9C8FF",
          300: "#8EA4FF",
          400: "#5C76FF",
          500: "#2F4EFF",
          600: "#0B1F5E",
          700: "#081849",
          800: "#061236",
          900: "#030A1C",
        },

        secondary: {
          DEFAULT: "#FFC107", // Learning Routes Yellow
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#FFCA28",
          500: "#FFC107",
          600: "#FFB300",
          700: "#FFA000",
          800: "#FF8F00",
          900: "#FF6F00",
        },

        accent: "#2563EB", // CTA Blue
        success: "#16A34A",
        danger: "#DC2626",

        dark: "#111827",
        light: "#F8FAFC",
        border: "#E5E7EB",
        muted: "#6B7280",
      },
    },
  },
  plugins: [],
};
