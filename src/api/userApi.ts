import { API_BASE_URL, STORAGE_KEYS, ROUTES } from '@/constants';

const request = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem(STORAGE_KEYS.accessToken);
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    localStorage.clear();
    window.location.href = ROUTES.login;
    return;
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Đã có lỗi xảy ra');
  }

  return data;
};

export const userApi = {
  login: (payload: object) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  
  getMyCourses: () => request('/user/my-courses', {
    method: 'GET',
  }),

  getLessons: (courseId: string) => request(`/courses/${courseId}/lessons`, {
    method: 'GET',
  }),

  getExercise: (lessonId: string) => request(`/lessons/${lessonId}/exercise`, {
    method: 'GET',
  }),
};