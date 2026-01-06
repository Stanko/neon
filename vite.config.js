import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    plugins: [react()],
    port: 1234,
    host: true,
    allowedHosts: ["motorhead.local"],
  },
  base: "./",
});
