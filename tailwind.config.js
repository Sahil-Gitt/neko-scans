/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media', // or 'class'
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000',
        foreground: '#fff',
        primary: {
          DEFAULT: '#ffcc00',
          dark: '#cc9900',
        },
        secondary: {
          DEFAULT: '#1a1a1a',
          dark: '#0d0d0d',
        },
      },
    },
  },
  plugins: [],
}

