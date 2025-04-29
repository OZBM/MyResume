/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A3D62',
        secondary: '#2E4057',
        accent: '#F9C22E',
        dark: '#1A1A1A',
        light: '#F5F5F5',
      },
    },
  },
  plugins: [],
}
