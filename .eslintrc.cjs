module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:n/recommended',
    'plugin:regexp/recommended',
    'plugin:unicorn/recommended',
    // Make sure to put prettier last, so it gets the chance to override other configs.
    '@vue/prettier',
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  overrides: [
    {
      files: ['**/*.ts'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
      },
    },
  ],
  rules: {
    'n/no-missing-import': 0,
    'unicorn/prevent-abbreviations': 0,
    'unicorn/filename-case': 0,
    'regexp/no-super-linear-backtracking': 0,
  },
  // ref: https://eslint.org/docs/user-guide/migrating-to-7.0.0#default-ignore-patterns-have-changed
  ignorePatterns: ['.eslintrc.*'],
  root: true,
};
