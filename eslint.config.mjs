// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  rules: {
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "beside",
        multiline: "beside",
      },
    ],
  },
});
