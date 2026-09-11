import { ReviewItem, KyotoMetrics, CommunityNotification, JapanesePhrase } from '../types';

export const CURRENT_USER = {
  name: 'Maya Lin',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAbHFhVlkAzNkqNzwDEa7lPsV-TdiLWitROeqWHiQUYG9OWUD9UCW9iQiKO0RREVAvKd_WhjqSMWqNQmw7_qP26AcOvmNe4aa0UNy0u3TKFOgBrpuTrI94E5W3bfRcoX5FAUVNU_e_tA3Tp736lRoRzp3NYArw3rVqlife-oo-92IHB-hUyj26NaRjKs4zgki0lwxxTMopQvB7pMxXFQwR1Hds821PSQb2fAaDzgF9TV7m_dngTaTkw',
  role: 'Solo Traveler',
  location: 'In Kyoto',
  isVerified: true,
  isGpsVerified: true,
  bio: 'Visual designer & slow traveler based in Tokyo. Exploring Kansai backstreets and artisanal tea craft.',
  level: 'Level 3 Contributor',
  reviewsCount: 14,
  helpfulReceived: 342,
  badges: ['GPS Verified', 'Solo Adventurer', 'Kyoto Specialist', 'Foodie Pioneer']
};

export const INITIAL_METRICS: KyotoMetrics = {
  overallScore: 4.9,
  checkInCount: 1428,
  safetyScore: 98,
  englishFriendlyScore: 94,
  soloDiningScore: 92
};

export const AVAILABLE_LOCATIONS = [
  { name: 'Gion Karyo Kaiseki', tag: 'Traditional Kaiseki', category: 'restaurant' as const, district: 'Gion & Higashiyama' },
  { name: 'Chao Chao Gyoza Sanjo', tag: 'Gyoza / Craft Beer', category: 'restaurant' as const, district: 'Sanjo / Downtown' },
  { name: 'Fushimi Inari Taisha photowalk', tag: 'Scenic Hike', category: 'sight' as const, district: 'Fushimi' },
  { name: 'Nishiki Market Backstreet Izakaya', tag: 'Cash Only', category: 'bar' as const, isCashOnly: true, district: 'Nishiki Market' },
  { name: 'Arashiyama Bamboo Grove Walk', tag: 'Nature / Scenic', category: 'sight' as const, district: 'Arashiyama' },
  { name: 'Kinkaku-ji Golden Pavilion', tag: 'Temple & Gardens', category: 'cultural' as const, district: 'Kita' },
  { name: 'Pontocho Alley Izakaya Alley', tag: 'Nightlife / Dining', category: 'bar' as const, district: 'Pontocho' },
  { name: 'Kiyomizu-dera Sunset Terrace', tag: 'Historic Temple', category: 'sight' as const, district: 'Gion & Higashiyama' }
];

export const AVAILABLE_TAGS = [
  '#SoloFriendly',
  '#EnglishMenu',
  '#CashOnly',
  '#HiddenGem',
  '#ReserveAhead',
  '#LateNight',
  '#QuickBite',
  '#EarlyBird',
  '#FreeAdmission',
  '#KyotoView'
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: {
      name: 'Sophie Laurent',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNVd0hOaKaXuBodt2rg2dgPojm9D04516qMEUsEQ32xK7rXms3HYo2i3pPtFBZqPm3ewOSM0kn1Vg-qj0rFywZ4KxKI0aahfVxZ_qDLa1Xw9hk2oxJpzjZr-9-9SB1rfBymcFzUkn5NA3s3QgX8Fy8Bg3dBhjXbSnNan5KFpaJ3LW11uAOas95A8tEtZ_ob5tN2jEg-U5EgEQSiE36k6faK9fziE2dOD2F6zx-uAFtqHXzjtAr81E9Vw',
      badge: 'Verified Solo Traveler • Level 4 Explorer',
      isVerified: true
    },
    rating: 5.0,
    timeAgo: '2h ago',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    location: {
      name: 'Chao Chao Gyoza Sanjo',
      tag: 'Gyoza / Craft Beer',
      category: 'restaurant',
      district: 'Sanjo / Downtown'
    },
    text: '“Don’t be intimidated by the evening line outside! The line moves fast (10 mins) and the staff speaks great English. Get the half-and-half pork & ginger gyoza with local Kyoto draft beer. Perfect solo dinner spot.”',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYmgEv1Db3m2rEd_fTDQCjFCLvMmhei2iwsDF4u8abUwGXm7b-pFfvR82s4to36VKZ9SlC8cs-sU4Ol-skaAm9ryV_xbEDk70_RHT8vTwkeeB9RkMtrNZZ0z7YColRFGunktfRzs1NC1GvxXf_a4AzIcAH70MuKEy0aeVkeCefIp32BRpFX9crgCQFTxE7cFgn_GYW3sMpXh9H1829hiytiZlR3Az3Gjf5xGAJpjW4nIpjAcVdN8lCRA',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCI7ZWftMe5mX4j-Ui-aj7g4-qDFp0fQmPYgwycksz4fGbYXNM4xzooeOu3ktrlbGl_OWkbN66cjGdaf3jqC-Zyvx1Hf4YuzDDOeDRSBnU1PdH6DE0ppSXEoy02Et8MoMEugIxaO9ieIq-h2NVtPcBTCjhuUKFpsCaMCUZZnWmFRS-ZJngU_P85GstLsix9nZtzkhYXEgAErBst8TiH9-DFQqkf71ueghHRGy2oUTfxhqJEbiutGM9H_Q'
    ],
    imageCaptions: [
      'Crispy pan-fried gyoza dumplings with homemade dipping sauce',
      'Atmospheric counter seating with welcoming chefs'
    ],
    tags: ['#SoloFriendly', '#EnglishMenu', '#QuickBite'],
    helpfulCount: 42,
    isHelpfulVoted: false,
    isBookmarked: false,
    isGpsVerified: true
  },
  {
    id: 'rev-2',
    author: {
      name: 'Marcus Vance',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDL7VDOBPGDju0MJ6GR7P4q1IoZDYHGlCd6e7ZWVVNleQZE8TDFPGqUv_mCBDyib5eDwjfLoUv7n-pu6ezM0bLMHHmWZe_4PeDLOmLHU7P9mfjYp_X5Ib6zWUI5av89rv4mL6MsEz08uVrZFHvDjTj7qVjHbbCqEabdVkcYigPfeKd52CpC4sag7mWPkritomn86awRvr7UL_L7dpR1L15cBxErRiFN4MrDsLDT2riHsAFwxjazEoVlkQ',
      badge: 'Family & Solo Backpacker • Local Guru',
      isVerified: true
    },
    rating: 5.0,
    timeAgo: '5h ago',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    location: {
      name: 'Fushimi Inari Taisha photowalk',
      tag: 'Scenic Hike',
      category: 'sight',
      district: 'Fushimi'
    },
    insightHighlight: '“Local insight: Go before 7:00 AM! After 8:30 AM tour buses arrive. Hike all the way to the Crossroads (Yotsutsuji) for the panoramic city overlook without the crowds.”',
    text: '“Local insight: Go before 7:00 AM! After 8:30 AM tour buses arrive. Hike all the way to the Crossroads (Yotsutsuji) for the panoramic city overlook without the crowds.”',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDA9TtHsePyFyAWXIVhHJBgj9917v3Zc-Pxh2Motn1AOPtXxIrj2owVTJDsg_ruA97CpiTR3D2DhWwQXitPHKpV3UBkZttHzYeIrjYt7M0Vo5ba9XLDtqxd6w8iX2jOZaKBapuh8pnS896reO6f8lNCd0qZ59IlT6-b2BQXAjIWtAWc628wEeGGnR-8-Mdo2TgWRz_AD-3wrjNcfWR43XGZCbGDvZKSVIEmbGGHUVTdHeaB71LgX99QbA'
    ],
    imageCaptions: [
      'Yotsutsuji Summit Lookout - vermilion Torii tunnel at sunrise'
    ],
    tags: ['#EarlyBird', '#FreeAdmission', '#KyotoView'],
    helpfulCount: 89,
    isHelpfulVoted: true,
    isBookmarked: false,
    isGpsVerified: true
  },
  {
    id: 'rev-3',
    author: {
      name: 'Aiko & David',
      avatar: '',
      avatarInitials: 'A&D',
      badge: 'Culinary Explorers • 47 Kyoto Reviews',
      isVerified: true
    },
    rating: 4.8,
    timeAgo: 'Yesterday',
    timestamp: Date.now() - 26 * 60 * 60 * 1000,
    location: {
      name: 'Nishiki Market Backstreet Izakaya',
      tag: 'Cash Only',
      category: 'bar',
      isCashOnly: true,
      district: 'Nishiki Market'
    },
    text: '“Look for the red lantern two doors down from the knife shop. Fresh sashimi skewers and warm sake. Cash only!”',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBto2_MieuTKTCnf_c8Hm1jA3UWlT7NlrxgKCHWSfn4UsVUWBKU5uvAH6t5uQbmdHYp4aNDDA7YEhzMefb_yS1RlGB5_oxx8u9OheG4BnjQgYGZjAtMiLI56r6LGdxHGAN1E7cAG5BRZXfqOrBXGa4q98IW1Ga_sOGq5MEKGEgQQWYaKXX2kF1Y8duCzohEOKzcvyXvswcmuoai4Vv5AnJlfmi7wlKvKY2Gjtv86kc3bnbK5pLo9AX6dw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJG7ohc2wfCaoJoKagJEuDylogQ7lP2D-IOM5391KN8p8jAG4LWdecG99nlcB1PZVzSG9w1woGNwGp0JkhhEG2QZqXundpVVR_jlKKserrOouGJAyx9FD77oNh0RD2P_NHqEdaCQJMsfkUyBxzDk9jLjcJ7zJlS643d_oR9AB1XVlUQ77r09xzfKetGJQy2mLw3OOYraUAEXUoTX0SY4hx-dUfxVA7GdSXxGMwR72WRoJt9__CErS5tg'
    ],
    imageCaptions: [
      'Warm red lantern welcoming visitors in a quiet cobblestone alley',
      'Freshly sliced hamachi & maguro sashimi with artisanal pottery'
    ],
    tags: ['#CashOnly', '#HiddenGem', '#LateNight'],
    helpfulCount: 27,
    isHelpfulVoted: false,
    isBookmarked: false,
    isGpsVerified: true
  }
];

export const INITIAL_NOTIFICATIONS: CommunityNotification[] = [
  {
    id: 'notif-1',
    title: 'Helpful Tip Upvoted',
    message: 'Sophie Laurent and 12 other travelers marked your tip for Gion Karyo as helpful.',
    timeAgo: '15m ago',
    unread: true,
    type: 'upvote'
  },
  {
    id: 'notif-2',
    title: 'Live Crowd Alert',
    message: 'Fushimi Inari Taisha is reaching peak visitor capacity today. Best to visit after 4:30 PM.',
    timeAgo: '1h ago',
    unread: true,
    type: 'alert'
  },
  {
    id: 'notif-3',
    title: 'New Check-in nearby',
    message: 'A verified solo traveler just posted a tip at Chao Chao Gyoza Sanjo (0.4 km away).',
    timeAgo: '2h ago',
    unread: false,
    type: 'review'
  }
];

export const JAPANESE_PHRASES: JapanesePhrase[] = [
  {
    id: 'p-1',
    english: 'Do you have an English menu?',
    japanese: '英語のメニューはありますか？',
    romaji: 'Eigo no menyū wa arimasu ka?',
    category: 'dining'
  },
  {
    id: 'p-2',
    english: 'Excuse me! (To get staff attention)',
    japanese: 'すみません！',
    romaji: 'Sumimasen!',
    category: 'dining'
  },
  {
    id: 'p-3',
    english: 'Check please / Bill please',
    japanese: 'お会計をお願いします',
    romaji: 'O-kaikei o onegai shimasu',
    category: 'payment'
  },
  {
    id: 'p-4',
    english: 'Can I pay with credit card?',
    japanese: 'クレジットカードは使えますか？',
    romaji: 'Kurejitto kādo wa tsukaemasu ka?',
    category: 'payment'
  },
  {
    id: 'p-5',
    english: 'One person (table for one)',
    japanese: '一人です',
    romaji: 'Hitori desu',
    category: 'dining'
  },
  {
    id: 'p-6',
    english: 'Delicious! Thank you for the meal',
    japanese: 'ごちそうさまでした',
    romaji: 'Gochisōsama deshita',
    category: 'polite'
  },
  {
    id: 'p-7',
    english: 'Is photography allowed here?',
    japanese: 'ここで写真を撮ってもいいですか？',
    romaji: 'Koko de shashin o totte mo ii desu ka?',
    category: 'navigation'
  },
  {
    id: 'p-8',
    english: 'Where is the station / bus stop?',
    japanese: '駅／バス停はどこですか？',
    romaji: 'Eki / Basu-tei wa doko desu ka?',
    category: 'navigation'
  }
];
