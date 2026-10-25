import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "..");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return files(full);
    return /\.(ts|tsx|css)$/.test(name) && !name.endsWith(".generated.ts") ? [full] : [];
  });
}

const sources = files(root)
  .filter((f) => !f.includes(`${path.sep}test${path.sep}`))
  .map((f) => ({ file: path.relative(root, f), text: readFileSync(f, "utf8") }));

describe("content rules", () => {
  it("finds the source files", () => {
    expect(sources.length).toBeGreaterThan(25);
  });

  it("uses no em or en dashes in any source file", () => {
    const bad = sources.filter((s) => /[–—]/.test(s.text)).map((s) => s.file);
    expect(bad).toEqual([]);
  });

  it("carries no trace of the tool the first draft came from", () => {
    const bad = sources.filter((s) => /lov[a]ble/i.test(s.text)).map((s) => s.file);
    expect(bad).toEqual([]);
  });

  it("never claims a real booking, order or live opening status", () => {
    const text = sources.map((s) => s.text).join("\n");
    expect(text).not.toMatch(/your table is (booked|confirmed|reserved)/i);
    expect(text).not.toMatch(/we are open now/i);
  });
});
