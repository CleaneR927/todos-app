import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import babelEslintParser from '@babel/eslint-parser';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser
      },
      parser: babelEslintParser, // Используйте импортированный объект парсера
      parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
      }
    }
  },
  {
    plugins: {
      react: pluginReact,
      'jsx-a11y': pluginJsxA11y,
      prettier: pluginPrettier
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': ['warn', { endOfLine: 'auto' }]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];
