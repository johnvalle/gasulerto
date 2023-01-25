module.exports = {
  root: true,
  extends: ["@react-native-community", "airbnb/hooks", "airbnb", "airbnb-typescript"],
  plugins: ["react", "react-hooks"],
  parserOptions: {
    project: "./tsconfig.json",
  },
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

    // Unnecessary
    "react/jsx-one-expression-per-line": "off",
    "react/react-in-jsx-scope": "off",
    "object-curly-newline": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"], // Your TypeScript files extension
      parserOptions: {
        project: ["./tsconfig.json"], // Specify it only for TypeScript files
      },
    },
  ],
};
