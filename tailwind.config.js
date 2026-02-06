/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "gelato-cream": "#FAF9F6", // Off-white/Cream background
        "gelato-mint": "#E0F2F1", // Light mint
        "gelato-strawberry": "#EF5350", // Vibrant red for alerts
        "gelato-chocolate": "#3E2723", // Dark brown text
        "gelato-cone": "#FFCC80", // Biscuit color for accents/buttons
        "gelato-pistachio": "#C8E6C9", // Soft green for success
        "gelato-vanilla": "#FFFDE7", // Highlight
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
