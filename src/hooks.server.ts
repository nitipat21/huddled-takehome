import { Database } from "bun:sqlite";
import fs from 'fs';
import path from 'path';

const dbDir = path.resolve('./database');
const dbFile = path.join(dbDir, 'main.db');

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbFile);


export const handle = async ({ event, resolve }) => {
  event.locals.db = db;
  return resolve(event);
};
