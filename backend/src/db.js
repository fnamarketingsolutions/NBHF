import { randomUUID } from 'crypto';
import { getDb } from './mongo.js';

const queries = async () => (await getDb()).collection('queries');

const publicQuery = (doc) => {
  if (!doc) return null;
  const { _id, ...query } = doc;
  return query;
};

export const insertQuery = async (entry) => {
  const query = {
    id: randomUUID(),
    status: 'new',
    createdAt: new Date().toISOString(),
    ...entry,
  };
  await (await queries()).insertOne({ _id: query.id, ...query });
  return query;
};

export const listQueries = async () => {
  const rows = await (await queries()).find({}).sort({ createdAt: -1 }).toArray();
  return rows.map(publicQuery);
};

export const updateQuery = async (id, patch) => {
  const result = await (await queries()).findOneAndUpdate(
    { id },
    { $set: patch },
    { returnDocument: 'after' },
  );
  if (!result) return null;
  const doc = Object.prototype.hasOwnProperty.call(result, 'ok') ? result.value : result;
  return publicQuery(doc);
};

export const deleteQuery = async (id) => {
  const result = await (await queries()).deleteOne({ id });
  return result.deletedCount === 1;
};
