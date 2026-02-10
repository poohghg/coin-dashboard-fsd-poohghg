import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';

const eslintConfig = defineConfig([
  // 1. Next.js Core Web Vitals 및 TypeScript 설정 로드
  ...nextVitals,
  ...nextTs,

  // 2. Prettier 플러그인 규칙 추가 (항상 마지막 즈음에 위치)
  prettier,

  {
    // 3. 상세 규칙 및 환경 설정
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
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
      '@typescript-eslint/no-explicit-any': 'warn',
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
      curly: ['warn', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'import/no-duplicates': 'error',
    },
  },

  // 4. 전역 무시 설정 (eslint-config-next의 기본값을 덮어씌움)
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'node_modules/**']),
]);

export default eslintConfig;
