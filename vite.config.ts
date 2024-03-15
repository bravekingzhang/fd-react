import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { default as vitePluginImport } from "vite-plugin-importer";

export default defineConfig({
  base: "./", // 打包之后打不开，多半是base的问题
  plugins: [
    react(),
    vitePluginImport({
      libraryName: "@arco-design/mobile-react",
      libraryDirectory: "esm",
      style: (path) => `${path}/style`,
    }),
    vitePluginImport({
      libraryName: "@arco-design/mobile-react/esm/icon",
      libraryDirectory: "",
      camel2DashComponentName: false,
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "@base-font-size": 52,
          // "@use-dark-mode": 0, // 禁用暗黑模式
          // "@primary-color": "red",
          "@arco-dark-mode-selector": ".arco-theme-dark",
          // 也可定义为类名外的条件，符合css选择器规则即可
          // "@arco-dark-mode-selector": ':root[data-theme="dark"]',
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      { find: /^~/, replacement: "" },
    ],
  },
  server: {
    proxy: {
      "/api/": {
        target: "https://jsonplaceholder.typicode.com/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
