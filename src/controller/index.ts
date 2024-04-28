import { getCourses, getCourse, updateCourseLikes } from './course.controller';
import {
  getModulesForCourse,
  getModule,
  updateModuleStatusForUser,
} from './module.controller';

import {
  getCompletedCoursesForUser,
  getStartedCoursesForUser,
} from './userprogression.controller';

export default {
  getCourses,
  getCourse,
  updateCourseLikes,
  getModulesForCourse,
  getModule,
  updateModuleStatusForUser,
  getCompletedCoursesForUser,
  getStartedCoursesForUser,
};
