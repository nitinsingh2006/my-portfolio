import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL || "http://localhost:3001";
const OUT = "screenshots";
mkdirSync(OUT, { recursive: true });

const sections = ["about", "work", "nitin-ai", "stack", "journey", "github", "contact"];
const consoleErrors = [];

const browser = await chromium.launch();

async function shoot(label, viewport, isMobile) {
  const ctx = await browser.newContext({
    viewport,
    deviceScaleFactor: 2,
    isMobile,
    userAgent: isMobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1"
      : undefined,
  });
  const page = await ctx.newPage();
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(`[${label}] ${m.text()}`);
  });
  page.on("pageerror", (e) => consoleErrors.push(`[${label}] PAGEERROR: ${e.message}`));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);

  // Full-page
  await page.screenshot({ path: `${OUT}/${label}-fullpage.png`, fullPage: true });

  // Hero (above the fold)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/${label}-01-hero.png` });

  // Each section
  let i = 2;
  for (const id of sections) {
    const el = await page.$(`#${id}`);
    if (!el) continue;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await el.screenshot({ path: `${OUT}/${label}-${String(i).padStart(2, "0")}-${id}.png` });
    i++;
  }
  await ctx.close();
}

await shoot("desktop", { width: 1440, height: 900 }, false);
await shoot("mobile", { width: 390, height: 844 }, true);

await browser.close();

console.log("Screenshots written to ./screenshots");
if (consoleErrors.length) {
  console.log(`\nCONSOLE ERRORS (${consoleErrors.length}):`);
  consoleErrors.forEach((e) => console.log("  " + e));
  process.exit(2);
} else {
  console.log("\nNo console errors detected. ✅");
}
