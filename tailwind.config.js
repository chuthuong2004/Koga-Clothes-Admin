/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#eb3d63',
        card: '#ffffff',
        background: '#f8f7fa',
        error: '#ea5455'
      }
    },
  },
  plugins: [],
};
