import { QueryResult } from 'mysql2';
import { ModuleProgression } from './ModuleProgression';

export interface IProgressionDataAccessLayer {
  getModuleProgressionForUser(
    moduleId: string,
    userId: string
  ): Promise<ModuleProgression | void>;
  updateModuleProgressionForUser(
    moduleId: string,
    userId: string,
    moduleProgression: string
  ): Promise<QueryResult>;
}
