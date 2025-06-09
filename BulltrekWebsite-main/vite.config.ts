import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [
        "public/charting_library/charting_library.standalone.js",
        "public/datafeeds/udf/dist/bundle.js",
      ],
    },
  },
});
