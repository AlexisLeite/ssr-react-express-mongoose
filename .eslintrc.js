module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  overrides: [ {
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:@typescript-eslint/strict',
      'eslint-config-airbnb-base'
    ],
    files: [ '*.ts', '*.tsx' ],
    parserOptions: {
      project: './tsconfig.json'
    },
    rules: {
      indent: [ 'error', 2 ],
      'linebreak-style': [ 'error', 'windows' ],
      quotes: [ 'error', 'single' ],
      semi: [ 'error', 'always' ],
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'no-multiple-empty-lines': [ 'error', {
        max: 1 
      } ],
      'object-curly-spacing': [ 'error','always' ],
      'array-bracket-spacing': [ 'error','always' ],
      'consistent-return': 2,
      'no-else-return': 1,
      'space-unary-ops': 2,
      'array-bracket-newline':        [ 'error', 'consistent' ],
      'space-before-blocks': 'error',
      'no-console': 'off',
      'import/extensions': ['error','never'],
      'no-void': 'off'
    },
  } ],
  parser: '@typescript-eslint/parser',
  plugins: [ 'react', 'react-hooks', '@typescript-eslint', 'eslint-plugin-react-hooks' ],
  settings: {
    'import/resolver': {
      typescript: {
      }
    }
  }
};
