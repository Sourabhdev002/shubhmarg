/**
 * B4 CTA consistency scan (pure source scan, node:fs only).
 * Property 1: Bug Condition - CTA labels equal the charged price and every
 * linked service id resolves.
 *
 * Uses only node:fs and @/lib/pricing so it runs even before the helper
 * modules exist. If src/lib/service-catalog.ts exists, its resolveServiceId is
 * used; otherwise resolution = membership in SERVICE_PRICING.
 *
 * Validates: Requirements 1.7, 1.8, 2.7, 2.8
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { SERVICE_PRICING, getServicePrice } from "@/lib/pricing";

const SRC_DIR = path.resolve(__dirname, "..");

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name === "__tests__") continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith(".tsx")) out.push(full);
  }
  return out;
}

const files = walk(SRC_DIR).map((f) => ({
  rel: path.relative(SRC_DIR, f).replace(/\\/g, "/"),
  text: fs.readFileSync(f, "utf8"),
}));

function lineOf(text: string, index: number): number {
  return text.slice(0, index).split("\n").length;
}

async function loadResolver(): Promise<(id: string) => string | null> {
  const spec = "../lib/" + "service-catalog";
  try {
    const mod = await import(/* @vite-ignore */ spec);
    if (typeof mod.resolveServiceId === "function") return mod.resolveServiceId;
  } catch {
    // helper module not created yet (unfixed code)
  }
  return (id: string) => (id in SERVICE_PRICING ? id : null);
}

describe("B4 CTA scan (src/**/*.tsx)", () => {
  it("finds the CTA service ids in the source (sanity)", () => {
    const total = files.reduce(
      (n, f) => n + (f.text.match(/request-guidance\?service=|serviceId\s*[=:]/g)?.length ?? 0),
      0,
    );
    expect(total).toBeGreaterThan(10);
  });

  it("every request-guidance?service=<id>, serviceId=\"<id>\" and serviceId: \"<id>\" resolves", async () => {
    const resolve = await loadResolver();
    const unresolved: string[] = [];
    const re =
      /request-guidance\?service=([a-z0-9-]+)|serviceId\s*=\s*"([a-z0-9-]+)"|serviceId\s*:\s*"([a-z0-9-]+)"/g;
    for (const f of files) {
      for (const m of f.text.matchAll(re)) {
        const id = m[1] ?? m[2] ?? m[3];
        if (resolve(id) === null) {
          unresolved.push(`${f.rel}:${lineOf(f.text, m.index ?? 0)} -> unresolved service id "${id}"`);
        }
      }
    }
    expect(unresolved, "unresolved ids (e.g. karmic-debt)").toEqual([]);
  });

  it("no numeric price={...} literal sits on a component that has a serviceId= prop", () => {
    const violations: string[] = [];
    const re = /serviceId\s*=\s*"([a-z0-9-]+)"/g;
    for (const f of files) {
      for (const m of f.text.matchAll(re)) {
        const at = m.index ?? 0;
        // Enclosing JSX element: last "<Component" before the prop up to the next "/>" after it.
        const start = f.text.lastIndexOf("<", at);
        const endIdx = f.text.indexOf("/>", at);
        if (start < 0 || endIdx < 0 || endIdx - start > 1500) continue;
        const tag = f.text.slice(start, endIdx + 2);
        const p = tag.match(/\bprice\s*=\s*(?:\{\s*([\d_,.]+)\s*\}|"(\d[\d,]*)")/);
        if (p) {
          const literal = p[1] ?? p[2];
          const id = m[1];
          const charged = SERVICE_PRICING[id] !== undefined ? getServicePrice(id) : "n/a";
          violations.push(
            `${f.rel}:${lineOf(f.text, at)} serviceId="${id}" has hard-coded price=${literal} (charged: ${charged})`,
          );
        }
      }
    }
    expect(violations, "hard-coded price props (Appendix A1)").toEqual([]);
  });

  it("no (₹<digits>) literal inside a request-guidance Link", () => {
    const violations: string[] = [];
    const re = /request-guidance\?service=([a-z0-9-]+)/g;
    for (const f of files) {
      for (const m of f.text.matchAll(re)) {
        const at = m.index ?? 0;
        const rest = f.text.slice(at);
        const closeLink = rest.search(/<\/Link>|<\/a>/);
        if (closeLink < 0 || closeLink > 800) continue;
        const body = rest.slice(0, closeLink);
        const lit = body.match(/\(\s*₹\s*([\d,]+)\s*\)/);
        if (lit) {
          const id = m[1];
          const charged = SERVICE_PRICING[id] !== undefined ? getServicePrice(id) : "n/a";
          violations.push(
            `${f.rel}:${lineOf(f.text, at)} service=${id} label "(₹${lit[1]})" hard-coded (charged: ${charged})`,
          );
        }
      }
    }
    expect(violations, "hard-coded (₹N) labels inside request-guidance links").toEqual([]);
  });
});
