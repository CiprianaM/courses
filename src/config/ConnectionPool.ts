import { createPool } from 'mysql2/promise';
import { Configuration } from './IConfiguration';
import { IConnection } from './IConnectionPool';

export class Connection implements IConnection {
  constructor(private readonly configuration: Configuration) {}

  createConnection() {
    return createPool(this.configuration);
  }
}
