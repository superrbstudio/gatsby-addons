export default {
  globals: {
    __PATH_PREFIX__: true,
  },
  extends: [
    'react-app',
    'airbnb-typescript',
    'airbnb/hooks',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'react/require-default-props': [
      2,
      { forbidDefaultForRequired: true, ignoreFunctionalComponents: true },
    ],
    'no-void': ['error', { allowAsStatement: true }],
  },
}
