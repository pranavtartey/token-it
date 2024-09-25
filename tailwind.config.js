/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        parisienne: ['Parisienne', 'cursive'],
      },
    },
  },
  plugins: [],
};
