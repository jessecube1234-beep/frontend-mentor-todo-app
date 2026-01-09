/**
 * Stylelint configuration for basic CSS linting.
 * We extend the "standard" config which enforces:
 * - Valid CSS syntax
 * - Consistent formatting and conventions
 */

/** @type {import("stylelint").Config} */
module.exports = {
  extends: ["stylelint-config-standard",
    "stylelint-config-recommended-scss"],

  rules: {
    // Disallow invalid hex colors
    "color-no-invalid-hex": true,

    // Avoid empty rule blocks
    "block-no-empty": true,

    // Allow camelCase class
    "selector-class-pattern": null,

    "at-rule-no-unknown": [true, {
      ignoreAtRules: [
        "use",
        "forward",
        "mixin",
        "include",
        "function",

        // Tailwind / PostCSS
        "tailwind",
        "layer",
        "apply",
        "variants",
        "responsive",
        "theme",
        "custom-variant"
      ]
    }
    ],

    // Tailwind modern color syntax
    "hue-degree-notation": null,
    "lightness-notation": null,

    // Tailwind import style
    "import-notation": null,

    // SCSS variant
    "scss/at-rule-no-unknown": null
  }
};