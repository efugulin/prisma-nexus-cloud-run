module.exports = {
  extends: [
    'airbnb-typescript/base',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  ignorePatterns: ['**/node_modules/'],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/resolver': {
      typescript: {
        directory: './tsconfig.json',
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': [
      'error',
      { allow: ['__typename', '__NODE_ENV__'] },
    ],
  },
};
