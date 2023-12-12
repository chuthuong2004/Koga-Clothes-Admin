/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#eb3d63',
        card: '#ffffff',
        background: '#f8f7fa',
        error: '#ea5455',
        backgroundButton: '#fef1f4',
        'text-color': '#2f2b3d',
        'text-color-secondary': '#a09ea3',
        danger: '#fce2e8',
        'danger-hover':  '#f8bec9'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
      },
    },
  },
  plugins: [],
};
