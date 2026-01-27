// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// App Constants
export const APP_NAME = 'English Learning App';
export const APP_VERSION = '1.0.0';

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 100;

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_INFO: 'user',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  STUDENT: 'STUDENT',
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

// Routes
export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // Admin routes
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_ROLES: '/admin/roles',
  ADMIN_PERMISSIONS: '/admin/permissions',
  ADMIN_ACCOUNTS: '/admin/accounts',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_CLASSES: '/admin/classes',
  ADMIN_LESSONS: '/admin/lessons',
  ADMIN_LESSON_DETAILS: '/admin/lessons/:lessonId',

  // Teacher routes (same as admin but limited)
  TEACHER: '/teacher',
  TEACHER_DASHBOARD: '/teacher/dashboard',
  TEACHER_COURSES: '/teacher/courses',
  TEACHER_CLASSES: '/teacher/classes',
  TEACHER_LESSONS: '/teacher/lessons',

  // Student/User routes
  USER: '/user',
  DASHBOARD: '/user/dashboard',
  PROFILE: '/user/profile',
  MY_COURSES: '/user/courses',
  LESSONS: '/user/courses/:courseId/lessons',
  EXERCISE: '/user/lessons/:lessonId/exercises',
  
  // Exercise types
  USER_SENTENCE_BUILDER: (lessonId: string) => `/user/lessons/${lessonId}/sentence-builder`,
  USER_WORKBANK: (lessonId: string) => `/user/lessons/${lessonId}/work-bank`,
} as const;

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Exercise Section Types (matching backend)
export const EXERCISE_SECTION_TYPES = {
  VOCAB: 'vocab',
  GRAMMAR: 'grammar',
  PRACTICE: 'practice',
  VIDEO_GRAMMAR: 'video_grammar',
  LISTENING: 'listening',
  WRITING: 'writing',
  READING: 'reading',
  SPEAKING: 'speaking',
} as const;

// Question Types (matching backend)
export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  FILL_BLANK: 'fill_blank',
  MATCH: 'match',
  ARRANGE: 'arrange',
  SHORT_ANSWER: 'short_answer',
  ESSAY: 'essay',
  WORD_BANK: 'word_bank',
  TRUE_FALSE: 'true_false',
} as const;
