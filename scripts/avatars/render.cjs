// Renders SVG files to transparent PNGs with Chromium. Usage: node render.cjs jobs.json
// jobs.json: [[svgPath, pngPath], ...]. Set PLAYWRIGHT_MODULE if playwright is installed elsewhere.
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs = require('fs');
(async () => {
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 768, height: 1280 } });
  for (const [src, out] of jobs) {
    const data = fs.readFileSync(src).toString('base64');
    await page.setContent(`<html><body style="margin:0;background:transparent"><img id="i" src="data:image/svg+xml;base64,${data}" width="768" height="1280"></body></html>`);
    await page.waitForFunction(() => document.getElementById('i').complete);
    await page.screenshot({ path: out, omitBackground: true, clip: { x: 0, y: 0, width: 768, height: 1280 } });
  }
  await browser.close();
})();
