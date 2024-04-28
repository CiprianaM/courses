import { Request, Response } from 'express';

export interface IModuleController {
  getModulesForCourse(req: Request, res: Response): void;
  getModule(req: Request, res: Response): void;
  updateModuleStatusForUser(req: Request, res: Response): void;
}
