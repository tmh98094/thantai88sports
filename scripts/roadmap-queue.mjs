import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const supportedStatuses = new Set(["planned", "ready", "published", "blocked", "refresh_due", "merged"]);

function isPublished(status) {
  return status === "published" || status === "merged";
}

export function validateRoadmap(roadmap) {
  const errors = [];
  const ids = new Set();

  if (!roadmap || !Array.isArray(roadmap.items)) return ["Roadmap must contain an items array"];
  if (roadmap.quota !== roadmap.items.length) errors.push(`Roadmap quota ${roadmap.quota} does not match ${roadmap.items.length} items`);

  for (const item of roadmap.items) {
    if (!item.id) {
      errors.push("Roadmap item is missing an ID");
      continue;
    }
    if (ids.has(item.id)) errors.push(`Duplicate roadmap ID: ${item.id}`);
    ids.add(item.id);
    if (!supportedStatuses.has(item.status)) errors.push(`${item.id} has an unsupported status`);
    if (!Number.isInteger(item.phase) || item.phase < 1 || item.phase > 4) errors.push(`${item.id} must use phase 1 through 4`);
    if (!Array.isArray(item.requiredInternalLinks) || item.requiredInternalLinks.length < 3) errors.push(`${item.id} must define at least three internal links`);
    if (!item.title || !item.primaryKeyword || !item.slug) errors.push(`${item.id} is missing title, keyword, or slug`);
  }

  return errors;
}

export function selectNext(roadmap) {
  const publishedIds = new Set(roadmap.items.filter((item) => isPublished(item.status)).map((item) => item.id));
  const eligible = roadmap.items.filter((item) => {
    if (item.status !== "ready" && item.status !== "planned") return false;
    if (item.sourceRequired && !item.evidenceReady) return false;
    return (item.prerequisites ?? []).every((id) => publishedIds.has(id));
  });

  return eligible.sort((left, right) => {
    const statusRank = (item) => (item.status === "ready" ? 0 : 1);
    return (
      statusRank(left) - statusRank(right) ||
      left.phase - right.phase ||
      right.priority - left.priority ||
      left.id.localeCompare(right.id)
    );
  })[0] ?? null;
}

function readRoadmap(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function writeRoadmap(filePath, roadmap) {
  writeFileSync(filePath, `${JSON.stringify(roadmap, null, 2)}\n`, "utf8");
}

function usage() {
  console.error("Usage: node roadmap-queue.mjs [--roadmap content/roadmap.json] --validate | --next | --mark <ID> <STATUS>");
}

function parseArgs(argv) {
  const args = [...argv];
  let roadmapPath = resolve("content", "roadmap.json");
  const index = args.indexOf("--roadmap");
  if (index >= 0) {
    roadmapPath = resolve(args[index + 1] ?? "");
    args.splice(index, 2);
  }
  return { roadmapPath, args };
}

function runCli() {
  const { roadmapPath, args } = parseArgs(process.argv.slice(2));
  const roadmap = readRoadmap(roadmapPath);

  if (args[0] === "--validate") {
    const errors = validateRoadmap(roadmap);
    if (errors.length) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log(`Roadmap valid: ${roadmap.items.length} items.`);
    }
    return;
  }

  if (args[0] === "--next") {
    const errors = validateRoadmap(roadmap);
    if (errors.length) throw new Error(errors.join("\n"));
    const item = selectNext(roadmap);
    if (!item) {
      console.error("No eligible roadmap item.");
      process.exitCode = 2;
      return;
    }
    console.log(JSON.stringify(item, null, 2));
    return;
  }

  if (args[0] === "--mark") {
    const [id, status] = args.slice(1);
    if (!id || !supportedStatuses.has(status)) throw new Error("--mark requires an ID and a supported status");
    const item = roadmap.items.find((candidate) => candidate.id === id);
    if (!item) throw new Error(`Unknown roadmap ID: ${id}`);
    item.status = status;
    item.updatedAt = new Date().toISOString();
    if (status === "published") item.publishedAt = item.updatedAt.slice(0, 10);
    writeRoadmap(roadmapPath, roadmap);
    console.log(`${id} marked ${status}.`);
    return;
  }

  usage();
  process.exitCode = 1;
}

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) runCli();
