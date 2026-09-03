import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";

const outDir = path.resolve("build");
mkdirSync(outDir, { recursive: true });

const svg = readFileSync(path.resolve("public/favicon.svg"), "utf8");
const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 512 },
  background: "#041512",
});
const png = resvg.render().asPng();
writeFileSync(path.join(outDir, "icon.png"), png);
console.log("wrote", png.length, "byte icon");
