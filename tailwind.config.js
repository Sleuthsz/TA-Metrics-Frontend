/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    ".src/pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'regal-blue': '#243c5a',
        'lab-green': '#24cca9',
        'other-green': '#ecfdf5',
        'form-green': '#6fe6b7',
        'button-green': '#15b981',
        'form-input-box-green': '#a8f4d0',
        'table-cell-darker-green': '#16a34a',
        'table-cell-lighter-green': '#86efac',
        'table-cell-green': '#35d399',
        'th-green': '#15b981',
        'fake-button': '#d1fae4',
      },
    },
  },
  plugins: [],
}
