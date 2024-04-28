import { ModuleStatus } from '../enum/courseModuleStatus.enum';

export interface Module {
  id: number;
  courseId: number;
  duration: number;
  position: number;
}

export interface ModuleWithStatus extends Module {
  status: ModuleStatus;
}
