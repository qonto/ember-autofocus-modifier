'use strict';

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          { decoratorsBeforeExport: true, version: '2021-12' },
        ],
      ],
    },
  },
  plugins: ['ember'],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {},
  overrides: [
    // node files
    {
      files: [
        './.eslintrc.js',
        './.prettierrc.js',
        './.template-lintrc.js',
        './ember-cli-build.js',
        './testem.js',
        './blueprints/*/index.js',
        './config/**/*.js',
        './lib/*/index.js',
        './server/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      extends: ['plugin:n/recommended'],
    },
    {
      // test files
      files: ['tests/**/*-test.{js,ts}'],
      extends: ['plugin:qunit/recommended'],
    },
    // ts files
    {
      files: ['**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-unused-vars': 'error',
        // https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts
        '@typescript-eslint/array-type': [
          'error',
          {
            default: 'array',
            readonly: 'array',
          },
        ],
        '@typescript-eslint/ban-tslint-comment': 'error',
        '@typescript-eslint/class-literal-property-style': 'error',
        '@typescript-eslint/consistent-generic-constructors': 'error',
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-type-assertions': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          {
            accessibility: 'no-public',
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/member-ordering': 'error',
        '@typescript-eslint/method-signature-style': 'error',
        '@typescript-eslint/no-confusing-non-null-assertion': 'error',
        '@typescript-eslint/no-duplicate-enum-values': 'error',
        '@typescript-eslint/no-dynamic-delete': 'error',
        '@typescript-eslint/no-extraneous-class': 'error',
        '@typescript-eslint/no-import-type-side-effects': 'error',
        '@typescript-eslint/no-invalid-void-type': 'error',
        '@typescript-eslint/no-non-null-asserted-nullish-coalescing': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-type-alias': [
          'error',
          {
            allowGenerics: 'always',
          },
        ],
        '@typescript-eslint/no-unsafe-declaration-merging': 'error',
        '@typescript-eslint/parameter-properties': 'error',
        '@typescript-eslint/prefer-enum-initializers': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-literal-enum-member': 'error',
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        '@typescript-eslint/sort-type-constituents': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/typedef': 'error',
        '@typescript-eslint/unified-signatures': 'error',
      },
    },
  ],
};
