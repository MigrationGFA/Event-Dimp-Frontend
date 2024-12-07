/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1024px",
    },
    extend: {
      animation: ["motion-safe"], // This line doesn't belong here; moved to the correct place below
      colors: {
        primary1: "#FFFFFF",
        primary2: "#000000",
        primary3: "#9F68FE",
        primary4: "#2D1C4D",
        primary5: "#7D7C81",
        primary6: "#E7E6EA",
        primary7: "#0AAA10",
        primary8: "#8A8A8B",
        primary9: "#FCFCFCE5",
        primary10: "#9979D1",
        sec1: "#F4F1FF",
        sec2: "#D1D1D6",
        sec3: "#222020",
        sec4: "#F2F2F2",
        sec5: "#FFD700",
        sec6: "#C8C8D0",
        sec7: "#EDECEF",
        sec8: "#F60002",
        sec9: "#FFE4AD",
        sec10: "#F8B116",
        sec11: "#374151",
        ter1: "#EEE8F7",
        ter2: "#dcfce7",
        ter3: "#7A00A30A",
        ter4: "#4b5563",
        ter5: "#e9d5ff",
        ter6: "#15803d",
        ter7: "#b91c1c",
        ter8: "#22c55e",
        ter9: "#4b5563",
        ter10: "#EDF4FC",
        ter11: "#6b7280",
        ter12: "#6b7280",
        ter13: "#374151",
        ter14: "#f3e8ff",
        ter15: "#9ca3fa",
        grad12: "#005EFF",
        grad22: "#BB3CFF",
        warn1: "#FFFFE0",
      },
      fontFamily: {
        body: ["Poppins", "sans-serif"],
        sans: ["Outfit", "sans"],
        roboto: ["Roboto", "Arial", "sans-serif"],
        limelight: ["Limelight", "cursive"],
        sen: ["Sen", "sans-serif"], // Fixed typo: "san-serif" → "sans-serif"
        Raj: ["Rajdhani", "sans-serif"],
        jak: ["Plus Jakarta Sans", "sans-serif"],
        OnColos: ["Golos", "sans-serif"],
        Rufina: ["Rufina", "sans"],
        jost: ["Jost", "sans-serif"],
        Marcellus: ["Marcellus", "sans-serif"],
        Urbanist: ["Urbanist", "sans-serif"],
        Bebas: ["Bebas Neue", "sans-serif;"]
      },
      fontSize: {
        pS: "16px",
        pL: "20px",
        pXL: "24px",
        pXXL: "4rem",
        pXXXL: "5rem",
      },
    },
  },
  corePlugins: {
    animation: true, // Enable animations properly
  },
  plugins: [
    flowbite,
    function ({ addUtilities }) {
      addUtilities({
        ".text-outline": {
          "-webkit-text-fill-color": "transparent",
          "-webkit-text-stroke-width": "1px",
          "-webkit-text-stroke-color": "var(--base-color)",
        },
      });
    },
    function ({ addBase }) {
      addBase({
        "@media print": {
          "body *": {
            visibility: "hidden", // Hide everything
          },
          ".printable-modal, .printable-modal *": {
            visibility: "visible", // Show only the modal content
          },
          ".printable-modal": {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
          },
        },
      });
    },
  ],
};
