// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { loadEnv } from "vite";

// Local dev only: Vite exposes just VITE_* vars, so copy the Ask AI server
// secrets from .env.local into process.env for the dev SSR process. In
// production these come from Cloudflare Worker secrets instead.
const askEnv = loadEnv("development", process.cwd(), [
  "GROQ_",
  "GEMINI_",
  "CEREBRAS_",
  "OPENROUTER_",
  "ASK_",
]);
for (const [key, value] of Object.entries(askEnv)) process.env[key] ??= value;

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Enable the nitro Cloudflare build outside the Lovable sandbox so `vite build`
  // produces a deployable Cloudflare Worker (.output) for self-hosting.
  nitro: {
    preset: "cloudflare-module",
    cloudflare: { nodeCompat: true, deployConfig: true },
  },
});
