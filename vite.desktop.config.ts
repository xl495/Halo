import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "./",
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  build: {
    outDir: "desktop-dist",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "desktop.html"),
    },
  },
});
