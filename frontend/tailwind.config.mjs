/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          800: 'rgb(55 65 81)',
        },
        purpleOwn:{
          800:'#5a53ff'
        },
        loginBtn:{
          800: 'rgb(55 65 81)',
          900: 'rgb(31 41 55)',
          green:'#32de84'
        }
      },
    },
  },
  plugins: [],
};
