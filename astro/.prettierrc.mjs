/** @type {import("prettier").Config} */
export default {
  quoteProps: "consistent",
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
