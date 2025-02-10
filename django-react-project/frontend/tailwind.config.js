/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      color: {
        logoRed: 'rgba(195, 42, 42, 1)',
      },
    },
  },
  plugins: [],
};
