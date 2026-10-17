import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'nbhf';

export const getDb = async () => {
  if (!uri) throw new Error('Set MONGODB_URI in backend/.env');
  if (!globalThis.__nbhfMongo) {
    const client = new MongoClient(uri);
    globalThis.__nbhfMongo = client
      .connect()
      .then(() => client.db(dbName))
      .catch((error) => {
        globalThis.__nbhfMongo = undefined;
        throw error;
      });
  }
  return globalThis.__nbhfMongo;
};
