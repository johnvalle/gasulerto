module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: [
          { "@core": "./src/", "@constants": "./src/constants" },
          { "@components": "./src/components" },
          { "@assets": "./src/assets" },
          { "@hooks": "./src/hooks" },
          { "@coreTypes": "./src/types" }
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    ]
  ]
};
