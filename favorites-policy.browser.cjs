const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

(async () => {
  const root = path.resolve(__dirname, '..');
  const server = http.createServer((req, res) => {
    let file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404).end('Not found'); return; }
    res.setHeader('Content-Type', { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' }[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch(process.env.BROWSER_PATH ? { executablePath: process.env.BROWSER_PATH } : {});
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await context.route('https://viacep.com.br/**', route => route.fulfill({ json: { cep: '01001-000', logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' } }));
    const base = `http://127.0.0.1:${server.address().port}/dist/`;

    await page.goto(base + 'favoritos/');
    await page.locator('.empty-state').waitFor();
    assert.match(await page.locator('.empty-state').textContent(), /Ainda não há favoritos/);
    await page.locator('.empty-state a[href*="produtos"]').click();
    await page.locator('[data-favorite="orla"]').click();
    assert.equal(await page.locator('[data-favorite="orla"]').getAttribute('aria-pressed'), 'true');
    assert.match(await page.locator('.favorites-link').getAttribute('aria-label'), /1 produto/);
    await page.locator('[data-favorite="brisa"]').click();
    await page.locator('.favorites-link').click();
    await page.locator('.product-card').first().waitFor();
    assert.equal(await page.locator('.product-card').count(), 2);
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.product-card')).opacity === '1');
    await page.screenshot({ path: path.join(os.tmpdir(), 'comprae-favorites.png'), fullPage: true });
    await page.reload();
    assert.equal(await page.locator('.product-card').count(), 2);
    await page.locator('[data-favorite="orla"]').click();
    assert.equal(await page.locator('.product-card').count(), 1);
    assert.equal(await page.locator('[data-favorite="brisa"]').count(), 1);

    await page.goto(base + 'conta/');
    await page.locator('[data-tab="signup"]').click();
    await page.locator('[name="email"]').fill('favoritos@example.com');
    await page.locator('[name="password"]').fill('Senha-local-123');
    await page.locator('[name="name"]').fill('Cliente Favorito');
    await page.locator('[name="cpf"]').fill('52998224725');
    await page.locator('[name="birthDate"]').fill('1992-04-12');
    await page.locator('[data-cep]').fill('01001000');
    await page.locator('[data-account-submit]').click();
    await page.locator('[data-logout]').waitFor();
    await page.locator('.favorites-link').click();
    assert.equal(await page.locator('[data-favorite="brisa"]').count(), 1);
    await page.goto(base + 'conta/');
    await page.locator('[data-logout]').click();
    await page.locator('.favorites-link').click();
    assert.match(await page.locator('.empty-state').textContent(), /Ainda não há favoritos/);

    await page.goto(base + 'sobre/');
    assert.equal(await page.locator('.legal-link').count(), 2);
    await page.locator('.legal-link[href*="termos"]').click();
    assert.match(await page.locator('.prose').textContent(), /pedidos simulados/);
    await page.locator('.legal-link[href*="privacidade"]').click();
    assert.match(await page.locator('.prose').textContent(), /ViaCEP/);
    assert.match(await page.locator('.prose').textContent(), /navegador/);
    assert.equal(await page.locator('.site-footer .brand-logo-dark').evaluate(image => image.naturalWidth > 0 && getComputedStyle(image).opacity === '1'), true);
    for (const [route, expected] of [['contato', 'atendimento@comprae.example'], ['ajuda', 'Como funcionam os cupons?'], ['trocas', 'direito de arrependimento'], ['entrega', 'Exemplo ilustrativo de frete'], ['pagamento', 'Meios de pagamento ilustrativos']]) {
      await page.goto(base + route + '/');
      const content = await page.locator('.prose').textContent();
      assert.match(content.toLowerCase(), new RegExp(expected.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
      assert.doesNotMatch(content, /\[informação pendente/);
    }
    await page.goto(base + 'categorias/');
    assert.equal(await page.locator('.category-card .category-photo').count(), 6);
    await page.locator('.category-photo').evaluateAll(images => images.forEach(image => { image.loading = 'eager'; }));
    await page.waitForFunction(() => [...document.querySelectorAll('.category-photo')].every(image => image.complete && image.naturalWidth > 0));
    assert.equal(await page.locator('.category-card', { hasText: 'Casa' }).count(), 1);
    for (const card of await page.locator('.category-card').all()) await card.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('.category-card')].every(card => getComputedStyle(card).opacity === '1'));
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(os.tmpdir(), 'comprae-categories.png'), fullPage: true });
    await page.setViewportSize({ width: 320, height: 740 });
    await page.goto(base);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
    assert.equal(await page.locator('.favorites-link').isVisible(), true);
    assert.equal(await page.locator('.category-card .category-photo').count(), 4);
    await page.screenshot({ path: path.join(os.tmpdir(), 'comprae-mobile-header.png') });
    assert.deepEqual(errors, []);
    console.log('PASS: favorite hearts, header, saved list, guest-to-account merge, policy links, footer logo and mobile width.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
