import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';
import { Configuration } from './IConfiguration';

dotenv.config();
const port = parseInt(process.env.DB_PORT || '3306');
const connectionLimit = parseInt(process.env.DB_CONNECTTION_LIMIT || '10');

export const configuration: Configuration = {
  host: process.env.DB_HOST || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  port,
  connectionLimit,
};
