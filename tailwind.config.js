module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'ecologi-green': '#035f48',
        'ecologi-brown': '#e8e4df',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
