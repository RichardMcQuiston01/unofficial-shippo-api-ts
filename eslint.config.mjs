import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", ".claude/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["eslint.config.mjs", "scripts/*.cjs", "scripts/*.mjs"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // Plain Node scripts, not part of the TS project (smoke tests, this
    // config file itself) — need Node globals since eslint:recommended's
    // no-undef doesn't know about them without an explicit env.
    files: ["scripts/*.cjs", "scripts/*.mjs", "eslint.config.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    // scripts/smoke-test.cjs deliberately uses require() to exercise the
    // package's CJS entry point.
    files: ["scripts/*.cjs"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
