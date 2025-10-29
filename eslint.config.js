import js from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    env: {
      browser: true,
      es2021: true,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  prettierConfig,
];
