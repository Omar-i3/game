// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Level Engine, Quota & Progression
// ============================================================================

// ----------------------------------------------------------------------------
// LocalStorage Progression System
// ----------------------------------------------------------------------------
const PROGRESSION = {
  getUnlockedLevel() {
    try {
      const val = parseInt(localStorage.getItem('arab_gamers_unlocked_level') || '1', 10);
      return Math.max(1, Math.min(20, isNaN(val) ? 1 : val));
    } catch (e) {
      return 1;
    }
  },

  unlockNextLevel(completedLevel) {
    try {
      const current = this.getUnlockedLevel();
      const nextLevel = Math.min(20, Math.max(current, completedLevel + 1));
      localStorage.setItem('arab_gamers_unlocked_level', nextLevel.toString());
      return nextLevel;
    } catch (e) {
      return completedLevel + 1;
    }
  },

  saveLevelStats(levelIndex, stars = 3, score = 0) {
    try {
      const starsData = JSON.parse(localStorage.getItem('arab_gamers_stars') || '{}');
      starsData[levelIndex] = Math.max(starsData[levelIndex] || 0, stars);
      localStorage.setItem('arab_gamers_stars', JSON.stringify(starsData));

      const scoresData = JSON.parse(localStorage.getItem('arab_gamers_high_scores') || '{}');
      scoresData[levelIndex] = Math.max(scoresData[levelIndex] || 0, score);
      localStorage.setItem('arab_gamers_high_scores', JSON.stringify(scoresData));
    } catch (e) {}
  },

  getLevelStars(levelIndex) {
    try {
      const starsData = JSON.parse(localStorage.getItem('arab_gamers_stars') || '{}');
      return starsData[levelIndex] || 0;
    } catch (e) {
      return 0;
    }
  },

  resetProgress() {
    try {
      localStorage.removeItem('arab_gamers_unlocked_level');
      localStorage.removeItem('arab_gamers_stars');
      localStorage.removeItem('arab_gamers_high_scores');
    } catch (e) {}
  }
};

window.PROGRESSION = PROGRESSION;

// ----------------------------------------------------------------------------
// 20 Extended Campaign Stages (Widths 3600px - 5000px, Quotas, Mid-Dialogues)
// ----------------------------------------------------------------------------
const CAMPAIGN_STAGES = {
  1: {
    id: 1, name: 'شرارة الصدمة', nameEn: 'Shockwave Spark', heroId: 'banderita',
    width: 3800, height: 600, theme: 'city', skyColor: '#0a081e',
    requiredSubsQuota: 50000,
    objectiveType: 'COLLECT', objectiveTitle: 'جمع البطاطس والمشتركين',
    objectiveDesc: 'اجمع 15 كيس بطاطس ذهبي و50,000 مشترك لشحن بوابة العبور!', objectiveTarget: 15,
    midDialogue: {
      triggerX: 1800,
      lines: [
        { speaker: 'banderita', name: 'بندريتا', text: 'وصلت لمنتصف شوارع المدينة! إشارات المشتركين بدأت تعود تدريجياً!' },
        { speaker: 'banderita', name: 'بندريتا', text: 'سأواصل الاندفاع وجمع باقي الأكياس لفتح البوابة قبل نفاد الوقت!' }
      ]
    },
    platforms: [
      { x: 0, y: 520, w: 1000, h: 80, type: 'roof' },
      { x: 1100, y: 520, w: 1200, h: 80, type: 'roof' },
      { x: 2400, y: 520, w: 1400, h: 80, type: 'roof' },
      { x: 250, y: 410, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 500, y: 310, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 780, y: 220, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 1250, y: 410, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 1550, y: 300, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 1900, y: 220, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 2550, y: 400, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 2900, y: 300, w: 240, h: 20, type: 'steel', isOneWay: true },
      { x: 3300, y: 400, w: 200, h: 20, type: 'holo', isOneWay: true }
    ],
    hazards: [
      { x: 1000, y: 560, w: 100, h: 40, type: 'glitchPit' },
      { x: 2300, y: 560, w: 100, h: 40, type: 'glitchPit' }
    ],
    pickups: [
      // 15 Potato Sacks
      ...Array.from({ length: 15 }, (_, i) => ({ x: 220 + i * 230, y: 220 + (i % 3) * 60, type: 'potatoSack' })),
      // Subscriber Coins (Total 70,000 Subs available)
      { x: 300, y: 360, type: 'subCoin5k', value: 5000 },
      { x: 600, y: 260, type: 'subCoin10k', value: 10000 },
      { x: 1300, y: 360, type: 'subCoin10k', value: 10000 },
      { x: 1650, y: 250, type: 'subCoin10k', value: 10000 },
      { x: 2000, y: 170, type: 'subCoin10k', value: 10000 },
      { x: 2650, y: 350, type: 'subCoin10k', value: 10000 },
      { x: 3050, y: 250, type: 'subCoin15k', value: 15000 },
      // Food
      { x: 850, y: 480, type: 'shawarma' },
      { x: 2150, y: 480, type: 'karak' }
    ],
    enemies: [
      { x: 650, y: 480, type: 'glitchBot' },
      { x: 1400, y: 480, type: 'dislikeDrone' },
      { x: 1750, y: 480, type: 'glitchBot' },
      { x: 2700, y: 480, type: 'toxicCrawler' },
      { x: 3200, y: 480, type: 'glitchBot' }
    ],
    exitPortal: { x: 3650, y: 440, w: 50, h: 80 }
  },

  2: {
    id: 2, name: 'سباق ضد اللاغ', nameEn: 'Race Against Lag', heroId: 'banderita',
    width: 4200, height: 600, theme: 'city', skyColor: '#12052b',
    requiredSubsQuota: 60000,
    objectiveType: 'SPEEDRUN_TIMER', objectiveTitle: 'سباق السرعة القصوى',
    objectiveDesc: 'اعبر في أقل من 55 ثانية واجمع 60,000 مشترك قبل حظر السيرفر!', objectiveTimeLimit: 55,
    midDialogue: {
      triggerX: 2100,
      lines: [
        { speaker: 'banderita', name: 'بندريتا', text: 'سرعة البينغ ترتفع! يجب أن أستخدم الـ Dash لتخطي فجوات اللاغ بسرعة!' }
      ]
    },
    platforms: [
      { x: 0, y: 520, w: 4200, h: 80, type: 'roof' },
      { x: 350, y: 410, w: 160, h: 20, type: 'holo', isOneWay: true },
      { x: 750, y: 320, w: 180, h: 20, type: 'steel', isOneWay: true },
      { x: 1200, y: 410, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 1650, y: 320, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 2200, y: 400, w: 200, h: 20, type: 'holo', isOneWay: true },
      { x: 2700, y: 300, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 3250, y: 390, w: 200, h: 20, type: 'holo', isOneWay: true },
      { x: 3700, y: 300, w: 220, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [
      { x: 950, y: 500, w: 80, h: 20, type: 'spikes' },
      { x: 1950, y: 500, w: 90, h: 20, type: 'spikes' },
      { x: 2950, y: 500, w: 90, h: 20, type: 'spikes' }
    ],
    pickups: [
      { x: 400, y: 360, type: 'subCoin10k', value: 10000 },
      { x: 800, y: 270, type: 'subCoin10k', value: 10000 },
      { x: 1300, y: 360, type: 'subCoin10k', value: 10000 },
      { x: 1750, y: 270, type: 'subCoin10k', value: 10000 },
      { x: 2300, y: 350, type: 'subCoin10k', value: 10000 },
      { x: 2800, y: 250, type: 'subCoin10k', value: 10000 },
      { x: 3350, y: 340, type: 'subCoin10k', value: 10000 },
      { x: 3800, y: 250, type: 'subCoin10k', value: 10000 },
      { x: 1500, y: 480, type: 'shawarma' }
    ],
    enemies: [
      { x: 600, y: 480, type: 'glitchBot' },
      { x: 1450, y: 480, type: 'dislikeDrone' },
      { x: 2450, y: 480, type: 'toxicCrawler' },
      { x: 3500, y: 480, type: 'glitchBot' }
    ],
    exitPortal: { x: 4050, y: 440, w: 50, h: 80 }
  },

  3: {
    id: 3, name: 'إنقاذ أفران التميس', nameEn: 'Save The Tamees Bakery', heroId: 'banderita',
    width: 4000, height: 600, theme: 'city', skyColor: '#1a0d00',
    requiredSubsQuota: 75000,
    objectiveType: 'KILL_COUNT', objectiveTitle: 'تحرير مخابز التميس',
    objectiveDesc: 'اقضِ على 12 روبوت جليتش واجمع 75,000 مشترك لتحرير المخبز!', objectiveTarget: 12,
    midDialogue: {
      triggerX: 2000,
      lines: [
        { speaker: 'banderita', name: 'بندريتا', text: 'الأفران مشتعلة هنا! الروبوتات تحاول إفساد عجين التميس باللاغ... لن أسمح لهم!' }
      ]
    },
    platforms: [
      { x: 0, y: 520, w: 4000, h: 80, type: 'roof' },
      { x: 300, y: 390, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 750, y: 290, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 1250, y: 390, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 1750, y: 290, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 2350, y: 390, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 2850, y: 290, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 3400, y: 390, w: 220, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 400, y: 340, type: 'subCoin10k', value: 10000 },
      { x: 850, y: 240, type: 'subCoin15k', value: 15000 },
      { x: 1350, y: 340, type: 'subCoin15k', value: 15000 },
      { x: 1850, y: 240, type: 'subCoin15k', value: 15000 },
      { x: 2450, y: 340, type: 'subCoin15k', value: 15000 },
      { x: 2950, y: 240, type: 'subCoin15k', value: 15000 },
      { x: 3500, y: 340, type: 'subCoin15k', value: 15000 },
      { x: 1000, y: 480, type: 'shawarma' },
      { x: 2600, y: 480, type: 'karak' }
    ],
    enemies: Array.from({ length: 12 }, (_, i) => ({
      x: 350 + i * 280,
      y: 480,
      type: (i % 2 === 0 ? 'glitchBot' : 'toxicCrawler')
    })),
    exitPortal: { x: 3880, y: 440, w: 50, h: 80 }
  },

  4: {
    id: 4, name: 'زعيم مدينة الستريم', nameEn: 'Lag Titan Boss', heroId: 'banderita',
    width: 3600, height: 600, theme: 'bossArena', skyColor: '#2b0000',
    requiredSubsQuota: 80000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'سحق وحش اللاغ',
    objectiveDesc: 'اهزم وحش اللاغ العملاق وحرر 80,000 مشترك!',
    platforms: [
      { x: 0, y: 520, w: 3600, h: 80, type: 'roof' },
      { x: 400, y: 380, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 800, y: 280, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 1400, y: 380, w: 240, h: 20, type: 'steel', isOneWay: true },
      { x: 2000, y: 280, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 2600, y: 380, w: 240, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [{ x: 1100, y: 500, w: 80, h: 20, type: 'spikes' }],
    pickups: [
      { x: 450, y: 330, type: 'subCoin15k', value: 15000 },
      { x: 850, y: 230, type: 'subCoin15k', value: 15000 },
      { x: 1500, y: 330, type: 'subCoin20k', value: 20000 },
      { x: 2100, y: 230, type: 'subCoin20k', value: 20000 },
      { x: 2700, y: 330, type: 'subCoin20k', value: 20000 },
      { x: 600, y: 480, type: 'shawarma' },
      { x: 2300, y: 480, type: 'karak' }
    ],
    enemies: [
      { x: 500, y: 480, type: 'glitchBot' },
      { x: 1200, y: 480, type: 'dislikeDrone' }
    ],
    boss: { type: 'lagTitan', x: 2400, y: 340 },
    exitPortal: { x: 3450, y: 440, w: 50, h: 80 }
  },

  // Stages 5-8: MLZLZ Horror Arc
  5: {
    id: 5, name: 'طريق الرعب المعتم', nameEn: 'Dark Horror Trail', heroId: 'mlzlz',
    width: 3900, height: 600, theme: 'horror', skyColor: '#050d1a',
    requiredSubsQuota: 90000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'إنارة فوانيس الشاي',
    objectiveDesc: 'أشعل 5 فوانيس شاي برذاذ الشاي الساخن واجمع 90,000 مشترك!', objectiveTarget: 5,
    platforms: [
      { x: 0, y: 520, w: 3900, h: 80, type: 'stone' },
      { x: 350, y: 400, w: 180, h: 20, type: 'wood', isOneWay: true },
      { x: 800, y: 300, w: 200, h: 20, type: 'wood', isOneWay: true },
      { x: 1400, y: 400, w: 200, h: 20, type: 'wood', isOneWay: true },
      { x: 2000, y: 300, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 2600, y: 400, w: 200, h: 20, type: 'wood', isOneWay: true },
      { x: 3150, y: 300, w: 220, h: 20, type: 'wood', isOneWay: true }
    ],
    hazards: [{ x: 1100, y: 500, w: 80, h: 20, type: 'ghostFog' }],
    pickups: [
      { x: 400, y: 350, type: 'subCoin15k', value: 15000 },
      { x: 900, y: 250, type: 'subCoin20k', value: 20000 },
      { x: 1500, y: 350, type: 'subCoin20k', value: 20000 },
      { x: 2100, y: 250, type: 'subCoin20k', value: 20000 },
      { x: 2700, y: 350, type: 'subCoin20k', value: 20000 },
      { x: 3250, y: 250, type: 'subCoin20k', value: 20000 },
      { x: 1700, y: 480, type: 'karak' }
    ],
    interactiveObjects: [
      { id: 'lantern_1', type: 'teaLantern', x: 450, y: 370, activated: false },
      { id: 'lantern_2', type: 'teaLantern', x: 900, y: 270, activated: false },
      { id: 'lantern_3', type: 'teaLantern', x: 1500, y: 370, activated: false },
      { id: 'lantern_4', type: 'teaLantern', x: 2100, y: 270, activated: false },
      { id: 'lantern_5', type: 'teaLantern', x: 3250, y: 270, activated: false }
    ],
    enemies: [
      { x: 650, y: 480, type: 'horrorGhost' },
      { x: 1750, y: 480, type: 'horrorGhost' },
      { x: 2400, y: 480, type: 'horrorGhost' },
      { x: 3000, y: 480, type: 'toxicCrawler' }
    ],
    exitPortal: { x: 3750, y: 440, w: 50, h: 80 }
  },

  6: {
    id: 6, name: 'غرفة الجامب سكيرز', nameEn: 'Jumpscare Chamber', heroId: 'mlzlz',
    width: 3800, height: 600, theme: 'horror', skyColor: '#0a001a',
    requiredSubsQuota: 95000,
    objectiveType: 'SURVIVE_TIMER', objectiveTitle: 'الصمود التكتيكي',
    objectiveDesc: 'اصمد لمدة 60 ثانية واجمع 95,000 مشترك ضد هجوم الأشباح!', objectiveTimeLimit: 60,
    platforms: [
      { x: 0, y: 520, w: 3800, h: 80, type: 'stone' },
      { x: 400, y: 380, w: 200, h: 20, type: 'wood', isOneWay: true },
      { x: 900, y: 280, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 1500, y: 380, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 2100, y: 280, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2700, y: 380, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 3200, y: 280, w: 220, h: 20, type: 'wood', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin20k', value: 20000 },
      { x: 950, y: 230, type: 'subCoin20k', value: 20000 },
      { x: 1550, y: 330, type: 'subCoin20k', value: 20000 },
      { x: 2150, y: 230, type: 'subCoin20k', value: 20000 },
      { x: 2750, y: 330, type: 'subCoin20k', value: 20000 },
      { x: 1800, y: 480, type: 'karak' }
    ],
    enemies: [
      { x: 500, y: 480, type: 'horrorGhost' },
      { x: 1100, y: 480, type: 'horrorGhost' },
      { x: 1800, y: 480, type: 'horrorGhost' },
      { x: 2500, y: 480, type: 'horrorGhost' },
      { x: 3100, y: 480, type: 'horrorGhost' }
    ],
    exitPortal: { x: 3650, y: 440, w: 50, h: 80 }
  },

  7: {
    id: 7, name: 'قصر الأسرار', nameEn: 'Mansion of Secrets', heroId: 'mlzlz',
    width: 4000, height: 600, theme: 'horror', skyColor: '#050d1a',
    requiredSubsQuota: 100000,
    objectiveType: 'COLLECT', objectiveTitle: 'فك شفرات القصر',
    objectiveDesc: 'اعثر على 3 مفاتيح مشفرة خلف الجدران السرية واجمع 100,000 مشترك!', objectiveTarget: 3,
    platforms: [
      { x: 0, y: 520, w: 4000, h: 80, type: 'stone' },
      { x: 350, y: 390, w: 200, h: 20, type: 'wood', isOneWay: true },
      { x: 850, y: 280, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 1450, y: 390, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 2050, y: 280, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2700, y: 390, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 3300, y: 280, w: 240, h: 20, type: 'wood', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 900, y: 230, type: 'secretKey' },
      { x: 2150, y: 230, type: 'secretKey' },
      { x: 3400, y: 230, type: 'secretKey' },
      { x: 450, y: 340, type: 'subCoin20k', value: 20000 },
      { x: 1550, y: 340, type: 'subCoin25k', value: 25000 },
      { x: 2800, y: 340, type: 'subCoin30k', value: 30000 },
      { x: 3500, y: 340, type: 'subCoin30k', value: 30000 },
      { x: 1800, y: 480, type: 'karak' }
    ],
    enemies: [
      { x: 600, y: 480, type: 'horrorGhost' },
      { x: 1700, y: 480, type: 'horrorGhost' },
      { x: 2900, y: 480, type: 'horrorGhost' }
    ],
    exitPortal: { x: 3850, y: 440, w: 50, h: 80 }
  },

  8: {
    id: 8, name: 'شبح الديسلايك الأسود', nameEn: 'Black Dislike Ghost Boss', heroId: 'mlzlz',
    width: 3800, height: 600, theme: 'bossArena', skyColor: '#120024',
    requiredSubsQuota: 110000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'طرد شبح الديسلايك',
    objectiveDesc: 'اسكب الشاي الساخن واهزم شبح الديسلايك وحرر 110,000 مشترك!',
    platforms: [
      { x: 0, y: 520, w: 3800, h: 80, type: 'stone' },
      { x: 400, y: 380, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 900, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 1500, y: 380, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2100, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2800, y: 380, w: 240, h: 20, type: 'wood', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin25k', value: 25000 },
      { x: 950, y: 220, type: 'subCoin25k', value: 25000 },
      { x: 1600, y: 330, type: 'subCoin30k', value: 30000 },
      { x: 2200, y: 220, type: 'subCoin35k', value: 35000 },
      { x: 2900, y: 330, type: 'subCoin35k', value: 35000 },
      { x: 1200, y: 480, type: 'karak' }
    ],
    enemies: [{ x: 700, y: 480, type: 'horrorGhost' }],
    boss: { type: 'dislikeGhost', x: 2500, y: 300 },
    exitPortal: { x: 3650, y: 440, w: 50, h: 80 }
  },

  // Stages 9-12: oCMz Anime & Minecraft Clouds Arc
  9: {
    id: 9, name: 'جزر البلوكات العائمة', nameEn: 'Floating Block Islands', heroId: 'ocmz',
    width: 4200, height: 600, theme: 'cloud', skyColor: '#0c2461',
    requiredSubsQuota: 120000,
    objectiveType: 'KILL_COUNT', objectiveTitle: 'إسقاط قراصنة الجليتش',
    objectiveDesc: 'اقضِ على 15 قرصان جليتش طائر بقبعة القش واجمع 120,000 مشترك!', objectiveTarget: 15,
    platforms: [
      { x: 0, y: 520, w: 4200, h: 80, type: 'grass' },
      { x: 300, y: 400, w: 200, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 750, y: 300, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1250, y: 400, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1750, y: 290, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2350, y: 400, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2900, y: 290, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3450, y: 400, w: 220, h: 20, type: 'cloudBlock', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 350, y: 350, type: 'subCoin20k', value: 20000 },
      { x: 800, y: 250, type: 'subCoin25k', value: 25000 },
      { x: 1350, y: 350, type: 'subCoin25k', value: 25000 },
      { x: 1850, y: 240, type: 'subCoin30k', value: 30000 },
      { x: 2450, y: 350, type: 'subCoin30k', value: 30000 },
      { x: 3000, y: 240, type: 'subCoin30k', value: 30000 },
      { x: 1500, y: 480, type: 'shawarma' }
    ],
    enemies: Array.from({ length: 15 }, (_, i) => ({
      x: 350 + i * 240,
      y: 480,
      type: 'glitchPirate'
    })),
    exitPortal: { x: 4050, y: 440, w: 50, h: 80 }
  },

  10: {
    id: 10, name: 'تشغيل السفينة الجوية', nameEn: 'Power Up Airship', heroId: 'ocmz',
    width: 4400, height: 600, theme: 'cloud', skyColor: '#1e3799',
    requiredSubsQuota: 130000,
    objectiveType: 'COLLECT', objectiveTitle: 'شحن بطاريات السفينة',
    objectiveDesc: 'اجمع 4 بطاريات داتا واجمع 130,000 مشترك لتشغيل المحركات!', objectiveTarget: 4,
    platforms: [
      { x: 0, y: 520, w: 4400, h: 80, type: 'grass' },
      { x: 400, y: 390, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 950, y: 280, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1600, y: 390, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2250, y: 280, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2900, y: 390, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3550, y: 280, w: 240, h: 20, type: 'cloudBlock', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 980, y: 230, type: 'dataBattery' },
      { x: 1650, y: 340, type: 'dataBattery' },
      { x: 2300, y: 230, type: 'dataBattery' },
      { x: 3600, y: 230, type: 'dataBattery' },
      { x: 450, y: 340, type: 'subCoin25k', value: 25000 },
      { x: 1100, y: 230, type: 'subCoin30k', value: 30000 },
      { x: 1800, y: 340, type: 'subCoin35k', value: 35000 },
      { x: 3000, y: 340, type: 'subCoin40k', value: 40000 },
      { x: 3700, y: 230, type: 'subCoin40k', value: 40000 },
      { x: 2000, y: 480, type: 'shawarma' }
    ],
    enemies: [
      { x: 600, y: 480, type: 'glitchPirate' },
      { x: 1400, y: 480, type: 'glitchPirate' },
      { x: 2500, y: 480, type: 'glitchPirate' },
      { x: 3200, y: 480, type: 'glitchPirate' }
    ],
    exitPortal: { x: 4250, y: 440, w: 50, h: 80 }
  },

  11: {
    id: 11, name: 'باركور السحاب', nameEn: 'Cloud Parkour', heroId: 'ocmz',
    width: 4500, height: 600, theme: 'cloud', skyColor: '#0a3d62',
    requiredSubsQuota: 140000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'باركور القفز الثلاثي',
    objectiveDesc: 'اقفز بالقفز الثلاثي دون سقوط واجمع 140,000 مشترك!', objectiveTarget: 1,
    platforms: [
      { x: 0, y: 520, w: 700, h: 80, type: 'grass' },
      { x: 850, y: 420, w: 180, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1200, y: 320, w: 180, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1600, y: 220, w: 200, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2050, y: 340, w: 180, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2450, y: 220, w: 200, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2900, y: 340, w: 180, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3300, y: 220, w: 200, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3750, y: 520, w: 750, h: 80, type: 'grass' }
    ],
    hazards: [{ x: 700, y: 580, w: 3050, h: 40, type: 'bottomlessCloud' }],
    pickups: [
      { x: 900, y: 370, type: 'subCoin25k', value: 25000 },
      { x: 1250, y: 270, type: 'subCoin25k', value: 25000 },
      { x: 1650, y: 170, type: 'subCoin35k', value: 35000 },
      { x: 2100, y: 290, type: 'subCoin35k', value: 35000 },
      { x: 2500, y: 170, type: 'subCoin35k', value: 35000 },
      { x: 2950, y: 290, type: 'subCoin35k', value: 35000 },
      { x: 3350, y: 170, type: 'subCoin35k', value: 35000 }
    ],
    enemies: [
      { x: 1650, y: 180, type: 'glitchPirate' },
      { x: 2500, y: 180, type: 'glitchPirate' },
      { x: 3350, y: 180, type: 'glitchPirate' }
    ],
    exitPortal: { x: 4300, y: 440, w: 50, h: 80 }
  },

  12: {
    id: 12, name: 'كابتن الباند الطائر', nameEn: 'Captain Ban Boss', heroId: 'ocmz',
    width: 4000, height: 600, theme: 'bossArena', skyColor: '#1e272e',
    requiredSubsQuota: 150000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'إسقاط منطاد الباند',
    objectiveDesc: 'اهزم كابتن الباند الطائر وحرر 150,000 مشترك!',
    platforms: [
      { x: 0, y: 520, w: 4000, h: 80, type: 'grass' },
      { x: 400, y: 380, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 950, y: 260, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1600, y: 380, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2300, y: 260, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3000, y: 380, w: 240, h: 20, type: 'cloudBlock', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin35k', value: 35000 },
      { x: 1000, y: 210, type: 'subCoin35k', value: 35000 },
      { x: 1700, y: 330, type: 'subCoin40k', value: 40000 },
      { x: 2400, y: 210, type: 'subCoin40k', value: 40000 },
      { x: 3100, y: 330, type: 'subCoin40k', value: 40000 },
      { x: 1200, y: 480, type: 'shawarma' }
    ],
    enemies: [{ x: 800, y: 480, type: 'glitchPirate' }],
    boss: { type: 'captainBan', x: 2600, y: 280 },
    exitPortal: { x: 3850, y: 440, w: 50, h: 80 }
  },

  // Stages 13-16: Abu Abed Workshop & Mines Arc
  13: {
    id: 13, name: 'النزول إلى المنجم', nameEn: 'Descent to Redstone Mines', heroId: 'abuAbed',
    width: 4400, height: 600, theme: 'mines', skyColor: '#1e0c00',
    requiredSubsQuota: 160000,
    objectiveType: 'COLLECT', objectiveTitle: 'استخراج سبائك الريدستون',
    objectiveDesc: 'اجمع 20 سبيكة ريدستون و160,000 مشترك لصناعة دروع الورشة!', objectiveTarget: 20,
    platforms: [
      { x: 0, y: 520, w: 4400, h: 80, type: 'oreStone' },
      { x: 300, y: 400, w: 200, h: 20, type: 'woodMine', isOneWay: true },
      { x: 750, y: 290, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1300, y: 400, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1850, y: 290, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 2450, y: 400, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 3050, y: 290, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 3650, y: 400, w: 220, h: 20, type: 'woodMine', isOneWay: true }
    ],
    hazards: [{ x: 1100, y: 500, w: 90, h: 20, type: 'lavaSpill' }],
    pickups: [
      ...Array.from({ length: 20 }, (_, i) => ({ x: 220 + i * 190, y: 240 + (i % 3) * 60, type: 'redstoneIngot' })),
      { x: 400, y: 350, type: 'subCoin35k', value: 35000 },
      { x: 1400, y: 350, type: 'subCoin45k', value: 45000 },
      { x: 2500, y: 350, type: 'subCoin45k', value: 45000 },
      { x: 3700, y: 350, type: 'subCoin45k', value: 45000 },
      { x: 1600, y: 480, type: 'shawarma' }
    ],
    enemies: [
      { x: 600, y: 480, type: 'cyberSpider' },
      { x: 1500, y: 480, type: 'cyberSpider' },
      { x: 2700, y: 480, type: 'cyberSpider' },
      { x: 3400, y: 480, type: 'cyberSpider' }
    ],
    exitPortal: { x: 4250, y: 440, w: 50, h: 80 }
  },

  14: {
    id: 14, name: 'انعكاس الليزر', nameEn: 'Optical Mirror Puzzle', heroId: 'abuAbed',
    width: 4200, height: 600, theme: 'mines', skyColor: '#2d1400',
    requiredSubsQuota: 170000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'تفعيل المرايا الشمسية',
    objectiveDesc: 'وجه شعاع الصلعة الذهبية على 4 مرايا لفتح البوابة مع 170,000 مشترك!', objectiveTarget: 4,
    platforms: [
      { x: 0, y: 520, w: 4200, h: 80, type: 'oreStone' },
      { x: 400, y: 390, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 950, y: 280, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1600, y: 390, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 2300, y: 280, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 3000, y: 390, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 3600, y: 280, w: 240, h: 20, type: 'woodMine', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 340, type: 'subCoin40k', value: 40000 },
      { x: 1000, y: 230, type: 'subCoin45k', value: 45000 },
      { x: 1700, y: 340, type: 'subCoin45k', value: 45000 },
      { x: 3100, y: 340, type: 'subCoin45k', value: 45000 },
      { x: 1200, y: 480, type: 'shawarma' }
    ],
    interactiveObjects: [
      { id: 'mirror_1', type: 'mirror', x: 500, y: 360, activated: false },
      { id: 'mirror_2', type: 'mirror', x: 1050, y: 250, activated: false },
      { id: 'mirror_3', type: 'mirror', x: 1700, y: 360, activated: false },
      { id: 'mirror_4', type: 'mirror', x: 3100, y: 360, activated: false }
    ],
    enemies: [
      { x: 750, y: 480, type: 'cyberSpider' },
      { x: 2000, y: 480, type: 'cyberSpider' },
      { x: 3400, y: 480, type: 'cyberSpider' }
    ],
    exitPortal: { x: 4050, y: 440, w: 50, h: 80 }
  },

  15: {
    id: 15, name: 'الدفاع عن المولد', nameEn: 'Generator Defense', heroId: 'abuAbed',
    width: 4000, height: 600, theme: 'mines', skyColor: '#1e0000',
    requiredSubsQuota: 180000,
    objectiveType: 'SURVIVE_TIMER', objectiveTitle: 'حماية المولد',
    objectiveDesc: 'انشر برج الريدستون واحمِ المولد لمدة 75 ثانية واجمع 180,000 مشترك!', objectiveTimeLimit: 75,
    platforms: [
      { x: 0, y: 520, w: 4000, h: 80, type: 'oreStone' },
      { x: 400, y: 380, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 950, y: 270, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1600, y: 380, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 2300, y: 270, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 3000, y: 380, w: 240, h: 20, type: 'woodMine', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin45k', value: 45000 },
      { x: 1000, y: 220, type: 'subCoin45k', value: 45000 },
      { x: 1700, y: 330, type: 'subCoin50k', value: 50000 },
      { x: 2400, y: 220, type: 'subCoin50k', value: 50000 },
      { x: 3100, y: 330, type: 'subCoin50k', value: 50000 },
      { x: 1800, y: 480, type: 'shawarma' }
    ],
    enemies: [
      { x: 600, y: 480, type: 'cyberSpider' },
      { x: 1200, y: 480, type: 'cyberSpider' },
      { x: 2000, y: 480, type: 'cyberSpider' },
      { x: 2800, y: 480, type: 'cyberSpider' },
      { x: 3400, y: 480, type: 'cyberSpider' }
    ],
    exitPortal: { x: 3850, y: 440, w: 50, h: 80 }
  },

  16: {
    id: 16, name: 'الحفار الفولاذي', nameEn: 'Glitch Drill Boss', heroId: 'abuAbed',
    width: 4000, height: 600, theme: 'bossArena', skyColor: '#2b1b00',
    requiredSubsQuota: 190000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'تحطيم الحفار العملاق',
    objectiveDesc: 'حطم حفار الجليتش العملاق وحرر 190,000 مشترك!',
    platforms: [
      { x: 0, y: 520, w: 4000, h: 80, type: 'oreStone' },
      { x: 400, y: 380, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 950, y: 260, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1600, y: 380, w: 260, h: 20, type: 'woodMine', isOneWay: true },
      { x: 2400, y: 260, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 3100, y: 380, w: 240, h: 20, type: 'woodMine', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin45k', value: 45000 },
      { x: 1000, y: 210, type: 'subCoin45k', value: 45000 },
      { x: 1700, y: 330, type: 'subCoin50k', value: 50000 },
      { x: 2500, y: 210, type: 'subCoin50k', value: 50000 },
      { x: 3200, y: 330, type: 'subCoin50k', value: 50000 },
      { x: 1300, y: 480, type: 'shawarma' }
    ],
    enemies: [{ x: 800, y: 480, type: 'cyberSpider' }],
    boss: { type: 'glitchDrill', x: 2700, y: 320 },
    exitPortal: { x: 3850, y: 440, w: 50, h: 80 }
  },

  // Stages 17-20: oPiiLz Motherboard & Final Grand Algorithm Climax
  17: {
    id: 17, name: 'اختراق اللوحة الأم', nameEn: 'Motherboard Infiltration', heroId: 'opiilz',
    width: 4400, height: 600, theme: 'cyber', skyColor: '#0a001a',
    requiredSubsQuota: 200000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'تفكيك دوائر الأمان',
    objectiveDesc: 'فكك 6 دوائر أمان بالمفك الأسطوري واجمع 200,000 مشترك في أقل من 60 ثانية!', objectiveTarget: 6,
    platforms: [
      { x: 0, y: 520, w: 4400, h: 80, type: 'circuit' },
      { x: 350, y: 400, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 850, y: 290, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1450, y: 400, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2050, y: 290, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2700, y: 400, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 3350, y: 290, w: 240, h: 20, type: 'neonSteel', isOneWay: true }
    ],
    hazards: [{ x: 1100, y: 500, w: 80, h: 20, type: 'electricLaser' }],
    pickups: [
      { x: 400, y: 350, type: 'subCoin50k', value: 50000 },
      { x: 900, y: 240, type: 'subCoin50k', value: 50000 },
      { x: 1500, y: 350, type: 'subCoin50k', value: 50000 },
      { x: 2100, y: 240, type: 'subCoin50k', value: 50000 },
      { x: 2750, y: 350, type: 'subCoin50k', value: 50000 },
      { x: 3400, y: 240, type: 'subCoin50k', value: 50000 },
      { x: 1750, y: 480, type: 'shawarma' }
    ],
    interactiveObjects: [
      { id: 'circuit_1', type: 'circuit', x: 400, y: 370, activated: false },
      { id: 'circuit_2', type: 'circuit', x: 900, y: 260, activated: false },
      { id: 'circuit_3', type: 'circuit', x: 1500, y: 370, activated: false },
      { id: 'circuit_4', type: 'circuit', x: 2100, y: 260, activated: false },
      { id: 'circuit_5', type: 'circuit', x: 2750, y: 370, activated: false },
      { id: 'circuit_6', type: 'circuit', x: 3400, y: 260, activated: false }
    ],
    enemies: [
      { x: 650, y: 480, type: 'glitchBot' },
      { x: 1750, y: 480, type: 'glitchBot' },
      { x: 3000, y: 480, type: 'glitchBot' }
    ],
    exitPortal: { x: 4250, y: 440, w: 50, h: 80 }
  },

  18: {
    id: 18, name: 'غرفة تبريد السيرفر', nameEn: 'Server Cooling Core', heroId: 'opiilz',
    width: 4400, height: 600, theme: 'cyber', skyColor: '#001a1a',
    requiredSubsQuota: 220000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'تجميد صمامات الليزر',
    objectiveDesc: 'جمد 5 صمامات ليزرية واجمع 220,000 مشترك لفتح بوابة البرج!', objectiveTarget: 5,
    platforms: [
      { x: 0, y: 520, w: 4400, h: 80, type: 'circuit' },
      { x: 350, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 900, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1500, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2150, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2800, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 3450, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 400, y: 340, type: 'subCoin50k', value: 50000 },
      { x: 950, y: 230, type: 'subCoin50k', value: 50000 },
      { x: 1550, y: 340, type: 'subCoin60k', value: 60000 },
      { x: 2200, y: 230, type: 'subCoin60k', value: 60000 },
      { x: 2850, y: 340, type: 'subCoin60k', value: 60000 },
      { x: 1800, y: 480, type: 'karak' }
    ],
    interactiveObjects: [
      { id: 'valve_1', type: 'laserValve', x: 450, y: 360, activated: false },
      { id: 'valve_2', type: 'laserValve', x: 1000, y: 250, activated: false },
      { id: 'valve_3', type: 'laserValve', x: 1600, y: 360, activated: false },
      { id: 'valve_4', type: 'laserValve', x: 2250, y: 250, activated: false },
      { id: 'valve_5', type: 'laserValve', x: 2900, y: 360, activated: false }
    ],
    enemies: [
      { x: 700, y: 480, type: 'eliteGuard' },
      { x: 1900, y: 480, type: 'eliteGuard' },
      { x: 3100, y: 480, type: 'eliteGuard' }
    ],
    exitPortal: { x: 4250, y: 440, w: 50, h: 80 }
  },

  19: {
    id: 19, name: 'بوابة برج الحظر (تحالف الأبطال)', nameEn: 'Ban Tower Tag-Team', heroId: 'banderita',
    width: 4800, height: 600, theme: 'cyber', skyColor: '#1e0024',
    requiredSubsQuota: 240000,
    objectiveType: 'KILL_COUNT', objectiveTitle: 'سحق حراس النخبة',
    objectiveDesc: 'اقضِ على 20 حارس نخبوي واستخدم أبطالك الخمسة واجمع 240,000 مشترك!', objectiveTarget: 20,
    platforms: [
      { x: 0, y: 520, w: 4800, h: 80, type: 'circuit' },
      { x: 300, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 800, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1400, y: 390, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2000, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2600, y: 390, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 3200, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 3800, y: 390, w: 240, h: 20, type: 'neonSteel', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 350, y: 340, type: 'subCoin50k', value: 50000 },
      { x: 850, y: 230, type: 'subCoin50k', value: 50000 },
      { x: 1450, y: 340, type: 'subCoin50k', value: 50000 },
      { x: 2050, y: 230, type: 'subCoin50k', value: 50000 },
      { x: 2650, y: 340, type: 'subCoin50k', value: 50000 },
      { x: 3250, y: 230, type: 'subCoin50k', value: 50000 },
      { x: 3850, y: 340, type: 'subCoin50k', value: 50000 },
      { x: 1700, y: 480, type: 'shawarma' },
      { x: 3500, y: 480, type: 'karak' }
    ],
    enemies: Array.from({ length: 20 }, (_, i) => ({
      x: 350 + i * 210,
      y: 480,
      type: 'eliteGuard'
    })),
    exitPortal: { x: 4650, y: 440, w: 50, h: 80 }
  },

  20: {
    id: 20, name: 'المعركة الكبرى: الخوارزمية المظلمة', nameEn: 'The Dark Algorithm (Error 404)', heroId: 'banderita',
    width: 4800, height: 600, theme: 'bossArena', skyColor: '#3d0014',
    requiredSubsQuota: 250000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'كسر كود الخوارزمية (Error 404)',
    objectiveDesc: 'اهزم الخوارزمية المظلمة عبر 3 أطوار واستعد كافة المشتركين (250,000+)!',
    platforms: [
      { x: 0, y: 520, w: 4800, h: 80, type: 'circuit' },
      { x: 400, y: 380, w: 260, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1000, y: 260, w: 260, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1700, y: 380, w: 280, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2400, y: 260, w: 280, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 3200, y: 380, w: 280, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 4000, y: 260, w: 280, h: 20, type: 'neonSteel', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subDiamond50k', value: 50000 },
      { x: 1050, y: 210, type: 'subDiamond50k', value: 50000 },
      { x: 1750, y: 330, type: 'subDiamond50k', value: 50000 },
      { x: 2450, y: 210, type: 'subDiamond50k', value: 50000 },
      { x: 3250, y: 330, type: 'subDiamond50k', value: 50000 },
      { x: 4050, y: 210, type: 'subDiamond50k', value: 50000 },
      { x: 1200, y: 480, type: 'shawarma' },
      { x: 2800, y: 480, type: 'karak' }
    ],
    enemies: [{ x: 800, y: 480, type: 'eliteGuard' }],
    boss: { type: 'darkAlgorithm', x: 2900, y: 260 },
    exitPortal: { x: 4650, y: 440, w: 50, h: 80 }
  }
};

class LevelManager {
  constructor() {
    this.currentStageIndex = 1;
    this.stage = CAMPAIGN_STAGES[1];
    this.platforms = [];
    this.hazards = [];
    this.pickups = [];
    this.enemies = [];
    this.interactiveObjects = [];
    this.boss = null;
    this.portal = null;
    this.midDialogueTriggered = false;
  }

  loadStage(stageIndex) {
    this.currentStageIndex = stageIndex;
    this.stage = CAMPAIGN_STAGES[stageIndex] || CAMPAIGN_STAGES[1];
    this.midDialogueTriggered = false;

    this.platforms = JSON.parse(JSON.stringify(this.stage.platforms || []));
    this.hazards = JSON.parse(JSON.stringify(this.stage.hazards || []));
    this.pickups = JSON.parse(JSON.stringify(this.stage.pickups || []));
    this.interactiveObjects = JSON.parse(JSON.stringify(this.stage.interactiveObjects || []));
    this.portal = this.stage.exitPortal ? JSON.parse(JSON.stringify(this.stage.exitPortal)) : null;

    // Instantiate Enemies
    this.enemies = [];
    if (this.stage.enemies) {
      for (const e of this.stage.enemies) {
        this.enemies.push(new window.Enemy(e.type, e.x, e.y));
      }
    }

    // Instantiate Boss
    this.boss = null;
    if (this.stage.boss) {
      this.boss = new window.Boss(this.stage.boss.type, this.stage.boss.x, this.stage.boss.y);
    }

    // Bind Objective
    if (window.game && window.game.objectives) {
      window.game.objectives.initObjective(this.stage);
    }
  }

  update(player) {
    // Check Pickups
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      if (player.x + player.width > p.x - 16 && player.x < p.x + 16 &&
          player.y + player.height > p.y - 16 && player.y < p.y + 16) {

        if (p.type.startsWith('subCoin') || p.type.startsWith('subDiamond')) {
          const subs = p.value || 10000;
          if (window.game) window.game.addSubscribers(subs);
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 10, ['#ffd700', '#ffffff'], 2, 5);
          window.particles.addFloatingText(p.x, p.y - 10, `+${subs.toLocaleString()} 👥`, '#ffd700', 13);
        } else if (p.type === 'potatoSack') {
          if (window.game && window.game.objectives) window.game.objectives.recordCollect('potatoSack');
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 8, ['#f39c12', '#ffd700'], 1, 4);
        } else if (p.type === 'dataBattery') {
          if (window.game && window.game.objectives) window.game.objectives.recordCollect('dataBattery');
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 10, ['#00d2d3', '#ffffff'], 2, 5);
        } else if (p.type === 'secretKey') {
          if (window.game && window.game.objectives) window.game.objectives.recordCollect('secretKey');
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 12, ['#9b59b6', '#ffd700'], 2, 5);
        } else if (p.type === 'redstoneIngot') {
          if (window.game && window.game.objectives) window.game.objectives.recordCollect('redstoneIngot');
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 10, ['#ff4757', '#ffd700'], 2, 5);
        } else if (p.type === 'shawarma') {
          player.heal(40);
        } else if (p.type === 'karak') {
          player.heal(60);
          player.addEnergy(30);
        }

        this.pickups.splice(i, 1);
      }
    }

    // Check Mid-Level Story Dialogue Trigger
    if (!this.midDialogueTriggered && this.stage.midDialogue && player.x >= this.stage.midDialogue.triggerX) {
      this.midDialogueTriggered = true;
      if (window.game && window.game.dialogue) {
        window.game.dialogue.startCustomDialogue(this.stage.midDialogue.lines, () => {
          if (window.game) window.game.state = 'playing';
        });
      }
    }
  }

  drawBackground(ctx, cameraX, cameraY, width, height) {
    ctx.save();
    ctx.fillStyle = this.stage.skyColor || '#070514';
    ctx.fillRect(0, 0, width, height);

    // Parallax City / Background elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    for (let i = 0; i < 15; i++) {
      const bx = ((i * 320) - (cameraX * 0.2)) % (width + 400);
      ctx.fillRect(bx - 100, 180, 160, 360);
    }
    ctx.restore();
  }

  drawLevel(ctx, cameraX, cameraY) {
    // 1. Draw Platforms
    for (const p of this.platforms) {
      const px = Math.round(p.x - cameraX);
      const py = Math.round(p.y - cameraY);

      ctx.save();
      if (p.type === 'roof' || p.type === 'stone' || p.type === 'oreStone' || p.type === 'circuit') {
        ctx.fillStyle = '#1e1a38';
        ctx.fillRect(px, py, p.w, p.h);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(px, py, p.w, 4);
      } else if (p.type === 'steel' || p.type === 'neonSteel') {
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(px, py, p.w, p.h);
        ctx.fillStyle = '#00d2d3';
        ctx.fillRect(px, py, p.w, 3);
      } else {
        ctx.fillStyle = 'rgba(0, 210, 211, 0.4)';
        ctx.fillRect(px, py, p.w, p.h);
        ctx.fillStyle = '#00d2d3';
        ctx.fillRect(px, py, p.w, 2);
      }
      ctx.restore();
    }

    // 2. Draw Interactive Objects (Lanterns, Mirrors, Circuits)
    for (const obj of this.interactiveObjects) {
      const ox = Math.round(obj.x - cameraX);
      const oy = Math.round(obj.y - cameraY);

      ctx.save();
      if (obj.type === 'teaLantern') {
        ctx.fillStyle = obj.activated ? '#ffd700' : '#57606f';
        ctx.fillRect(ox - 10, oy - 20, 20, 24);
        if (obj.activated) {
          ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
          ctx.beginPath();
          ctx.arc(ox, oy - 8, 30, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (obj.type === 'mirror') {
        ctx.fillStyle = obj.activated ? '#00d2d3' : '#a4b0be';
        ctx.fillRect(ox - 6, oy - 22, 12, 28);
      } else if (obj.type === 'circuit' || obj.type === 'laserValve') {
        ctx.fillStyle = obj.activated ? '#2ed573' : '#ff4757';
        ctx.fillRect(ox - 10, oy - 10, 20, 20);
      }
      ctx.restore();
    }

    // 3. Draw Pickups
    for (const p of this.pickups) {
      const px = Math.round(p.x - cameraX);
      const py = Math.round(p.y - cameraY);

      ctx.save();
      if (p.type.startsWith('subCoin') || p.type.startsWith('subDiamond')) {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 9px "Press Start 2P", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('▶', px, py + 3);
      } else if (p.type === 'potatoSack') {
        ctx.fillStyle = '#f5cd79';
        ctx.fillRect(px - 10, py - 10, 20, 20);
      } else if (p.type === 'shawarma') {
        ctx.fillStyle = '#f5cd79';
        ctx.fillRect(px - 10, py - 6, 20, 12);
      } else if (p.type === 'karak') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - 8, py - 8, 16, 16);
      } else {
        ctx.fillStyle = '#2ed573';
        ctx.fillRect(px - 8, py - 8, 16, 16);
      }
      ctx.restore();
    }

    // 4. Draw Exit Portal
    if (this.portal) {
      const isQuestDone = window.game && window.game.objectives && window.game.objectives.isCompleted;
      const hasEnoughSubs = window.game && (window.game.levelSubscribers >= this.stage.requiredSubsQuota);
      const isFullyUnlocked = isQuestDone && hasEnoughSubs;

      const ptx = Math.round(this.portal.x - cameraX);
      const pty = Math.round(this.portal.y - cameraY);

      ctx.save();
      ctx.fillStyle = isFullyUnlocked ? 'rgba(46, 213, 115, 0.7)' : 'rgba(255, 71, 87, 0.3)';
      ctx.fillRect(ptx - 10, pty - 10, 60, 100);
      ctx.fillStyle = isFullyUnlocked ? '#2ed573' : '#ff4757';
      ctx.fillRect(ptx, pty, 40, 80);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      const portalLabel = isFullyUnlocked ? 'البوابة مفتوحة' : 'اجمع المشتركين!';
      ctx.fillText(portalLabel, ptx + 20, pty - 12);
      ctx.restore();
    }
  }
}

window.CAMPAIGN_STAGES = CAMPAIGN_STAGES;
window.LevelManager = LevelManager;
