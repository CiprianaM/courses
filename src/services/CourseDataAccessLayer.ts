import { Pool, QueryResult } from 'mysql2/promise';
import { Configuration } from './interfaces/Configuration';
import { Course } from './interfaces/Course';
import { ICourseDataAccessLayer } from './interfaces/ICourseDataAccessLayer';
import { CourseQuery } from '../query/interfaces/courseQuery';

export class CourseDataAccessLayer implements ICourseDataAccessLayer {
  constructor(
    private readonly pool: Pool,
    private readonly queries: CourseQuery
  ) {}

  async getCourses(): Promise<QueryResult> {
    try {
      const [rows] = await this.pool.query(this.queries.SELECT_COURSES);
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getCourse(courseId: string): Promise<QueryResult> {
    try {
      const [rows] = await this.pool.query(this.queries.SELECT_COURSE, [
        courseId,
      ]);
      return rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  private async processUpdateCourse(course: Course, courseId: string) {
    await this.pool.query(this.queries.UPDATE_COURSE, [
      ...Object.values(course),
      courseId,
    ]);
  }

  async updateCourse(
    courseId: string,
    courseBody: Course
  ): Promise<QueryResult | []> {
    let course: Course = { ...courseBody };
    try {
      const initialRows = await this.getCourse(courseId);
      if (Array.isArray(initialRows) && initialRows.length) {
        await this.processUpdateCourse(course, courseId);
        const updatedRows = await this.getCourse(courseId);
        return updatedRows;
      }
      return [];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}
