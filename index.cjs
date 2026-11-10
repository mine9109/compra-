'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { randomBytes, randomUUID, createHash, scrypt, timingSafeEqual } = require('node:crypto');
const { promisify } = require('node:util');
const deriveKey = promisify(scrypt);
const SESSION_SECONDS = 7 * 24 * 60 * 60;
const digest = value => createHash('sha256').update(value).digest('hex');
const fail = (status, message) => { throw Object.assign(new Error(message), { status }); };
function text(value, label, max, min = 1) {
  if (typeof value !== 'string' || value.trim().length < min || value.trim().length > max) fail(400, `${label} inválido.`);
  return value.trim();
}
function email(value) {
  const result = text(value, 'E-mail', 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result)) fail(400, 'Informe um e-mail válido.');
  return result;
}
function cpf(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) fail(400, 'Informe um CPF válido.');
  for (let length = 9; length < 11; length++) {
    const sum = Array.from(digits.slice(0, length), Number).reduce((total, digit, index) => total + digit * (length + 1 - index), 0);
    if ((sum * 10 % 11) % 10 !== Number(digits[length])) fail(400, 'Informe um CPF válido.');
  }
  return digits;
}
function birthDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) fail(400, 'Informe uma data de nascimento válida.');
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value || date.getTime() > Date.now()) fail(400, 'Informe uma data de nascimento válida.');
  return value;
}
function jpegImage(value, label) {
  if (typeof value !== 'string' || !/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(value) || value.length > 430000) fail(400, `${label} deve ser uma imagem JPG de até 300 KB.`);
  const bytes = Buffer.from(value.slice('data:image/jpeg;base64,'.length), 'base64');
  if (bytes.length > 300000 || bytes.length < 100 || bytes[0] !== 0xff || bytes[1] !== 0xd8) fail(400, `${label} inválida.`);
  return value;
}
function address(value, full = false) {
  if (!value || typeof value !== 'object') fail(400, 'Informe o endereço.');
  const cep = text(value.cep, 'CEP', 9).replace('-', '');
  if (!/^\d{8}$/.test(cep)) fail(400, 'CEP deve conter 8 números.');
  const uf = text(value.uf, 'Estado', 2);
  if (!['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].includes(uf)) fail(400, 'Estado inválido.');
  return { cep: cep.replace(/^(\d{5})(\d{3})$/, '$1-$2'),
    logradouro: text(value.logradouro ?? '', 'Rua', 200, full ? 1 : 0),
    bairro: text(value.bairro ?? '', 'Bairro', 100, full ? 1 : 0),
    localidade: text(value.localidade, 'Cidade', 100), uf,
    number: text(value.number ?? '', 'Número', 30, full ? 1 : 0),
    complement: text(value.complement ?? '', 'Complemento', 150, 0) };
}
async function hashPassword(password, salt = randomBytes(16).toString('hex')) {
  const key = await deriveKey(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `${salt}:${key.toString('hex')}`;
}
async function readBody(req, maxSize = 32768) {
  if (!(req.headers['content-type'] || '').startsWith('application/json')) fail(415, 'Envie JSON.');
  let size = 0;
  const chunks = [];
  for await (const chunk of req) { size += chunk.length; if (size > maxSize) fail(413, 'Dados muito grandes.'); chunks.push(chunk); }
  try { const result = JSON.parse(Buffer.concat(chunks).toString()); if (!result || typeof result !== 'object' || Array.isArray(result)) throw new Error(); return result; }
  catch { fail(400, 'JSON inválido.'); }
}

function createApp({ dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../data/comprae.sqlite'), secureCookies = process.env.NODE_ENV === 'production' } = {}) {
  if (dbPath !== ':memory:') fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });
  const db = new DatabaseSync(dbPath, { timeout: 5000 });
  db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8'));
  // Additive migration: preserve accounts and existing order totals.
  const orderColumns = new Set(db.prepare('PRAGMA table_info(orders)').all().map(column => column.name));
  const userColumns = new Set(db.prepare('PRAGMA table_info(users)').all().map(column => column.name));
  const sellerColumns = new Set(db.prepare('PRAGMA table_info(seller_profiles)').all().map(column => column.name));
  db.exec('BEGIN IMMEDIATE');
  try {
    for (const [name, type] of [['subtotal_cents','INTEGER NOT NULL DEFAULT 0'], ['discount_cents','INTEGER NOT NULL DEFAULT 0'], ['discount_percent','INTEGER NOT NULL DEFAULT 0'], ['coupon_code','TEXT']]) {
      if (!orderColumns.has(name)) db.exec(`ALTER TABLE orders ADD COLUMN ${name} ${type}`);
    }
    if (!userColumns.has('cpf')) db.exec('ALTER TABLE users ADD COLUMN cpf TEXT');
    if (!userColumns.has('birth_date')) db.exec('ALTER TABLE users ADD COLUMN birth_date TEXT');
    if (!sellerColumns.has('description')) db.exec("ALTER TABLE seller_profiles ADD COLUMN description TEXT NOT NULL DEFAULT ''");
    if (!sellerColumns.has('photo_data')) db.exec("ALTER TABLE seller_profiles ADD COLUMN photo_data TEXT NOT NULL DEFAULT ''");
    db.exec('CREATE UNIQUE INDEX IF NOT EXISTS users_cpf_unique ON users(cpf) WHERE cpf IS NOT NULL');
    if (!orderColumns.has('subtotal_cents')) db.exec('UPDATE orders SET subtotal_cents=total_cents');
    db.exec('PRAGMA user_version=4; COMMIT');
  } catch (error) { db.exec('ROLLBACK'); throw error; }
  for (const percent of [10,15,20]) db.prepare('INSERT OR IGNORE INTO coupons(code,percent) VALUES(?,?)').run(`COMPRAE${percent}`, percent);
  const seed = db.prepare('INSERT OR IGNORE INTO products(id,name,price_cents) VALUES(?,?,?)');
  [['orla','Luminária Orla',28900],['brisa','Vaso Brisa',11900],['mare','Caixa de som Maré',39900],['cobre','Caderno Cobre',7400],['atlantica','Garrafa Atlântica',12900],['ponto','Fone Ponto',24900],['ninho','Manta Ninho',18900],['linha','Kit Linha',5800]].forEach(row => seed.run(...row));
  const staticRoot = path.resolve(__dirname, '../dist');
  const limits = new Map();
  const cookieName = 'comprae_session';
  const sessionToken = req => (req.headers.cookie || '').split(';').map(part => part.trim()).find(part => part.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1) || '';
  function currentUser(req) {
    const token = sessionToken(req);
    if (!/^[a-f0-9]{64}$/.test(token)) return null;
    return db.prepare('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires_at>?').get(digest(token), Date.now()) || null;
  }
  const cookie = (token, age) => `${cookieName}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${age}${secureCookies ? '; Secure' : ''}`;
  function createSession(req, res, userId) {
    db.prepare('DELETE FROM sessions WHERE token_hash=? OR expires_at<=?').run(digest(sessionToken(req)), Date.now());
    const token = randomBytes(32).toString('hex');
    db.prepare('INSERT INTO sessions(token_hash,user_id,expires_at) VALUES(?,?,?)').run(digest(token), userId, Date.now() + SESSION_SECONDS * 1000);
    res.setHeader('Set-Cookie', cookie(token, SESSION_SECONDS));
  }
  function publicUser(user) {
    if (!user) return null;
    const a = db.prepare('SELECT * FROM addresses WHERE user_id=?').get(user.id);
    return { id: user.id, name: user.name, email: user.email, hasIdentity: Boolean(user.cpf && user.birth_date), cpfLast4: user.cpf?.slice(-4) || null, address: a ? { cep: a.cep, logradouro: a.street, bairro: a.neighborhood, localidade: a.city, uf: a.state, number: a.number, complement: a.complement } : null };
  }
  function saveAddress(userId, a) {
    db.prepare('INSERT INTO addresses(user_id,cep,street,neighborhood,city,state,number,complement) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET cep=excluded.cep,street=excluded.street,neighborhood=excluded.neighborhood,city=excluded.city,state=excluded.state,number=excluded.number,complement=excluded.complement').run(userId,a.cep,a.logradouro,a.bairro,a.localidade,a.uf,a.number,a.complement);
  }
  const orderView = o => ({ id: o.id, totalCents: o.total_cents, subtotalCents: o.subtotal_cents, discountCents: o.discount_cents, coupon: o.coupon_code ? { code: o.coupon_code, percent: o.discount_percent } : null, status: o.status, recipient: o.recipient, address: JSON.parse(o.address_json), createdAt: o.created_at, items: db.prepare('SELECT product_id AS id,name,quantity,unit_price_cents AS unitPriceCents FROM order_items WHERE order_id=?').all(o.id) });
  const orders = userId => db.prepare('SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC LIMIT 100').all(userId).map(orderView);
  const orderById = (id, userId) => orderView(db.prepare('SELECT * FROM orders WHERE id=? AND user_id=?').get(id, userId));
  const searches = id => db.prepare('SELECT id,term,created_at AS createdAt FROM searches WHERE user_id=? ORDER BY id DESC LIMIT 50').all(id);
  const sellerProfile = id => db.prepare('SELECT name,email,phone,cnpj,description,photo_data AS photo FROM seller_profiles WHERE user_id=?').get(id) || null;
  const sellerProductRows = (ownerId = null) => db.prepare(`SELECT s.id,s.seller_user_id AS ownerId,sp.name AS storeName,sp.description AS storeDescription,sp.photo_data AS storePhoto,p.name,s.category,p.price_cents AS priceCents,s.description,s.stock,s.status,s.image_data AS image,
    COALESCE((SELECT SUM(oi.quantity) FROM order_items oi WHERE oi.product_id=s.id),0) AS sales
    FROM seller_products s JOIN products p ON p.id=s.id JOIN seller_profiles sp ON sp.user_id=s.seller_user_id ${ownerId === null ? "WHERE s.status='Ativo' AND s.stock>0" : 'WHERE s.seller_user_id=?'} ORDER BY s.created_at DESC`).all(...(ownerId === null ? [] : [ownerId]));
  const sellerProductView = row => ({ id: row.id, ownerId: row.ownerId, storeName: row.storeName, storeDescription: row.storeDescription, storePhoto: row.storePhoto, name: row.name, category: row.category, price: row.priceCents / 100, description: row.description, stock: row.stock, status: row.status, image: row.image, sales: row.sales });
  function sellerProductInput(body, existing) {
    const name = text(body.name, 'Nome do produto', 100, 2);
    const category = text(body.category, 'Categoria', 30);
    if (!['Casa','Tecnologia','Bem-estar','Papelaria','Moda','Outros'].includes(category)) fail(400, 'Categoria inválida.');
    const description = text(body.description, 'Descrição', 1200, 10);
    const price = Number(body.price);
    const stock = Number(body.stock);
    if (!Number.isFinite(price) || price < 0.01 || price > 100000 || Math.abs(Math.round(price * 100) - price * 100) > 1e-6) fail(400, 'Informe um preço válido.');
    if (!Number.isInteger(stock) || stock < 0 || stock > 100000) fail(400, 'Estoque inválido.');
    if (!['Ativo','Pausado'].includes(body.status)) fail(400, 'Status inválido.');
    const image = jpegImage(body.image || existing?.image_data, 'Foto do produto');
    return { name, category, description, priceCents: Math.round(price * 100), stock, status: body.status, image };
  }
  function quoteCart(body) {
    if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 30) fail(400, 'Sacola inválida.');
    const seen = new Set();
    const items = body.items.map(item => {
      if (!item || typeof item.id !== 'string' || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99 || seen.has(item.id)) fail(400, 'Item ou quantidade inválida.');
      seen.add(item.id);
      const product = db.prepare('SELECT * FROM products WHERE id=?').get(item.id);
      if (!product) fail(400, 'Produto indisponível.');
      const sellerProduct = db.prepare('SELECT status,stock FROM seller_products WHERE id=?').get(item.id);
      if (sellerProduct && (sellerProduct.status !== 'Ativo' || sellerProduct.stock < item.qty)) fail(400, 'Produto sem estoque ou indisponível.');
      return { ...product, qty: item.qty };
    });
    const subtotalCents = items.reduce((sum, item) => sum + item.price_cents * item.qty, 0);
    const code = text(body.couponCode ?? '', 'Cupom', 32, 0).toUpperCase();
    let coupon = null;
    if (code) {
      const record = db.prepare('SELECT * FROM coupons WHERE code=?').get(code);
      if (!record || !record.active) fail(400, 'Cupom inválido ou indisponível.');
      if (record.expires_at && Date.parse(record.expires_at) <= Date.now()) fail(400, 'Este cupom expirou.');
      if (subtotalCents < record.min_subtotal_cents) fail(400, `Este cupom exige pelo menos R$ ${(record.min_subtotal_cents / 100).toFixed(2).replace('.', ',')} em produtos.`);
      coupon = { code: record.code, percent: record.percent };
    }
    const discountCents = coupon ? Math.round(subtotalCents * coupon.percent / 100) : 0;
    return { items, subtotalCents, discountCents, totalCents: subtotalCents - discountCents, coupon };
  }
  function rateLimit(req, identity) {
    const now = Date.now();
    for (const [key, item] of limits) if (item.until <= now) limits.delete(key);
    for (const key of [`ip:${req.socket.remoteAddress}`, `email:${identity}`]) {
      const item = limits.get(key) || { count: 0, until: now + 15 * 60 * 1000 };
      item.count += 1; limits.set(key, item);
      if (item.count > (key.startsWith('ip:') ? 60 : 15)) fail(429, 'Muitas tentativas. Aguarde 15 minutos.');
    }
  }
  const json = (res, status, value) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); };
  const server = http.createServer(async (req, res) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'same-origin');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    try {
      const url = new URL(req.url, 'http://localhost');
      const route = url.pathname;
      if (route.startsWith('/api/')) {
        // Same-origin requests only. No CORS credentials or proxy-header trust.
        if (!['GET','HEAD'].includes(req.method)) {
          const expected = process.env.APP_ORIGIN || `${secureCookies ? 'https' : 'http'}://${req.headers.host}`;
          if (req.headers.origin !== expected || req.headers['sec-fetch-site'] === 'cross-site') fail(403, 'Origem não autorizada.');
        }
        const user = currentUser(req);
        if (route === '/api/cart/quote' && req.method === 'POST') return json(res, 200, quoteCart(await readBody(req)));
        if (route === '/api/catalog/products' && req.method === 'GET') return json(res, 200, { products: sellerProductRows().map(sellerProductView) });
        if (route === '/api/me' && req.method === 'GET') return json(res, 200, { user: publicUser(user), searches: user ? searches(user.id) : [], orders: user ? orders(user.id) : [], sellerProfile: user ? sellerProfile(user.id) : null });
        if (['/api/auth/register','/api/auth/login'].includes(route) && req.method === 'POST') {
          const body = await readBody(req);
          const mail = email(body.email);
          rateLimit(req, mail);
          if (typeof body.password !== 'string' || body.password.length < 8 || body.password.length > 128) fail(400, 'A senha deve ter entre 8 e 128 caracteres.');
          let account = db.prepare('SELECT * FROM users WHERE email=?').get(mail);
          if (route.endsWith('/register')) {
            const name = text(body.name, 'Nome', 100, 2);
            const document = cpf(body.cpf);
            const born = birthDate(body.birthDate);
            const a = address(body.address);
            if (account) fail(409, 'E-mail já cadastrado. Entre com sua senha.');
            if (db.prepare('SELECT id FROM users WHERE cpf=?').get(document)) fail(409, 'CPF já cadastrado. Entre na sua conta.');
            const passwordHash = await hashPassword(body.password);
            db.exec('BEGIN IMMEDIATE');
            try {
              // Recheck after asynchronous hashing to handle simultaneous registrations.
              if (db.prepare('SELECT id FROM users WHERE email=? OR cpf=?').get(mail, document)) fail(409, 'E-mail ou CPF já cadastrado.');
              const inserted = db.prepare('INSERT INTO users(name,email,password_hash,cpf,birth_date) VALUES(?,?,?,?,?)').run(name, mail, passwordHash, document, born);
              saveAddress(Number(inserted.lastInsertRowid), a);
              db.exec('COMMIT');
            } catch (error) { db.exec('ROLLBACK'); throw error; }
            account = db.prepare('SELECT * FROM users WHERE email=?').get(mail);
          } else {
            const stored = account?.password_hash || `${'0'.repeat(32)}:${'0'.repeat(128)}`;
            const candidate = await hashPassword(body.password, stored.split(':')[0]);
            if (!account || !timingSafeEqual(Buffer.from(candidate.split(':')[1], 'hex'), Buffer.from(stored.split(':')[1], 'hex'))) fail(401, 'E-mail ou senha incorretos.');
          }
          createSession(req, res, account.id);
          return json(res, 200, { user: publicUser(account), searches: searches(account.id), orders: orders(account.id), sellerProfile: sellerProfile(account.id) });
        }
        if (route === '/api/auth/logout' && req.method === 'POST') {
          db.prepare('DELETE FROM sessions WHERE token_hash=?').run(digest(sessionToken(req)));
          res.setHeader('Set-Cookie', cookie('', 0));
          return json(res, 200, { ok: true });
        }
        if (!user) fail(401, 'Entre na sua conta para continuar.');
        if (route === '/api/seller/profile' && req.method === 'POST') {
          const body = await readBody(req, 500000);
          const name = text(body.name, 'Nome da loja', 100, 2);
          const mail = email(body.email);
          const phone = String(body.phone || '').replace(/\D/g, '');
          if (!/^\d{10,11}$/.test(phone)) fail(400, 'Informe um telefone com DDD.');
          const cnpj = String(body.cnpj || '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
          if (cnpj && !/^[A-Z0-9]{14}$/.test(cnpj)) fail(400, 'Informe um CNPJ de 14 caracteres ou deixe em branco.');
          const description = text(body.description ?? '', 'Descrição da loja', 600, 0);
          const currentProfile = sellerProfile(user.id);
          const photo = body.photo === undefined ? (currentProfile?.photo || '') : body.photo === '' ? '' : jpegImage(body.photo, 'Foto da loja');
          let identity = null;
          if (!user.cpf || !user.birth_date) {
            const document = cpf(body.cpf);
            const born = birthDate(body.birthDate);
            if (db.prepare('SELECT id FROM users WHERE cpf=? AND id<>?').get(document, user.id)) fail(409, 'CPF já cadastrado.');
            identity = { document, born };
          }
          db.exec('BEGIN IMMEDIATE');
          try {
            if (identity) db.prepare('UPDATE users SET cpf=?,birth_date=? WHERE id=?').run(identity.document, identity.born, user.id);
            db.prepare('INSERT INTO seller_profiles(user_id,name,email,phone,cnpj,description,photo_data) VALUES(?,?,?,?,?,?,?) ON CONFLICT(user_id) DO UPDATE SET name=excluded.name,email=excluded.email,phone=excluded.phone,cnpj=excluded.cnpj,description=excluded.description,photo_data=excluded.photo_data').run(user.id,name,mail,phone,cnpj,description,photo);
            db.exec('COMMIT');
          } catch (error) { db.exec('ROLLBACK'); throw error; }
          return json(res, 200, { sellerProfile: sellerProfile(user.id), user: publicUser(db.prepare('SELECT * FROM users WHERE id=?').get(user.id)) });
        }
        if (route === '/api/seller/products' && req.method === 'GET') {
          if (!sellerProfile(user.id)) fail(403, 'Ative o perfil de vendedor na sua conta.');
          return json(res, 200, { products: sellerProductRows(user.id).map(sellerProductView) });
        }
        if (route === '/api/seller/products' && req.method === 'POST') {
          if (!sellerProfile(user.id)) fail(403, 'Ative o perfil de vendedor na sua conta.');
          const input = sellerProductInput(await readBody(req, 500000));
          const id = `seller-${randomUUID()}`;
          db.exec('BEGIN IMMEDIATE');
          try {
            db.prepare('INSERT INTO products(id,name,price_cents) VALUES(?,?,?)').run(id,input.name,input.priceCents);
            db.prepare('INSERT INTO seller_products(id,seller_user_id,category,description,stock,status,image_data) VALUES(?,?,?,?,?,?,?)').run(id,user.id,input.category,input.description,input.stock,input.status,input.image);
            db.exec('COMMIT');
          } catch (error) { db.exec('ROLLBACK'); throw error; }
          return json(res, 201, { product: sellerProductView(sellerProductRows(user.id).find(item => item.id === id)) });
        }
        const productRoute = /^\/api\/seller\/products\/(seller-[a-f0-9-]+)(?:\/(stock))?$/.exec(route);
        if (productRoute && req.method === 'PUT') {
          if (!sellerProfile(user.id)) fail(403, 'Ative o perfil de vendedor na sua conta.');
          const current = db.prepare('SELECT * FROM seller_products WHERE id=? AND seller_user_id=?').get(productRoute[1], user.id);
          if (!current) fail(404, 'Anúncio não encontrado.');
          if (productRoute[2] === 'stock') {
            const amount = Number((await readBody(req)).amount);
            if (!Number.isInteger(amount) || amount < 1 || amount > 100000 || current.stock + amount > 100000) fail(400, 'Quantidade inválida.');
            db.prepare("UPDATE seller_products SET stock=?,status='Ativo' WHERE id=?").run(current.stock + amount,current.id);
          } else {
            const input = sellerProductInput(await readBody(req, 500000), current);
            db.exec('BEGIN IMMEDIATE');
            try {
              db.prepare('UPDATE products SET name=?,price_cents=? WHERE id=?').run(input.name,input.priceCents,current.id);
              db.prepare('UPDATE seller_products SET category=?,description=?,stock=?,status=?,image_data=? WHERE id=?').run(input.category,input.description,input.stock,input.status,input.image,current.id);
              db.exec('COMMIT');
            } catch (error) { db.exec('ROLLBACK'); throw error; }
          }
          return json(res, 200, { product: sellerProductView(sellerProductRows(user.id).find(item => item.id === current.id)) });
        }
        if (route === '/api/me/address' && req.method === 'PUT') {
          saveAddress(user.id, address(await readBody(req)));
          return json(res, 200, { user: publicUser(user) });
        }
        if (route === '/api/searches') {
          if (req.method === 'POST') {
            const term = text((await readBody(req)).term, 'Busca', 120);
            db.prepare('INSERT INTO searches(user_id,term) VALUES(?,?)').run(user.id, term);
            db.prepare('DELETE FROM searches WHERE user_id=? AND id NOT IN (SELECT id FROM searches WHERE user_id=? ORDER BY id DESC LIMIT 50)').run(user.id,user.id);
          } else if (req.method === 'DELETE') db.prepare('DELETE FROM searches WHERE user_id=?').run(user.id);
          else if (req.method !== 'GET') fail(405, 'Método não permitido.');
          return json(res, 200, { searches: searches(user.id) });
        }
        if (route === '/api/orders' && req.method === 'GET') return json(res, 200, { orders: orders(user.id) });
        if (route === '/api/orders' && req.method === 'POST') {
          const body = await readBody(req);
          const requestId = text(body.requestId, 'Identificador do pedido', 80, 16);
          const existing = db.prepare('SELECT id FROM orders WHERE user_id=? AND request_id=?').get(user.id, requestId);
          if (existing) return json(res, 200, { order: orderById(existing.id, user.id), user: publicUser(user) });
          const a = address(body.address, true);
          const recipient = text(body.recipient, 'Destinatário', 100, 2);
          const quote = quoteCart(body);
          const items = quote.items;
          const id = randomUUID();
          db.exec('BEGIN IMMEDIATE');
          try {
            db.prepare('INSERT INTO orders(id,user_id,request_id,total_cents,recipient,address_json,subtotal_cents,discount_cents,discount_percent,coupon_code) VALUES(?,?,?,?,?,?,?,?,?,?)').run(id,user.id,requestId,quote.totalCents,recipient,JSON.stringify(a),quote.subtotalCents,quote.discountCents,quote.coupon?.percent || 0,quote.coupon?.code || null);
            for (const item of items) db.prepare('INSERT INTO order_items(order_id,product_id,name,quantity,unit_price_cents) VALUES(?,?,?,?,?)').run(id,item.id,item.name,item.qty,item.price_cents);
            saveAddress(user.id,a);
            db.exec('COMMIT');
          } catch (error) { db.exec('ROLLBACK'); throw error; }
          return json(res, 201, { order: orderById(id, user.id), user: publicUser(user) });
        }
        fail(404, 'Recurso não encontrado.');
      }
      if (!['GET','HEAD'].includes(req.method)) fail(405, 'Método não permitido.');
      let file = path.resolve(staticRoot, '.' + decodeURIComponent(route));
      if (file !== staticRoot && !file.startsWith(staticRoot + path.sep)) fail(403, 'Acesso negado.');
      if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        if (!route.endsWith('/')) { res.writeHead(302, { Location: route + '/' + url.search }); return res.end(); }
        file = path.join(file, 'index.html');
      }
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) fail(404, 'Página não encontrada.');
      const type = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml' }[path.extname(file)];
      if (!type) fail(404, 'Arquivo não encontrado.');
      res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
      if (req.method === 'HEAD') res.end(); else fs.createReadStream(file).pipe(res);
    } catch (error) {
      if (!error.status) console.error('Falha interna:', error.code || error.name);
      if (!res.headersSent) json(res, error.status || 500, { error: error.status ? error.message : 'Não foi possível concluir. Tente novamente.' });
      else res.end();
    }
  });
  server.requestTimeout = 15000;
  server.headersTimeout = 10000;
  server.on('close', () => db.close());
  return { server, db };
}
if (require.main === module) {
  const { server } = createApp();
  const port = Number(process.env.PORT || 3000);
  server.listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Compraê disponível em http://localhost:${port}\nBanco: ${process.env.DATABASE_PATH || 'data/comprae.sqlite'}\nCtrl+C para encerrar.`));
  server.on('error', error => { console.error(error.code === 'EADDRINUSE' ? `A porta ${port} já está em uso.` : error.message); process.exitCode = 1; });
  for (const signal of ['SIGINT','SIGTERM']) process.on(signal, () => server.close());
}
module.exports = { createApp };
