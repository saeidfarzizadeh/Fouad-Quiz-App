export interface Course {
  id: number;
  title: string;
  description: string;
  category: 'quran' | 'mottahari' | 'general';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // در دقیقه
  thumbnail: string;
  videos: Video[];
  books: Book[];
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: number;
  courseId: number;
  title: string;
  description: string;
  url: string;
  duration: number; // در دقیقه
  thumbnail: string;
  order: number;
}

export interface Book {
  id: number;
  courseId: number;
  title: string;
  author: string;
  description: string;
  pdfUrl: string;
  coverImage: string;
  pages: number;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
  createdAt: string;
}

// داده‌های پیش‌فرض
export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'آموزش قرآن کریم - سطح مقدماتی',
    description: 'دوره کامل آموزش قرآن کریم برای مبتدیان',
    category: 'quran',
    level: 'beginner',
    duration: 120,
    thumbnail: 'https://via.placeholder.com/300x200/27ae60/ffffff?text=قرآن+مقدماتی',
    videos: [
      {
        id: 1,
        courseId: 1,
        title: 'مقدمه و معرفی دوره',
        description: 'آشنایی با اهداف دوره و نحوه یادگیری',
        url: 'https://example.com/video1.mp4',
        duration: 15,
        thumbnail: 'https://via.placeholder.com/300x200/3498db/ffffff?text=مقدمه',
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: 'آموزش حروف عربی',
        description: 'شناخت و تلفظ صحیح حروف عربی',
        url: 'https://example.com/video2.mp4',
        duration: 25,
        thumbnail: 'https://via.placeholder.com/300x200/e74c3c/ffffff?text=حروف',
        order: 2,
      },
    ],
    books: [
      {
        id: 1,
        courseId: 1,
        title: 'کتاب آموزش قرآن مقدماتی',
        author: 'استاد احمدی',
        description: 'کتاب جامع آموزش قرآن برای مبتدیان',
        pdfUrl: 'https://example.com/book1.pdf',
        coverImage: 'https://via.placeholder.com/200x300/f39c12/ffffff?text=کتاب+قرآن',
        pages: 150,
      },
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    title: 'تفسیر مطهری - جلد اول',
    description: 'دوره تفسیر آثار استاد مطهری',
    category: 'mottahari',
    level: 'intermediate',
    duration: 180,
    thumbnail: 'https://via.placeholder.com/300x200/9b59b6/ffffff?text=تفسیر+مطهری',
    videos: [
      {
        id: 3,
        courseId: 2,
        title: 'مقدمه تفسیر مطهری',
        description: 'آشنایی با روش تفسیر استاد مطهری',
        url: 'https://example.com/video3.mp4',
        duration: 30,
        thumbnail: 'https://via.placeholder.com/300x200/8e44ad/ffffff?text=مقدمه+مطهری',
        order: 1,
      },
    ],
    books: [
      {
        id: 2,
        courseId: 2,
        title: 'تفسیر مطهری - جلد اول',
        author: 'استاد مرتضی مطهری',
        description: 'کتاب تفسیر مطهری',
        pdfUrl: 'https://example.com/book2.pdf',
        coverImage: 'https://via.placeholder.com/200x300/8e44ad/ffffff?text=مطهری+جلد1',
        pages: 300,
      },
    ],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

export const mockAdminUsers: AdminUser[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@fouad.com',
    role: 'super_admin',
    permissions: ['all'],
    createdAt: '2024-01-01T00:00:00Z',
  },
];

// توابع مدیریت
export const getCourses = (): Course[] => {
  return mockCourses;
};

export const getCourseById = (id: number): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getCoursesByCategory = (category: 'quran' | 'mottahari' | 'general' | 'all'): Course[] => {
  if (category === 'all') {
    return mockCourses;
  }
  return mockCourses.filter(course => course.category === category);
};

export const addCourse = (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Course => {
  const newCourse: Course = {
    ...course,
    id: Math.max(...mockCourses.map(c => c.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockCourses.push(newCourse);
  return newCourse;
};

export const updateCourse = (id: number, updates: Partial<Course>): boolean => {
  const index = mockCourses.findIndex(course => course.id === id);
  if (index !== -1) {
    mockCourses[index] = {
      ...mockCourses[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return true;
  }
  return false;
};

export const deleteCourse = (id: number): boolean => {
  const index = mockCourses.findIndex(course => course.id === id);
  if (index !== -1) {
    mockCourses.splice(index, 1);
    return true;
  }
  return false;
};
