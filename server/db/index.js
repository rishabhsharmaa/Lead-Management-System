const { Pool, Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  host: process.env.DB_HOST || '127.0.0.1',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_DATABASE || 'lead_management',
};

let pool;

async function ensureDatabaseExists() {
  const clientConfig = { ...dbConfig, database: 'postgres' };
  const client = new Client(clientConfig);

  try {
    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbConfig.database]
    );

    if (res.rowCount === 0) {
      console.log(`Database '${dbConfig.database}' not found. Creating it...`);
      await client.query(`CREATE DATABASE ${dbConfig.database}`);
      console.log(`Database '${dbConfig.database}' created successfully.`);
    } else {
      console.log(`Database '${dbConfig.database}' already exists.`);
    }
  } catch (err) {
    console.error('Error checking/creating database:', err.message);
    console.error('Make sure PostgreSQL is running and credentials in .env are correct.');
    throw err;
  } finally {
    await client.end();
  }
}

async function initializeDatabase() {
  await ensureDatabaseExists();

  pool = new Pool(dbConfig);

  pool.on('error', (err) => {
    console.error('Unexpected error on idle client:', err);
  });

  try {
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running database schema setup...');
    await pool.query(schemaSql);
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error running schema initialization:', err.message);
    throw err;
  }
}

const initPromise = initializeDatabase();

module.exports = {
  query: async (text, params) => {
    await initPromise;
    return pool.query(text, params);
  },
  initPromise,
};
