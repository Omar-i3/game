// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - All 20 Stage Layouts & Data
// ============================================================================

const CAMPAIGN_STAGES = {
  1: {
    id: 1, name: 'شرارة الصدمة', nameEn: 'Shockwave Spark', heroId: 'banderita',
    bgm: 'city', width: 2400, height: 600, theme: 'city', skyColor: '#0a081e',
    objectiveType: 'COLLECT', objectiveTitle: 'جمع البطاطس الذهبية',
    objectiveDesc: 'اجمع 15 كيس بطاطس ذهبي لشحن الطاقة وفتح البوابة', objectiveTarget: 15,
    platforms: [
      { x: 0, y: 520, w: 800, h: 80, type: 'roof' }, { x: 880, y: 520, w: 700, h: 80, type: 'roof' },
      { x: 1650, y: 520, w: 800, h: 80, type: 'roof' },
      { x: 200, y: 400, w: 140, h: 20, type: 'holo', isOneWay: true },
      { x: 420, y: 310, w: 150, h: 20, type: 'steel', isOneWay: true },
      { x: 950, y: 380, w: 160, h: 20, type: 'holo', isOneWay: true },
      { x: 1200, y: 290, w: 160, h: 20, type: 'steel', isOneWay: true },
      { x: 1750, y: 390, w: 180, h: 20, type: 'holo', isOneWay: true }
    ],
    hazards: [{ x: 800, y: 560, w: 80, h: 40, type: 'glitchPit' }],
    pickups: Array.from({ length: 15 }, (_, i) => ({ x: 180 + i * 145, y: 260 + (i % 3) * 60, type: 'potatoSack' })),
    enemies: [{ x: 450, y: 480, type: 'glitchBot' }, { x: 1000, y: 480, type: 'dislikeDrone' }, { x: 1750, y: 480, type: 'glitchBot' }],
    exitPortal: { x: 2300, y: 440, w: 40, h: 80 }
  },

  2: {
    id: 2, name: 'سباق ضد اللاغ', nameEn: 'Race Against Lag', heroId: 'banderita',
    bgm: 'city', width: 2800, height: 600, theme: 'city', skyColor: '#12052b',
    objectiveType: 'SPEEDRUN_TIMER', objectiveTitle: 'سباق ضد اللاغ',
    objectiveDesc: 'اعبر خط النهاية في أقل من 45 ثانية قبل حظر السيرفر!', objectiveTimeLimit: 45,
    platforms: [
      { x: 0, y: 520, w: 2800, h: 80, type: 'roof' },
      { x: 300, y: 410, w: 120, h: 20, type: 'holo', isOneWay: true },
      { x: 600, y: 320, w: 140, h: 20, type: 'steel', isOneWay: true },
      { x: 1000, y: 400, w: 150, h: 20, type: 'holo', isOneWay: true },
      { x: 1400, y: 310, w: 160, h: 20, type: 'steel', isOneWay: true },
      { x: 1900, y: 380, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 2300, y: 290, w: 180, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [{ x: 800, y: 500, w: 60, h: 20, type: 'spikes' }, { x: 1600, y: 500, w: 60, h: 20, type: 'spikes' }],
    pickups: [{ x: 400, y: 480, type: 'like' }, { x: 1200, y: 480, type: 'like' }, { x: 2000, y: 480, type: 'like' }],
    enemies: [{ x: 500, y: 480, type: 'glitchBot' }, { x: 1100, y: 480, type: 'dislikeDrone' }, { x: 1800, y: 480, type: 'glitchBot' }, { x: 2200, y: 480, type: 'toxicCrawler' }],
    exitPortal: { x: 2700, y: 440, w: 40, h: 80 }
  },

  3: {
    id: 3, name: 'إنقاذ أفران التميس', nameEn: 'Save The Tamees Bakery', heroId: 'banderita',
    bgm: 'city', width: 2200, height: 600, theme: 'city', skyColor: '#1a0d00',
    objectiveType: 'KILL_COUNT', objectiveTitle: 'تحرير أفران التميس',
    objectiveDesc: 'اقضِ على 12 روبوت جليتش معتدين على المخبز', objectiveTarget: 12,
    platforms: [
      { x: 0, y: 520, w: 2200, h: 80, type: 'roof' },
      { x: 250, y: 390, w: 180, h: 20, type: 'steel', isOneWay: true },
      { x: 600, y: 300, w: 200, h: 20, type: 'holo', isOneWay: true },
      { x: 1000, y: 390, w: 180, h: 20, type: 'steel', isOneWay: true },
      { x: 1400, y: 300, w: 200, h: 20, type: 'holo', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 300, y: 350, type: 'shawarma' }, { x: 1100, y: 350, type: 'shawarma' }, { x: 1500, y: 260, type: 'karak' }],
    enemies: Array.from({ length: 12 }, (_, i) => ({ x: 350 + i * 140, y: 480, type: (i % 2 === 0 ? 'glitchBot' : 'toxicCrawler') })),
    exitPortal: { x: 2100, y: 440, w: 40, h: 80 }
  },

  4: {
    id: 4, name: 'زعيم مدينة الستريم', nameEn: 'Stream City Boss', heroId: 'banderita',
    bgm: 'boss', width: 1400, height: 600, theme: 'bossArena', skyColor: '#1a0505',
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'هزيمة وحش اللاغ',
    objectiveDesc: 'اهزم وحش اللاغ العملاق (Lag Titan) لتحرير برج الاتصالات', objectiveTarget: 1,
    platforms: [
      { x: 0, y: 520, w: 1400, h: 80, type: 'arenaFloor' },
      { x: 160, y: 380, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 500, y: 280, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 880, y: 380, w: 200, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 200, y: 340, type: 'like' }, { x: 600, y: 240, type: 'shawarma' }, { x: 920, y: 340, type: 'like' }],
    enemies: [],
    bossData: { x: 950, y: 380, type: 'lagTitan' },
    exitPortal: { x: 1300, y: 440, w: 40, h: 80 }
  },

  5: {
    id: 5, name: 'طريق الرعب المعتم', nameEn: 'The Dark Horror Path', heroId: 'mlzlz',
    bgm: 'horror', width: 2400, height: 600, theme: 'horror', skyColor: '#0a0314',
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'إشعال فوانيس الشاي',
    objectiveDesc: 'اسكب الشاي الساخن لإشعال 5 فوانيس وكشف الدرب المعتم', objectiveTarget: 5,
    platforms: [
      { x: 0, y: 520, w: 600, h: 80, type: 'nether' }, { x: 700, y: 520, w: 600, h: 80, type: 'nether' },
      { x: 1400, y: 520, w: 1000, h: 80, type: 'nether' },
      { x: 200, y: 400, w: 130, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 450, y: 310, w: 140, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 850, y: 380, w: 150, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1150, y: 290, w: 150, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1600, y: 380, w: 160, h: 20, type: 'blockPlatform', isOneWay: true }
    ],
    hazards: [{ x: 600, y: 560, w: 100, h: 40, type: 'lavaPit' }],
    interactiveObjects: [
      { id: 'lantern_1', x: 260, y: 370, type: 'teaLantern', activated: false },
      { id: 'lantern_2', x: 510, y: 280, type: 'teaLantern', activated: false },
      { id: 'lantern_3', x: 920, y: 350, type: 'teaLantern', activated: false },
      { id: 'lantern_4', x: 1220, y: 260, type: 'teaLantern', activated: false },
      { id: 'lantern_5', x: 1680, y: 350, type: 'teaLantern', activated: false }
    ],
    pickups: [{ x: 300, y: 480, type: 'karak' }, { x: 1000, y: 480, type: 'karak' }, { x: 1800, y: 480, type: 'like' }],
    enemies: [{ x: 400, y: 480, type: 'horrorGhost' }, { x: 900, y: 480, type: 'horrorGhost' }, { x: 1500, y: 480, type: 'horrorGhost' }],
    exitPortal: { x: 2300, y: 440, w: 40, h: 80 }
  },

  6: {
    id: 6, name: 'غرفة الجامب سكيرز', nameEn: 'Jumpscare Chamber', heroId: 'mlzlz',
    bgm: 'horror', width: 1400, height: 600, theme: 'horror', skyColor: '#12051f',
    objectiveType: 'SURVIVE_TIMER', objectiveTitle: 'الصمود التكتيكي',
    objectiveDesc: 'اصمد بهدوء لمدة 60 ثانية ضد أمواج أشباح الرعب', objectiveTimeLimit: 60,
    platforms: [
      { x: 0, y: 520, w: 1400, h: 80, type: 'nether' },
      { x: 200, y: 380, w: 220, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 580, y: 270, w: 240, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 980, y: 380, w: 220, h: 20, type: 'blockPlatform', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 250, y: 340, type: 'karak' }, { x: 700, y: 230, type: 'like' }, { x: 1050, y: 340, type: 'karak' }],
    enemies: [{ x: 300, y: 480, type: 'horrorGhost' }, { x: 600, y: 200, type: 'horrorGhost' }, { x: 1100, y: 480, type: 'horrorGhost' }],
    exitPortal: { x: 1300, y: 440, w: 40, h: 80 }
  },

  7: {
    id: 7, name: 'قصر الأسرار', nameEn: 'Mansion of Secrets', heroId: 'mlzlz',
    bgm: 'horror', width: 2200, height: 600, theme: 'horror', skyColor: '#190a2a',
    objectiveType: 'COLLECT', objectiveTitle: 'المفاتيح المشفرة',
    objectiveDesc: 'اعثر على 3 مفاتيح مشفرة مخبأة لفك رموز السيرفر المركزي', objectiveTarget: 3,
    platforms: [
      { x: 0, y: 520, w: 2200, h: 80, type: 'nether' },
      { x: 250, y: 400, w: 160, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 600, y: 310, w: 180, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1100, y: 390, w: 180, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1550, y: 300, w: 190, h: 20, type: 'blockPlatform', isOneWay: true }
    ],
    hazards: [{ x: 900, y: 500, w: 60, h: 20, type: 'spikes' }],
    pickups: [
      { x: 320, y: 360, type: 'cipherKey' },
      { x: 690, y: 270, type: 'cipherKey' },
      { x: 1640, y: 260, type: 'cipherKey' },
      { x: 1100, y: 480, type: 'karak' }
    ],
    enemies: [{ x: 400, y: 480, type: 'horrorGhost' }, { x: 1200, y: 480, type: 'horrorGhost' }, { x: 1700, y: 480, type: 'toxicCrawler' }],
    exitPortal: { x: 2100, y: 440, w: 40, h: 80 }
  },

  8: {
    id: 8, name: 'شبح الديسلايك الأسود', nameEn: 'Black Dislike Ghost Boss', heroId: 'mlzlz',
    bgm: 'boss', width: 1400, height: 600, theme: 'bossArena', skyColor: '#120024',
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'هزيمة شبح الديسلايك',
    objectiveDesc: 'اهزم شبح الديسلايك الأسود بسكب الشاي الساخن المركز', objectiveTarget: 1,
    platforms: [
      { x: 0, y: 520, w: 1400, h: 80, type: 'arenaFloor' },
      { x: 180, y: 380, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 520, y: 280, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 860, y: 380, w: 200, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 220, y: 340, type: 'karak' }, { x: 640, y: 240, type: 'like' }, { x: 920, y: 340, type: 'karak' }],
    enemies: [],
    bossData: { x: 950, y: 380, type: 'dislikeGhost' },
    exitPortal: { x: 1300, y: 440, w: 40, h: 80 }
  },

  9: {
    id: 9, name: 'جزر البلوكات العائمة', nameEn: 'Floating Block Islands', heroId: 'ocmz',
    bgm: 'cloud', width: 2400, height: 600, theme: 'horror', skyColor: '#0c2461',
    objectiveType: 'KILL_COUNT', objectiveTitle: 'قراصنة السحاب',
    objectiveDesc: 'اقضِ على 15 قرصان جليتش طائر باستخدام بوميرانج قبعة القش', objectiveTarget: 15,
    platforms: [
      { x: 0, y: 520, w: 500, h: 80, type: 'nether' }, { x: 600, y: 520, w: 600, h: 80, type: 'nether' },
      { x: 1300, y: 520, w: 1100, h: 80, type: 'nether' },
      { x: 180, y: 400, w: 140, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 420, y: 300, w: 150, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 800, y: 380, w: 160, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1100, y: 280, w: 160, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1600, y: 370, w: 180, h: 20, type: 'blockPlatform', isOneWay: true }
    ],
    hazards: [{ x: 500, y: 560, w: 100, h: 40, type: 'lavaPit' }],
    pickups: [{ x: 300, y: 480, type: 'like' }, { x: 950, y: 480, type: 'like' }, { x: 1800, y: 480, type: 'shawarma' }],
    enemies: Array.from({ length: 15 }, (_, i) => ({ x: 300 + i * 130, y: 220 + (i % 3) * 80, type: 'glitchPirate' })),
    exitPortal: { x: 2300, y: 440, w: 40, h: 80 }
  },

  10: {
    id: 10, name: 'تشغيل السفينة الجوية', nameEn: 'Power Up Airship', heroId: 'ocmz',
    bgm: 'cloud', width: 2200, height: 600, theme: 'horror', skyColor: '#1e3799',
    objectiveType: 'COLLECT', objectiveTitle: 'بطاريات الداتا',
    objectiveDesc: 'اجمع 4 بطاريات داتا لتشغيل محركات السفينة الجوية', objectiveTarget: 4,
    platforms: [
      { x: 0, y: 520, w: 2200, h: 80, type: 'nether' },
      { x: 200, y: 400, w: 150, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 550, y: 300, w: 160, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 950, y: 390, w: 170, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1400, y: 290, w: 180, h: 20, type: 'blockPlatform', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 270, y: 360, type: 'dataBattery' },
      { x: 630, y: 260, type: 'dataBattery' },
      { x: 1030, y: 350, type: 'dataBattery' },
      { x: 1490, y: 250, type: 'dataBattery' }
    ],
    enemies: [{ x: 400, y: 480, type: 'glitchPirate' }, { x: 1100, y: 480, type: 'glitchPirate' }, { x: 1600, y: 480, type: 'dislikeDrone' }],
    exitPortal: { x: 2100, y: 440, w: 40, h: 80 }
  },

  11: {
    id: 11, name: 'باركور السحاب', nameEn: 'Cloud Parkour Zero Falls', heroId: 'ocmz',
    bgm: 'cloud', width: 2600, height: 600, theme: 'cloud', skyColor: '#4a69bd',
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'اجتياز الباركور',
    objectiveDesc: 'اقفز عبر منصات السحاب المتساقطة واصل للبوابة بنجاح', objectiveTarget: 1,
    platforms: [
      { x: 0, y: 520, w: 300, h: 80, type: 'nether' },
      { x: 380, y: 420, w: 100, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 560, y: 330, w: 90, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 740, y: 240, w: 90, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 940, y: 330, w: 90, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1140, y: 420, w: 100, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1340, y: 330, w: 90, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1540, y: 240, w: 90, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1740, y: 330, w: 90, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 1940, y: 420, w: 100, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 2150, y: 520, w: 450, h: 80, type: 'nether' }
    ],
    hazards: [{ x: 300, y: 570, w: 1850, h: 30, type: 'lavaPit' }],
    pickups: [{ x: 740, y: 200, type: 'like' }, { x: 1540, y: 200, type: 'goldenButton' }],
    enemies: [{ x: 800, y: 150, type: 'glitchPirate' }, { x: 1600, y: 150, type: 'glitchPirate' }],
    exitPortal: { x: 2500, y: 440, w: 40, h: 80 }
  },

  12: {
    id: 12, name: 'كابتن الباند الطائر', nameEn: 'Airship Captain Ban Boss', heroId: 'ocmz',
    bgm: 'boss', width: 1400, height: 600, theme: 'bossArena', skyColor: '#0a192f',
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'إسقاط كابتن الباند',
    objectiveDesc: 'أسقط منطاد كابتن الباند الطائر في المعركة الجوية', objectiveTarget: 1,
    platforms: [
      { x: 0, y: 520, w: 1400, h: 80, type: 'arenaFloor' },
      { x: 180, y: 380, w: 220, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 540, y: 280, w: 240, h: 20, type: 'blockPlatform', isOneWay: true },
      { x: 900, y: 380, w: 220, h: 20, type: 'blockPlatform', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 200, y: 340, type: 'like' }, { x: 600, y: 240, type: 'shawarma' }, { x: 950, y: 340, type: 'like' }],
    enemies: [],
    bossData: { x: 950, y: 380, type: 'captainBan' },
    exitPortal: { x: 1300, y: 440, w: 40, h: 80 }
  },

  13: {
    id: 13, name: 'النزول إلى المنجم', nameEn: 'Redstone Mine Descent', heroId: 'abuAbed',
    bgm: 'mines', width: 2400, height: 600, theme: 'mines', skyColor: '#1e0c00',
    objectiveType: 'COLLECT', objectiveTitle: 'سبائك الريدستون',
    objectiveDesc: 'اجمع 20 سبيكة ريدستون نقية لتشغيل ورشة التطوير', objectiveTarget: 20,
    platforms: [
      { x: 0, y: 520, w: 2400, h: 80, type: 'roof' },
      { x: 200, y: 410, w: 160, h: 20, type: 'steel', isOneWay: true },
      { x: 500, y: 310, w: 180, h: 20, type: 'steel', isOneWay: true },
      { x: 900, y: 400, w: 170, h: 20, type: 'steel', isOneWay: true },
      { x: 1300, y: 300, w: 190, h: 20, type: 'steel', isOneWay: true },
      { x: 1750, y: 390, w: 180, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [{ x: 750, y: 500, w: 60, h: 20, type: 'spikes' }, { x: 1500, y: 500, w: 60, h: 20, type: 'spikes' }],
    pickups: Array.from({ length: 20 }, (_, i) => ({ x: 140 + i * 110, y: 270 + (i % 3) * 60, type: 'redstoneIngot' })),
    enemies: [{ x: 400, y: 480, type: 'cyberSpider' }, { x: 1100, y: 480, type: 'cyberSpider' }, { x: 1800, y: 480, type: 'cyberSpider' }],
    exitPortal: { x: 2300, y: 440, w: 40, h: 80 }
  },

  14: {
    id: 14, name: 'انعكاس الليزر', nameEn: 'Laser Mirror Reflection', heroId: 'abuAbed',
    bgm: 'mines', width: 2200, height: 600, theme: 'mines', skyColor: '#120a05',
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'المرايا الأربع',
    objectiveDesc: 'وجه شعاع الصلعة الذهبية لتفعيل 4 مرايا ليزرية وفتح البوابة', objectiveTarget: 4,
    platforms: [
      { x: 0, y: 520, w: 2200, h: 80, type: 'roof' },
      { x: 250, y: 390, w: 180, h: 20, type: 'steel', isOneWay: true },
      { x: 650, y: 290, w: 190, h: 20, type: 'steel', isOneWay: true },
      { x: 1100, y: 390, w: 180, h: 20, type: 'steel', isOneWay: true },
      { x: 1550, y: 290, w: 190, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    interactiveObjects: [
      { id: 'mirror_1', x: 340, y: 360, type: 'mirror', activated: false },
      { id: 'mirror_2', x: 740, y: 260, type: 'mirror', activated: false },
      { id: 'mirror_3', x: 1190, y: 360, type: 'mirror', activated: false },
      { id: 'mirror_4', x: 1640, y: 260, type: 'mirror', activated: false }
    ],
    pickups: [{ x: 500, y: 480, type: 'karak' }, { x: 1300, y: 480, type: 'like' }],
    enemies: [{ x: 500, y: 480, type: 'cyberSpider' }, { x: 1400, y: 480, type: 'glitchBot' }],
    exitPortal: { x: 2100, y: 440, w: 40, h: 80 }
  },

  15: {
    id: 15, name: 'الدفاع عن المولد', nameEn: 'Generator Defense', heroId: 'abuAbed',
    bgm: 'mines', width: 1400, height: 600, theme: 'mines', skyColor: '#1c0e00',
    objectiveType: 'SURVIVE_TIMER', objectiveTitle: 'حماية المولد',
    objectiveDesc: 'دافع عن المولد المركزي لمدة 75 ثانية من هجوم العناكب', objectiveTimeLimit: 75,
    platforms: [
      { x: 0, y: 520, w: 1400, h: 80, type: 'roof' },
      { x: 180, y: 380, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 520, y: 270, w: 240, h: 20, type: 'steel', isOneWay: true },
      { x: 880, y: 380, w: 220, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 200, y: 340, type: 'shawarma' }, { x: 600, y: 230, type: 'like' }, { x: 920, y: 340, type: 'karak' }],
    enemies: [{ x: 200, y: 480, type: 'cyberSpider' }, { x: 1100, y: 480, type: 'cyberSpider' }, { x: 600, y: 180, type: 'cyberSpider' }],
    exitPortal: { x: 1300, y: 440, w: 40, h: 80 }
  },

  16: {
    id: 16, name: 'الحفار الفولاذي', nameEn: 'The Glitch Drill Boss', heroId: 'abuAbed',
    bgm: 'boss', width: 1400, height: 600, theme: 'bossArena', skyColor: '#1a0800',
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'تحطيم الحفار',
    objectiveDesc: 'حطم دروع حفار الجليتش العملاق لفتح نفق اللوحة الأم', objectiveTarget: 1,
    platforms: [
      { x: 0, y: 520, w: 1400, h: 80, type: 'arenaFloor' },
      { x: 180, y: 380, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 520, y: 280, w: 240, h: 20, type: 'steel', isOneWay: true },
      { x: 880, y: 380, w: 200, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 220, y: 340, type: 'like' }, { x: 640, y: 240, type: 'shawarma' }, { x: 920, y: 340, type: 'like' }],
    enemies: [],
    bossData: { x: 950, y: 380, type: 'glitchDrill' },
    exitPortal: { x: 1300, y: 440, w: 40, h: 80 }
  },

  17: {
    id: 17, name: 'اختراق اللوحة الأم', nameEn: 'Motherboard Hack', heroId: 'opiilz',
    bgm: 'cyber', width: 2400, height: 600, theme: 'city', skyColor: '#1e053a',
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'تفكيك الدوائر',
    objectiveDesc: 'فكك 6 دوائر أمان بالمفك الأسطوري في أقل من 60 ثانية', objectiveTarget: 6, objectiveTimeLimit: 60,
    platforms: [
      { x: 0, y: 520, w: 2400, h: 80, type: 'roof' },
      { x: 200, y: 400, w: 160, h: 20, type: 'holo', isOneWay: true },
      { x: 500, y: 300, w: 170, h: 20, type: 'holo', isOneWay: true },
      { x: 850, y: 400, w: 160, h: 20, type: 'holo', isOneWay: true },
      { x: 1200, y: 300, w: 170, h: 20, type: 'holo', isOneWay: true },
      { x: 1550, y: 400, w: 160, h: 20, type: 'holo', isOneWay: true },
      { x: 1900, y: 300, w: 170, h: 20, type: 'holo', isOneWay: true }
    ],
    hazards: [],
    interactiveObjects: [
      { id: 'circuit_1', x: 280, y: 370, type: 'securityCircuit', activated: false },
      { id: 'circuit_2', x: 580, y: 270, type: 'securityCircuit', activated: false },
      { id: 'circuit_3', x: 930, y: 370, type: 'securityCircuit', activated: false },
      { id: 'circuit_4', x: 1280, y: 270, type: 'securityCircuit', activated: false },
      { id: 'circuit_5', x: 1630, y: 370, type: 'securityCircuit', activated: false },
      { id: 'circuit_6', x: 1980, y: 270, type: 'securityCircuit', activated: false }
    ],
    pickups: [{ x: 400, y: 480, type: 'like' }, { x: 1400, y: 480, type: 'like' }],
    enemies: [{ x: 400, y: 480, type: 'glitchBot' }, { x: 1100, y: 480, type: 'dislikeDrone' }, { x: 1700, y: 480, type: 'glitchBot' }],
    exitPortal: { x: 2300, y: 440, w: 40, h: 80 }
  },

  18: {
    id: 18, name: 'غرفة تبريد السيرفر', nameEn: 'Server Cooling Chamber', heroId: 'opiilz',
    bgm: 'cyber', width: 2200, height: 600, theme: 'city', skyColor: '#00263b',
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'صمامات الليزر',
    objectiveDesc: 'عطل وجمد 5 صمامات ليزرية للوصول لبرج الحظر', objectiveTarget: 5,
    platforms: [
      { x: 0, y: 520, w: 2200, h: 80, type: 'roof' },
      { x: 250, y: 390, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 600, y: 290, w: 190, h: 20, type: 'holo', isOneWay: true },
      { x: 1000, y: 390, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 1400, y: 290, w: 190, h: 20, type: 'holo', isOneWay: true }
    ],
    hazards: [],
    interactiveObjects: [
      { id: 'valve_1', x: 340, y: 360, type: 'laserValve', activated: false },
      { id: 'valve_2', x: 690, y: 260, type: 'laserValve', activated: false },
      { id: 'valve_3', x: 1090, y: 360, type: 'laserValve', activated: false },
      { id: 'valve_4', x: 1490, y: 260, type: 'laserValve', activated: false },
      { id: 'valve_5', x: 1800, y: 480, type: 'laserValve', activated: false }
    ],
    pickups: [{ x: 450, y: 480, type: 'shawarma' }, { x: 1200, y: 480, type: 'like' }],
    enemies: [{ x: 500, y: 480, type: 'glitchBot' }, { x: 1300, y: 480, type: 'dislikeDrone' }],
    exitPortal: { x: 2100, y: 440, w: 40, h: 80 }
  },

  19: {
    id: 19, name: 'بوابة برج الحظر (تحالف الأبطال)', nameEn: 'Ban Tower Alliance', heroId: 'banderita',
    bgm: 'cyber', width: 2600, height: 600, theme: 'bossArena', skyColor: '#2b0014',
    objectiveType: 'KILL_COUNT', objectiveTitle: 'حراس النخبة',
    objectiveDesc: 'اهزم 20 حارساً نخبوي بالتبديل بين مهارات الأبطال الخمسة', objectiveTarget: 20,
    platforms: [
      { x: 0, y: 520, w: 2600, h: 80, type: 'roof' },
      { x: 200, y: 390, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 550, y: 290, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 950, y: 390, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 1350, y: 290, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 1750, y: 390, w: 200, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 400, y: 480, type: 'shawarma' }, { x: 800, y: 480, type: 'goldenButton' }, { x: 1600, y: 480, type: 'karak' }],
    enemies: Array.from({ length: 20 }, (_, i) => ({ x: 300 + i * 110, y: 480, type: 'eliteGuard' })),
    exitPortal: { x: 2500, y: 440, w: 40, h: 80 }
  },

  20: {
    id: 20, name: 'المعركة الكبرى: الخوارزمية المظلمة', nameEn: 'The Dark Algorithm Final Boss', heroId: 'banderita',
    bgm: 'boss', width: 1400, height: 600, theme: 'bossArena', skyColor: '#1f0009',
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'الخوارزمية المظلمة (Error 404)',
    objectiveDesc: 'اهزم الخوارزمية المظلمة في معركة الأطوار الثلاثة واستعد المشتركين!', objectiveTarget: 1,
    platforms: [
      { x: 0, y: 520, w: 1400, h: 80, type: 'arenaFloor' },
      { x: 160, y: 380, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 460, y: 280, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 780, y: 280, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 1060, y: 380, w: 220, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [{ x: 200, y: 340, type: 'shawarma' }, { x: 550, y: 240, type: 'like' }, { x: 850, y: 240, type: 'karak' }, { x: 1150, y: 340, type: 'goldenButton' }],
    enemies: [],
    bossData: { x: 950, y: 380, type: 'darkAlgorithm' },
    exitPortal: { x: 1300, y: 440, w: 40, h: 80 }
  }
};

class LevelManager {
  constructor() {
    this.currentStageIndex = 1;
    this.stage = null;
    this.platforms = [];
    this.hazards = [];
    this.pickups = [];
    this.interactiveObjects = [];
    this.enemies = [];
    this.boss = null;
    this.portal = null;
    this.animTime = 0;
  }

  loadStage(stageIndex) {
    this.currentStageIndex = stageIndex;
    const data = CAMPAIGN_STAGES[stageIndex] || CAMPAIGN_STAGES[1];
    this.stage = data;
    this.platforms = JSON.parse(JSON.stringify(data.platforms || []));
    this.hazards = JSON.parse(JSON.stringify(data.hazards || []));
    this.portal = data.exitPortal ? { ...data.exitPortal } : null;

    this.interactiveObjects = (data.interactiveObjects || []).map(obj => ({ ...obj }));
    this.pickups = (data.pickups || []).map(p => ({ ...p, collected: false, bobOffset: Math.random() * Math.PI * 2 }));
    this.enemies = (data.enemies || []).map(e => new window.Enemy(e.x, e.y, e.type));

    if (data.bossData) {
      this.boss = new window.CampaignBoss(data.bossData.x, data.bossData.y, data.bossData.type);
    } else {
      this.boss = null;
    }

    if (window.audio) window.audio.playBgmTrack(data.bgm || 'city');
    if (window.game && window.game.objectives) {
      window.game.objectives.initStageObjective(data);
    }
  }

  update(player) {
    this.animTime += 0.05;

    // Pickups check
    for (const p of this.pickups) {
      if (p.collected) continue;
      const pDist = Math.hypot((player.x + player.width / 2) - p.x, (player.y + player.height / 2) - p.y);
      if (pDist < 34) {
        p.collected = true;
        this.applyPickup(p, player);
      }
    }

    // Hazards check
    for (const h of this.hazards) {
      if (player.x + player.width > h.x && player.x < h.x + h.w &&
          player.y + player.height > h.y && player.y < h.y + h.h) {
        // oPiiLz security engineer ignores traps
        if (player.heroData.hasSecurityEngineer && (h.type === 'laserTrap' || h.type === 'mine')) {
          continue;
        }
        player.takeDamage(25, -player.facing);
        if (h.type === 'glitchPit' || h.type === 'lavaPit') {
          player.vy = -11;
          player.y = h.y - player.height - 20;
        }
      }
    }
  }

  applyPickup(pickup, player) {
    if (pickup.type === 'potatoSack' || pickup.type === 'redstoneIngot' || pickup.type === 'cipherKey' || pickup.type === 'dataBattery') {
      window.audio.sfxCoin();
      if (window.game) {
        window.game.addSubscribers(150);
        window.game.addScore(150);
        if (window.game.objectives) window.game.objectives.recordItemCollected(pickup.type);
      }
      player.addEnergy(10);
      window.particles.burst(pickup.x, pickup.y, 10, ['#ffd700', '#f5b041', '#ffffff'], 2, 5);
      window.particles.addFloatingText(pickup.x, pickup.y - 10, '+1 QUEST ITEM', '#ffd700', 13, '★');
    } else if (pickup.type === 'like') {
      window.audio.sfxEnergyGem();
      player.addEnergy(40);
      window.game.addScore(150);
      window.particles.burst(pickup.x, pickup.y, 8, ['#00d2d3', '#54a0ff'], 2, 5);
      window.particles.addFloatingText(pickup.x, pickup.y - 10, '+ENERGY', '#00d2d3', 13, '👍');
    } else if (pickup.type === 'shawarma') {
      player.heal(40);
      window.game.addScore(200);
      window.particles.burst(pickup.x, pickup.y, 10, ['#2ed573', '#ff9f43'], 2, 5);
      window.particles.addFloatingText(pickup.x, pickup.y - 10, 'شاورما! +40 HP', '#2ed573', 14, '🌯');
    } else if (pickup.type === 'karak') {
      player.heal(30);
      player.addEnergy(25);
      window.game.addScore(180);
      window.particles.burst(pickup.x, pickup.y, 10, ['#ff9f43', '#feca57'], 2, 5);
      window.particles.addFloatingText(pickup.x, pickup.y - 10, 'شاي كرك! +BUFF', '#ffa502', 14, '☕');
    } else if (pickup.type === 'goldenButton') {
      window.audio.sfxVictory();
      window.game.addSubscribers(1000);
      window.game.addScore(1000);
      player.heal(100);
      player.addEnergy(100);
      player.invulnerableTimer = 180;
      window.particles.burst(pickup.x, pickup.y, 30, ['#ffd700', '#ffffff'], 3, 9);
      window.particles.addFloatingText(pickup.x, pickup.y - 20, 'الدرع الذهبي! +1,000 SUBS!', '#ffd700', 16, '🏆');
    }
  }

  drawBackground(ctx, cameraX, cameraY, canvasWidth, canvasHeight) {
    const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    grad.addColorStop(0, this.stage.skyColor || '#0a081e');
    grad.addColorStop(1, '#05030a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Parallax Buildings & Clouds
    ctx.save();
    const pX = -(cameraX * 0.2) % 300;
    ctx.fillStyle = 'rgba(24, 18, 43, 0.7)';
    for (let i = -1; i < (canvasWidth / 60) + 6; i++) {
      const bh = 140 + (Math.sin(i * 99) * 0.5 + 0.5) * 120;
      ctx.fillRect(i * 60 + pX, canvasHeight - bh - 80, 50, bh);
    }
    ctx.restore();
  }

  drawLevel(ctx, cameraX, cameraY) {
    // 1. Draw Platforms
    for (const p of this.platforms) {
      const px = Math.round(p.x - cameraX);
      const py = Math.round(p.y - cameraY);
      ctx.fillStyle = '#1e272e';
      ctx.fillRect(px, py, p.w, p.h);
      ctx.fillStyle = '#00d2d3';
      ctx.fillRect(px, py, p.w, 4);
    }

    // 2. Draw Interactive Objects (Lanterns, Mirrors, Circuits, Valves)
    for (const obj of this.interactiveObjects) {
      const ox = Math.round(obj.x - cameraX);
      const oy = Math.round(obj.y - cameraY);
      ctx.save();

      if (obj.type === 'teaLantern') {
        ctx.fillStyle = obj.activated ? '#ffd700' : '#4b4b4b';
        ctx.fillRect(ox - 10, oy - 14, 20, 28);
        ctx.fillStyle = obj.activated ? '#f39c12' : '#2c3e50';
        ctx.fillRect(ox - 6, oy - 8, 12, 16);
      } else if (obj.type === 'mirror') {
        ctx.fillStyle = obj.activated ? '#ffd700' : '#747d8c';
        ctx.fillRect(ox - 12, oy - 16, 24, 32);
        ctx.fillStyle = '#badc58';
        ctx.fillRect(ox - 8, oy - 12, 16, 24);
      } else if (obj.type === 'securityCircuit') {
        ctx.fillStyle = obj.activated ? '#2ed573' : '#ff4757';
        ctx.fillRect(ox - 12, oy - 12, 24, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px monospace';
        ctx.fillText(obj.activated ? 'OK' : 'LOCK', ox - 10, oy + 4);
      } else if (obj.type === 'laserValve') {
        ctx.fillStyle = obj.activated ? '#00d2d3' : '#e74c3c';
        ctx.beginPath();
        ctx.arc(ox, oy, 14, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }

    // 3. Draw Pickups
    for (const p of this.pickups) {
      if (p.collected) continue;
      const bobY = Math.sin(this.animTime * 3 + p.bobOffset) * 4;
      const px = Math.round(p.x - cameraX);
      const py = Math.round(p.y + bobY - cameraY);

      ctx.save();
      if (p.type === 'potatoSack') {
        ctx.fillStyle = '#f5b041';
        ctx.beginPath();
        ctx.ellipse(px, py, 12, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#d35400';
        ctx.fillRect(px - 3, py - 14, 6, 5);
      } else if (p.type === 'redstoneIngot') {
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(px - 10, py - 6, 20, 12);
        ctx.fillStyle = '#ff7675';
        ctx.fillRect(px - 8, py - 4, 16, 4);
      } else if (p.type === 'cipherKey') {
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(px - 4, py - 12, 8, 24);
        ctx.fillRect(px - 10, py - 12, 20, 6);
      } else if (p.type === 'dataBattery') {
        ctx.fillStyle = '#00d2d3';
        ctx.fillRect(px - 8, py - 12, 16, 24);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - 4, py - 16, 8, 4);
      } else if (p.type === 'like') {
        ctx.fillStyle = '#00d2d3';
        ctx.beginPath();
        ctx.moveTo(px, py - 10); ctx.lineTo(px + 8, py); ctx.lineTo(px, py + 10); ctx.lineTo(px - 8, py);
        ctx.closePath(); ctx.fill();
      } else if (p.type === 'shawarma') {
        ctx.fillStyle = '#f5cd79';
        ctx.fillRect(px - 10, py - 6, 20, 12);
      } else if (p.type === 'karak') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - 8, py - 8, 16, 16);
      }
      ctx.restore();
    }

    // 4. Draw Exit Portal
    if (this.portal) {
      const isQuestDone = window.game && window.game.objectives && window.game.objectives.isCompleted;
      const ptx = Math.round(this.portal.x - cameraX);
      const pty = Math.round(this.portal.y - cameraY);

      ctx.save();
      ctx.fillStyle = isQuestDone ? 'rgba(46, 213, 115, 0.7)' : 'rgba(255, 71, 87, 0.3)';
      ctx.fillRect(ptx - 10, pty - 10, 60, 100);
      ctx.fillStyle = isQuestDone ? '#2ed573' : '#ff4757';
      ctx.fillRect(ptx, pty, 40, 80);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(isQuestDone ? 'البوابة مفتوحة' : 'أنجز المهمة!', ptx + 20, pty - 12);
      ctx.restore();
    }
  }
}

window.CAMPAIGN_STAGES = CAMPAIGN_STAGES;
window.LevelManager = LevelManager;
