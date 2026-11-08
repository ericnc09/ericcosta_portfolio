import process from "node:process";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const BUTTONDOWN_SUBSCRIBERS_URL = "https://api.buttondown.com/v1/subscribers";
const BUTTONDOWN_API_VERSION = "2026-04-01";

export type BetaSignupResult = "requested" | "unavailable" | "failed";

// Buttondown sends the confirmation email and holds the list. The API key stays
// on the server, and people wait for manual approval after confirming.
export const requestBetaAccess = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().trim().email().max(254),
      consent: z.literal(true),
      website: z.string().max(200), // honeypot: hidden from people, filled by bots
    }),
  )
  .handler(async ({ data }): Promise<BetaSignupResult> => {
    if (data.website) return "requested";

    const apiKey = process.env.BUTTONDOWN_API_KEY;
    if (!apiKey) return "unavailable";

    const response = await fetch(BUTTONDOWN_SUBSCRIBERS_URL, {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
        "X-API-Version": BUTTONDOWN_API_VERSION,
      },
      body: JSON.stringify({
        email_address: data.email,
        tags: ["beta-requested"],
        utm_source: "finalyse-page",
      }),
    });

    if (response.ok) return "requested";

    // Duplicates answer the same as new signups, so the form can't be used to
    // discover who is on the list.
    const error = (await response.json().catch(() => null)) as { code?: string } | null;
    if (error?.code === "email_already_exists" || error?.code === "subscriber_already_exists") {
      return "requested";
    }

    console.error("Beta signup failed", response.status, error?.code);
    return "failed";
  });
