import { API_BASE_URL, STORAGE_KEYS, HTTP_STATUS } from '@/constants';
import { isTokenExpired, handleLogout } from '@/utils/auth';

const request = async (endpoint: string, options: RequestInit = {}) => {
  // Chặn request nếu token hết hạn (trừ trang login)
  if (isTokenExpired() && endpoint !== '/auth/login') {
    handleLogout();
    return;
  }

  const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === HTTP_STATUS.UNAUTHORIZED) {
    handleLogout();
    return;
  }

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Error');
  return data;
};

export const userApi = {
  login: (payload: object) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  getMyCourses: () => request('/user/my-courses'),
  getLessons: (courseId: string) => request(`/courses/${courseId}/lessons`),
  getExercise: (lessonId: string) => request(`/lessons/${lessonId}/exercise`),
};