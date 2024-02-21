/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          150: "#F27C84",
          250: "#8E69FB",
        },
        green: {
          150: "#EC2326",
          250: "#8E69FB",
          350: '#EAEAEA',
          450: "#1E1B4A"
        },
        gray: {
          150: "#ECECEC",
          250: "#2B2B2B",
          350: '#202027',
          450: '#686868',
          550: '#202020',
          850: '#F9F9F9'
        },
        accent: {
          1: "hsl(var(--color-accent1)/<alpha-value>)",
          2: "hsl(var(--color-accent2)/<alpha-value>)",
        },
        bkg: "hsl(var(--color-bkg)/<alpha-value>)",
        heading: "rgb(var(--color-heading)/<alpha-value>)",
        bkgdark: "hsl(var(--color-dark-bkg)/<alpha-value>)",
      }
    },
  },
  plugins: [],
}

