// Admin pages
export { default as Roles } from './admin/Roles';
export { default as Accounts } from './admin/Accounts';
export { default as Courses } from './admin/Courses';
export { default as Classes } from './admin/Classes';
export { default as LessonDetails } from './admin/lessons/LessonDetails';
export { default as Lessons } from './admin/lessons/Lessons';

// Login page (single source)
export { Login } from './Login';

// User pages
export * from './user';

// Legacy pages (to be migrated)
export { default as MyCoursesPage } from './MyCoursesPage';
export { default as LessonsPage } from './LessonsPage';
export { default as ExercisePage } from './ExercisePage';
