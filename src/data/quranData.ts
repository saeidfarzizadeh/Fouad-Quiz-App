// داده‌های قرآن کریم
export interface QuranSurah {
  id: number;
  name: string;
  arabicName: string;
  englishName: string;
  verses: number;
  revelationPlace: 'makkah' | 'madinah';
  revelationOrder: number;
  description: string;
  keyTopics: string[];
  audioUrl?: string;
  reciter: string;
  duration?: number; // مدت زمان به ثانیه
}

export interface QuranVerse {
  id: number;
  surahId: number;
  verseNumber: number;
  arabicText: string;
  persianTranslation: string;
  englishTranslation: string;
  tafsir?: string; // تفسیر استاد حائری
  audioUrl?: string;
}

export interface QuranReciter {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  style: 'traditional' | 'modern' | 'melodic';
  image: string;
  audioSamples: string[];
}

// سوره‌های قرآن کریم
export const quranSurahs: QuranSurah[] = [
  {
    id: 1,
    name: 'فاتحه',
    arabicName: 'الفاتحة',
    englishName: 'Al-Fatiha',
    verses: 7,
    revelationPlace: 'makkah',
    revelationOrder: 5,
    description: 'سوره فاتحه که ام الکتاب نامیده می‌شود و در هر نماز خوانده می‌شود.',
    keyTopics: ['توحید', 'عبادت', 'هدایت', 'استعانت'],
    audioUrl: 'https://example.com/audio/fatiha.mp3',
    reciter: 'عبدالباسط عبدالصمد',
    duration: 180
  },
  {
    id: 2,
    name: 'بقره',
    arabicName: 'البقرة',
    englishName: 'Al-Baqarah',
    verses: 286,
    revelationPlace: 'madinah',
    revelationOrder: 87,
    description: 'طولانی‌ترین سوره قرآن که شامل احکام، قصص و مواعظ است.',
    keyTopics: ['احکام', 'قصص انبیا', 'جهاد', 'معاملات', 'عبادات'],
    audioUrl: 'https://example.com/audio/baqarah.mp3',
    reciter: 'مشاری راشد العفاسی',
    duration: 7200
  },
  {
    id: 3,
    name: 'آل عمران',
    arabicName: 'آل عمران',
    englishName: 'Al-Imran',
    verses: 200,
    revelationPlace: 'madinah',
    revelationOrder: 89,
    description: 'سوره‌ای که درباره خانواده عمران و داستان مریم سخن می‌گوید.',
    keyTopics: ['خانواده عمران', 'مریم', 'عیسی', 'توحید', 'جهاد'],
    audioUrl: 'https://example.com/audio/ale-imran.mp3',
    reciter: 'سعد الغامدی',
    duration: 4800
  },
  {
    id: 4,
    name: 'نساء',
    arabicName: 'النساء',
    englishName: 'An-Nisa',
    verses: 176,
    revelationPlace: 'madinah',
    revelationOrder: 92,
    description: 'سوره‌ای که درباره حقوق زنان و احکام خانواده سخن می‌گوید.',
    keyTopics: ['حقوق زنان', 'احکام خانواده', 'ارث', 'عدالت'],
    audioUrl: 'https://example.com/audio/nisa.mp3',
    reciter: 'عبدالرحمن السدیس',
    duration: 4200
  },
  {
    id: 5,
    name: 'مائده',
    arabicName: 'المائدة',
    englishName: 'Al-Maidah',
    verses: 120,
    revelationPlace: 'madinah',
    revelationOrder: 112,
    description: 'سوره‌ای که درباره سفره آسمانی و احکام حلال و حرام سخن می‌گوید.',
    keyTopics: ['مائده آسمانی', 'احکام حلال و حرام', 'عهد و پیمان', 'عدالت'],
    audioUrl: 'https://example.com/audio/maidah.mp3',
    reciter: 'محمد صدیق المنشاوی',
    duration: 3000
  },
  {
    id: 6,
    name: 'انعام',
    arabicName: 'الأنعام',
    englishName: 'Al-Anam',
    verses: 165,
    revelationPlace: 'makkah',
    revelationOrder: 55,
    description: 'سوره‌ای که درباره حیوانات و توحید سخن می‌گوید.',
    keyTopics: ['توحید', 'حیوانات', 'آفرینش', 'عبادت'],
    audioUrl: 'https://example.com/audio/anam.mp3',
    reciter: 'عبدالله بصفر',
    duration: 3600
  },
  {
    id: 7,
    name: 'اعراف',
    arabicName: 'الأعراف',
    englishName: 'Al-Araf',
    verses: 206,
    revelationPlace: 'makkah',
    revelationOrder: 39,
    description: 'سوره‌ای که درباره اعراف و داستان آدم سخن می‌گوید.',
    keyTopics: ['اعراف', 'آدم و حوا', 'شیطان', 'توحید'],
    audioUrl: 'https://example.com/audio/araf.mp3',
    reciter: 'عبدالله المطرود',
    duration: 4500
  },
  {
    id: 8,
    name: 'انفال',
    arabicName: 'الأنفال',
    englishName: 'Al-Anfal',
    verses: 75,
    revelationPlace: 'madinah',
    revelationOrder: 88,
    description: 'سوره‌ای که درباره غنائم جنگی و احکام جهاد سخن می‌گوید.',
    keyTopics: ['غنائم جنگی', 'جهاد', 'بدر', 'احکام'],
    audioUrl: 'https://example.com/audio/anfal.mp3',
    reciter: 'عبدالله الجونی',
    duration: 1800
  },
  {
    id: 9,
    name: 'توبه',
    arabicName: 'التوبة',
    englishName: 'At-Tawbah',
    verses: 129,
    revelationPlace: 'madinah',
    revelationOrder: 113,
    description: 'سوره‌ای که درباره توبه و احکام جهاد سخن می‌گوید.',
    keyTopics: ['توبه', 'جهاد', 'منافقین', 'احکام'],
    audioUrl: 'https://example.com/audio/tawbah.mp3',
    reciter: 'عبدالله المطرود',
    duration: 2700
  },
  {
    id: 10,
    name: 'یونس',
    arabicName: 'یونس',
    englishName: 'Yunus',
    verses: 109,
    revelationPlace: 'makkah',
    revelationOrder: 51,
    description: 'سوره‌ای که درباره داستان یونس و توحید سخن می‌گوید.',
    keyTopics: ['یونس', 'توحید', 'معجزه', 'هدایت'],
    audioUrl: 'https://example.com/audio/yunus.mp3',
    reciter: 'عبدالباسط عبدالصمد',
    duration: 2400
  }
];

// قاریان قرآن
export const quranReciters: QuranReciter[] = [
  {
    id: 'abdulbasit',
    name: 'عبدالباسط عبدالصمد',
    arabicName: 'عبدالباسط عبدالصمد',
    description: 'قاری مصری با صدای گرم و رسا، از مشهورترین قاریان جهان',
    style: 'traditional',
    image: 'https://via.placeholder.com/200x200/2E7D32/ffffff?text=عبدالباسط',
    audioSamples: [
      'https://example.com/audio/abdulbasit-fatiha.mp3',
      'https://example.com/audio/abdulbasit-baqarah.mp3'
    ]
  },
  {
    id: 'mishary',
    name: 'مشاری راشد العفاسی',
    arabicName: 'مشاری راشد العفاسی',
    description: 'قاری کویتی با صدای زیبا و ملودی‌دار',
    style: 'melodic',
    image: 'https://via.placeholder.com/200x200/6B8E23/ffffff?text=مشاری',
    audioSamples: [
      'https://example.com/audio/mishary-fatiha.mp3',
      'https://example.com/audio/mishary-baqarah.mp3'
    ]
  },
  {
    id: 'saad',
    name: 'سعد الغامدی',
    arabicName: 'سعد الغامدی',
    description: 'قاری سعودی با صدای آرام و معنوی',
    style: 'modern',
    image: 'https://via.placeholder.com/200x200/8B4513/ffffff?text=سعد+الغامدی',
    audioSamples: [
      'https://example.com/audio/saad-fatiha.mp3',
      'https://example.com/audio/saad-baqarah.mp3'
    ]
  },
  {
    id: 'sudais',
    name: 'عبدالرحمن السدیس',
    arabicName: 'عبدالرحمن السدیس',
    description: 'امام و خطیب مسجدالحرام با صدای رسا',
    style: 'traditional',
    image: 'https://via.placeholder.com/200x200/1B5E20/ffffff?text=السدیس',
    audioSamples: [
      'https://example.com/audio/sudais-fatiha.mp3',
      'https://example.com/audio/sudais-baqarah.mp3'
    ]
  }
];

// تفسیر استاد حائری
export const haeriTafsir = {
  fatiha: {
    title: 'تفسیر سوره فاتحه',
    author: 'استاد علی صفایی حائری',
    content: `سوره فاتحه که ام الکتاب نامیده می‌شود، در واقع خلاصه‌ای از تمام قرآن است. این سوره با حمد و ستایش خداوند آغاز می‌شود و با درخواست هدایت پایان می‌یابد.

آیه "الحمد لله رب العالمین" بیانگر این است که تمام حمد و ستایش مخصوص خداوند است که پروردگار تمام جهان‌هاست. این آیه نشان‌دهنده توحید در ربوبیت است.

آیه "الرحمن الرحیم" بیانگر رحمت گسترده خداوند است که شامل تمام مخلوقات می‌شود.

آیه "مالک یوم الدین" بیانگر این است که خداوند مالک روز جزا است و در آن روز هیچ کس جز او قدرت ندارد.

آیه "ایاک نعبد و ایاک نستعین" بیانگر توحید در عبادت و استعانت است. ما فقط خداوند را عبادت می‌کنیم و فقط از او کمک می‌طلبیم.

آیه "اهدنا الصراط المستقیم" درخواست هدایت به راه راست است که راه انبیا و صالحان است.

آیه "صراط الذین انعمت علیهم" راه کسانی است که خداوند به آنان نعمت داده است.

آیه "غیر المغضوب علیهم ولا الضالین" راه کسانی نیست که خداوند بر آنان خشم گرفته یا گمراه شده‌اند.`
  },
  baqarah: {
    title: 'تفسیر سوره بقره',
    author: 'استاد علی صفایی حائری',
    content: `سوره بقره طولانی‌ترین سوره قرآن است که شامل احکام، قصص و مواعظ فراوانی است. این سوره در مدینه نازل شده و شامل احکام عملی اسلام است.

آیه "الم" حروف مقطعه است که نشان‌دهنده اعجاز قرآن است. این حروف نشان می‌دهد که قرآن از همین حروف عادی تشکیل شده اما معجزه است.

آیه "ذلک الکتاب لا ریب فیه هدی للمتقین" بیانگر این است که قرآن کتابی است که در آن هیچ شک و تردیدی نیست و راهنمای متقین است.

آیه "الذین یؤمنون بالغیب" بیانگر ایمان به غیب است که از ویژگی‌های متقین است.

آیه "ویقیمون الصلاة" بیانگر برپایی نماز است که از اعمال مهم متقین است.

آیه "ومما رزقناهم ینفقون" بیانگر انفاق از آنچه خداوند روزی داده است.

این سوره شامل داستان آدم، موسی، ابراهیم و دیگر انبیا است و احکام مختلفی درباره نماز، روزه، حج، جهاد و معاملات دارد.`
  }
};

// توابع کمکی
export const getSurahById = (id: number): QuranSurah | undefined => {
  return quranSurahs.find(surah => surah.id === id);
};

export const getSurahsByRevelationPlace = (place: 'makkah' | 'madinah'): QuranSurah[] => {
  return quranSurahs.filter(surah => surah.revelationPlace === place);
};

export const getReciterById = (id: string): QuranReciter | undefined => {
  return quranReciters.find(reciter => reciter.id === id);
};

export const getTafsirBySurah = (surahName: string): any => {
  return haeriTafsir[surahName as keyof typeof haeriTafsir];
};
