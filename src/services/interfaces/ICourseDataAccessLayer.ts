import { QueryResult } from 'mysql2';
import { Course } from './Course';

export interface ICourseDataAccessLayer {
  getCourses(): Promise<QueryResult>;
  getCourse(courseId: string): Promise<QueryResult>;
  updateCourse(courseId: string, courseBody: Course): Promise<QueryResult | []>;
}
