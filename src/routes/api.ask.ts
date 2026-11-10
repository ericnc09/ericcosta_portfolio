import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { buildSystemPrompt } from "@/lib/ask/profile";
import { routeChat } from "@/lib/ask/router.server";

const MAX_CHARS = 1000;
const MAX_TURNS = 12;
const PER_MINUTE = 5;
const PER_DAY = 30;
const MINUTE = 60_000;
const DAY = 24 * 60 * MINUTE;

const Body = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().trim().min(1).max(MAX_CHARS),
      }),
    )
    .min(1)
    .max(50),
});

// Per-isolate memory: this slows a single abusive client down, it is not a
// global quota. The real cost bound is that every provider is on a free tier.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < DAY);
  const limited =
    recent.length >= PER_DAY || recent.filter((t) => now - t < MINUTE).length >= PER_MINUTE;
  if (!limited) recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (!times.some((t) => now - t < DAY)) hits.delete(key);
    }
  }
  return limited;
}

export const Route = createFileRoute("/api/ask")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = Body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ error: "invalid_request" }, { status: 400 });
        }
        const turns = parsed.data.messages.slice(-MAX_TURNS);
        if (turns[turns.length - 1].role !== "user") {
          return Response.json({ error: "invalid_request" }, { status: 400 });
        }

        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
          "unknown";
        if (rateLimited(ip)) {
          return Response.json({ error: "rate_limited" }, { status: 429 });
        }

        const result = await routeChat(buildSystemPrompt(), turns);
        if (!result.ok) {
          return Response.json({ error: "unavailable" }, { status: 503 });
        }
        return Response.json({ text: result.text, via: result.via });
      },
    },
  },
});
