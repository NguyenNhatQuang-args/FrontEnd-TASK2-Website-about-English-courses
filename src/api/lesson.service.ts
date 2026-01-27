import apiClient from './config';

// Types
export interface Lesson {
  id: string;
  code: string;
  name: string;
  description?: string;
  courseId: string;
  classId?: string;
  orderIndex: number;
  durationMinutes?: number;
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  // Relations
  course?: {
    id: string;
    title: string;
  };
  sections?: ExerciseSection[];
}

export interface ExerciseSection {
  id: string;
  lessonId: string;
  sectionType: 'vocab' | 'grammar' | 'practice' | 'video_grammar' | 'listening' | 'writing' | 'reading' | 'speaking';
  title: string;
  description?: string;
  orderIndex: number;
  totalPoints: number;
  estimatedTime?: number;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  updatedAt: string;
  questions?: Question[];
}

export interface Question {
  id: string;
  sectionId: string;
  questionType: 'multiple_choice' | 'fill_blank' | 'match' | 'arrange' | 'short_answer' | 'essay' | 'word_bank' | 'true_false';
  questionText: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  orderIndex: number;
  options?: string[];
  answer?: string | string[];
  explanation?: string;
  audioUrl?: string;
  videoUrl?: string;
  imageUrl?: string;
  passage?: string;
  wordBank?: { id: number; name: string }[];
  correctWordIds?: number[];
  status: 'ACTIVE' | 'INACTIVE';
}

export interface CreateLessonDto {
  code: string;
  name: string;
  description?: string;
  courseId: string;
  classId?: string;
  orderIndex?: number;
  durationMinutes?: number;
}

export interface UpdateLessonDto {
  code?: string;
  name?: string;
  description?: string;
  courseId?: string;
  classId?: string;
  orderIndex?: number;
  durationMinutes?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'DRAFT';
}

export interface CreateSectionDto {
  lessonId: string;
  sectionType: string;
  title: string;
  description?: string;
  orderIndex?: number;
  estimatedTime?: number;
}

export interface CreateQuestionDto {
  sectionId: string;
  questionType: string;
  questionText: string;
  difficulty?: string;
  points?: number;
  orderIndex?: number;
  options?: string[];
  answer?: string | string[];
  explanation?: string;
  wordBank?: { id: number; name: string }[];
  correctWordIds?: number[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Lesson Service - CRUD operations for lessons
 */
export const lessonService = {
  // Get all lessons
  getAll: async (params?: {
    courseId?: string;
    classId?: string;
    status?: string;
  }): Promise<ApiResponse<Lesson[]>> => {
    const response = await apiClient.get<ApiResponse<Lesson[]>>('/lessons', { params });
    return response.data;
  },

  // Get lessons by course
  getByCourse: async (courseId: string): Promise<ApiResponse<Lesson[]>> => {
    const response = await apiClient.get<ApiResponse<Lesson[]>>(`/lessons/course/${courseId}`);
    return response.data;
  },

  // Get lessons by class
  getByClass: async (classId: string): Promise<ApiResponse<Lesson[]>> => {
    const response = await apiClient.get<ApiResponse<Lesson[]>>(`/lessons/class/${classId}`);
    return response.data;
  },

  // Get lesson by ID
  getById: async (id: string): Promise<ApiResponse<Lesson>> => {
    const response = await apiClient.get<ApiResponse<Lesson>>(`/lessons/${id}`);
    return response.data;
  },

  // Create lesson
  create: async (data: CreateLessonDto): Promise<ApiResponse<Lesson>> => {
    const response = await apiClient.post<ApiResponse<Lesson>>('/lessons', data);
    return response.data;
  },

  // Update lesson
  update: async (id: string, data: UpdateLessonDto): Promise<ApiResponse<Lesson>> => {
    const response = await apiClient.put<ApiResponse<Lesson>>(`/lessons/${id}`, data);
    return response.data;
  },

  // Delete lesson
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/lessons/${id}`);
    return response.data;
  },
};

/**
 * Exercise Service - CRUD operations for exercise sections and questions
 */
export const exerciseService = {
  // Get section types
  getSectionTypes: async (): Promise<ApiResponse<string[]>> => {
    const response = await apiClient.get<ApiResponse<string[]>>('/exercises/section-types');
    return response.data;
  },

  // Get sections by lesson
  getSectionsByLesson: async (lessonId: string): Promise<ApiResponse<ExerciseSection[]>> => {
    const response = await apiClient.get<ApiResponse<ExerciseSection[]>>(`/exercises/sections/lesson/${lessonId}`);
    return response.data;
  },

  // Get section with questions
  getSectionWithQuestions: async (sectionId: string): Promise<ApiResponse<ExerciseSection>> => {
    const response = await apiClient.get<ApiResponse<ExerciseSection>>(`/exercises/sections/${sectionId}/with-questions`);
    return response.data;
  },

  // Get all exercises for a lesson (sections + questions)
  getByLesson: async (lessonId: string): Promise<ApiResponse<ExerciseSection[]>> => {
    const response = await apiClient.get<ApiResponse<ExerciseSection[]>>(`/exercises/lesson/${lessonId}`);
    return response.data;
  },

  // Create section
  createSection: async (data: CreateSectionDto): Promise<ApiResponse<ExerciseSection>> => {
    const response = await apiClient.post<ApiResponse<ExerciseSection>>('/exercises/sections', data);
    return response.data;
  },

  // Update section
  updateSection: async (id: string, data: Partial<CreateSectionDto>): Promise<ApiResponse<ExerciseSection>> => {
    const response = await apiClient.put<ApiResponse<ExerciseSection>>(`/exercises/sections/${id}`, data);
    return response.data;
  },

  // Delete section
  deleteSection: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/exercises/sections/${id}`);
    return response.data;
  },

  // Get questions by section
  getQuestionsBySection: async (sectionId: string): Promise<ApiResponse<Question[]>> => {
    const response = await apiClient.get<ApiResponse<Question[]>>(`/exercises/questions/section/${sectionId}`);
    return response.data;
  },

  // Create question
  createQuestion: async (data: CreateQuestionDto): Promise<ApiResponse<Question>> => {
    const response = await apiClient.post<ApiResponse<Question>>('/exercises/questions', data);
    return response.data;
  },

  // Bulk create questions
  createQuestionsBulk: async (questions: CreateQuestionDto[]): Promise<ApiResponse<Question[]>> => {
    const response = await apiClient.post<ApiResponse<Question[]>>('/exercises/questions/bulk', { questions });
    return response.data;
  },

  // Update question
  updateQuestion: async (id: string, data: Partial<CreateQuestionDto>): Promise<ApiResponse<Question>> => {
    const response = await apiClient.put<ApiResponse<Question>>(`/exercises/questions/${id}`, data);
    return response.data;
  },

  // Delete question
  deleteQuestion: async (id: string): Promise<ApiResponse<null>> => {
    const response = await apiClient.delete<ApiResponse<null>>(`/exercises/questions/${id}`);
    return response.data;
  },
};

export default lessonService;
