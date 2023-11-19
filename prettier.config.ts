/** @type {import('prettier').Config} */
module.exports = {
  printWidths: 120,
  semi: false,
  singleQuote: true,
  endOfLine: 'lf',
  useTabs: true,
  tabWidth: 4,
  arrowParens: "avoid",
  jsxBracketSameLine: true,
  trailingComma: 'es5',
  plugins: [require('prettier-plugin-tailwindcss')],
}
