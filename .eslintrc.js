module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  extends: 'standard',
  // required to lint *.vue files
  plugins: ['html'],
  // add your custom rules here
  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 2 : 1,
    'comma-dangle': ['error', 'only-multiline'],
    'no-plusplus': 'off',
    'no-undef': 'off',
    'no-var': 'error',
    semi: ['error', 'always'],
    'no-param-reassign': ['error', { props: false }],
    'space-before-function-paren': 'off',
  },
};
