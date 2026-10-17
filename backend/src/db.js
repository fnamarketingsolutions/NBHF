import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const filePath = path.join(process.cwd(), 'data', 'queries.json');

const readAll = () => {
  if (!fs.existsSync(filePath)) return [];
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeAll = (rows) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(rows, null, 2));
};

export const insertQuery = (entry) => {
  const rows = readAll();
  const query = {
    id: randomUUID(),
    status: 'new',
    createdAt: new Date().toISOString(),
    ...entry,
  };
  rows.unshift(query);
  writeAll(rows);
  return query;
};

export const listQueries = () => readAll();

export const updateQuery = (id, patch) => {
  const rows = readAll();
  const index = rows.findIndex((row) => row.id === id);
  if (index === -1) return null;
  rows[index] = { ...rows[index], ...patch };
  writeAll(rows);
  return rows[index];
};

export const deleteQuery = (id) => {
  const rows = readAll();
  const next = rows.filter((row) => row.id !== id);
  if (next.length === rows.length) return false;
  writeAll(next);
  return true;
};
