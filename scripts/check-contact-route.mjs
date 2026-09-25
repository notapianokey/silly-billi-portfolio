// Regression check for the guards on POST /api/contact (validation, sanitising, rate limit).
// No server, no network: imports the handler and swaps `fetch` for a stub, so the real webhook
// (CONTACT_WEBHOOK_URL) is never called. Run: node --no-warnings scripts/check-contact-route.mjs
// (Node 24+, which runs the route's .ts directly; the flag only hides a package "type" notice).
import assert from "node:assert/strict";
import { registerHooks } from "node:module";

// Next's bundler resolves `next/server`; plain Node's ESM resolver wants the extension spelled out.
registerHooks({
  resolve: (specifier, context, next) =>
    next(specifier === "next/server" ? "next/server.js" : specifier, context),
});

process.env.CONTACT_WEBHOOK_URL = "https://webhook.invalid/hook";
const forwarded = [];
globalThis.fetch = async (_url, init) => {
  forwarded.push(JSON.parse(init.body));
  return new Response("ok");
};

const { POST } = await import("../src/app/api/contact/route.ts");

let ipCounter = 0;
/** Each call gets a fresh IP unless one is passed, so rate limiting never leaks between cases. */
const send = (body, ip = `10.0.0.${++ipCounter}`) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "x-forwarded-for": ip },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );

const valid = { name: "Ada", email: "ada@example.com", message: "Hello", source: "Hire Us" };

assert.equal((await send("not json")).status, 400);
assert.equal((await send("null")).status, 400);
assert.equal((await send({ ...valid, message: "  " })).status, 400);
assert.equal((await send({ ...valid, name: ["Ada"] })).status, 400);
assert.equal((await send({ ...valid, email: "nope" })).status, 400);
assert.equal((await send({ ...valid, message: "x".repeat(5001) })).status, 400);
assert.equal(forwarded.length, 0, "nothing invalid may reach the webhook");

assert.equal((await send({ ...valid, name: "Ada\r\nBcc: evil@x.com", source: "<script>" })).status, 200);
assert.deepEqual(forwarded[0], {
  name: "Ada Bcc: evil@x.com",
  email: "ada@example.com",
  message: "Hello",
  source: "Unknown",
});

const statuses = [];
for (let i = 0; i < 7; i++) statuses.push((await send(valid, "10.9.9.9")).status);
assert.deepEqual(statuses, [200, 200, 200, 200, 200, 429, 429], "6th request from one IP is throttled");

console.log("contact route checks passed");
