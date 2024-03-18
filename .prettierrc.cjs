module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  plugins: [
    'prettier-plugin-packagejson',
    './scripts/prettierWatchConfigPlugin.cjs', //
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
      files: 'scripts/**/*.ts',
      options: {
        plugins: ['@ianvs/prettier-plugin-sort-imports'],
        importOrder: [
          '<BUILTIN_MODULES>', // Node.js built-in modules
          '<THIRD_PARTY_MODULES>', // Imports not matched by other special words or groups.
          '@package-json',
          '^@(/.*)$', // aliases
          '^[.]', // relative imports
        ],
      },
    },
    {
      files: 'docs/**/*.config.json',
      options: {
        printWidth: 0, // to always have new lines
        plugins: ['prettier-plugin-sort-json'],
        jsonRecursiveSort: true,
      },
    },
  ],
};
