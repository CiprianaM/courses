import { App } from './app';
import { Connection } from './config/ConnectionPool';
import { configuration } from './config/mysql.config';
import { CourseController } from './controller/CourseController';
import { ModuleController } from './controller/ModuleController';
import { COURSE_QUERY } from './query/course';
import { MODULE_QUERY } from './query/module';
import { USER_PROGRESSION_QUERY } from './query/userProgression';

import { CourseDataAccessLayer } from './services/CourseDataAccessLayer';
import { ModuleDataAccessLayer } from './services/ModuleDataAccessLayer';
import { ProgressionDataAccessLayer } from './services/ProgressionDataAccessLayer';

const connectionPool = new Connection(configuration);
const pool = connectionPool.createConnection();

const courseDataAccessLayer = new CourseDataAccessLayer(pool, COURSE_QUERY);
const progressionDataAccessLayer = new ProgressionDataAccessLayer(
  configuration,
  USER_PROGRESSION_QUERY
);
const moduleDataAccessLayer = new ModuleDataAccessLayer(
  configuration,
  MODULE_QUERY,
  progressionDataAccessLayer
);
const courseController = new CourseController(courseDataAccessLayer);
const moduleController = new ModuleController(moduleDataAccessLayer);

export const app = new App(3000, courseController, moduleController);
