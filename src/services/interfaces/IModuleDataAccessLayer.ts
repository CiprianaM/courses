import { QueryResult } from 'mysql2';

export interface IModuleDataAccessLayer {
  getModulesForCourse(courseId: string): Promise<QueryResult>;
  getModule(moduleId: string, userId: string): Promise<QueryResult>;
  updateModuleStatus(moduleId: string, userId: string): Promise<QueryResult>;
}
