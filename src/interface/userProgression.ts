import { CourseModuleStatus } from '../enum/courseModuleStatus.enum';

export interface UserProgression {
  id: number;
  moduleId: number;
  userId: number;
  status: CourseModuleStatus;
}
