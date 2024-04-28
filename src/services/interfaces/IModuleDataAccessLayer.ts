import { QueryResult } from 'mysql2';
import { ModuleWithStatus } from './Module';

export interface IModuleDataAccessLayer {
  getModulesForCourse(courseId: string): Promise<QueryResult>;
  getModule(moduleId: string, userId: string): Promise<ModuleWithStatus[] | []>;
  updateModuleStatus(
    moduleId: string,
    userId: string,
    moduleProgression: string
  ): Promise<QueryResult>;
}
