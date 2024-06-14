/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        headerColor:'#E6F3FF',
        buttonColor:'#2C73B5',
        inputColor: '#B0BAC3'
      }
    },
    // container:{
    //   padding: {
    //     md: "4rem",
    //   },
    // }
  },
  plugins: [],
}

