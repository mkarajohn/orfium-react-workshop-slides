module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react', 'react-refresh'],
  rules: {
    'newline-before-return': 'warn',
    'react-refresh/only-export-components': 'warn',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/no-unescaped-entities': 'off'
  },
};
