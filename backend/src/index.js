import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { deleteQuery, insertQuery, listQueries, updateQuery } from './db.js';
import { readStock, writeStock } from './stock.js';

const port = Number(process.env.PORT) || 4000;
const jwtSecret = process.env.JWT_SECRET;
const adminUsername = process.env.ADMIN_USERNAME;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!jwtSecret || !adminUsername || !adminPassword) {
  console.error('Set JWT_SECRET, ADMIN_USERNAME and ADMIN_PASSWORD in backend/.env');
  process.exit(1);
}

const adminPasswordHash = bcrypt.hashSync(adminPassword, 10);

const SOURCES = new Set(['general', 'faqs', 'agri-waste', 'cow-dung', 'industries', 'contact']);
const INTENTS = new Set(['general', 'buy', 'sell', 'report']);

const clip = (value, max) => String(value ?? '').trim().slice(0, max);

const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json({ limit: '100kb' }));

const hits = new Map();
const allowQuery = (ip) => {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 30) return false;
  recent.push(now);
  hits.set(ip, recent);
  return true;
};

const requireAdmin = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token) return res.status(401).json({ error: 'Sign in required.' });
  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.role !== 'admin') return res.status(403).json({ error: 'Admin only.' });
    req.admin = payload;
    next();
  } catch {
    return res.status(401).json({ error: 'Sign in required.' });
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get('/api/stock', (_req, res) => {
  res.json(readStock());
});

app.post('/api/queries', (req, res) => {
  const ip = req.ip || 'local';
  if (!allowQuery(ip)) {
    return res.status(429).json({ error: 'Too many queries. Please try again shortly.' });
  }

  const name = clip(req.body.name, 120);
  const phone = clip(req.body.phone, 40);
  const source = clip(req.body.source, 40);
  const intent = clip(req.body.intent, 40);

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required.' });
  }
  if (!SOURCES.has(source) || !INTENTS.has(intent)) {
    return res.status(400).json({ error: 'This query could not be filed.' });
  }

  const details = req.body.details && typeof req.body.details === 'object' ? req.body.details : {};
  const safeDetails = {};
  for (const [key, value] of Object.entries(details)) {
    if (typeof value === 'string') safeDetails[clip(key, 40)] = clip(value, 500);
  }

  const saved = insertQuery({
    name,
    company: clip(req.body.company, 160),
    phone,
    email: clip(req.body.email, 160),
    message: clip(req.body.message, 4000),
    source,
    intent,
    title: clip(req.body.title, 160),
    details: safeDetails,
  });

  res.status(201).json({ id: saved.id });
});

app.post('/api/admin/login', (req, res) => {
  const username = clip(req.body.username, 80);
  const password = String(req.body.password ?? '');
  const usernameMatches = username === adminUsername;
  const passwordMatches = bcrypt.compareSync(password, adminPasswordHash);
  if (!usernameMatches || !passwordMatches) {
    return res.status(401).json({ error: 'Incorrect username or password.' });
  }
  const token = jwt.sign({ role: 'admin', username }, jwtSecret, { expiresIn: '12h' });
  res.json({ token, role: 'admin', username });
});

app.put('/api/admin/stock', requireAdmin, (req, res) => {
  try {
    res.json(writeStock(req.body));
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message || 'Could not save lot values.' });
  }
});

app.get('/api/admin/queries', requireAdmin, (_req, res) => {
  res.json({ queries: listQueries() });
});

app.patch('/api/admin/queries/:id', requireAdmin, (req, res) => {
  const status = req.body.status === 'read' ? 'read' : req.body.status === 'new' ? 'new' : '';
  if (!status) return res.status(400).json({ error: 'Status must be new or read.' });
  const updated = updateQuery(req.params.id, { status });
  if (!updated) return res.status(404).json({ error: 'Query not found.' });
  res.json({ query: updated });
});

app.delete('/api/admin/queries/:id', requireAdmin, (req, res) => {
  const removed = deleteQuery(req.params.id);
  if (!removed) return res.status(404).json({ error: 'Query not found.' });
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`NBHF backend listening on http://localhost:${port}`);
});
