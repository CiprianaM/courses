import { CourseStatus } from '../enum/courseModuleStatus.enum';

export interface Course {
  id: number;
  name: string;
  likes: number;
  instructor: string;
  instructor_image_url: string;
}

export interface CourseWithStatus extends Course {
  status: CourseStatus;
}
