import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {},
    }),
  ],
  mode: "development",
  build: {
    target: "baseline-widely-available",
    rolldownOptions: {
      tsconfig: path.resolve(__dirname, "tsconfig.app.json"),
      input: {
        home: path.resolve(__dirname, "src/index.tsx"),
        footer: path.resolve(__dirname, "src/footerRoot.tsx"),
        header: path.resolve(__dirname, "src/headerRoot.tsx"),
      },
      output: {
        dir: path.resolve(__dirname, "public"),
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name].[ext]",
      },
      watch: {
        include: path.resolve(__dirname, "src/**"),
      },
    },
    outDir: path.resolve(__dirname, "public"),
    emptyOutDir: false,
    cssCodeSplit: false,

    // For Development: disable minification and enable sourcemaps
    minify: false,
    sourcemap: true,
  },
  publicDir: path.resolve(__dirname, "images"),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".css", ".js", ".jsx", ".ts", ".tsx"],
  },

  base: "/",
});
