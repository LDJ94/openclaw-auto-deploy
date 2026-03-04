export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ee2b5b",
        "background-light": "#fcf8f8",
        "background-dark": "#221015",
        "accent-blue": "#e0f2fe",
        "accent-pink": "#fce7f3",
        "accent-yellow": "#fef3c7",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Noto Sans SC", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
}
