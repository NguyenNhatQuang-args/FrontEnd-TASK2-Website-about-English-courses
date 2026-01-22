export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const STORAGE_KEYS = {
  accessToken: 'access_token',
  userInfo: 'user_info',
} as const;

// Routes
export const ROUTES = {
  login: '/login',
  myCourses: '/courses',
  home: '/',
  courseDetail: (id: string) => `/courses/${id}`,
  lessonDetail: (id: string) => `/lessons/${id}`,
} as const;

export const MESSAGES = {
  error: {
    loginFailed: 'Email hoặc mật khẩu không chính xác',
    serverError: 'Lỗi hệ thống, vui lòng thử lại sau',
    fetchCoursesFailed: 'Không thể tải danh sách khóa học',
  }
} as const;