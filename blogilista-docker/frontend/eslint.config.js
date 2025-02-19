import vitest from "@vitest/eslint-plugin";

export default [
  {
    ignores: ["node_modules", "dist", "vite.config.js", "eslint.config.js"],
    plugins: {
      vitest
    },
    rules: {
      ...vitest.configs.recommended.rules,
      indent: [
        "error",
        2
      ],
      "linebreak-style": [
        "error",
        "unix"
      ],
      quotes: [
        "error",
        "single"
      ],
      semi: [
        "error",
        "never"
      ],
      eqeqeq: "error",
      "no-trailing-spaces": "error"
    }
  }
]