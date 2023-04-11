module.exports = {
  env: {
    es6: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    "no-restricted-globals": ["error", "name", "length"],
    "prefer-arrow-callback": "error",
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": "off",
    "max-len": ["error", { code: 150 }],
    "arrow-parens": "off",
    "object-curly-spacing": "off",
    "spaced-comment": "off",
    indent: "off"
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true
      },
      rules: {}
    }
  ],
  globals: {}
};
