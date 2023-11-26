import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  process.env = { ...process.env, ...loadEnv("", process.cwd()) };
  return defineConfig({
    plugins: [react()],
    build: {
      outDir: "../../public/admin",
      assetsDir: "",
    },
    base: "",
    root: "./src/admin",
    server: {
      port: 4100,
    },
  });
});
