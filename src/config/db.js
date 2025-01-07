const { Pool } = require('pg');
require('dotenv').config(); // Load environment variables

const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'shivani',
  database: process.env.DB_NAME || 'students',
  port: process.env.DB_PORT || 5432,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully.');
  }
});

module.exports = db;
