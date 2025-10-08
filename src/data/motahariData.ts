export interface MotahariBook {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  summary: string;
  category: 'philosophy' | 'theology' | 'ethics' | 'history' | 'society' | 'education';
  pages: number;
  year: number;
  publisher: string;
  isbn?: string;
  coverImage: string;
  keyTopics: string[];
  quotes: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readingTime: number; // مدت زمان مطالعه به دقیقه
  isRecommended: boolean;
  rating: number; // از 1 تا 5
  audioUrl?: string; // لینک فایل صوتی
  hasAudio: boolean; // آیا فایل صوتی دارد
  chapters: BookChapter[]; // فصول کتاب
}

export interface BookChapter {
  id: number;
  title: string;
  content: string;
  audioUrl?: string;
  duration?: number; // مدت زمان به ثانیه
  pageNumber: number;
}

export interface MotahariBiography {
  fullName: string;
  birthDate: string;
  deathDate: string;
  birthPlace: string;
  education: string[];
  achievements: string[];
  influences: string[];
  philosophy: string;
  legacy: string;
  image: string;
}

// زندگینامه استاد مطهری
export const motahariBiography: MotahariBiography = {
  fullName: 'مرتضی مطهری',
  birthDate: '1298/02/13',
  deathDate: '1358/02/11',
  birthPlace: 'فریمان، خراسان',
  education: [
    'تحصیلات ابتدایی در فریمان',
    'تحصیلات حوزوی در مشهد',
    'تحصیلات عالی در قم',
    'شاگردی آیت‌الله بروجردی',
    'شاگردی امام خمینی (ره)'
  ],
  achievements: [
    'استاد دانشگاه تهران',
    'مؤسس حسینیه ارشاد',
    'نویسنده بیش از 50 کتاب',
    'مفسر قرآن و نهج البلاغه',
    'فیلسوف اسلامی'
  ],
  influences: [
    'امام خمینی (ره)',
    'آیت‌الله بروجردی',
    'علامه طباطبایی',
    'شهید بهشتی'
  ],
  philosophy: 'استاد مطهری معتقد بود که اسلام دین جامع و کامل است که پاسخگوی تمام نیازهای بشر در همه عرصه‌ها می‌باشد. او بر ضرورت بازگشت به قرآن و سنت تأکید داشت و معتقد بود که باید اسلام را به صورت علمی و منطقی عرضه کرد.',
  legacy: 'استاد مطهری به عنوان یکی از بزرگترین متفکران اسلامی معاصر شناخته می‌شود. آثار او تأثیر عمیقی بر نسل جوان و روشنفکران اسلامی داشته و همچنان مورد مطالعه و استناد قرار می‌گیرد.',
  image: 'https://via.placeholder.com/300x400/2c3e50/ffffff?text=استاد+مطهری'
};

// کتاب‌های استاد مطهری
export const motahariBooks: MotahariBook[] = [
  {
    id: 1,
    title: 'عدل الهی',
    subtitle: 'پژوهشی در عدالت خداوند',
    description: 'این کتاب به بررسی مفهوم عدالت الهی و پاسخ به شبهات مربوط به آن می‌پردازد.',
    summary: 'استاد مطهری در این کتاب با استناد به آیات قرآن و روایات، مفهوم عدالت الهی را تبیین کرده و به شبهات مختلف پاسخ داده است. او معتقد است که عدالت یکی از صفات ذاتی خداوند است و تمام افعال الهی بر اساس عدالت انجام می‌شود.',
    category: 'theology',
    pages: 320,
    year: 1340,
    publisher: 'انتشارات صدرا',
    isbn: '978-964-5600-01-2',
    coverImage: 'https://via.placeholder.com/200x280/8e44ad/ffffff?text=عدل+الهی',
    keyTopics: ['عدالت الهی', 'قضا و قدر', 'جبر و اختیار', 'شرور'],
    quotes: [
      'عدالت الهی یعنی این که خداوند به هر کس آنچه را که استحقاق دارد، می‌دهد.',
      'عدالت خداوند مطلق است و هیچ استثنایی ندارد.'
    ],
    difficulty: 'intermediate',
    readingTime: 480,
    isRecommended: true,
    rating: 5,
    hasAudio: true,
    audioUrl: 'https://example.com/audio/adl-elahi.mp3',
    chapters: [
      {
        id: 1,
        title: 'مفهوم عدالت در اسلام',
        content: 'عدالت در اسلام مفهومی بسیار عمیق و گسترده دارد. این مفهوم نه تنها در عرصه حقوق و قضاوت، بلکه در تمام ابعاد زندگی انسان جاری است. استاد مطهری در این فصل به بررسی مفهوم عدالت از منظر اسلامی می‌پردازد و تفاوت آن را با مفاهیم غربی روشن می‌سازد.\n\nعدالت الهی به معنای این است که خداوند به هر موجودی آنچه را که شایسته آن است، می‌دهد. این عدالت مطلق است و هیچ استثنایی ندارد. در قرآن کریم آمده است: "وَمَا رَبُّکَ بِظَلَّامٍ لِّلْعَبِیدِ" (سوره فصلت، آیه 46) که نشان‌دهنده عدالت مطلق خداوند است.',
        audioUrl: 'https://example.com/audio/adl-elahi-ch1.mp3',
        duration: 1800, // 30 دقیقه
        pageNumber: 1
      },
      {
        id: 2,
        title: 'شبهات مربوط به عدالت الهی',
        content: 'یکی از مهم‌ترین شبهاتی که در مورد عدالت الهی مطرح می‌شود، مسئله شرور و مصائب است. چگونه می‌توان گفت که خداوند عادل است در حالی که در جهان شرور و مصائب وجود دارد؟\n\nاستاد مطهری در این فصل به این شبهه پاسخ می‌دهد و توضیح می‌دهد که شرور و مصائب در واقع امتحان و آزمایشی برای انسان‌ها هستند. این مصائب باعث رشد و تکامل روحی انسان می‌شوند و در نهایت به نفع خود انسان تمام می‌شوند.',
        audioUrl: 'https://example.com/audio/adl-elahi-ch2.mp3',
        duration: 2100, // 35 دقیقه
        pageNumber: 15
      },
      {
        id: 3,
        title: 'قضا و قدر در اسلام',
        content: 'قضا و قدر از مفاهیم مهم در اسلام است که ارتباط مستقیمی با عدالت الهی دارد. قضا به معنای حکم قطعی خداوند و قدر به معنای اندازه‌گیری و تقدیر است.\n\nاستاد مطهری توضیح می‌دهد که قضا و قدر به معنای جبر نیست، بلکه به معنای علم پیشین خداوند و حکمت او در تدبیر امور است. انسان دارای اختیار است، اما این اختیار در چارچوب قوانین الهی قرار دارد.',
        audioUrl: 'https://example.com/audio/adl-elahi-ch3.mp3',
        duration: 1950, // 32.5 دقیقه
        pageNumber: 28
      }
    ]
  },
  {
    id: 2,
    title: 'نظام حقوق زن در اسلام',
    description: 'بررسی جامع حقوق و جایگاه زن در اسلام',
    summary: 'استاد مطهری در این کتاب به بررسی حقوق زن در اسلام پرداخته و تفاوت‌های حقوقی بین زن و مرد را تبیین کرده است. او معتقد است که اسلام حقوق مساوی برای زن و مرد قائل است، اما با توجه به تفاوت‌های طبیعی، وظایف متفاوتی برای آن‌ها تعیین کرده است.',
    category: 'society',
    pages: 280,
    year: 1345,
    publisher: 'انتشارات صدرا',
    isbn: '978-964-5600-02-9',
    coverImage: 'https://via.placeholder.com/200x280/e74c3c/ffffff?text=حقوق+زن',
    keyTopics: ['حقوق زن', 'ارث', 'شهادت', 'قضاوت', 'حجاب'],
    quotes: [
      'زن در اسلام دارای شخصیت مستقل و حقوق مساوی با مرد است.',
      'تفاوت حقوقی بین زن و مرد بر اساس تفاوت‌های طبیعی است، نه تبعیض.'
    ],
    difficulty: 'intermediate',
    readingTime: 420,
    isRecommended: true,
    rating: 4,
    hasAudio: true,
    audioUrl: 'https://example.com/audio/hoghoogh-zan.mp3',
    chapters: [
      {
        id: 1,
        title: 'شخصیت زن در اسلام',
        content: 'اسلام برای زن شخصیت مستقل و ارزشمند قائل است. در قرآن کریم آمده است: "وَمِنْ آیَاتِهِ أَنْ خَلَقَ لَکُم مِّنْ أَنفُسِکُمْ أَزْوَاجًا" (سوره روم، آیه 21) که نشان‌دهنده ارزش و جایگاه زن در اسلام است.\n\nاستاد مطهری در این فصل توضیح می‌دهد که اسلام نه تنها زن را تحقیر نکرده، بلکه او را به عنوان شریک زندگی مرد معرفی کرده است. زن در اسلام دارای حقوق مساوی با مرد است و هیچ تبعیضی علیه او وجود ندارد.',
        audioUrl: 'https://example.com/audio/hoghoogh-zan-ch1.mp3',
        duration: 1650, // 27.5 دقیقه
        pageNumber: 1
      },
      {
        id: 2,
        title: 'حقوق اقتصادی زن',
        content: 'یکی از مهم‌ترین حقوق زن در اسلام، حقوق اقتصادی اوست. زن در اسلام حق مالکیت دارد و می‌تواند در اموال خود تصرف کند. همچنین زن حق ارث دارد و می‌تواند از اموال پدر، مادر و همسر خود ارث ببرد.\n\nاستاد مطهری توضیح می‌دهد که تفاوت در سهم الارث بین زن و مرد نه به دلیل تبعیض، بلکه به دلیل تفاوت در مسئولیت‌های مالی آن‌هاست. مرد مسئولیت تأمین معاش خانواده را بر عهده دارد، در حالی که زن این مسئولیت را ندارد.',
        audioUrl: 'https://example.com/audio/hoghoogh-zan-ch2.mp3',
        duration: 1800, // 30 دقیقه
        pageNumber: 12
      }
    ]
  },
  {
    id: 3,
    title: 'خدمات متقابل اسلام و ایران',
    description: 'بررسی تأثیرات متقابل اسلام و فرهنگ ایرانی',
    summary: 'این کتاب به بررسی تأثیرات متقابل اسلام و فرهنگ ایرانی می‌پردازد. استاد مطهری معتقد است که اسلام و ایران هر یک بر دیگری تأثیر مثبت داشته‌اند و این تأثیرات متقابل بوده است.',
    category: 'history',
    pages: 450,
    year: 1350,
    publisher: 'انتشارات صدرا',
    isbn: '978-964-5600-03-6',
    coverImage: 'https://via.placeholder.com/200x280/27ae60/ffffff?text=اسلام+و+ایران',
    keyTopics: ['تاریخ اسلام', 'فرهنگ ایرانی', 'تأثیرات متقابل', 'تمدن اسلامی'],
    quotes: [
      'اسلام و ایران هر یک بر دیگری تأثیر مثبت داشته‌اند.',
      'فرهنگ ایرانی در شکل‌گیری تمدن اسلامی نقش مهمی داشته است.'
    ],
    difficulty: 'advanced',
    readingTime: 600,
    isRecommended: true,
    rating: 5,
    hasAudio: true,
    audioUrl: 'https://example.com/audio/eslam-iran.mp3',
    chapters: [
      {
        id: 1,
        title: 'تأثیر اسلام بر فرهنگ ایرانی',
        content: 'اسلام با ورود به ایران، تأثیرات عمیقی بر فرهنگ و تمدن ایرانی گذاشت. این تأثیرات نه تنها در عرصه دین، بلکه در تمام ابعاد زندگی اجتماعی، فرهنگی و علمی ایرانیان مشهود است.\n\nاستاد مطهری در این فصل توضیح می‌دهد که اسلام چگونه توانست فرهنگ ایرانی را غنی‌تر کند و آن را به سمت تکامل سوق دهد. تأثیر اسلام بر ادبیات، هنر، معماری و علوم ایرانی غیرقابل انکار است.',
        audioUrl: 'https://example.com/audio/eslam-iran-ch1.mp3',
        duration: 2400, // 40 دقیقه
        pageNumber: 1
      }
    ]
  },
  {
    id: 4,
    title: 'علل گرایش به مادیگری',
    description: 'بررسی علل گرایش جوانان به مادیگری و راه‌های مقابله',
    summary: 'استاد مطهری در این کتاب به بررسی علل گرایش جوانان به مادیگری پرداخته و راه‌های مقابله با آن را ارائه داده است. او معتقد است که این گرایش ناشی از عدم شناخت صحیح از دین و فلسفه اسلامی است.',
    category: 'philosophy',
    pages: 200,
    year: 1352,
    publisher: 'انتشارات صدرا',
    isbn: '978-964-5600-04-3',
    coverImage: 'https://via.placeholder.com/200x280/f39c12/ffffff?text=مادیگری',
    keyTopics: ['مادیگری', 'فلسفه اسلامی', 'نقد مارکسیسم', 'دین و علم'],
    quotes: [
      'گرایش به مادیگری ناشی از عدم شناخت صحیح از دین است.',
      'فلسفه اسلامی پاسخگوی تمام سوالات فلسفی بشر است.'
    ],
    difficulty: 'advanced',
    readingTime: 300,
    isRecommended: false,
    rating: 4,
    hasAudio: true,
    audioUrl: 'https://example.com/audio/madigari.mp3',
    chapters: [
      {
        id: 1,
        title: 'علل گرایش به مادیگری',
        content: 'گرایش به مادیگری در میان جوانان دلایل مختلفی دارد. یکی از مهم‌ترین این دلایل، عدم شناخت صحیح از دین و فلسفه اسلامی است. بسیاری از جوانان بدون مطالعه عمیق، به مادیگری روی می‌آورند.\n\nاستاد مطهری در این فصل توضیح می‌دهد که چگونه می‌توان با ارائه درست مفاهیم اسلامی، جوانان را از گرایش به مادیگری بازداشت. او معتقد است که فلسفه اسلامی پاسخگوی تمام سوالات فلسفی بشر است.',
        audioUrl: 'https://example.com/audio/madigari-ch1.mp3',
        duration: 1500, // 25 دقیقه
        pageNumber: 1
      }
    ]
  },
  {
    id: 5,
    title: 'انسان و سرنوشت',
    description: 'بررسی مسئله جبر و اختیار در زندگی انسان',
    summary: 'این کتاب به بررسی مسئله جبر و اختیار در زندگی انسان می‌پردازد. استاد مطهری معتقد است که انسان دارای اختیار است، اما این اختیار در چارچوب قوانین الهی قرار دارد.',
    category: 'philosophy',
    pages: 180,
    year: 1354,
    publisher: 'انتشارات صدرا',
    isbn: '978-964-5600-05-0',
    coverImage: 'https://via.placeholder.com/200x280/3498db/ffffff?text=سرنوشت',
    keyTopics: ['جبر و اختیار', 'قضا و قدر', 'اراده انسان', 'سرنوشت'],
    quotes: [
      'انسان دارای اختیار است، اما در چارچوب قوانین الهی.',
      'سرنوشت انسان ترکیبی از جبر و اختیار است.'
    ],
    difficulty: 'intermediate',
    readingTime: 270,
    isRecommended: true,
    rating: 4,
    hasAudio: true,
    audioUrl: 'https://example.com/audio/ensan-sarnesht.mp3',
    chapters: [
      {
        id: 1,
        title: 'جبر و اختیار در اسلام',
        content: 'مسئله جبر و اختیار از مهم‌ترین مسائل فلسفی و کلامی است که ذهن متفکران را به خود مشغول کرده است. اسلام در این زمینه نظریه خاصی دارد که نه جبر مطلق است و نه اختیار مطلق.\n\nاستاد مطهری در این فصل توضیح می‌دهد که انسان دارای اختیار است، اما این اختیار در چارچوب قوانین الهی قرار دارد. سرنوشت انسان ترکیبی از جبر و اختیار است که با حکمت الهی هماهنگ است.',
        audioUrl: 'https://example.com/audio/ensan-sarnesht-ch1.mp3',
        duration: 1800, // 30 دقیقه
        pageNumber: 1
      }
    ]
  },
  {
    id: 6,
    title: 'اخلاق جنسی در اسلام و جهان غرب',
    description: 'مقایسه اخلاق جنسی در اسلام و جهان غرب',
    summary: 'استاد مطهری در این کتاب به مقایسه اخلاق جنسی در اسلام و جهان غرب پرداخته و تفاوت‌های اساسی بین این دو نگرش را تبیین کرده است.',
    category: 'ethics',
    pages: 220,
    year: 1356,
    publisher: 'انتشارات صدرا',
    isbn: '978-964-5600-06-7',
    coverImage: 'https://via.placeholder.com/200x280/9b59b6/ffffff?text=اخلاق+جنسی',
    keyTopics: ['اخلاق جنسی', 'حجاب', 'ازدواج', 'خانواده'],
    quotes: [
      'اسلام برای اخلاق جنسی قوانین مشخص و منطقی دارد.',
      'اخلاق جنسی اسلامی بر اساس حفظ کرامت انسان است.'
    ],
    difficulty: 'intermediate',
    readingTime: 330,
    isRecommended: false,
    rating: 3,
    hasAudio: true,
    audioUrl: 'https://example.com/audio/akhlagh-jensi.mp3',
    chapters: [
      {
        id: 1,
        title: 'مقایسه اخلاق جنسی',
        content: 'اخلاق جنسی در اسلام و جهان غرب تفاوت‌های اساسی دارد. اسلام برای اخلاق جنسی قوانین مشخص و منطقی دارد که بر اساس حفظ کرامت انسان و سلامت جامعه استوار است.\n\nاستاد مطهری در این فصل به مقایسه این دو نگرش می‌پردازد و نشان می‌دهد که چگونه اخلاق جنسی اسلامی می‌تواند جامعه را به سمت سلامت و تعالی سوق دهد.',
        audioUrl: 'https://example.com/audio/akhlagh-jensi-ch1.mp3',
        duration: 1950, // 32.5 دقیقه
        pageNumber: 1
      }
    ]
  },
  {
    id: 7,
    title: 'سیری در نهج البلاغه',
    description: 'شرح و تفسیر گزیده‌ای از نهج البلاغه',
    summary: 'این کتاب شرح و تفسیر گزیده‌ای از نهج البلاغه است. استاد مطهری در این کتاب به بررسی مفاهیم عمیق نهج البلاغه پرداخته و آن‌ها را برای نسل جوان تبیین کرده است.',
    category: 'theology',
    pages: 350,
    year: 1357,
    publisher: 'انتشارات صدرا',
    isbn: '978-964-5600-07-4',
    coverImage: 'https://via.placeholder.com/200x280/1abc9c/ffffff?text=نهج+البلاغه',
    keyTopics: ['نهج البلاغه', 'امام علی', 'اخلاق', 'حکمت'],
    quotes: [
      'نهج البلاغه دریایی از معارف اسلامی است.',
      'امام علی (ع) در نهج البلاغه عمیق‌ترین مفاهیم را بیان کرده است.'
    ],
    difficulty: 'advanced',
    readingTime: 525,
    isRecommended: true,
    rating: 5,
    hasAudio: true,
    audioUrl: 'https://example.com/audio/nahjolbalaghe.mp3',
    chapters: [
      {
        id: 1,
        title: 'مقدمه‌ای بر نهج البلاغه',
        content: 'نهج البلاغه مجموعه‌ای از سخنان، نامه‌ها و حکمت‌های امام علی (ع) است که توسط سید رضی جمع‌آوری شده است. این کتاب دریایی از معارف اسلامی است که در آن عمیق‌ترین مفاهیم دینی و اخلاقی بیان شده است.\n\nاستاد مطهری در این فصل به معرفی نهج البلاغه و اهمیت آن می‌پردازد و نشان می‌دهد که چگونه این کتاب می‌تواند راهنمای زندگی انسان باشد.',
        audioUrl: 'https://example.com/audio/nahjolbalaghe-ch1.mp3',
        duration: 2100, // 35 دقیقه
        pageNumber: 1
      }
    ]
  },
  {
    id: 8,
    title: 'آشنایی با علوم اسلامی',
    description: 'معرفی علوم مختلف اسلامی',
    summary: 'این کتاب به معرفی علوم مختلف اسلامی می‌پردازد. استاد مطهری در این کتاب علوم اسلامی را به صورت جامع و قابل فهم برای عموم معرفی کرده است.',
    category: 'education',
    pages: 400,
    year: 1358,
    publisher: 'انتشارات صدرا',
    isbn: '978-964-5600-08-1',
    coverImage: 'https://via.placeholder.com/200x280/34495e/ffffff?text=علوم+اسلامی',
    keyTopics: ['علوم اسلامی', 'فقه', 'اصول', 'تفسیر', 'حدیث'],
    quotes: [
      'علوم اسلامی مجموعه‌ای از دانش‌های الهی است.',
      'هر مسلمانی باید با علوم اسلامی آشنا باشد.'
    ],
    difficulty: 'beginner',
    readingTime: 600,
    isRecommended: true,
    rating: 4,
    hasAudio: true,
    audioUrl: 'https://example.com/audio/oloom-eslami.mp3',
    chapters: [
      {
        id: 1,
        title: 'مقدمه‌ای بر علوم اسلامی',
        content: 'علوم اسلامی مجموعه‌ای از دانش‌های الهی است که از قرآن و سنت استخراج شده است. این علوم شامل فقه، اصول، تفسیر، حدیث، کلام و فلسفه اسلامی می‌شود.\n\nاستاد مطهری در این فصل به معرفی کلی علوم اسلامی می‌پردازد و اهمیت هر یک از آن‌ها را توضیح می‌دهد. او معتقد است که هر مسلمانی باید با این علوم آشنا باشد تا بتواند دین خود را به درستی بشناسد.',
        audioUrl: 'https://example.com/audio/oloom-eslami-ch1.mp3',
        duration: 2400, // 40 دقیقه
        pageNumber: 1
      }
    ]
  }
];

// توابع مدیریت
export const getMotahariBooks = (): MotahariBook[] => {
  return motahariBooks;
};

export const getMotahariBooksByCategory = (category: string): MotahariBook[] => {
  return motahariBooks.filter(book => book.category === category);
};

export const getRecommendedBooks = (): MotahariBook[] => {
  return motahariBooks.filter(book => book.isRecommended);
};

export const getBookById = (id: number): MotahariBook | undefined => {
  return motahariBooks.find(book => book.id === id);
};

export const getBooksByDifficulty = (difficulty: string): MotahariBook[] => {
  return motahariBooks.filter(book => book.difficulty === difficulty);
};

export const getTopRatedBooks = (): MotahariBook[] => {
  return motahariBooks
    .filter(book => book.rating >= 4)
    .sort((a, b) => b.rating - a.rating);
};

export const searchBooks = (query: string): MotahariBook[] => {
  const lowercaseQuery = query.toLowerCase();
  return motahariBooks.filter(book => 
    book.title.toLowerCase().includes(lowercaseQuery) ||
    book.description.toLowerCase().includes(lowercaseQuery) ||
    book.summary.toLowerCase().includes(lowercaseQuery) ||
    book.keyTopics.some(topic => topic.toLowerCase().includes(lowercaseQuery))
  );
};
