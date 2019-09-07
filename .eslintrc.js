module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    'eslint:recommended'
  ],
  rules: {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'curly': 'error',
    'semi': [
      'error',
      'never'
    ],
    'key-spacing': ['error', { 'mode': 'strict' }],
    'space-in-parens': ['error', 'never'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'no-multi-spaces': 'error',
    'eqeqeq': 'error',
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'import/no-extraneous-dependencies': 'off',
    'complexity': ['error', { 'max': 7 }]
  },
  'overrides': [
    {
      'files': ['*.spec.js'],
      'env': {
        jest: true
      }
    }
  ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}
