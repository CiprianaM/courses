import { CourseStatus } from '../enum/courseModuleStatus.enum';

export interface CourseUserProgression {
  id: number;
  moduleId: number;
  userId: number;
  status: CourseStatus;
}
