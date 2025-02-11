/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        logoRed: {
          DEFAULT: '#C32A2A',
          hover: '#AA1E1E',
          disabled: 'rgba(195,42,42,0.5)',
        },
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        ':root': {
          '--logoRed': theme('colors.logoRed.DEFAULT'),
        },
      });
    },
  ],
};
