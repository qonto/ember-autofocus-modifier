import tseslint from 'typescript-eslint';
import emberRecommended from 'eslint-plugin-ember/configs/recommended';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import nodePlugin from 'eslint-plugin-n';
import qunitPlugin from 'eslint-plugin-qunit';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'tmp/**',
      'coverage/**',
      '.eslintcache',
    ],
  },

  ...tseslint.configs.recommended,
  ...emberRecommended,
  prettierRecommended,

  // Browser globals for app source
  {
    files: ['app/**/*.{js,ts}', 'tests/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  // Node-context files
  {
    files: [
      'ember-cli-build.js',
      'testem.js',
      '.prettierrc.js',
      '.template-lintrc.js',
      'blueprints/*/index.js',
      'config/**/*.js',
      'lib/*/index.js',
      'server/**/*.js',
    ],
    plugins: {
      ...nodePlugin.configs['flat/recommended-script'].plugins,
    },
    languageOptions: {
      ...nodePlugin.configs['flat/recommended-script'].languageOptions,
      sourceType: 'script',
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...nodePlugin.configs['flat/recommended-script'].rules,
      // These CommonJS node files legitimately use require().
      '@typescript-eslint/no-require-imports': 'off',
    },
  },

  // QUnit test files
  {
    files: ['tests/**/*-test.{js,ts}'],
    plugins: {
      qunit: qunitPlugin,
    },
    rules: {
      ...qunitPlugin.configs.recommended.rules,
    },
  },

  // Inline TypeScript rule overrides
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/array-type': [
        'error',
        { default: 'array', readonly: 'array' },
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
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      // `member-delimiter-style` was removed from typescript-eslint (moved to @stylistic/eslint-plugin) — dropped, not present in v8.62.1.
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
      // `no-type-alias` still exists in v8.62.1 but has been deprecated since v6.0.0 (superseded by `consistent-type-definitions` etc.); kept, but expect removal in a future major.
      '@typescript-eslint/no-type-alias': 'error',
      '@typescript-eslint/no-unsafe-declaration-merging': 'error',
      '@typescript-eslint/parameter-properties': 'error',
      '@typescript-eslint/prefer-enum-initializers': 'error',
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-literal-enum-member': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/sort-type-constituents': 'error',
      // `type-annotation-spacing` was removed from typescript-eslint (moved to @stylistic/eslint-plugin) — dropped, not present in v8.62.1.
      // `typedef` still exists in v8.62.1 but has been deprecated since v8.33.0 ("no longer recommended for use"); kept per task list, but expect removal in a future major.
      '@typescript-eslint/typedef': 'error',
      '@typescript-eslint/unified-signatures': 'error',
    },
  },
);
