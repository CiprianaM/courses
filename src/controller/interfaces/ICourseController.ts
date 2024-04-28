import { Request, Response } from 'express';

export interface ICourseController {
  getCourses(req: Request, res: Response): void;
  getCourse(req: Request, res: Response): void;
  updateCourse(req: Request, res: Response): void;
}
