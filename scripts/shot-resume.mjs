import { chromium } from "playwright";
const BASE = process.env.BASE_URL || "http://localhost:3011";
const b = await chromium.launch();
const errors = [];

let ctx = await b.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });
let p = await ctx.newPage();
p.on("console", (m) => m.type() === "error" && errors.push("[screen] " + m.text()));
p.on("pageerror", (e) => errors.push("[screen] " + e.message));
await p.goto(`${BASE}/resume`, { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await p.screenshot({ path: "screenshots/resume-screen.png", fullPage: true });
await ctx.close();

ctx = await b.newContext({ viewport: { width: 900, height: 1200 }, deviceScaleFactor: 2 });
p = await ctx.newPage();
await p.goto(`${BASE}/resume`, { waitUntil: "networkidle" });
await p.emulateMedia({ media: "print" });
await p.waitForTimeout(600);
await p.screenshot({ path: "screenshots/resume-print.png", fullPage: true });
await p.pdf({ path: "screenshots/resume-sample.pdf", format: "A4", printBackground: true });
await ctx.close();

ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
p = await ctx.newPage();
await p.goto(`${BASE}/resume`, { waitUntil: "networkidle" });
await p.waitForTimeout(1200);
await p.screenshot({ path: "screenshots/resume-mobile.png", fullPage: true });
await ctx.close();

await b.close();
console.log("done. console errors:", errors.length);
errors.forEach((e) => console.log("  " + e));
