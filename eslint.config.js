import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginAstro from "eslint-plugin-astro";
import configPrettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist/**", ".astro/**"] },
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  ...pluginAstro.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    // Components are intentionally named after characters/proper nouns (Barb, Nex, …).
    rules: {
      "vue/multi-word-component-names": "off",
    },
  },
  {
    // Astro generates src/env.d.ts with a triple-slash reference; it isn't ours to rewrite.
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  configPrettier,
);
