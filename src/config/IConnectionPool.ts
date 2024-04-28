import { Pool } from 'mysql2/promise';

export interface IConnection {
  createConnection(): Pool;
}
