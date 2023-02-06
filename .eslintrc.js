module.exports = {
  root: true,
  extends: ["@react-native-community"],
  plugins: ["react", "react-hooks", "import", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  ignorePatterns: ["babel.config.js", ".eslintrc.js", "metro.config.js", "react-native.config.js"],
  rules: {
    "global-require": "off",
    // typescript-eslint overrides
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/indent": "off",

    // For constants
    camelcase: "off",

    // Controlled with prettier
    "arrow-parens": "off",
    "function-paren-newline": "off",
    "react/jsx-curly-newline": "off",
    "operator-linebreak": "off",
    "implicit-arrow-linebreak": "off",
    "react/jsx-props-no-spreading": "off",
    "no-confusing-arrow": ["error", { allowParens: true, onlyOneSimpleParam: true }],
    "import/no-extraneous-dependencies": "off",
    quotes: "off",
    "comma-dangle": "off",

    // Unnecessary
    "react/jsx-one-expression-per-line": "off",
    "react/react-in-jsx-scope": "off",
    "object-curly-newline": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",

    // For react native to allow styles declaration after component declaration in same file
    "no-use-before-define": ["error", { variables: false }]
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: ["./tsconfig.json"] // Specify it only for TypeScript files
      }
    }
  ]
};
