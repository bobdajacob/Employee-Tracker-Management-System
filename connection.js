import dotenv from 'dotenv';
dotenv.config();

import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});
client.connect((err) => { 
  if (err) { 
    console.error('Database connection error:', err.stack); 
  } else 
  { console.log('Database connected'); } 
});

export default client;