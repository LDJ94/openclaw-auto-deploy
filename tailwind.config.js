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
        "accent-blue": "#e0f2fe",
        "accent-pink": "#fce7f3",
        "accent-yellow": "#fef3c7",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "Noto Sans SC", "sans-serif"],
      },
    },
  },
  plugins: [],
}
