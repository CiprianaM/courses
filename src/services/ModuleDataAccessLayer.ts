import { Pool, QueryResult, createPool } from 'mysql2/promise';
import { Configuration } from './interfaces/Configuration';
import { IModuleDataAccessLayer } from './interfaces/IModuleDataAccessLayer';
import { ModuleQuery } from '../query/interfaces/moduleQuery';
import { IProgressionDataAccessLayer } from './interfaces/IProgressionDataAccessLayer';
import { ModuleStatus } from './enum/courseModuleStatus.enum';
import { ModuleWithStatus } from './interfaces/Module';

export class ModuleDataAccessLayer implements IModuleDataAccessLayer {
  private readonly pool: Pool;

  constructor(
    private readonly configuration: Configuration,
    private readonly queries: ModuleQuery,
    private readonly moduleProgression: IProgressionDataAccessLayer
  ) {
    this.pool = createPool(this.configuration);
  }

  async getModulesForCourse(courseId: string): Promise<QueryResult> {
    try {
      const [rows] = await this.pool.query(
        this.queries.SELECT_MODULES_FOR_COURSE,
        [courseId]
      );
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getModule(
    moduleId: string,
    userId: string
  ): Promise<ModuleWithStatus[]> {
    try {
      const [rows] = await this.pool.query(this.queries.SELECT_MODULE, [
        moduleId,
        userId,
      ]);
      if (Array.isArray(rows) && rows.length) {
        const moduleStatus =
          await this.moduleProgression.getModuleProgressionForUser(
            moduleId,
            userId
          );

        const status = moduleStatus
          ? moduleStatus.status
          : ModuleStatus.NOT_STARTED;
        const module = {
          ...rows[0],
          status,
        } as ModuleWithStatus;
        return [module];
      }
      return [];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async updateModuleStatus(
    moduleId: string,
    userId: string,
    moduleProgression: string
  ): Promise<QueryResult> {
    try {
      const rows = await this.moduleProgression.updateModuleProgressionForUser(
        moduleId,
        userId,
        moduleProgression
      );
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}
