import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "./public/admin",
    assetsDir: "",
  },
  base: "admin",
  server: {
    port: 4100,
  },
});
