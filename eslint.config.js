import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginAstro from "eslint-plugin-astro";
import configPrettier from "eslint-config-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  ...pluginAstro.configs["flat/recommended"],
  configPrettier,
];
