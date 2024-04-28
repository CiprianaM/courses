import { Request, Response } from 'express';
import { ICourseDataAccessLayer } from '../services/interfaces/ICourseDataAccessLayer';
import { Code } from '../enum/code.enum';
import { HttpResponse } from '../domain/response';
import { Status } from '../enum/status.enum';
import { ICourseController } from './interfaces/ICourseController';
import { QueryResult } from 'mysql2';
import { IModuleController } from './interfaces/IModuleController';
import { IModuleDataAccessLayer } from '../services/interfaces/IModuleDataAccessLayer';
import { ModuleWithStatus } from '../services/interfaces/Module';

export class ModuleController implements IModuleController {
  constructor(private readonly dataAccessLayer: IModuleDataAccessLayer) {}

  private logRequest(req: Request) {
    console.info(
      `[${new Date().toLocaleDateString()}] Incoming ${req.method}${
        req.originalUrl
      } Request from ${req.rawHeaders[0]} ${req.rawHeaders[1]}`
    );
  }

  private sendSuccessResult(
    res: Response,
    result: QueryResult | ModuleWithStatus[]
  ) {
    res
      .status(Code.OK)
      .send(new HttpResponse(Code.OK, Status.OK, 'Modules retrieved', result));
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

  async getModulesForCourse(req: Request, res: Response) {
    this.logRequest(req);
    try {
      const result = await this.dataAccessLayer.getModulesForCourse(
        req.params.courseId
      );
      this.sendSuccessResult(res, result);
    } catch (error: unknown) {
      console.error(error);
      this.sendInternalServerError(res);
    }
  }

  async getModule(req: Request, res: Response) {
    this.logRequest(req);
    try {
      const result = await this.dataAccessLayer.getModule(
        req.params.moduleId,
        req.params.userId
      );
      this.sendSuccessResult(res, result);
    } catch (error: unknown) {
      console.error(error);
      this.sendInternalServerError(res);
    }
  }

  async updateModuleStatusForUser(req: Request, res: Response) {
    this.logRequest(req);
    try {
      const result = await this.dataAccessLayer.updateModuleStatus(
        req.params.moduleId,
        req.params.userId,
        req.body.status
      );
      this.sendSuccessResult(res, result);
    } catch (error: unknown) {
      console.error(error);
      this.sendInternalServerError(res);
    }
  }
}
