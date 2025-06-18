import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "GkLitWebComponents",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["lit", "@lit-labs/motion"],
      output: {
        globals: {
          lit: "Lit",
          "@lit-labs/motion": "LitLabsMotion",
        },
      },
    },
  },
});
