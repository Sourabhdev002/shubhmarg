/**
 * Seeds missing festival pages into calendar_events (INSERT-ONLY).
 * Existing slugs are never updated or deleted. Safe to re-run.
 *
 * Usage (from repo root):  node scripts/seed-calendar-events.mjs [path/to/seed.json]
 * Default seed file: database/seeds/festival-events-2026.json
 * Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const seedPath = process.argv[2] || "database/seeds/festival-events-2026.json";
const env = Object.fromEntries(
  readFileSync(".env.local", "utf8").replace(/^\uFEFF/, "").split(/\r?\n/)
    .map((l) => l.replace(/^\s*export\s+/, "").trim())
    .filter((l) => /^[A-Za-z0-9_]+\s*=/.test(l))
    .map((l) => { const i = l.indexOf("="); return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, "")]; })
);
const sb = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const seed = JSON.parse(readFileSync(seedPath, "utf8"));
const log = [];
const { data: existing, error: readErr } = await sb.from("calendar_events").select("slug");
if (readErr) { log.push("READ ERROR " + JSON.stringify(readErr)); writeFileSync("seed-calendar-events.log", log.join("\n")); process.exit(1); }
const have = new Set((existing || []).map((e) => e.slug));

const rows = seed
  .filter((e) => !have.has(e.slug))
  .map(({ provider_names, ...e }) => ({ ...e, published: true })); // eslint-disable-line @typescript-eslint/no-unused-vars

log.push(`seed=${seed.length} alreadyExisting=${seed.length - rows.length} toInsert=${rows.length}`);
if (rows.length) {
  const { data, error } = await sb.from("calendar_events").insert(rows).select("slug");
  log.push(error ? "INSERT ERROR " + JSON.stringify(error) : "inserted: " + (data || []).map((d) => d.slug).join(", "));
}
const { count } = await sb.from("calendar_events").select("*", { count: "exact", head: true });
log.push("calendar_events total now: " + count);
writeFileSync("seed-calendar-events.log", log.join("\n"));