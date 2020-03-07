module.exports = {
  extends: require.resolve('@dev/frontend-codestyle/.eslintrc.js'),
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    project: 'tsconfig.json',
  },
  rules: {
    "@typescript-eslint/no-use-before-define": 'off',
    "no-underscore-dangle": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off"
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  },
  plugins: ['@typescript-eslint', 'import'],
};
