export interface Martyr {
  id: number;
  name: string;
  city: string;
  age: number;
  martyrdomDate: string;
  description: string;
  image: string;
}

export interface GoodDeed {
  id: number;
  title: string;
  description: string;
  points: number;
  category: 'prayer' | 'charity' | 'kindness' | 'learning' | 'other';
  createdAt: string;
}

export interface BadDeed {
  id: number;
  title: string;
  description: string;
  points: number;
  category: 'anger' | 'greed' | 'laziness' | 'dishonesty' | 'other';
  createdAt: string;
}

export interface GardenItem {
  id: number;
  type: 'tree' | 'bird';
  stage: 'seed' | 'tree' | 'fruit' | 'bird';
  position: { x: number; y: number };
  createdAt: string;
  deedId: number;
  isAlive: boolean;
  color: string;
}

export interface GardenState {
  items: GardenItem[];
  goodDeedsCount: number;
  badDeedsCount: number;
  totalPoints: number;
}

// شهدای دفاع مقدس
export const martyrs: Martyr[] = [
  {
    id: 1,
    name: 'شهید محمدحسین فهمیده',
    city: 'قم',
    age: 13,
    martyrdomDate: '1360/09/27',
    description: 'نوجوانی که با نارنجک خود را زیر تانک دشمن انداخت و به شهادت رسید',
    image: 'https://via.placeholder.com/300x400/8e44ad/ffffff?text=شهید+فهمیده',
  },
  {
    id: 2,
    name: 'شهید علی صیاد شیرازی',
    city: 'تهران',
    age: 54,
    martyrdomDate: '1378/02/21',
    description: 'فرمانده ارشد نظامی که در عملیات‌های مختلف شرکت داشت',
    image: 'https://via.placeholder.com/300x400/e74c3c/ffffff?text=شهید+صیاد',
  },
  {
    id: 3,
    name: 'شهید عباس بابایی',
    city: 'تبریز',
    age: 33,
    martyrdomDate: '1366/07/15',
    description: 'خلبان شجاع که در عملیات‌های هوایی شرکت داشت',
    image: 'https://via.placeholder.com/300x400/27ae60/ffffff?text=شهید+بابایی',
  },
  {
    id: 4,
    name: 'شهید مرتضی آوینی',
    city: 'تهران',
    age: 45,
    martyrdomDate: '1372/02/20',
    description: 'مستندساز و نویسنده که در جبهه‌های جنگ حضور داشت',
    image: 'https://via.placeholder.com/300x400/f39c12/ffffff?text=شهید+آوینی',
  },
];

// کارهای خوب پیش‌فرض
export const defaultGoodDeeds: GoodDeed[] = [
  {
    id: 1,
    title: 'نماز خواندن',
    description: 'خواندن نماز در وقت مقرر',
    points: 10,
    category: 'prayer',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'کمک به نیازمندان',
    description: 'کمک مالی یا معنوی به افراد نیازمند',
    points: 15,
    category: 'charity',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'احترام به والدین',
    description: 'احترام و اطاعت از پدر و مادر',
    points: 20,
    category: 'kindness',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'مطالعه قرآن',
    description: 'خواندن و تفکر در آیات قرآن کریم',
    points: 12,
    category: 'learning',
    createdAt: new Date().toISOString(),
  },
];

// کارهای بد پیش‌فرض
export const defaultBadDeeds: BadDeed[] = [
  {
    id: 1,
    title: 'عصبانیت',
    description: 'کنترل نکردن خشم و عصبانیت',
    points: -8,
    category: 'anger',
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'حسادت',
    description: 'حسادت کردن به دیگران',
    points: -10,
    category: 'greed',
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: 'تنبلی',
    description: 'انجام ندادن وظایف و کارها',
    points: -5,
    category: 'laziness',
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: 'دروغ گفتن',
    description: 'گفتن دروغ و عدم صداقت',
    points: -12,
    category: 'dishonesty',
    createdAt: new Date().toISOString(),
  },
];

// توابع مدیریت
export const getMartyrs = (): Martyr[] => {
  return martyrs;
};

export const getMartyrById = (id: number): Martyr | undefined => {
  return martyrs.find(martyr => martyr.id === id);
};

export const getRandomMartyr = (): Martyr => {
  const randomIndex = Math.floor(Math.random() * martyrs.length);
  return martyrs[randomIndex];
};

export const getGoodDeeds = (): GoodDeed[] => {
  return defaultGoodDeeds;
};

export const getBadDeeds = (): BadDeed[] => {
  return defaultBadDeeds;
};

export const addGoodDeed = (deed: Omit<GoodDeed, 'id' | 'createdAt'>): GoodDeed => {
  const newDeed: GoodDeed = {
    ...deed,
    id: Math.max(...defaultGoodDeeds.map(d => d.id)) + 1,
    createdAt: new Date().toISOString(),
  };
  defaultGoodDeeds.push(newDeed);
  return newDeed;
};

export const addBadDeed = (deed: Omit<BadDeed, 'id' | 'createdAt'>): BadDeed => {
  const newDeed: BadDeed = {
    ...deed,
    id: Math.max(...defaultBadDeeds.map(d => d.id)) + 1,
    createdAt: new Date().toISOString(),
  };
  defaultBadDeeds.push(newDeed);
  return newDeed;
};

// توابع مدیریت باغ معنوی
let gardenState: GardenState = {
  items: [],
  goodDeedsCount: 0,
  badDeedsCount: 0,
  totalPoints: 0,
};

export const getGardenState = (): GardenState => {
  return gardenState;
};

export const addGoodDeedToGarden = (deed: GoodDeed): GardenItem => {
  const newItem: GardenItem = {
    id: Date.now(),
    type: 'tree',
    stage: 'seed',
    position: {
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 100,
    },
    createdAt: new Date().toISOString(),
    deedId: deed.id,
    isAlive: true,
    color: '#27ae60',
  };
  
  gardenState.items.push(newItem);
  gardenState.goodDeedsCount++;
  gardenState.totalPoints += deed.points;
  
  // ارتقاء مراحل موجودات باغ
  upgradeGardenItems();
  
  return newItem;
};

export const addBadDeedToGarden = (deed: BadDeed): void => {
  gardenState.badDeedsCount++;
  gardenState.totalPoints += deed.points;
  
  // آسیب رساندن به موجودات باغ
  damageGardenItems();
};

const upgradeGardenItems = (): void => {
  const goodDeedsCount = gardenState.goodDeedsCount;
  
  gardenState.items.forEach((item, index) => {
    if (item.isAlive) {
      if (goodDeedsCount >= 3 && item.stage === 'seed') {
        item.stage = 'tree';
        item.color = '#27ae60';
      } else if (goodDeedsCount >= 6 && item.stage === 'tree') {
        item.stage = 'fruit';
        item.color = '#f39c12';
      } else if (goodDeedsCount >= 9 && item.stage === 'fruit') {
        item.stage = 'bird';
        item.type = 'bird';
        item.color = '#3498db';
      }
    }
  });
};

const damageGardenItems = (): void => {
  const badDeedsCount = gardenState.badDeedsCount;
  
  gardenState.items.forEach((item, index) => {
    if (item.isAlive && badDeedsCount > 0) {
      if (badDeedsCount >= 2 && item.stage === 'bird') {
        item.stage = 'fruit';
        item.type = 'tree';
        item.color = '#f39c12';
      } else if (badDeedsCount >= 4 && item.stage === 'fruit') {
        item.stage = 'tree';
        item.color = '#27ae60';
      } else if (badDeedsCount >= 6 && item.stage === 'tree') {
        item.stage = 'seed';
        item.color = '#95a5a6';
      } else if (badDeedsCount >= 8) {
        item.isAlive = false;
        item.color = '#e74c3c';
      }
    }
  });
};

export const resetGarden = (): void => {
  gardenState = {
    items: [],
    goodDeedsCount: 0,
    badDeedsCount: 0,
    totalPoints: 0,
  };
};
