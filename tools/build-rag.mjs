// Precompute the "Ask my portfolio" chunk vectors into assets/rag/vectors.json.
//
// Serves the site over local HTTP (as GitHub Pages does), opens it in headless Chrome, and saves the
// vectors the page itself computes, so stored and in-browser vectors always match. Re-run it after
// changing the site's content; the page still works without it (missing vectors are embedded in
// the visitor's browser, which is just slower).
//
//   cd tools && npm install && npm run build-rag
//
// Uses your installed Chrome: set CHROME_PATH if it isn't at /usr/bin/google-chrome.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "assets/rag/vectors.json");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg" };

const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  const file = p.endsWith(path.sep) ? path.join(p, "index.html") : p;
  if (!file.startsWith(root) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404).end(); return; }
  res.writeHead(200, { "Content-Type": TYPES[path.extname(file)] || "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const url = `http://127.0.0.1:${server.address().port}/index.html`;

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", headless: true, args: ["--no-sandbox"] });
try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => console.error("page error:", e.message));
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => window.AY && window.AY.rag, { timeout: 30000 });
  console.log("embedding chunks (first run downloads the model)…");
  const result = await page.evaluate(() => window.AY.rag.buildVectors());
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(result));
  console.log(`wrote ${path.relative(root, out)}: ${result.count} chunks, ${result.dim} dims, ${(fs.statSync(out).size / 1024).toFixed(0)} KB`);
} finally {
  await browser.close();
  server.close();
}
