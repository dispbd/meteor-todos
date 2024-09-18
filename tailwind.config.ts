/* prettier-ignore */
/* eslint-disable quote-props */
/* Tailwind config, https://tailwindcss.com/docs/configuration */

/*
  Create a file if it doesn't exit ('wx' flag).
  Without this lines there is an error on first run after cloning
  from the repository.
*/
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('fs').writeFile('tailwindcss-extend.ts', '', { flag: 'wx' }, () => {})

// eslint-disable-next-line @typescript-eslint/no-require-imports
const tailwindcssExtend = require('./tailwindcss-extend.ts')?.default

module.exports = {
  plugins: [...(tailwindcssExtend ? [tailwindcssExtend] : [])],
  content: ['./src/**/*.{html,svelte}'],
  theme: {
    extend: {
      colors: {
        '@blue': '#2a81b8',
        '@blue-dark': '#1d5a86',
        '@blue-light': '#d2dee7',
        '@green': '#26c1a2',
        '@green-dark': '#1c5a4e',
        '@red': '#b82a2b',
        '@red-dark': '#501105',
        '@red-light': '#f1d4d5',
        '@gray': '#8e8e8e',
        '@gray-light': '#f9f5f5',
        '@gray-dark': '1E1E1E',
        black: '#000',
        white: '#fff',
        transparent: 'transparent',
      },
      spacing: {
        '@5': '0.3125rem',
        '@10': '0.625rem',
        '@15': '0.9375rem',
        '@20': '1.25rem',
        '@25': '1.5625rem',
        '@30': '1.875rem',
        '@35': '2.1875rem',
        '@40': '2.5rem',
        '@45': '2.8125rem',
        '@50': '3.125rem',
        '@60': '3.75rem',
        '@65': '4.0625rem',
        '@70': '4.375rem',
        '@75': '4.6875rem',
        '@90': '5.625rem',
        '@100': '6.25rem',
        '@200': '12.5rem',
      },
      fontSize: {
        '@13': ['0.8125rem', '0.8125rem'],
        '@14': ['0.875rem', '1.0625rem'],
        '@16': ['1rem', '1.25rem'],
        '@20': ['1.5625rem', '1.5625rem'],
        '@24': ['1.5rem', '1.5rem'],
        '@36': ['2.25rem', '2.25rem'],
      },
      borderRadius: {
        '@2.5': '0.15625rem',
        '@5': '0.3125rem',
        '@12.5': '0.78125rem' /* Project pogress bar */,
      },
      screens: {
        narrow: '288px', /* stays in px? */
      },
    },
  },
}
