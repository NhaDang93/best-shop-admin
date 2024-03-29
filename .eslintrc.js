module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'next',
    'next/core-web-vitals',
    'airbnb',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
      },
      alias: [
        ['src', './src'],
        ['server', './server'],
      ],
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    semi: 0,
    indent: 0,
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,

    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/anchor-is-valid': 0,

    'no-use-before-define': 0,
    'no-unused-vars': 0,
    'no-param-reassign': 0,
    'implicit-arrow-linebreak': 0,
    'consistent-return': 0,
    'arrow-parens': 0,
    'object-curly-newline': 0,
    'operator-linebreak': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,

    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,

    'no-underscore-dangle': 0,
    'react/function-component-definition': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'arrow-body-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'import/no-cycle': 0,
    'prefer-arrow-callback': 0,
  },
};
