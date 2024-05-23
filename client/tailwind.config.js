/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#FBFF4A',
        'background-gray': '#090909'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwind-plugin/expose-colors')({
      extract: ['primary-yellow', 'background-gray']
    })
  ],
};
