import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("site-config fallback domain is the live sports domain", async () => {
  const source = await readFile(new URL("../lib/site-config.ts", import.meta.url), "utf8");

  assert.match(source, /https:\/\/thantai88\.site/);
  assert.doesNotMatch(source, /https:\/\/thantai88sports\.com/);
});
