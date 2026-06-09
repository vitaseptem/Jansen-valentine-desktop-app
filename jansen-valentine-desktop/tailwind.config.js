/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        // ── JANSEN VALENTINE — Maison Palette ──────────────
        noir: {
          50:  "#f8f6f4",
          100: "#ebe6e0",
          200: "#d6cdc1",
          300: "#a89b89",
          400: "#6e6457",
          500: "#3d362d",
          600: "#2a241d",
          700: "#1d1813",
          800: "#13100c",
          900: "#0a0807",
          950: "#050403",
        },
        ivory: {
          DEFAULT: "#F8F4ED",
          50:  "#fdfbf7",
          100: "#f8f4ed",
          200: "#f1ead9",
          300: "#e6dbc1",
          400: "#d4c298",
        },
        champagne: {
          DEFAULT: "#C8AD7F",
          light: "#E5D5B5",
          dark:  "#9B8358",
          deep:  "#6B5A3D",
        },
        rosedust: {
          DEFAULT: "#C9A6A0",
          light: "#E2C7C0",
          dark:  "#A37A72",
        },
        wine: {
          DEFAULT: "#7B1C2E",
          light:  "#A14250",
          dark:   "#4E0F1A",
          deep:   "#2E0810",
        },
        ink: {
          DEFAULT: "#1A1718",
          soft: "#2C2627",
          muted: "#5C5354",
        },
        stone: {
          DEFAULT: "#B5AEA8",
          light: "#D5CFC9",
          dark: "#7E7872",
        },
        // Semantic
        success: "#5B7A5D",
        warning: "#C8923E",
        danger:  "#9B3A3A",
        info:    "#6E7E9B",
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter Tight"', "Inter", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem", letterSpacing: "0.04em" }],
        xs:    ["0.75rem",   { lineHeight: "1.1rem",  letterSpacing: "0.025em" }],
        sm:    ["0.8125rem", { lineHeight: "1.2rem",  letterSpacing: "0.01em" }],
        base:  ["0.9375rem", { lineHeight: "1.5rem" }],
      },
      letterSpacing: {
        "luxe": "0.18em",
        "editorial": "0.32em",
      },
      borderRadius: {
        "xs": "2px",
        DEFAULT: "6px",
        "md": "10px",
        "lg": "14px",
        "xl": "20px",
        "2xl": "28px",
      },
      boxShadow: {
        "couture": "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(10,8,7,0.45)",
        "panel":   "0 1px 0 rgba(255,255,255,0.03) inset, 0 12px 28px -16px rgba(10,8,7,0.55)",
        "rim":     "0 0 0 1px rgba(200,173,127,0.15)",
        "rim-soft":"0 0 0 1px rgba(255,255,255,0.06)",
        "glow":    "0 0 32px -4px rgba(200,173,127,0.35)",
      },
      backgroundImage: {
        "noir-grain": "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
        "spotlight":  "radial-gradient(ellipse at top, rgba(200,173,127,0.08), transparent 70%)",
        "couture-card": "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
      },
      backgroundSize: {
        "grain": "3px 3px",
      },
      animation: {
        "fade-in":      "fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-up":     "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "shimmer":      "shimmer 2.4s linear infinite",
        "pulse-rim":    "pulseRim 2.4s ease-in-out infinite",
        "rotate-slow":  "rotate 24s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseRim: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(200,173,127,0.45)" },
          "50%":      { boxShadow: "0 0 0 8px rgba(200,173,127,0)" },
        },
        rotate: {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
