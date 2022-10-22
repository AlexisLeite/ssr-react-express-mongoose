module.exports = {
  env: {
    es2021: true,
    node: true,
    browser: true
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
      'no-console': 'off',
      'import/extensions': ['error','never'],
      'no-void': 'off',
      "no-restricted-globals": ["error", "event", "fdescribe"],
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "react/react-in-jsx-scope": "off",
      "class-methods-use-this": "off"
    },
  } ],
  parser: '@typescript-eslint/parser',
  plugins: [ 'react', 'react-hooks', '@typescript-eslint', 'eslint-plugin-react-hooks' ],
  settings: {
    'import/resolver': {
      typescript: {
      }
    },
    "react": {
      version: "detect"
    }
  }
};
