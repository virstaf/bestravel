export default {
  variants: {
    extend: {
      backgroundColor: ["active"],
      textColor: ["active"],
      borderColor: ["active"],
    },
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.{js,ts,jsx,tsx}",
  ],
};
