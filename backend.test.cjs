const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { createApp } = require('../server/index.cjs');

test('authentication, ownership, orders, validation and persistence', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'comprae-db-test-'));
  const dbPath = path.join(dir, 'test.sqlite');
  let app = createApp({ dbPath });
  const listen = async () => { await new Promise(resolve => app.server.listen(0, '127.0.0.1', resolve)); return `http://127.0.0.1:${app.server.address().port}`; };
  let base = await listen();
  async function call(route, method = 'GET', body, cookie = '', origin = base) {
    const response = await fetch(base + '/api/' + route, { method, headers: { 'Content-Type': 'application/json', Origin: origin, Cookie: cookie }, ...(body === undefined ? {} : { body: JSON.stringify(body) }) });
    return { status: response.status, data: await response.json(), cookie: response.headers.get('set-cookie') };
  }
  const a = { cep: '01001-000', logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' };
  const credentials = { name: 'Ana Silva', email: 'ANA@example.com', password: 'Teste-seguro-123', cpf: '52998224725', birthDate: '1992-04-12', address: a };
  try {
    assert.equal((await call('orders')).status, 401);
    assert.equal((await call('auth/register', 'POST', credentials, '', 'https://example.net')).status, 403);
    assert.equal((await call('auth/register', 'POST', { ...credentials, password: '123' })).status, 400);
    const registered = await call('auth/register', 'POST', credentials);
    assert.equal(registered.status, 200);
    const ana = registered.cookie.split(';')[0];
    assert.match(registered.cookie, /HttpOnly; SameSite=Lax/);
    assert.equal(registered.data.user.email, 'ana@example.com');
    assert.equal(registered.data.user.password_hash, undefined);
    const stored = app.db.prepare('SELECT password_hash FROM users').get();
    assert.notEqual(stored.password_hash, credentials.password);
    assert.match(stored.password_hash, /^[a-f0-9]{32}:[a-f0-9]{128}$/);
    assert.notEqual(app.db.prepare('SELECT token_hash FROM sessions').get().token_hash, ana.split('=')[1]);
    assert.equal((await call('auth/register', 'POST', credentials)).status, 409);
    assert.equal((await call('auth/login', 'POST', { ...credentials, password: 'wrong-password' })).status, 401);
    assert.equal((await call('me', 'GET', undefined, 'comprae_session=forged')).data.user, null);
    await call('searches', 'POST', { term: 'luminária', user_id: 999 }, ana);
    assert.equal((await call('me', 'GET', undefined, ana)).data.searches[0].term, 'luminária');
    const biaResponse = await call('auth/register', 'POST', { ...credentials, email: 'bia@example.com', name: 'Bia', cpf: '11144477735' });
    const bia = biaResponse.cookie.split(';')[0];
    assert.deepEqual((await call('me', 'GET', undefined, bia)).data.searches, []);
    assert.equal((await call('seller/products', 'GET', undefined, ana)).status, 403);
    assert.equal((await call('seller/profile', 'POST', { name: 'Loja Ana', email: 'ana@example.com', phone: '11999999999', cnpj: '' }, ana)).status, 200);
    assert.equal((await call('me', 'GET', undefined, ana)).data.sellerProfile.name, 'Loja Ana');
    const photo = 'data:image/jpeg;base64,' + fs.readFileSync(path.resolve(__dirname, '../dist/assets/images/products/orla.jpg')).toString('base64');
    assert.equal((await call('seller/profile', 'POST', { name: 'Loja Ana', email: 'ana@example.com', phone: '11999999999', cnpj: '', description: 'Objetos artesanais para a casa.', photo }, ana)).status, 200);
    assert.equal((await call('seller/profile', 'POST', { name: 'Loja Ana', email: 'ana@example.com', phone: '11999999999', cnpj: '', description: 'Inválida', photo: 'data:image/jpeg;base64,AAAA' }, ana)).status, 400);
    assert.equal((await call('me', 'GET', undefined, ana)).data.sellerProfile.description, 'Objetos artesanais para a casa.');
    const listing = await call('seller/products', 'POST', { name: 'Produto da Ana', category: 'Casa', description: 'Produto cadastrado pela Ana para teste.', price: 35.9, stock: 2, status: 'Ativo', image: photo }, ana);
    assert.equal(listing.status, 201);
    const listingId = listing.data.product.id;
    const publicListing = (await call('catalog/products')).data.products.find(item => item.id === listingId);
    assert.equal(publicListing.name, 'Produto da Ana');
    assert.equal(publicListing.storeDescription, 'Objetos artesanais para a casa.');
    assert.equal(publicListing.storePhoto, photo);
    assert.equal((await call('seller/products', 'GET', undefined, bia)).status, 403);
    assert.equal((await call(`seller/products/${listingId}`, 'PUT', { name: 'Tomado' }, bia)).status, 403);
    assert.equal((await call('cart/quote', 'POST', { items: [{ id: listingId, qty: 2 }] })).data.totalCents, 7180);
    assert.equal((await call('cart/quote', 'POST', { items: [{ id: listingId, qty: 3 }] })).status, 400);
    assert.equal((await call(`seller/products/${listingId}/stock`, 'PUT', { amount: 1 }, ana)).data.product.stock, 3);
    assert.equal((await call('cart/quote', 'POST', { items: [{ id: listingId, qty: 3 }] })).status, 200);
    assert.equal((await call('me/address', 'PUT', { ...a, cep: 'abc' }, ana)).status, 400);
    for (const percent of [10,15,20]) {
      const quote = await call('cart/quote', 'POST', { items: [{ id: 'orla', qty: 1 }], couponCode: ` comprae${percent} `, discountPercent: 100 });
      assert.equal(quote.status, 200);
      assert.equal(quote.data.discountCents, Math.round(28900 * percent / 100));
      assert.equal(quote.data.totalCents, 28900 - quote.data.discountCents);
    }
    assert.equal((await call('cart/quote', 'POST', { items: [{ id: 'orla', qty: 1 }], couponCode: 'FAKE100' })).status, 400);
    assert.equal((await call('cart/quote', 'POST', { items: [], couponCode: 'COMPRAE10' })).status, 400);
    assert.equal((await call('cart/quote', 'POST', { items: [{ id: 'orla', qty: 1 }], couponCode: ['COMPRAE10','COMPRAE15'] })).status, 400);
    app.db.prepare("UPDATE coupons SET active=0 WHERE code='COMPRAE10'").run();
    assert.equal((await call('cart/quote', 'POST', { items: [{ id: 'orla', qty: 1 }], couponCode: 'COMPRAE10' })).status, 400);
    app.db.prepare("UPDATE coupons SET active=1,expires_at='2000-01-01T00:00:00Z' WHERE code='COMPRAE10'").run();
    assert.equal((await call('cart/quote', 'POST', { items: [{ id: 'orla', qty: 1 }], couponCode: 'COMPRAE10' })).status, 400);
    app.db.prepare("UPDATE coupons SET expires_at=NULL,min_subtotal_cents=100000 WHERE code='COMPRAE10'").run();
    assert.equal((await call('cart/quote', 'POST', { items: [{ id: 'orla', qty: 1 }], couponCode: 'COMPRAE10' })).status, 400);
    const order = { requestId: 'unique-request-123456', couponCode: 'COMPRAE15', discountPercent: 100, recipient: 'Ana Silva', address: { ...a, number: '42', complement: 'Apto 2' }, items: [{ id: 'orla', qty: 2, price: 1 }], total: 1, user_id: biaResponse.data.user.id };
    assert.equal((await call('orders', 'POST', { ...order, items: [{ id: 'orla', qty: -1 }] }, ana)).status, 400);
    assert.equal((await call('orders', 'POST', { ...order, items: [{ id: 'fake', qty: 1 }] }, ana)).status, 400);
    const saved = await call('orders', 'POST', order, ana);
    assert.equal(saved.status, 201);
    assert.equal(saved.data.order.subtotalCents, 57800);
    assert.equal(saved.data.order.totalCents, 49130);
    assert.equal(saved.data.order.discountCents, 8670);
    assert.equal(saved.data.order.coupon.code, 'COMPRAE15');
    app.db.prepare("UPDATE coupons SET active=0 WHERE code='COMPRAE15'").run();
    assert.equal((await call('orders', 'POST', { ...order, requestId: 'another-request-12345' }, ana)).status, 400);
    const repeated = await call('orders', 'POST', order, ana);
    assert.equal(repeated.data.order.id, saved.data.order.id);
    assert.equal(app.db.prepare('SELECT count(*) AS n FROM orders').get().n, 1);
    assert.deepEqual((await call('orders', 'GET', undefined, bia)).data.orders, []);
    await call('me/address', 'PUT', { ...a, localidade: 'Outra cidade' }, ana);
    assert.equal((await call('orders', 'GET', undefined, ana)).data.orders[0].address.localidade, 'São Paulo');
    assert.equal((await call('me', 'GET', undefined, bia)).data.user.address.localidade, 'São Paulo');
    assert.equal((await fetch(base + '/data/comprae.sqlite')).status, 404);
    assert.equal((await fetch(base + '/server/schema.sql')).status, 404);
    assert.equal((await fetch(base + '/produto/orla/')).status, 200);
    await new Promise(resolve => app.server.close(resolve));
    app = createApp({ dbPath });
    base = await listen();
    const restored = await call('me', 'GET', undefined, ana);
    assert.equal(restored.data.user.email, 'ana@example.com');
    assert.equal(restored.data.orders.length, 1);
    assert.equal(restored.data.orders[0].discountCents, 8670);
    assert.equal(restored.data.searches.length, 1);
    assert.equal(restored.data.sellerProfile.description, 'Objetos artesanais para a casa.');
    assert.equal(restored.data.sellerProfile.photo, photo);
    await call('searches', 'DELETE', {}, ana);
    assert.equal((await call('me', 'GET', undefined, ana)).data.searches.length, 0);
    await call('auth/logout', 'POST', {}, ana);
    assert.equal((await call('me', 'GET', undefined, ana)).data.user, null);
    const login = await call('auth/login', 'POST', credentials);
    assert.equal(login.status, 200);
    assert.equal(login.data.orders.length, 1);
    const expiredToken = login.cookie.split(';')[0];
    app.db.prepare('UPDATE sessions SET expires_at=0 WHERE user_id=?').run(login.data.user.id);
    assert.equal((await call('orders', 'GET', undefined, expiredToken)).status, 401);
    let limited;
    for (let i = 0; i < 16; i++) limited = await call('auth/login', 'POST', { email: 'missing@example.com', password: 'wrong-password' });
    assert.equal(limited.status, 429);
  } finally {
    await new Promise(resolve => app.server.close(resolve));
    for (const suffix of ['', '-wal', '-shm']) fs.rmSync(dbPath + suffix, { force: true });
    fs.rmdirSync(dir);
  }
});

test('version 1 database migrates without losing previous orders', () => {
  const { DatabaseSync } = require('node:sqlite');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'comprae-migration-'));
  const dbPath = path.join(dir, 'legacy.sqlite');
  const legacy = new DatabaseSync(dbPath);
  legacy.exec(fs.readFileSync(path.resolve(__dirname, '../server/schema.sql'), 'utf8').replace(/^\s+(subtotal_cents|discount_cents|discount_percent|coupon_code).*$/gm, ''));
  legacy.prepare('INSERT INTO users(id,name,email,password_hash) VALUES(?,?,?,?)').run(1,'Legacy','legacy@example.com','existing-hash');
  legacy.prepare('INSERT INTO orders(id,user_id,request_id,total_cents,recipient,address_json) VALUES(?,?,?,?,?,?)').run('legacy-order',1,'legacy-request',12345,'Legacy','{}');
  legacy.close();
  const app = createApp({ dbPath });
  try {
    const order = app.db.prepare('SELECT * FROM orders WHERE id=?').get('legacy-order');
    assert.equal(order.total_cents,12345);
    assert.equal(order.subtotal_cents,12345);
    assert.equal(order.discount_cents,0);
    assert.equal(order.coupon_code,null);
    assert.equal(app.db.prepare('SELECT password_hash FROM users WHERE id=1').get().password_hash,'existing-hash');
    assert.equal(app.db.prepare('PRAGMA user_version').get().user_version,4);
  } finally {
    app.db.close();
    for (const suffix of ['', '-wal', '-shm']) fs.rmSync(dbPath + suffix, { force: true });
    fs.rmdirSync(dir);
  }
});

test('existing seller profiles gain description and photo fields without losing data', () => {
  const { DatabaseSync } = require('node:sqlite');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'comprae-seller-migration-'));
  const dbPath = path.join(dir, 'legacy-seller.sqlite');
  const legacy = new DatabaseSync(dbPath);
  const currentSchema = fs.readFileSync(path.resolve(__dirname, '../server/schema.sql'), 'utf8');
  const oldSchema = currentSchema.replace(/  cnpj TEXT NOT NULL DEFAULT '',\r?\n  description TEXT NOT NULL DEFAULT '',\r?\n  photo_data TEXT NOT NULL DEFAULT ''/, "  cnpj TEXT NOT NULL DEFAULT ''");
  assert.notEqual(oldSchema, currentSchema);
  legacy.exec(oldSchema);
  legacy.prepare('INSERT INTO users(id,name,email,password_hash) VALUES(?,?,?,?)').run(1, 'Ana', 'ana@example.com', 'existing-hash');
  legacy.prepare('INSERT INTO seller_profiles(user_id,name,email,phone,cnpj) VALUES(?,?,?,?,?)').run(1, 'Loja Antiga', 'loja@example.com', '11999999999', '');
  legacy.close();
  const app = createApp({ dbPath });
  try {
    const profile = app.db.prepare('SELECT name,email,description,photo_data FROM seller_profiles WHERE user_id=1').get();
    assert.deepEqual({ ...profile }, { name: 'Loja Antiga', email: 'loja@example.com', description: '', photo_data: '' });
    assert.equal(app.db.prepare('PRAGMA user_version').get().user_version, 4);
  } finally {
    app.db.close();
    for (const suffix of ['', '-wal', '-shm']) fs.rmSync(dbPath + suffix, { force: true });
    fs.rmdirSync(dir);
  }
});
