/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    container:{
      padding:{
        DEFAULT: '15px'
      }
    },
    screens:{
      sm:'140px',
      md:'760px',
      lg:'960px',
      xl:'1330px',

    },
    extend: {
      colors:{
        primary: '#242a2b',
        secondary: '#808080',
        accent:{
          DEFAULT: '#6D1D2A',
          secondary: '#5f1b26',
          tertiary: '#9c5762'
        },
        grey: '#f2e4e6'
      },
      fontFamily: {
        primary: 'Poppins'
      },
      boxShadow:{
        custom1: '0px 2px 40px 0px rgba(109, 29, 2, 0.2)',
        custom2: '0px 2px 40px 0px rgba(95, 27, 38, 0.6)',
      },
      backgroundImage:{
        services: 'url(../../assets/img/services/bg.svg)',
        testimonials: 'url(../../assets/img/testimonials/bg.svg)',
        valores: 'url(../../assets/img/valores/bg.svg)',
        quoteLeft: 'url(../../assets/icons/testimonials/quote-left.svg)',
        quoteRight: 'url(../../assets/icons/testimonials/quote-rig.svg)',


      },
    },
  },
  plugins: [],
}