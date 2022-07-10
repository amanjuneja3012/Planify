module.exports = {
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {version: 'detect'},
  },
  extends: [
    'prettier',
    'plugin:react-hooks/recommended',
    /*"plugin:diff/staged"*/
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react-hooks', 'eslint-plugin-react'],
  rules: {
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          '{}': false,
          Object: {
            message: 'Avoid using the `Object` type. Did you mean `object`?',
          },
          Function: {
            message:
              'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
          },
          Boolean: {
            message: 'Avoid using the `Boolean` type. Did you mean `boolean`?',
          },
          Number: {
            message: 'Avoid using the `Number` type. Did you mean `number`?',
          },
          String: {
            message: 'Avoid using the `String` type. Did you mean `string`?',
          },
          Symbol: {
            message: 'Avoid using the `Symbol` type. Did you mean `symbol`?',
          },
        },
      },
    ],
    'arrow-parens': ['off', 'always'],
    complexity: 'off',
    'constructor-super': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': 'off',
    'id-match': 'off',
    'max-classes-per-file': ['error', 5],
    'new-parens': 'error',
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': 'error',
    'no-debugger': 'error',
    'no-empty': 'error',
    'no-eval': 'error',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-new-wrappers': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'off',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'warn',
    'one-var': ['error', 'never'],
    'prefer-const': 'warn',
    radix: 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-curly-spacing': 'off',
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-key': 'error',
    'react/jsx-no-bind': 'off',
    'react/jsx-wrap-multilines': 'off',
    'space-before-function-paren': 'off',
    'spaced-comment': 'off',
    'use-isnan': 'error',
    'valid-typeof': 'off',
  },
};
