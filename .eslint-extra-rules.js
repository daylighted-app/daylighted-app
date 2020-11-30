const isProd = process.env.NODE_ENV === "production";
module.exports = {
  rules: {
    "indent": "off",
    "@typescript-eslint/indent": ["off", 2],

    "quotes": "off",
    "@typescript-eslint/quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],

    "semi": "off",
    "@typescript-eslint/semi": ["error", "always"],
    "semi-spacing": ["error", { "before": false, "after": true }],
    "semi-style": ["error", "last"],

    // "camelcase": "off",
    // "@typescript-eslint/camelcase": ["error", { "ignoreDestructuring": true }],

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [isProd ? "error" : "warn", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": true
    }],

    "no-trailing-spaces": ["error"],

    "@typescript-eslint/ban-ts-ignore": "off",

    "@typescript-eslint/no-explicit-any": ["off", { "ignoreRestArgs": true }],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      }
    }
  ]
}

// "gitHooks": {
//   "pre-commit": "lint-staged"
// },
// "lint-staged": {
//   "*.{js,jsx,vue,ts,tsx}": [
//     "vue-cli-service lint",
//     "git add"
//   ]
// }
