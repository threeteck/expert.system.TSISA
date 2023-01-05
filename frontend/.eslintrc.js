module.exports = {
  env: {
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  ignorePatterns: ['public', 'node_modules', '.eslintrc.js'],
  extends: [
      'airbnb-base',
      'airbnb-typescript',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'prettier',
    ],
  rules: {
        'no-plusplus': 'off',
        'comma-dangle': 'off',
        'linebreak-style': 'off',
        'import/prefer-default-export': 'off',
        'max-len': ['warn', { code: 120 }],
        'no-useless-catch': 'off',
        'no-nested-ternary': 'off',
        'no-underscore-dangle': [
          'error',
          {
            allow: ['__typename'],
          },
        ],
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
        'react/jsx-wrap-multilines': [
          'error',
          {
            declaration: false,
            assignment: false,
          },
        ],
        '@typescript-eslint/indent': 'off',
        'object-curly-newline': 'off',
        'operator-linebreak': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'arrow-body-style': 'off',
        'guard-for-in': 'off',
        'no-restricted-syntax': 'off',
        'max-classes-per-file': 'off',
        'consistent-return': 'off',
        'no-else-return': 'off',
        'no-param-reassign': [
          'error',
          {
            props: true,
            ignorePropertyModificationsFor: ['state', 'acc'],
          },
        ],
        'func-names': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/alt-text': 'off',
        'react/no-danger': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/display-name': 'off',

        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-redeclare': 'warn',
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/ban-types': 'warn',
        'spaced-comment': 'warn'
    },
};
