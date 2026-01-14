import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = join(__dirname, '..', 'data', 'garden.db');

const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS garden_beds (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    width INTEGER NOT NULL,
    length INTEGER NOT NULL,
    square_footage INTEGER NOT NULL,
    soil TEXT,
    sun_exposure TEXT CHECK(sun_exposure IN ('full', 'partial', 'shade')) NOT NULL,
    status TEXT CHECK(status IN ('unused', 'overgrown', 'planted', 'ready-for-harvest')) NOT NULL,
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS crop_schedules (
    id TEXT PRIMARY KEY,
    bed_id TEXT NOT NULL,
    crop_name TEXT NOT NULL,
    variety TEXT,
    start_month INTEGER NOT NULL CHECK(start_month BETWEEN 1 AND 12),
    end_month INTEGER NOT NULL CHECK(end_month BETWEEN 1 AND 12),
    notes TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (bed_id) REFERENCES garden_beds(id)
  );
`);

console.log('Database setup complete!');