module.exports = {
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwindcss')('./tailwind.config.ts'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('autoprefixer'),
  ],
}
