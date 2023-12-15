import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig(() => {
  process.env = { ...process.env, ...loadEnv("", process.cwd()) };
  return defineConfig({
    plugins: [react(), viteSingleFile()],
    build: {
      outDir: "../../public/site",
      assetsDir: "",
    },
    base: "",
    root: "./src/site",
    server: {
      port: 4200,
    },
  });
});
