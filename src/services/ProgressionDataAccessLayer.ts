import { Pool, QueryResult, createPool } from 'mysql2/promise';
import { IProgressionDataAccessLayer } from './interfaces/IProgressionDataAccessLayer';
import { Configuration } from './interfaces/Configuration';
import { ProgressionQuery } from '../query/interfaces/progressionQuery';

export class ProgressionDataAccessLayer implements IProgressionDataAccessLayer {
  private readonly pool: Pool;

  constructor(
    private readonly configuration: Configuration,
    private readonly queries: ProgressionQuery
  ) {
    this.pool = createPool(this.configuration);
  }

  async getModuleProgressionForUser(
    moduleId: string,
    userId: string
  ): Promise<QueryResult> {
    try {
      const [rows] = await this.pool.query(
        this.queries.SELECT_MODULE_STATUS_FOR_USER,
        [moduleId, userId]
      );
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  private async addModuleProgression() {}

  async updateModuleProgressionForUser(
    moduleId: string,
    userId: string,
    moduleProgression: string
  ): Promise<QueryResult> {
    try {
      const initialRows = await this.getModuleProgressionForUser(
        moduleId,
        userId
      );
      if (Array.isArray(initialRows) && initialRows.length) {
      }
      return [];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}
