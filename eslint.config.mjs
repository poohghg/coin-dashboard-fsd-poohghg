import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  // 1. Next.js 및 TypeScript 기본 설정 로드 (Flat Config 호환 모드)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 2. Prettier 설정 적용
  prettier,

  {
    // 3. 무시할 경로 설정
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },

  {
    // 4. 상세 규칙 및 환경 설정
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        alias: {
          map: [['@ui', './src/shared/shared-ui']],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      // Prettier 관련
      'prettier/prettier': 'error',

      // TypeScript 관련
      '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'public-static-field',
            'private-static-field',
            'public-instance-field',
            'private-instance-field',
            'public-constructor',
            'private-constructor',
            'public-instance-method',
            'private-instance-method',
          ],
        },
      ],

      // React 관련
      'react/prop-types': 'off',
      'react/display-name': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],

      // Hooks 관련
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // 기타 일반 규칙
      'no-implicit-coercion': 'error',
      'no-warning-comments': ['warn', { terms: ['TODO', 'FIXME', 'XXX', 'BUG'], location: 'anywhere' }],
      'prefer-const': 'error',
      'no-var': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'import/no-duplicates': 'error',
    },
  },
];

export default eslintConfig;
