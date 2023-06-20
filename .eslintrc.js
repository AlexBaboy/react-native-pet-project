module.exports = {
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    warnOnUnsupportedTypeScriptVersion: false,
    sourceType: "module",
    jsx: true,
    project: "tsconfig.json",
    ecmaVersion: 6,
    jsxPragma: "React",
    createDefaultProgram: true,
  },
  plugins: [
    "react",
    "react-hooks"
  ],
  ignorePatterns: [],
  overrides: [{
    files: "*",
    rules: {
      "react-native/no-unused-styles": "off",
      "react-hooks/exhaustive-deps" : "warn",
      "react-hooks/rules-of-hooks": "error",
    },
  }, {
    files: "*.ts",
    rules: {
      "@typescript-eslint/consistent-type-assertions": "off",
    },
  }],
};
