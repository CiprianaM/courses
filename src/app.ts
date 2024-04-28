import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import ip from 'ip';
import { Code } from './enum/code.enum';
import { HttpResponse } from './domain/response';
import { Status } from './enum/status.enum';
import { ICourseController } from './controller/interfaces/ICourseController';
import { IModuleController } from './controller/interfaces/ICoduleController';

export class App {
  private readonly app: Application;
  private readonly APPLICATION_RUNNING = 'application is running on:';

  constructor(
    private readonly port: string | number = process.env.SERVER_PORT || 3000,
    private readonly courseController: ICourseController,
    private readonly moduleController: IModuleController
  ) {
    this.app = express();
    this.middleWare();
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`);
  }

  private middleWare(): void {
    this.app.use(cors({ origin: '*' }));
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get('/courses', (req, res) =>
      this.courseController.getCourses(req, res)
    );
    this.app.get('/courses/:courseId', (req, res) =>
      this.courseController.getCourse(req, res)
    );
    this.app.put('/courses/:courseId', (req, res) =>
      this.courseController.updateCourse(req, res)
    );
    this.app.get('/modules/:moduleId/:userId', (req, res) =>
      this.moduleController.getModule(req, res)
    );
    this.app.put('/modules/:moduleId/:userId', (req, res) =>
      this.moduleController.updateModuleStatusForUser(req, res)
    );
    this.app.get('/modules/:courseId', (req, res) =>
      this.moduleController.getModulesForCourse(req, res)
    );
    this.app.get('/', (_req: Request, res: Response) =>
      res
        .status(Code.OK)
        .send(new HttpResponse(Code.OK, Status.OK, 'Welcome to the API v1'))
    );
    this.app.all('/*', (_req: Request, res: Response) =>
      res
        .status(Code.NOT_FOUND)
        .send(
          new HttpResponse(
            Code.NOT_FOUND,
            Status.NOT_FOUND,
            'Welcome to the API v1'
          )
        )
    );
  }
}
