import { sql } from '../config/db.js';

sql`
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name VARCHAR(100),
    profile_image_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
`.then(() => {
    console.log('Table created')
})