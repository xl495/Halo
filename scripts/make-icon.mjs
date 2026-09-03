import {
  writeFileSync,
  mkdirSync,
  readFileSync,
  copyFileSync,
  existsSync,
} from "node:fs";
import path from "node:path";

const outDir = path.resolve("build");
mkdirSync(outDir, { recursive: true });
const dest = path.join(outDir, "icon.png");
const fallback = path.resolve("public/__grok/icon-180.png");

try {
  const { chromium } = await import("playwright");
  const svg = readFileSync(path.resolve("public/favicon.svg"), "utf8");
  const html = `<!doctype html>
<html><body style="margin:0;background:#041512">
  <div style="width:512px;height:512px">${svg.replace(
    'viewBox="0 0 32 32"',
    'width="512" height="512" viewBox="0 0 32 32"',
  )}</div>
</body></html>`;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 512, height: 512 } });
  await page.setContent(html);
  await page.screenshot({ path: dest, omitBackground: false });
  await browser.close();
  console.log("wrote 512 icon");
} catch (err) {
  if (!existsSync(fallback)) throw err;
  copyFileSync(fallback, dest);
  console.log("wrote fallback icon", err?.message ?? err);
}
