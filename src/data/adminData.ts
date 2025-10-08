export interface AdminUser {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'instructor';
  permissions: string[];
}

export interface EducationalContent {
  id: number;
  title: string;
  description: string;
  type: 'book' | 'video' | 'audio' | 'document';
  category: 'quran' | 'mottahari' | 'general' | 'history' | 'philosophy';
  fileUrl?: string;
  thumbnailUrl?: string;
  duration?: number; // برای ویدیو/صوت (به ثانیه)
  pages?: number; // برای کتاب
  author?: string;
  publisher?: string;
  isbn?: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Question {
  id: number;
  question: string;
  type: 'multiple' | 'text';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
  category: 'quran' | 'mottahari' | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface AdminStats {
  totalQuestions: number;
  totalContent: number;
  totalUsers: number;
  activeContent: number;
  pendingContent: number;
}

// کاربران ادمین پیش‌فرض
export const adminUsers: AdminUser[] = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    role: 'admin',
    permissions: ['all'],
  },
  {
    id: 2,
    username: 'instructor',
    password: '123456',
    role: 'instructor',
    permissions: ['questions', 'content'],
  },
];

// محتوای آموزشی پیش‌فرض
export const defaultEducationalContent: EducationalContent[] = [
  {
    id: 1,
    title: 'تفسیر المیزان',
    description: 'تفسیر جامع قرآن کریم اثر علامه طباطبایی',
    type: 'book',
    category: 'quran',
    pages: 20,
    author: 'علامه طباطبایی',
    publisher: 'دار الکتب الاسلامیه',
    isbn: '978-964-440-123-4',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 2,
    title: 'درس‌های فلسفه استاد مطهری',
    description: 'مجموعه درس‌های فلسفه اسلامی',
    type: 'video',
    category: 'mottahari',
    duration: 3600,
    thumbnailUrl: 'https://via.placeholder.com/300x200/3498db/ffffff?text=فلسفه',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 3,
    title: 'تاریخ اسلام',
    description: 'مروری بر تاریخ اسلام از ابتدا تا کنون',
    type: 'book',
    category: 'history',
    pages: 350,
    author: 'دکتر علی شریعتی',
    publisher: 'انتشارات قلم',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  },
];

// سوالات پیش‌فرض
export const defaultQuestions: Question[] = [
  {
    id: 1,
    question: "آیه 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ' در کدام سوره قرار دارد؟",
    type: 'multiple',
    options: ['الذاریات', 'الرحمن', 'الملک', 'النبأ'],
    correctAnswer: 0,
    explanation: 'این آیه در سوره الذاریات آیه 56 قرار دارد و بیانگر هدف آفرینش انسان و جن است.',
    category: 'quran',
    difficulty: 'medium',
    points: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 2,
    question: 'استاد مطهری در کدام کتاب خود به موضوع عدالت اجتماعی پرداخته است؟',
    type: 'multiple',
    options: ['عدل الهی', 'نظام حقوق زن در اسلام', 'خدمات متقابل اسلام و ایران', 'علل گرایش به مادیگری'],
    correctAnswer: 0,
    explanation: 'کتاب عدل الهی یکی از مهم‌ترین آثار استاد مطهری در زمینه عدالت است.',
    category: 'mottahari',
    difficulty: 'hard',
    points: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  },
];

// متغیرهای سراسری
let educationalContent: EducationalContent[] = [...defaultEducationalContent];
let questions: Question[] = [...defaultQuestions];
let currentAdmin: AdminUser | null = null;

// توابع مدیریت محتوای آموزشی
export const getEducationalContent = (): EducationalContent[] => {
  return educationalContent;
};

export const getEducationalContentByCategory = (category: string): EducationalContent[] => {
  return educationalContent.filter(content => content.category === category);
};

export const getEducationalContentByType = (type: string): EducationalContent[] => {
  return educationalContent.filter(content => content.type === type);
};

export const addEducationalContent = (content: Omit<EducationalContent, 'id' | 'createdAt' | 'updatedAt'>): EducationalContent => {
  const newContent: EducationalContent = {
    ...content,
    id: Math.max(...educationalContent.map(c => c.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  educationalContent.push(newContent);
  return newContent;
};

export const updateEducationalContent = (id: number, updates: Partial<EducationalContent>): EducationalContent | null => {
  const index = educationalContent.findIndex(content => content.id === id);
  if (index !== -1) {
    educationalContent[index] = {
      ...educationalContent[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return educationalContent[index];
  }
  return null;
};

export const deleteEducationalContent = (id: number): boolean => {
  const index = educationalContent.findIndex(content => content.id === id);
  if (index !== -1) {
    educationalContent.splice(index, 1);
    return true;
  }
  return false;
};

// توابع مدیریت سوالات
export const getQuestions = (): Question[] => {
  return questions;
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(question => question.category === category);
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  return questions.filter(question => question.difficulty === difficulty);
};

export const addQuestion = (question: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>): Question => {
  const newQuestion: Question = {
    ...question,
    id: Math.max(...questions.map(q => q.id)) + 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  questions.push(newQuestion);
  return newQuestion;
};

export const updateQuestion = (id: number, updates: Partial<Question>): Question | null => {
  const index = questions.findIndex(question => question.id === id);
  if (index !== -1) {
    questions[index] = {
      ...questions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return questions[index];
  }
  return null;
};

export const deleteQuestion = (id: number): boolean => {
  const index = questions.findIndex(question => question.id === id);
  if (index !== -1) {
    questions.splice(index, 1);
    return true;
  }
  return false;
};

// توابع احراز هویت
export const loginAdmin = (username: string, password: string): AdminUser | null => {
  const user = adminUsers.find(u => u.username === username && u.password === password);
  if (user) {
    currentAdmin = user;
    return user;
  }
  return null;
};

export const getCurrentAdmin = (): AdminUser | null => {
  return currentAdmin;
};

export const logoutAdmin = (): void => {
  currentAdmin = null;
};

export const isAdminLoggedIn = (): boolean => {
  return currentAdmin !== null;
};

// آمار
export const getAdminStats = (): AdminStats => {
  return {
    totalQuestions: questions.length,
    totalContent: educationalContent.length,
    totalUsers: adminUsers.length,
    activeContent: educationalContent.filter(c => c.isActive).length,
    pendingContent: educationalContent.filter(c => !c.isActive).length,
  };
};
