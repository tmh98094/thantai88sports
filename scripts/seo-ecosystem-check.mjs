import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const config = {
  siteName: "Thantai88sport",
  canonicalUrl: "https://thantai88.site",
  robotsFile: "app/robots.ts",
  robotsMustContain: ["/api/", "/go/"],
  scanRoots: ["app", "components", "content", "lib", "public", "docs", "PRODUCT.md", "OWNER_INPUTS.md"],
  publicCopyRoots: ["app", "components", "content", "lib", "public/llms.txt"],
  ecosystemDomains: ["https://thantai88.online", "https://thantai88.com", "https://thantai88.site", "https://thantai888.co"],
};

const ignoredDirectories = new Set([".git", ".next", ".open-next", ".wrangler", ".worktrees", "node_modules", "out", "coverage"]);
const textExtensions = new Set([".css", ".html", ".json", ".md", ".mdx", ".mjs", ".ts", ".tsx", ".txt"]);
const mojibakeTokens = [
  String.fromCharCode(0x00c3),
  String.fromCharCode(0x00c4),
  String.fromCharCode(0x00c6),
  String.fromCharCode(0x00e1) + String.fromCharCode(0x00ba),
  String.fromCharCode(0x00e1) + String.fromCharCode(0x00bb),
  String.fromCharCode(0x00e2) + String.fromCharCode(0x20ac),
  String.fromCharCode(0x00f0) + String.fromCharCode(0x0178),
];

const unsafeClaims = [
  /\b(đảm bảo thắng|chắc thắng|thắng chắc|kèo chắc|lợi nhuận đảm bảo|cam kết lợi nhuận|không rủi ro)\b/i,
  /\b(risk[- ]?free|guaranteed win|sure bet)\b/i,
];

const errors = [];

function isTextFile(filePath) {
  return textExtensions.has(path.extname(filePath)) && !filePath.endsWith("package-lock.json");
}

function walk(entry, files = []) {
  if (!existsSync(entry)) return files;
  const stats = statSync(entry);
  if (stats.isFile()) {
    if (isTextFile(entry)) files.push(entry);
    return files;
  }

  for (const item of readdirSync(entry, { withFileTypes: true })) {
    if (item.isDirectory() && ignoredDirectories.has(item.name)) continue;
    walk(path.join(entry, item.name), files);
  }

  return files;
}

function uniqueFiles(roots) {
  return [...new Set(roots.flatMap((root) => walk(root)))];
}

for (const file of uniqueFiles(config.scanRoots)) {
  const source = readFileSync(file, "utf8");
  const hit = mojibakeTokens.find((token) => source.includes(token));
  if (hit) errors.push(`${file} contains a mojibake marker`);
}

for (const file of uniqueFiles(config.publicCopyRoots)) {
  const source = readFileSync(file, "utf8");
  const hit = unsafeClaims.find((pattern) => pattern.test(source));
  if (hit) errors.push(`${file} contains an unsafe win/profit claim`);
}

const llmsPath = path.join("public", "llms.txt");
if (!existsSync(llmsPath)) {
  errors.push("public/llms.txt is missing");
} else {
  const llms = readFileSync(llmsPath, "utf8");
  for (const domain of config.ecosystemDomains) {
    if (!llms.includes(domain)) errors.push(`public/llms.txt is missing ${domain}`);
  }
  if (!llms.includes(config.siteName) || !llms.includes(config.canonicalUrl)) {
    errors.push("public/llms.txt is missing the site name or canonical URL");
  }
}

if (!existsSync(config.robotsFile)) {
  errors.push(`${config.robotsFile} is missing`);
} else {
  const robotsSource = readFileSync(config.robotsFile, "utf8");
  for (const snippet of config.robotsMustContain) {
    if (!robotsSource.includes(snippet)) errors.push(`${config.robotsFile} is missing ${snippet}`);
  }
}

if (errors.length) {
  console.error(["SEO ecosystem check failed:", ...errors.map((error) => `- ${error}`)].join("\n"));
  process.exit(1);
}

console.log(`SEO ecosystem check passed for ${config.siteName}`);
