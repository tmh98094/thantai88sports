import assert from "node:assert/strict";
import test from "node:test";

import { selectNext, validateRoadmap } from "./roadmap-queue.mjs";

const roadmap = {
  quota: 3,
  items: [
    { id: "SITE-001", title: "Item one", primaryKeyword: "one", slug: "item-one", phase: 1, priority: 90, status: "published", prerequisites: [], requiredInternalLinks: ["/", "/blog", "/18-plus"] },
    { id: "SITE-002", title: "Item two", primaryKeyword: "two", slug: "item-two", phase: 2, priority: 80, status: "ready", prerequisites: ["SITE-001"], requiredInternalLinks: ["/", "/blog", "/18-plus"] },
    { id: "SITE-003", title: "Item three", primaryKeyword: "three", slug: "item-three", phase: 2, priority: 99, status: "planned", prerequisites: ["SITE-001"], requiredInternalLinks: ["/", "/blog", "/18-plus"] },
  ],
};

test("selectNext retries ready work before selecting planned work", () => {
  assert.equal(selectNext(roadmap).id, "SITE-002");
});

test("selectNext selects the highest priority eligible planned item", () => {
  roadmap.items[1].status = "published";
  assert.equal(selectNext(roadmap).id, "SITE-003");
});

test("validateRoadmap rejects duplicate IDs and incomplete link requirements", () => {
  const invalid = structuredClone(roadmap);
  invalid.items[2].id = "SITE-001";
  invalid.items[2].requiredInternalLinks = ["/"];

  assert.deepEqual(validateRoadmap(invalid), ["Duplicate roadmap ID: SITE-001", "SITE-001 must define at least three internal links"]);
});
