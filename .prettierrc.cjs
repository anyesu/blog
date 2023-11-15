module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  plugins: [
    'prettier-plugin-packagejson',
    '@ianvs/prettier-plugin-sort-imports',
    './scripts/prettierWatchConfigPlugin.cjs',
  ],
  overrides: [
    {
      files: '*.md',
      options: {
        // Never automatically format embedded code
        embeddedLanguageFormatting: 'off',
        // fix table's style in markdown
        proseWrap: 'preserve',
      },
    },
    {
      files: 'docs/**/*.config.json',
      options: {
        parser: 'json-stringify',
        plugins: ['prettier-plugin-sort-json'],
      },
    },
  ],
  importOrder: [
    '<BUILTIN_MODULES>', // Node.js built-in modules
    '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
    '^@(/.*)$', // aliases
    '^[.]', // relative imports
  ],
  jsonRecursiveSort: true,
};
