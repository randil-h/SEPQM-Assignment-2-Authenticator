/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        abcd: ['ABCDiatype', 'sans-serif'],
        cursive: ['Travel November', 'sans-serif'],
      },
      colors: {
        light_hover: '#e5e5e5',
        light: '#384550',
        dark: '#0d0f05', 
        dark_hover: '#4c4c4c',
        accent2: '#cfdbdf',
        maple: '#263232',
        accent: '#12250a',
        nomnom: '#052b8c'
      },
    },
  },
  plugins: [],
};
