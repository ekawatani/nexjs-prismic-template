module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './cms/tsconfig.json'],
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/switch-exhaustiveness-check': ['error'],
    'quotes': ['error', 'single'],
    'eol-last': ['error', 'always'],
    'react/prop-types': 0,
  }
};