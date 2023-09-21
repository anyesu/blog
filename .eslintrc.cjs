module.exports = {
  extends: [
    'eslint:recommended',
    '@vue/prettier',
    '@vue/typescript/recommended',
    'plugin:n/recommended',
    'plugin:regexp/recommended',
  ],
  rules: {
    'n/no-missing-import': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
  // ref: https://eslint.org/docs/user-guide/migrating-to-7.0.0#default-ignore-patterns-have-changed
  ignorePatterns: ['.eslintrc.*'],
  root: true,
};
