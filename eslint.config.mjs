import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
  // 1. Inherit standard JS protections
  js.configs.recommended,

  // 2. Inherit Next.js & TS default profiles
  ...nextVitals,
  ...nextTs,

  // 3. Keep your custom global ignores
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  // 4. Fine-tune rules for your Next.js project
  {
    rules: {
      // --- Next.js & React Customizations ---
      "@next/next/no-img-element": "error", // Blends with Core Web Vitals for performance
      "react/self-closing-comp": "warn",    // Enforces clean JSX structure
      "react/react-in-jsx-scope": "off",    // Completely unneeded in Next.js App Router

      // --- TypeScript & General Hygiene ---
      "@typescript-eslint/no-explicit-any": "warn", // discourages un-typed variables
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }], // Allows unused variables only if prefixed with an underscore (e.g., _req)

      "no-console": ["warn", { allow: ["warn", "error"] }], // Flags console.logs, permits errors
      "eqeqeq": ["error", "always"],        // Forces === instead of ==
    }
  }
,
 // ALWAYS KEEP THIS AS THE FINAL ITEM IN THE ARRAY
  eslintConfigPrettier,
]);

export default eslintConfig;
