import { Request, Response } from 'express';
import { ICourseDataAccessLayer } from '../services/interfaces/ICourseDataAccessLayer';
import { Code } from '../enum/code.enum';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/status.enum';
import { ICourseController } from './interfaces/ICourseController';
import { QueryResult } from 'mysql2';

export class CourseController implements ICourseController {
  constructor(private readonly dataAccessLayer: ICourseDataAccessLayer) {}

  private logRequest(req: Request) {
    console.info(
      `[${new Date().toLocaleDateString()}] Incoming ${req.method}${
        req.originalUrl
      } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
    );
  }

  private sendSuccessResult(res: Response, result: QueryResult) {
    res
      .status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Courses retrieved', result));
  }

  private sendInternalServerError(res: Response) {
    res
      .status(Code.INTERNAL_SERVER_ERROR)
      .send(
        new HttpResponse(
          Code.INTERNAL_SERVER_ERROR,
          Status.INTERNAL_SERVER_ERROR,
          'An error occured'
        )
      );
  }

  async getCourses(req: Request, res: Response) {
    this.logRequest(req);

    try {
      const result = await this.dataAccessLayer.getCourses();
      this.sendSuccessResult(res, result);
    } catch (error: unknown) {
      console.error(error);
      this.sendInternalServerError(res);
    }
  }

  async getCourse(req: Request, res: Response) {
    this.logRequest(req);

    try {
      const result = await this.dataAccessLayer.getCourse(req.params.courseId);
      this.sendSuccessResult(res, result);
    } catch (error: unknown) {
      console.error(error);
      this.sendInternalServerError(res);
    }
  }

  async updateCourse(req: Request, res: Response) {
    this.logRequest(req);

    try {
      const result = await this.dataAccessLayer.updateCourse(
        req.params.courseId,
        req.body
      );
      this.sendSuccessResult(res, result);
    } catch (error: unknown) {
      console.error(error);
      this.sendInternalServerError(res);
    }
  }
}
