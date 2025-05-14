import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": { target: "http://localhost:3000", secure: false },
      // Para hacer las pruebas con el backend en docker, descomentar la siguiente linea y comentar la anterior
      // "/api": { target: "http://backend:3000", secure: false },
    },
    host: "0.0.0.0",
    port: 5173,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
