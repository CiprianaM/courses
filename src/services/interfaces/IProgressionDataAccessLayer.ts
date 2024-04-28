import { QueryResult } from 'mysql2';
import { ModuleStatus } from '../enum/courseModuleStatus.enum';

export interface IProgressionDataAccessLayer {
  getModuleProgressionForUser(
    moduleId: string,
    userId: string
  ): Promise<QueryResult>;
  updateModuleProgressionForUser(
    moduleId: string,
    userId: string,
    moduleProgression: ModuleStatus
  ): Promise<QueryResult>;
}
