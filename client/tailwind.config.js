/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#FBFF4A',
        'background-gray': '#090909',
        'primary-gray': '#121212',
        'secondary-gray': '#4C4C4C'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwind-plugin/expose-colors')({
      extract: ['primary-yellow', 'background-gray', 'primary-gray', 'secondary-gray']
    })
  ],
};
