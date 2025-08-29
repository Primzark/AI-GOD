module.exports = {
  root: true,
  env: { browser: true, es2022: true, jest: true },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  settings: { react: { version: 'detect' } },
  rules: {
    'react/prop-types': 'off'
  }
}
