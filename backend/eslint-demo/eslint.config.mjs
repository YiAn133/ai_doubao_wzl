import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, 
    extends: ["js/recommended"], languageOptions: { globals: globals.browser },
    rules:{
    // 0=不管
    // 1=warn警告
    // 2=error 错误
      "no-var":2,//不能用var 错误的级别是2
      "no-console":1,//开发时用，上线后不用
      "quotes":["error" , "double"],
      "semi":["error" , "always"],
      "indent":["error" , 2]
    }
  },
  tseslint.configs.recommended,
]);
