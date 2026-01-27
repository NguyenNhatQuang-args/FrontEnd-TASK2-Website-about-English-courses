export { default as apiClient, API_BASE_URL } from './config';
export { authService } from './auth.service';
export { permissionService } from './permission.service';
export { userService } from './user.service';
export { classService } from './class.service';
export { courseService } from './course.service';
export { lessonService, exerciseService } from './lesson.service';

// Re-export types
export type { Permission, CreatePermissionDto, UpdatePermissionDto } from './permission.service';
export type { User, CreateUserDto, UpdateUserDto } from './user.service';
export type { Class, ClassStudent, CreateClassDto, UpdateClassDto, AddStudentsDto } from './class.service';
export type { Course, CreateCourseDto, UpdateCourseDto } from './course.service';
export type { 
  Lesson, 
  ExerciseSection, 
  Question, 
  CreateLessonDto, 
  UpdateLessonDto,
  CreateSectionDto,
  CreateQuestionDto 
} from './lesson.service';
