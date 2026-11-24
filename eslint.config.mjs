import { defineConfig } from 'eslint/config';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig(
  // Generated folders that should never be linted
  { ignores: ['playwright-report/', 'test-results/', 'blob-report/'] },

  // Base rules for JavaScript and TypeScript
  eslint.configs.recommended,
  tseslint.configs.recommended,

  // Type-aware rules: ESLint asks TypeScript about types (uses tsconfig.json)
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Catches a missing `await` on async calls such as page.goto()
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },

  // Playwright rules, only for test files
  {
    files: ['tests/**'],
    extends: [playwright.configs['flat/recommended']],
    rules: {
      // Portfolio rule: no fixed waits
      'playwright/no-wait-for-timeout': 'error',
    },
  },

  // Must be last: turns off rules that conflict with Prettier
  prettierConfig,
);
