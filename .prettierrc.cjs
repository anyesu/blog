module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  proseWrap: 'never',
  endOfLine: 'lf',
  plugins: [
    'prettier-plugin-packagejson',
    '@trivago/prettier-plugin-sort-imports',
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
  ],
  importOrder: ['^node:.+$', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
};
