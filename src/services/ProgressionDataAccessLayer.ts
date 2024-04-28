import { Pool, QueryResult, createPool } from 'mysql2/promise';
import { IProgressionDataAccessLayer } from './interfaces/IProgressionDataAccessLayer';
import { Configuration } from './interfaces/Configuration';
import { ProgressionQuery } from '../query/interfaces/progressionQuery';
import { ModuleProgression } from './interfaces/ModuleProgression';

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
  ): Promise<ModuleProgression | void> {
    try {
      const [rows] = await this.pool.query(
        this.queries.SELECT_MODULE_STATUS_FOR_USER,
        [moduleId, userId]
      );
      if (Array.isArray(rows) && rows.length) {
        return rows[0] as ModuleProgression;
      }
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  private async addModuleProgression(
    moduleId: number,
    userId: number,
    status: string
  ) {
    const [rows] = await this.pool.query(
      this.queries.CREATE_MODULE_STATUS_FOR_USER,
      [userId, moduleId, status]
    );
  }

  private async processUpdateModuleStatus(status: string, id: number) {
    await this.pool.query(this.queries.UPDATE_MODULE_STATUS_FOR_USER, [
      status,
      id,
    ]);
  }

  async updateModuleProgressionForUser(
    moduleId: string,
    userId: string,
    status: string
  ): Promise<QueryResult> {
    try {
      const currentModuleProgression = await this.getModuleProgressionForUser(
        moduleId,
        userId
      );
      if (currentModuleProgression) {
        await this.processUpdateModuleStatus(
          status,
          currentModuleProgression.id
        );
      } else {
        await this.addModuleProgression(
          parseInt(moduleId),
          parseInt(userId),
          status
        );
      }
      return [];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}
