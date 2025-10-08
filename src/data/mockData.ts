export interface Question {
  id: number;
  question: string;
  category: 'quran' | 'mottahari';
  type: 'multiple' | 'text';
  options?: string[];
  correctAnswer: string | number; // index for multiple, string for text
  explanation?: string;
}

// سوالات پیش‌فرض (Mock Questions)
export const mockQuestions: Question[] = [
  {
    id: 1,
    question: 'بر اساس آموزه‌های قرآن، هدف اصلی خلقت انسان چیست؟',
    category: 'quran',
    type: 'multiple',
    options: ['عبادت خداوند', 'رسیدن به قدرت', 'لذت بردن از دنیا', 'کسب ثروت'],
    correctAnswer: 0,
    explanation: 'قرآن کریم در آیه 56 سوره الذاریات می‌فرماید: "وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ"',
  },
  {
    id: 2,
    question: 'کدام سوره در قرآن به قلب قرآن معروف است؟',
    category: 'quran',
    type: 'multiple',
    options: ['سوره بقره', 'سوره یاسین', 'سوره کوثر', 'سوره حمد'],
    correctAnswer: 1,
    explanation: 'سوره یاسین به قلب قرآن معروف است و در روایات از آن به عنوان قلب قرآن یاد شده است.',
  },
  {
    id: 3,
    question: 'از نظر استاد مطهری، یکی از تفاوت‌های اصلی انسان و حیوان در چیست؟',
    category: 'mottahari',
    type: 'text',
    options: [],
    correctAnswer: 'فطرت الهی یا اختیار',
    explanation: 'استاد مطهری معتقد است که انسان دارای فطرت الهی و اختیار است که او را از حیوان متمایز می‌کند.',
  },
  {
    id: 4,
    question: 'بر اساس تفسیر مطهری، مفهوم "جهاد اکبر" چیست؟',
    category: 'mottahari',
    type: 'multiple',
    options: ['مبارزه با دشمن خارجی', 'جهاد با نفس', 'کمک به فقرا', 'دفاع از سرزمین'],
    correctAnswer: 1,
    explanation: 'استاد مطهری جهاد اکبر را مبارزه با نفس و هواهای نفسانی می‌داند.',
  },
  {
    id: 5,
    question: 'سوره اخلاص چند آیه دارد؟',
    category: 'quran',
    type: 'multiple',
    options: ['3', '4', '5', '6'],
    correctAnswer: 1,
    explanation: 'سوره اخلاص دارای 4 آیه است و به توحید خداوند اشاره دارد.',
  },
  {
    id: 6,
    question: 'در آیه "إِنَّ مَعَ الْعُسْرِ يُسْرًا" چه مفهومی بیان شده است؟',
    category: 'quran',
    type: 'text',
    options: [],
    correctAnswer: 'با سختی آسانی است',
    explanation: 'این آیه بیان می‌کند که پس از هر سختی، آسانی و گشایشی خواهد بود.',
  },
  {
    id: 7,
    question: 'استاد مطهری درباره مفهوم "عدل الهی" چه نظری دارد؟',
    category: 'mottahari',
    type: 'multiple',
    options: ['عدل به معنای برابری است', 'عدل به معنای قرار دادن هر چیز در جای خود است', 'عدل فقط در دنیا معنا دارد', 'عدل مفهومی نسبی است'],
    correctAnswer: 1,
    explanation: 'استاد مطهری عدل را به معنای قرار دادن هر چیز در جای مناسب خود تفسیر می‌کند.',
  },
  {
    id: 8,
    question: 'کدام یک از این آیات درباره صبر و استقامت است؟',
    category: 'quran',
    type: 'multiple',
    options: ['وَاصْبِرْ عَلَىٰ مَا أَصَابَكَ', 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا', 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ', 'همه موارد'],
    correctAnswer: 3,
    explanation: 'همه این آیات درباره صبر و استقامت در برابر مشکلات سخن می‌گویند.',
  },
  {
    id: 9,
    question: 'در تفسیر مطهری، مفهوم "معاد" چه معنایی دارد؟',
    category: 'mottahari',
    type: 'text',
    options: [],
    correctAnswer: 'بازگشت به خدا و زندگی ابدی',
    explanation: 'استاد مطهری معاد را بازگشت انسان به خدا و زندگی ابدی در آخرت تفسیر می‌کند.',
  },
  {
    id: 10,
    question: 'آیه "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا" در کدام سوره است؟',
    category: 'quran',
    type: 'multiple',
    options: ['الطلاق', 'النساء', 'البقره', 'آل عمران'],
    correctAnswer: 0,
    explanation: 'این آیه در سوره الطلاق آیه 2 قرار دارد.',
  },
  {
    id: 11,
    question: 'استاد مطهری درباره "نبوت" چه می‌گوید؟',
    category: 'mottahari',
    type: 'multiple',
    options: ['نبوت فقط برای اعراب است', 'نبوت برای هدایت همه انسان‌ها است', 'نبوت محدود به زمان خاصی است', 'نبوت مفهومی تاریخی است'],
    correctAnswer: 1,
    explanation: 'استاد مطهری معتقد است که نبوت برای هدایت همه انسان‌ها در همه زمان‌ها است.',
  },
  {
    id: 12,
    question: 'در تفسیر مطهری، مفهوم "امامت" چیست؟',
    category: 'mottahari',
    type: 'text',
    options: [],
    correctAnswer: 'رهبری الهی و ادامه نبوت',
    explanation: 'استاد مطهری امامت را رهبری الهی و ادامه راه نبوت برای هدایت مردم تفسیر می‌کند.',
  },
];

// تابع دریافت سوالات بر اساس دسته‌بندی
export const getQuestionsByCategory = (category: 'quran' | 'mottahari' | 'all'): Question[] => {
  if (category === 'all') {
    return mockQuestions;
  }
  return mockQuestions.filter(q => q.category === category);
};

// تابع دریافت سوالات تصادفی
export const getRandomQuestions = (count: number, category: 'quran' | 'mottahari' | 'all' = 'all'): Question[] => {
  const questions = getQuestionsByCategory(category);
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};