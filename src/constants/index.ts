// API Constants
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// App Constants
export const APP_NAME = 'English Courses App'
export const APP_VERSION = '1.0.0'

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const MAX_PAGE_SIZE = 100

// Routes
export const ROUTES = {
  // public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',

  // user base
  USER: '/user',

  // user dashboard
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',

  // courses
  USER_COURSES: '/user/courses',
  USER_COURSE_DETAIL: (courseId: string) =>
    `/user/courses/${courseId}`,

  // lessons
  USER_LESSON_DETAIL: (lessonId: string) =>
    `/user/lessons/${lessonId}`,

  // exercises
  USER_WORKBANK: (lessonId: string) =>
    `/user/lessons/${lessonId}/work-bank`,

  USER_SENTENCE_BUILDER: (lessonId: string) =>
    `/user/lessons/${lessonId}/sentence-builder`,
} as const

// HTTP Status
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const
