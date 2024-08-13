/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [/^no-tailwind/],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'magic-sparkle': 'sparkle 2s infinite',
      },
      keyframes: {
        sparkle: {
          '0%': { opacity: 0 },
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      zIndex: {
        '10': '10',
      },
      inset: {
        '0': '0',
        '1': '1%',
        '2': '2%',
        '7': '7%',
        '9': '9%',
        '14': '14%',
        '15': '15%',
        '21': '21%',
        '23': '23%',
        '43': '43%',
        '45': '45%',
        '48': '48%',
        '64': '64%',
        '88': '88%',
        '93': '93%',
        '95': '95%',
        '99': '99%',
      },
      delay: {
        '0.33': '0.33s',
        '0.5': '0.5s',
        '0.6': '0.6s',
        '0.9': '0.9s',
        '1.2': '1.2s',
        '1.4': '1.4s',
        '1.5': '1.5s',
        '1.7': '1.7s',
        '1.8': '1.8s',
        '1.9': '1.9s',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

