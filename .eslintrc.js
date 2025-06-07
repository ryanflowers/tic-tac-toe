module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier',
  ],
  env: {
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignorePatterns: ['dist', 'node_modules', '*.js'],
};