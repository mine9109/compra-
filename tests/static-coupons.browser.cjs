const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

(async () => {
  // Serve only static files, as Live Server does, with no API or database.
  const root = path.resolve(__dirname, '..');
  const server = http.createServer((req, res) => {
    let file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404, { 'Content-Type': 'text/html' }).end('Not found'); return; }
    res.setHeader('Content-Type', { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png' }[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch(process.env.BROWSER_PATH ? { executablePath: process.env.BROWSER_PATH } : {});
    for (const base of [`http://127.0.0.1:${server.address().port}/dist/`, pathToFileURL(path.join(root, 'dist/')).href]) {
      const context = await browser.newContext();
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(base + 'carrinho/index.html');
      await page.locator('#main-content').waitFor();
      await page.evaluate(() => localStorage.setItem('comprae-cart', JSON.stringify([{ id: 'orla', qty: 1 }])));
      await page.reload();
      for (const [percent, total] of [[10, '260,10'], [15, '245,65'], [20, '231,20']]) {
        await page.locator(`[data-use-coupon="COMPRAE${percent}"]`).click();
        assert.match(await page.locator('[data-cart-total]').textContent(), new RegExp(total));
      }
      await page.locator('[name="coupon"]').fill('INVALIDO');
      await page.locator('[data-coupon-form] button[type="submit"]').click();
      assert.match(await page.locator('[data-coupon-note]').textContent(), /inválido/);
      assert.match(await page.locator('[data-cart-total]').textContent(), /231,20/);
      await page.reload();
      await page.locator('[data-coupon-remove]').waitFor();
      assert.match(await page.locator('[data-cart-total]').textContent(), /231,20/);
      await page.locator('[data-cart-qty="plus"]').click();
      assert.match(await page.locator('[data-cart-total]').textContent(), /462,40/);
      await page.locator('[data-coupon-remove]').click();
      assert.match(await page.locator('[data-cart-total]').textContent(), /578,00/);
      assert.deepEqual(errors, []);
      await context.close();
    }
    console.log('PASS: static HTTP and file preview: coupons 10/15/20%, invalid code, reload, quantity and removal.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
