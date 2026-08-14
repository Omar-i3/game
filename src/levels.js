// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Level Engine, Quotas & Pixel Art Pickups
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
// 20 Extended Campaign Stages (Widths 3600px - 5000px, Quotas, Gimmicks)
// ----------------------------------------------------------------------------
const CAMPAIGN_STAGES = {
  1: {
    id: 1, name: 'شرارة الصدمة', nameEn: 'Shockwave Spark', heroId: 'banderita',
    width: 3800, height: 650, theme: 'city', skyColor: '#0a081e',
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
      { x: 0, y: 520, w: 1100, h: 100, type: 'roof' },
      { x: 1200, y: 520, w: 1200, h: 100, type: 'roof' },
      { x: 2500, y: 520, w: 1400, h: 100, type: 'roof' },
      { x: 250, y: 410, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 500, y: 300, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 780, y: 200, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 1350, y: 400, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 1650, y: 290, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 1950, y: 190, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 2650, y: 390, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 2980, y: 280, w: 240, h: 20, type: 'steel', isOneWay: true },
      { x: 3350, y: 390, w: 200, h: 20, type: 'holo', isOneWay: true }
    ],
    hazards: [
      { x: 1100, y: 560, w: 100, h: 90, type: 'glitchPit' },
      { x: 2400, y: 560, w: 100, h: 90, type: 'glitchPit' }
    ],
    pickups: [
      ...Array.from({ length: 15 }, (_, i) => ({ x: 240 + i * 230, y: 200 + (i % 3) * 70, type: 'potatoSack' })),
      { x: 350, y: 360, type: 'subCoin5k', value: 5000 },
      { x: 600, y: 250, type: 'subCoin10k', value: 10000 },
      { x: 1450, y: 350, type: 'subCoin10k', value: 10000 },
      { x: 1750, y: 240, type: 'subCoin10k', value: 10000 },
      { x: 2050, y: 140, type: 'subCoin10k', value: 10000 },
      { x: 2750, y: 340, type: 'subCoin10k', value: 10000 },
      { x: 3100, y: 230, type: 'subDiamond50k', value: 15000 },
      { x: 900, y: 480, type: 'shawarma' },
      { x: 2200, y: 480, type: 'karak' }
    ],
    enemies: [
      { type: 'glitchBot', x: 650, y: 470 },
      { type: 'dislikeDrone', x: 1400, y: 320 },
      { type: 'glitchBot', x: 1750, y: 470 },
      { type: 'toxicCrawler', x: 2700, y: 470 },
      { type: 'glitchBot', x: 3200, y: 470 }
    ],
    exitPortal: { x: 3650, y: 440, w: 50, h: 80 }
  },

  2: {
    id: 2, name: 'سباق ضد اللاغ', nameEn: 'Race Against Lag', heroId: 'banderita',
    width: 4200, height: 650, theme: 'city', skyColor: '#12052b',
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
      { x: 0, y: 520, w: 4200, h: 100, type: 'roof' },
      { x: 350, y: 410, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 750, y: 310, w: 200, h: 20, type: 'steel', isOneWay: true },
      { x: 1200, y: 410, w: 200, h: 20, type: 'holo', isOneWay: true },
      { x: 1650, y: 310, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 2200, y: 390, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 2700, y: 290, w: 240, h: 20, type: 'steel', isOneWay: true },
      { x: 3250, y: 390, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 3700, y: 290, w: 240, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [
      { x: 950, y: 500, w: 80, h: 20, type: 'spikes' },
      { x: 1950, y: 500, w: 90, h: 20, type: 'spikes' },
      { x: 2950, y: 500, w: 90, h: 20, type: 'spikes' }
    ],
    pickups: [
      { x: 400, y: 360, type: 'subCoin10k', value: 10000 },
      { x: 800, y: 260, type: 'subCoin10k', value: 10000 },
      { x: 1300, y: 360, type: 'subCoin10k', value: 10000 },
      { x: 1750, y: 260, type: 'subCoin10k', value: 10000 },
      { x: 2300, y: 340, type: 'subCoin10k', value: 10000 },
      { x: 2800, y: 240, type: 'subCoin10k', value: 10000 },
      { x: 3350, y: 340, type: 'subCoin10k', value: 10000 },
      { x: 3800, y: 240, type: 'subDiamond50k', value: 15000 },
      { x: 1500, y: 480, type: 'shawarma' }
    ],
    enemies: [
      { type: 'glitchBot', x: 600, y: 470 },
      { type: 'dislikeDrone', x: 1450, y: 310 },
      { type: 'toxicCrawler', x: 2450, y: 470 },
      { type: 'glitchBot', x: 3500, y: 470 }
    ],
    exitPortal: { x: 4050, y: 440, w: 50, h: 80 }
  },

  3: {
    id: 3, name: 'إنقاذ أفران التميس', nameEn: 'Save The Tamees Bakery', heroId: 'banderita',
    width: 4000, height: 650, theme: 'city', skyColor: '#1a0d00',
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
      { x: 0, y: 520, w: 4000, h: 100, type: 'roof' },
      { x: 300, y: 390, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 750, y: 280, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 1250, y: 390, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 1750, y: 280, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 2350, y: 390, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 2850, y: 280, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 3400, y: 390, w: 220, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 400, y: 340, type: 'subCoin10k', value: 10000 },
      { x: 850, y: 230, type: 'subCoin15k', value: 15000 },
      { x: 1350, y: 340, type: 'subCoin15k', value: 15000 },
      { x: 1850, y: 230, type: 'subCoin15k', value: 15000 },
      { x: 2450, y: 340, type: 'subCoin15k', value: 15000 },
      { x: 2950, y: 230, type: 'subCoin15k', value: 15000 },
      { x: 3500, y: 340, type: 'subDiamond50k', value: 20000 },
      { x: 1000, y: 480, type: 'shawarma' },
      { x: 2600, y: 480, type: 'karak' }
    ],
    enemies: Array.from({ length: 12 }, (_, i) => ({
      type: (i % 2 === 0 ? 'glitchBot' : 'toxicCrawler'),
      x: 350 + i * 280,
      y: 470
    })),
    exitPortal: { x: 3880, y: 440, w: 50, h: 80 }
  },

  4: {
    id: 4, name: 'زعيم مدينة الستريم', nameEn: 'Lag Titan Boss Arena', heroId: 'banderita',
    width: 3600, height: 650, theme: 'bossArena', skyColor: '#2b0000',
    requiredSubsQuota: 80000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'سحق وحش اللاغ العملاق',
    objectiveDesc: 'اهزم وحش اللاغ وحرر 80,000 مشترك!',
    platforms: [
      { x: 0, y: 520, w: 3600, h: 100, type: 'roof' },
      { x: 400, y: 380, w: 220, h: 20, type: 'steel', isOneWay: true },
      { x: 850, y: 270, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 1500, y: 380, w: 260, h: 20, type: 'steel', isOneWay: true },
      { x: 2200, y: 270, w: 240, h: 20, type: 'holo', isOneWay: true }
    ],
    hazards: [{ x: 1200, y: 500, w: 80, h: 20, type: 'spikes' }],
    pickups: [
      { x: 450, y: 330, type: 'subCoin15k', value: 15000 },
      { x: 900, y: 220, type: 'subCoin20k', value: 20000 },
      { x: 1600, y: 330, type: 'subCoin20k', value: 20000 },
      { x: 2300, y: 220, type: 'subDiamond50k', value: 30000 },
      { x: 600, y: 480, type: 'shawarma' },
      { x: 2400, y: 480, type: 'karak' }
    ],
    enemies: [
      { type: 'glitchBot', x: 500, y: 470 },
      { type: 'dislikeDrone', x: 1300, y: 320 }
    ],
    boss: { type: 'lagTitan', x: 2400, y: 300 },
    exitPortal: { x: 3450, y: 440, w: 50, h: 80 }
  },

  // Stages 5-8: MLZLZ Horror Arc
  5: {
    id: 5, name: 'طريق الرعب المعتم', nameEn: 'Dark Horror Trail', heroId: 'mlzlz',
    width: 3900, height: 650, theme: 'horror', skyColor: '#050d1a',
    requiredSubsQuota: 90000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'إنارة فوانيس الشاي',
    objectiveDesc: 'أشعل 5 فوانيس شاي برذاذ الشاي الساخن واجمع 90,000 مشترك!', objectiveTarget: 5,
    platforms: [
      { x: 0, y: 520, w: 3900, h: 100, type: 'stone' },
      { x: 350, y: 390, w: 200, h: 20, type: 'wood', isOneWay: true },
      { x: 800, y: 290, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 1400, y: 390, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 2000, y: 290, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2600, y: 390, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 3150, y: 290, w: 240, h: 20, type: 'wood', isOneWay: true }
    ],
    hazards: [{ x: 1100, y: 500, w: 80, h: 20, type: 'ghostFog' }],
    pickups: [
      { x: 400, y: 340, type: 'subCoin15k', value: 15000 },
      { x: 900, y: 240, type: 'subCoin20k', value: 20000 },
      { x: 1500, y: 340, type: 'subCoin20k', value: 20000 },
      { x: 2100, y: 240, type: 'subCoin20k', value: 20000 },
      { x: 2700, y: 340, type: 'subDiamond50k', value: 25000 },
      { x: 1700, y: 480, type: 'karak' }
    ],
    interactiveObjects: [
      { id: 'lantern_1', type: 'teaLantern', x: 450, y: 360, activated: false },
      { id: 'lantern_2', type: 'teaLantern', x: 900, y: 260, activated: false },
      { id: 'lantern_3', type: 'teaLantern', x: 1500, y: 360, activated: false },
      { id: 'lantern_4', type: 'teaLantern', x: 2100, y: 260, activated: false },
      { id: 'lantern_5', type: 'teaLantern', x: 3250, y: 260, activated: false }
    ],
    enemies: [
      { type: 'horrorGhost', x: 650, y: 330 },
      { type: 'horrorGhost', x: 1750, y: 330 },
      { type: 'horrorGhost', x: 2400, y: 330 },
      { type: 'toxicCrawler', x: 3000, y: 470 }
    ],
    exitPortal: { x: 3750, y: 440, w: 50, h: 80 }
  },

  6: {
    id: 6, name: 'غرفة الجامب سكيرز', nameEn: 'Jumpscare Chamber', heroId: 'mlzlz',
    width: 3800, height: 650, theme: 'horror', skyColor: '#0a001a',
    requiredSubsQuota: 95000,
    objectiveType: 'SURVIVE_TIMER', objectiveTitle: 'الصمود التكتيكي',
    objectiveDesc: 'اصمد لمدة 60 ثانية واجمع 95,000 مشترك ضد هجوم الأشباح!', objectiveTimeLimit: 60,
    platforms: [
      { x: 0, y: 520, w: 3800, h: 100, type: 'stone' },
      { x: 400, y: 380, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 900, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 1500, y: 380, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2100, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2700, y: 380, w: 240, h: 20, type: 'wood', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin20k', value: 20000 },
      { x: 950, y: 220, type: 'subCoin20k', value: 20000 },
      { x: 1550, y: 330, type: 'subCoin20k', value: 20000 },
      { x: 2150, y: 220, type: 'subCoin20k', value: 20000 },
      { x: 2750, y: 330, type: 'subDiamond50k', value: 25000 },
      { x: 1800, y: 480, type: 'karak' }
    ],
    enemies: [
      { type: 'horrorGhost', x: 500, y: 340 },
      { type: 'horrorGhost', x: 1100, y: 340 },
      { type: 'horrorGhost', x: 1800, y: 340 },
      { type: 'horrorGhost', x: 2500, y: 340 }
    ],
    exitPortal: { x: 3650, y: 440, w: 50, h: 80 }
  },

  7: {
    id: 7, name: 'قصر الأسرار', nameEn: 'Mansion of Secrets', heroId: 'mlzlz',
    width: 4000, height: 650, theme: 'horror', skyColor: '#050d1a',
    requiredSubsQuota: 100000,
    objectiveType: 'COLLECT', objectiveTitle: 'فك شفرات القصر',
    objectiveDesc: 'اعثر على 3 مفاتيح مشفرة واجمع 100,000 مشترك!', objectiveTarget: 3,
    platforms: [
      { x: 0, y: 520, w: 4000, h: 100, type: 'stone' },
      { x: 350, y: 390, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 850, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 1450, y: 390, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2050, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2700, y: 390, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 3300, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 900, y: 220, type: 'secretKey' },
      { x: 2150, y: 220, type: 'secretKey' },
      { x: 3400, y: 220, type: 'secretKey' },
      { x: 450, y: 340, type: 'subCoin20k', value: 20000 },
      { x: 1550, y: 340, type: 'subCoin25k', value: 25000 },
      { x: 2800, y: 340, type: 'subDiamond50k', value: 35000 },
      { x: 1800, y: 480, type: 'karak' }
    ],
    enemies: [
      { type: 'horrorGhost', x: 600, y: 340 },
      { type: 'horrorGhost', x: 1700, y: 340 },
      { type: 'horrorGhost', x: 2900, y: 340 }
    ],
    exitPortal: { x: 3850, y: 440, w: 50, h: 80 }
  },

  8: {
    id: 8, name: 'شبح الديسلايك الأسود', nameEn: 'Black Dislike Ghost Arena', heroId: 'mlzlz',
    width: 3800, height: 650, theme: 'bossArena', skyColor: '#120024',
    requiredSubsQuota: 110000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'طرد شبح الديسلايك',
    objectiveDesc: 'اسكب الشاي الساخن واهزم شبح الديسلايك وحرر 110,000 مشترك!',
    platforms: [
      { x: 0, y: 520, w: 3800, h: 100, type: 'stone' },
      { x: 400, y: 380, w: 220, h: 20, type: 'wood', isOneWay: true },
      { x: 900, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 1500, y: 380, w: 240, h: 20, type: 'wood', isOneWay: true },
      { x: 2100, y: 270, w: 240, h: 20, type: 'wood', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin25k', value: 25000 },
      { x: 950, y: 220, type: 'subCoin25k', value: 25000 },
      { x: 1600, y: 330, type: 'subCoin30k', value: 30000 },
      { x: 2200, y: 220, type: 'subDiamond50k', value: 40000 },
      { x: 1200, y: 480, type: 'karak' }
    ],
    enemies: [{ type: 'horrorGhost', x: 700, y: 340 }],
    boss: { type: 'dislikeGhost', x: 2500, y: 300 },
    exitPortal: { x: 3650, y: 440, w: 50, h: 80 }
  },

  // Stages 9-12: oCMz Anime & Minecraft Clouds Arc
  9: {
    id: 9, name: 'جزر البلوكات العائمة', nameEn: 'Floating Block Islands', heroId: 'ocmz',
    width: 4200, height: 650, theme: 'cloud', skyColor: '#0c2461',
    requiredSubsQuota: 120000,
    objectiveType: 'KILL_COUNT', objectiveTitle: 'إسقاط قراصنة الجليتش',
    objectiveDesc: 'اقضِ على 12 قرصان جليتش طائر بقبعة القش واجمع 120,000 مشترك!', objectiveTarget: 12,
    platforms: [
      { x: 0, y: 520, w: 4200, h: 100, type: 'grass' },
      { x: 300, y: 390, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 750, y: 280, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1250, y: 390, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1750, y: 280, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2350, y: 390, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2900, y: 280, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3450, y: 390, w: 240, h: 20, type: 'cloudBlock', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 350, y: 340, type: 'subCoin20k', value: 20000 },
      { x: 800, y: 230, type: 'subCoin25k', value: 25000 },
      { x: 1350, y: 340, type: 'subCoin25k', value: 25000 },
      { x: 1850, y: 230, type: 'subCoin30k', value: 30000 },
      { x: 2450, y: 340, type: 'subDiamond50k', value: 35000 },
      { x: 1500, y: 480, type: 'shawarma' }
    ],
    enemies: Array.from({ length: 12 }, (_, i) => ({
      type: 'glitchPirate',
      x: 350 + i * 300,
      y: 320
    })),
    exitPortal: { x: 4050, y: 440, w: 50, h: 80 }
  },

  10: {
    id: 10, name: 'تشغيل السفينة الجوية', nameEn: 'Power Up Airship', heroId: 'ocmz',
    width: 4400, height: 650, theme: 'cloud', skyColor: '#1e3799',
    requiredSubsQuota: 130000,
    objectiveType: 'COLLECT', objectiveTitle: 'شحن بطاريات السفينة',
    objectiveDesc: 'اجمع 4 بطاريات داتا واجمع 130,000 مشترك لتشغيل المحركات!', objectiveTarget: 4,
    platforms: [
      { x: 0, y: 520, w: 4400, h: 100, type: 'grass' },
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
      { x: 1800, y: 340, type: 'subDiamond50k', value: 40000 },
      { x: 2000, y: 480, type: 'shawarma' }
    ],
    enemies: [
      { type: 'glitchPirate', x: 600, y: 320 },
      { type: 'glitchPirate', x: 1400, y: 320 },
      { type: 'glitchPirate', x: 2500, y: 320 },
      { type: 'glitchPirate', x: 3200, y: 320 }
    ],
    exitPortal: { x: 4250, y: 440, w: 50, h: 80 }
  },

  11: {
    id: 11, name: 'باركور السحاب', nameEn: 'Cloud Parkour', heroId: 'ocmz',
    width: 4500, height: 650, theme: 'cloud', skyColor: '#0a3d62',
    requiredSubsQuota: 140000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'باركور القفز الثلاثي',
    objectiveDesc: 'اقفز بالقفز الثلاثي دون سقوط واجمع 140,000 مشترك!', objectiveTarget: 1,
    platforms: [
      { x: 0, y: 520, w: 800, h: 100, type: 'grass' },
      { x: 900, y: 410, w: 200, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1300, y: 300, w: 200, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1700, y: 200, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2150, y: 320, w: 200, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2550, y: 200, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3000, y: 320, w: 200, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3450, y: 200, w: 220, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 3850, y: 520, w: 650, h: 100, type: 'grass' }
    ],
    hazards: [{ x: 800, y: 580, w: 3050, h: 70, type: 'bottomlessCloud' }],
    pickups: [
      { x: 950, y: 360, type: 'subCoin25k', value: 25000 },
      { x: 1350, y: 250, type: 'subCoin25k', value: 25000 },
      { x: 1750, y: 150, type: 'subCoin35k', value: 35000 },
      { x: 2200, y: 270, type: 'subCoin35k', value: 35000 },
      { x: 2600, y: 150, type: 'subDiamond50k', value: 45000 }
    ],
    enemies: [
      { type: 'glitchPirate', x: 1750, y: 160 },
      { type: 'glitchPirate', x: 2600, y: 160 }
    ],
    exitPortal: { x: 4300, y: 440, w: 50, h: 80 }
  },

  12: {
    id: 12, name: 'كابتن الباند الطائر', nameEn: 'Captain Ban Airship Arena', heroId: 'ocmz',
    width: 4000, height: 650, theme: 'bossArena', skyColor: '#1e272e',
    requiredSubsQuota: 150000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'إسقاط منطاد الباند',
    objectiveDesc: 'اهزم كابتن الباند الطائر وحرر 150,000 مشترك!',
    platforms: [
      { x: 0, y: 520, w: 4000, h: 100, type: 'grass' },
      { x: 400, y: 380, w: 240, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 950, y: 260, w: 260, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 1600, y: 380, w: 260, h: 20, type: 'cloudBlock', isOneWay: true },
      { x: 2300, y: 260, w: 260, h: 20, type: 'cloudBlock', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin35k', value: 35000 },
      { x: 1000, y: 210, type: 'subCoin35k', value: 35000 },
      { x: 1700, y: 330, type: 'subCoin40k', value: 40000 },
      { x: 2400, y: 210, type: 'subDiamond50k', value: 50000 },
      { x: 1200, y: 480, type: 'shawarma' }
    ],
    enemies: [{ type: 'glitchPirate', x: 800, y: 320 }],
    boss: { type: 'captainBan', x: 2600, y: 260 },
    exitPortal: { x: 3850, y: 440, w: 50, h: 80 }
  },

  // Stages 13-16: Abu Abed Workshop & Mines Arc
  13: {
    id: 13, name: 'النزول إلى المنجم', nameEn: 'Descent to Redstone Mines', heroId: 'abuAbed',
    width: 4400, height: 650, theme: 'mines', skyColor: '#1e0c00',
    requiredSubsQuota: 160000,
    objectiveType: 'COLLECT', objectiveTitle: 'استخراج سبائك الريدستون',
    objectiveDesc: 'اجمع 20 سبيكة ريدستون و160,000 مشترك لصناعة دروع الورشة!', objectiveTarget: 20,
    platforms: [
      { x: 0, y: 520, w: 4400, h: 100, type: 'oreStone' },
      { x: 300, y: 390, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 750, y: 280, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1300, y: 390, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1850, y: 280, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 2450, y: 390, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 3050, y: 280, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 3650, y: 390, w: 240, h: 20, type: 'woodMine', isOneWay: true }
    ],
    hazards: [{ x: 1100, y: 500, w: 90, h: 20, type: 'lavaSpill' }],
    pickups: [
      ...Array.from({ length: 20 }, (_, i) => ({ x: 220 + i * 190, y: 220 + (i % 3) * 60, type: 'redstoneIngot' })),
      { x: 400, y: 340, type: 'subCoin35k', value: 35000 },
      { x: 1400, y: 340, type: 'subCoin45k', value: 45000 },
      { x: 2500, y: 340, type: 'subDiamond50k', value: 50000 },
      { x: 1600, y: 480, type: 'shawarma' }
    ],
    enemies: [
      { type: 'cyberSpider', x: 600, y: 470 },
      { type: 'cyberSpider', x: 1500, y: 470 },
      { type: 'cyberSpider', x: 2700, y: 470 },
      { type: 'cyberSpider', x: 3400, y: 470 }
    ],
    exitPortal: { x: 4250, y: 440, w: 50, h: 80 }
  },

  14: {
    id: 14, name: 'انعكاس الليزر', nameEn: 'Optical Mirror Puzzle', heroId: 'abuAbed',
    width: 4200, height: 650, theme: 'mines', skyColor: '#2d1400',
    requiredSubsQuota: 170000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'تفعيل المرايا الشمسية',
    objectiveDesc: 'وجه شعاع الصلعة الذهبية على 4 مرايا لفتح البوابة مع 170,000 مشترك!', objectiveTarget: 4,
    platforms: [
      { x: 0, y: 520, w: 4200, h: 100, type: 'oreStone' },
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
      { x: 1700, y: 340, type: 'subDiamond50k', value: 50000 },
      { x: 1200, y: 480, type: 'shawarma' }
    ],
    interactiveObjects: [
      { id: 'mirror_1', type: 'mirror', x: 500, y: 360, activated: false },
      { id: 'mirror_2', type: 'mirror', x: 1050, y: 250, activated: false },
      { id: 'mirror_3', type: 'mirror', x: 1700, y: 360, activated: false },
      { id: 'mirror_4', type: 'mirror', x: 3100, y: 360, activated: false }
    ],
    enemies: [
      { type: 'cyberSpider', x: 750, y: 470 },
      { type: 'cyberSpider', x: 2000, y: 470 },
      { type: 'cyberSpider', x: 3400, y: 470 }
    ],
    exitPortal: { x: 4050, y: 440, w: 50, h: 80 }
  },

  15: {
    id: 15, name: 'الدفاع عن المولد', nameEn: 'Generator Defense', heroId: 'abuAbed',
    width: 4000, height: 650, theme: 'mines', skyColor: '#1e0000',
    requiredSubsQuota: 180000,
    objectiveType: 'SURVIVE_TIMER', objectiveTitle: 'حماية المولد',
    objectiveDesc: 'انشر برج الريدستون واحمِ المولد لمدة 75 ثانية واجمع 180,000 مشترك!', objectiveTimeLimit: 75,
    platforms: [
      { x: 0, y: 520, w: 4000, h: 100, type: 'oreStone' },
      { x: 400, y: 380, w: 220, h: 20, type: 'woodMine', isOneWay: true },
      { x: 950, y: 270, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1600, y: 380, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 2300, y: 270, w: 240, h: 20, type: 'woodMine', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin45k', value: 45000 },
      { x: 1000, y: 220, type: 'subCoin45k', value: 45000 },
      { x: 1700, y: 330, type: 'subDiamond50k', value: 50000 },
      { x: 1800, y: 480, type: 'shawarma' }
    ],
    enemies: [
      { type: 'cyberSpider', x: 600, y: 470 },
      { type: 'cyberSpider', x: 1200, y: 470 },
      { type: 'cyberSpider', x: 2000, y: 470 },
      { type: 'cyberSpider', x: 2800, y: 470 }
    ],
    exitPortal: { x: 3850, y: 440, w: 50, h: 80 }
  },

  16: {
    id: 16, name: 'الحفار الفولاذي', nameEn: 'Glitch Drill Arena', heroId: 'abuAbed',
    width: 4000, height: 650, theme: 'bossArena', skyColor: '#2b1b00',
    requiredSubsQuota: 190000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'تحطيم الحفار العملاق',
    objectiveDesc: 'حطم حفار الجليتش وحرر 190,000 مشترك!',
    platforms: [
      { x: 0, y: 520, w: 4000, h: 100, type: 'oreStone' },
      { x: 400, y: 380, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 950, y: 260, w: 240, h: 20, type: 'woodMine', isOneWay: true },
      { x: 1600, y: 380, w: 260, h: 20, type: 'woodMine', isOneWay: true },
      { x: 2400, y: 260, w: 240, h: 20, type: 'woodMine', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subCoin45k', value: 45000 },
      { x: 1000, y: 210, type: 'subCoin45k', value: 45000 },
      { x: 1700, y: 330, type: 'subDiamond50k', value: 50000 },
      { x: 1300, y: 480, type: 'shawarma' }
    ],
    enemies: [{ type: 'cyberSpider', x: 800, y: 470 }],
    boss: { type: 'glitchDrill', x: 2700, y: 300 },
    exitPortal: { x: 3850, y: 440, w: 50, h: 80 }
  },

  // Stages 17-20: oPiiLz Motherboard & Final Grand Algorithm Climax
  17: {
    id: 17, name: 'اختراق اللوحة الأم', nameEn: 'Motherboard Infiltration', heroId: 'opiilz',
    width: 4400, height: 650, theme: 'cyber', skyColor: '#0a001a',
    requiredSubsQuota: 200000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'تفكيك دوائر الأمان',
    objectiveDesc: 'فكك 6 دوائر أمان بالمفك الأسطوري واجمع 200,000 مشترك في أقل من 60 ثانية!', objectiveTarget: 6,
    platforms: [
      { x: 0, y: 520, w: 4400, h: 100, type: 'circuit' },
      { x: 350, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 850, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1450, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2050, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2700, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 3350, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true }
    ],
    hazards: [{ x: 1100, y: 500, w: 80, h: 20, type: 'electricLaser' }],
    pickups: [
      { x: 400, y: 340, type: 'subCoin50k', value: 50000 },
      { x: 900, y: 230, type: 'subCoin50k', value: 50000 },
      { x: 1500, y: 340, type: 'subCoin50k', value: 50000 },
      { x: 2100, y: 230, type: 'subDiamond50k', value: 50000 },
      { x: 1750, y: 480, type: 'shawarma' }
    ],
    interactiveObjects: [
      { id: 'circuit_1', type: 'circuit', x: 400, y: 360, activated: false },
      { id: 'circuit_2', type: 'circuit', x: 900, y: 250, activated: false },
      { id: 'circuit_3', type: 'circuit', x: 1500, y: 360, activated: false },
      { id: 'circuit_4', type: 'circuit', x: 2100, y: 250, activated: false },
      { id: 'circuit_5', type: 'circuit', x: 2750, y: 360, activated: false },
      { id: 'circuit_6', type: 'circuit', x: 3400, y: 250, activated: false }
    ],
    enemies: [
      { type: 'glitchBot', x: 650, y: 470 },
      { type: 'glitchBot', x: 1750, y: 470 },
      { type: 'glitchBot', x: 3000, y: 470 }
    ],
    exitPortal: { x: 4250, y: 440, w: 50, h: 80 }
  },

  18: {
    id: 18, name: 'غرفة تبريد السيرفر', nameEn: 'Server Cooling Core', heroId: 'opiilz',
    width: 4400, height: 650, theme: 'cyber', skyColor: '#001a1a',
    requiredSubsQuota: 220000,
    objectiveType: 'PUZZLE_TRIGGER', objectiveTitle: 'تجميد صمامات الليزر',
    objectiveDesc: 'جمد 5 صمامات ليزرية واجمع 220,000 مشترك لفتح بوابة البرج!', objectiveTarget: 5,
    platforms: [
      { x: 0, y: 520, w: 4400, h: 100, type: 'circuit' },
      { x: 350, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 900, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1500, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2150, y: 280, w: 240, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2800, y: 390, w: 220, h: 20, type: 'neonSteel', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 400, y: 340, type: 'subCoin50k', value: 50000 },
      { x: 950, y: 230, type: 'subCoin50k', value: 50000 },
      { x: 1550, y: 340, type: 'subDiamond50k', value: 60000 },
      { x: 2200, y: 230, type: 'subDiamond50k', value: 60000 },
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
      { type: 'eliteGuard', x: 700, y: 470 },
      { type: 'eliteGuard', x: 1900, y: 470 },
      { type: 'eliteGuard', x: 3100, y: 470 }
    ],
    exitPortal: { x: 4250, y: 440, w: 50, h: 80 }
  },

  19: {
    id: 19, name: 'بوابة برج الحظر (تحالف الأبطال)', nameEn: 'Ban Tower Tag-Team', heroId: 'banderita',
    width: 4800, height: 650, theme: 'cyber', skyColor: '#1e0024',
    requiredSubsQuota: 240000,
    objectiveType: 'KILL_COUNT', objectiveTitle: 'سحق حراس النخبة',
    objectiveDesc: 'اقضِ على 16 حارس نخبوي واستخدم أبطالك الخمسة واجمع 240,000 مشترك!', objectiveTarget: 16,
    platforms: [
      { x: 0, y: 520, w: 4800, h: 100, type: 'circuit' },
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
      { x: 1450, y: 340, type: 'subDiamond50k', value: 50000 },
      { x: 2050, y: 230, type: 'subDiamond50k', value: 50000 },
      { x: 2650, y: 340, type: 'subDiamond50k', value: 50000 },
      { x: 1700, y: 480, type: 'shawarma' },
      { x: 3500, y: 480, type: 'karak' }
    ],
    enemies: Array.from({ length: 16 }, (_, i) => ({
      type: 'eliteGuard',
      x: 350 + i * 260,
      y: 470
    })),
    exitPortal: { x: 4650, y: 440, w: 50, h: 80 }
  },

  20: {
    id: 20, name: 'المعركة الكبرى: الخوارزمية المظلمة', nameEn: 'The Dark Algorithm (Error 404)', heroId: 'banderita',
    width: 4800, height: 650, theme: 'bossArena', skyColor: '#3d0014',
    requiredSubsQuota: 250000,
    objectiveType: 'BOSS_DEFEAT', objectiveTitle: 'كسر كود الخوارزمية (Error 404)',
    objectiveDesc: 'اهزم الخوارزمية المظلمة عبر أطوارها واستعد كافة المشتركين (250,000+)!',
    platforms: [
      { x: 0, y: 520, w: 4800, h: 100, type: 'circuit' },
      { x: 400, y: 380, w: 260, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1000, y: 260, w: 260, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 1700, y: 380, w: 280, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 2400, y: 260, w: 280, h: 20, type: 'neonSteel', isOneWay: true },
      { x: 3200, y: 380, w: 280, h: 20, type: 'neonSteel', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 450, y: 330, type: 'subDiamond50k', value: 50000 },
      { x: 1050, y: 210, type: 'subDiamond50k', value: 50000 },
      { x: 1750, y: 330, type: 'subDiamond50k', value: 50000 },
      { x: 2450, y: 210, type: 'subDiamond50k', value: 50000 },
      { x: 3250, y: 330, type: 'subDiamond50k', value: 50000 },
      { x: 1200, y: 480, type: 'shawarma' },
      { x: 2800, y: 480, type: 'karak' }
    ],
    enemies: [{ type: 'eliteGuard', x: 800, y: 470 }],
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
    this.checkpoints = [{ x: 80, y: 420 }];
    this.lastCheckpoint = { x: 80, y: 420 };
    this.pingLagZones = [];
    this.boss = null;
    this.portal = null;
    this.midDialogueTriggered = false;
    this.animTick = 0;
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

    // Checkpoints & Ping 999ms Zones
    this.checkpoints = [
      { x: 80, y: 420 },
      { x: Math.floor(this.stage.width * 0.5), y: 400 }
    ];
    this.lastCheckpoint = { x: 80, y: 420 };

    this.pingLagZones = [
      { x: Math.floor(this.stage.width * 0.35), w: 300 },
      { x: Math.floor(this.stage.width * 0.7), w: 300 }
    ];

    // Instantiate Enemies (Defensive parameters)
    this.enemies = [];
    if (this.stage.enemies) {
      for (const e of this.stage.enemies) {
        this.enemies.push(new window.Enemy(e.type, e.x, e.y));
      }
    }

    // Add 1 Unskippable Ad Barrier in every regular level
    if (!this.stage.boss && this.stage.width > 2000) {
      this.enemies.push(new window.Enemy('unskippableAdBarrier', Math.floor(this.stage.width * 0.6), 440));
      this.enemies.push(new window.Enemy('copyrightDrone', Math.floor(this.stage.width * 0.45), 320));
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

  loadBossRushStage(bossIndex = 1) {
    const bossTypes = ['lagTitan', 'dislikeGhost', 'captainBan', 'glitchDrill', 'darkAlgorithm'];
    const bType = bossTypes[bossIndex - 1] || 'lagTitan';

    this.currentStageIndex = `B-${bossIndex}`;
    this.stage = {
      id: `BR-${bossIndex}`,
      name: `بوس راش: زعيم ${bossIndex}/5`,
      nameEn: `Boss Rush ${bossIndex}/5`,
      heroId: 'banderita',
      width: 3600,
      height: 650,
      skyColor: '#1e0024',
      requiredSubsQuota: 0,
      objectiveType: 'BOSS_DEFEAT',
      objectiveTitle: `سحق الزعيم ${bossIndex}`,
      objectiveDesc: 'اهزم الزعيم للانتقال للزعيم التالي فوراً!'
    };

    this.platforms = [
      { x: 0, y: 520, w: 3600, h: 100, type: 'steel' },
      { x: 400, y: 380, w: 240, h: 20, type: 'holo', isOneWay: true },
      { x: 900, y: 270, w: 240, h: 20, type: 'steel', isOneWay: true },
      { x: 1500, y: 380, w: 240, h: 20, type: 'holo', isOneWay: true }
    ];
    this.hazards = [];
    this.pickups = [
      { x: 500, y: 330, type: 'shawarma' },
      { x: 1000, y: 220, type: 'karak' }
    ];
    this.interactiveObjects = [];
    this.enemies = [];
    this.boss = new window.Boss(bType, 2200, 300);
    this.portal = { x: 3450, y: 440, w: 50, h: 80 };
    this.lastCheckpoint = { x: 80, y: 420 };
    this.pingLagZones = [];

    if (window.game && window.game.objectives) {
      window.game.objectives.initObjective(this.stage);
    }
  }

  update(player) {
    this.animTick++;

    // Check Pickups
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const p = this.pickups[i];
      if (player.x + player.width > p.x - 18 && player.x < p.x + 18 &&
          player.y + player.height > p.y - 18 && player.y < p.y + 18) {

        if (p.type.startsWith('subCoin') || p.type.startsWith('subDiamond')) {
          const subs = p.value || 10000;
          if (window.game) window.game.addSubscribers(subs);
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 12, ['#ffd700', '#ffffff', '#ff0055'], 2, 5);
          window.particles.addFloatingText(p.x, p.y - 10, `+${subs.toLocaleString()} 👥`, '#ffd700', 13);
        } else if (p.type === 'potatoSack') {
          if (window.game && window.game.objectives) window.game.objectives.recordCollect('potatoSack');
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 10, ['#f39c12', '#ffd700'], 1, 4);
          window.particles.addFloatingText(p.x, p.y - 10, '+1 كيس بطاطس 🥔', '#f5cd79', 12);
        } else if (p.type === 'dataBattery') {
          if (window.game && window.game.objectives) window.game.objectives.recordCollect('dataBattery');
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 10, ['#00d2d3', '#ffffff'], 2, 5);
          window.particles.addFloatingText(p.x, p.y - 10, '+1 بطارية داتا 🔋', '#00d2d3', 12);
        } else if (p.type === 'secretKey') {
          if (window.game && window.game.objectives) window.game.objectives.recordCollect('secretKey');
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 12, ['#9b59b6', '#ffd700'], 2, 5);
          window.particles.addFloatingText(p.x, p.y - 10, '+1 مفتاح مشفر 🗝️', '#9b59b6', 12);
        } else if (p.type === 'redstoneIngot') {
          if (window.game && window.game.objectives) window.game.objectives.recordCollect('redstoneIngot');
          if (window.audio) window.audio.sfxCoin();
          window.particles.burst(p.x, p.y, 10, ['#ff4757', '#ffd700'], 2, 5);
          window.particles.addFloatingText(p.x, p.y - 10, '+1 سبيكة ريدستون 🔴', '#ff4757', 12);
        } else if (p.type === 'shawarma') {
          player.heal(40);
        } else if (p.type === 'karak') {
          player.heal(60);
          player.addEnergy(30);
        }

        this.pickups.splice(i, 1);
      }
    }

    // Checkpoints Trigger
    for (const cp of this.checkpoints) {
      if (player.x >= cp.x && this.lastCheckpoint.x < cp.x) {
        this.lastCheckpoint = cp;
        if (window.particles) {
          window.particles.burst(cp.x, cp.y, 14, ['#2ed573', '#ffffff', '#ffd700'], 2, 6);
          window.particles.addFloatingText(cp.x, cp.y - 20, '🚩 نقطة حفظ (CHECKPOINT)!', '#2ed573', 14);
        }
      }
    }

    // Ping 999ms Lag Zone Check
    for (const zone of this.pingLagZones) {
      if (player.x >= zone.x && player.x <= zone.x + zone.w) {
        if (player.lagTimer <= 0) {
          player.lagTimer = 180; // 3 seconds lag
          if (window.audio) window.audio.sfxPortalLocked();
          if (window.particles) {
            window.particles.burst(player.x, player.y, 10, ['#ff4757', '#fffa65'], 2, 4);
          }
        }
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

    // Parallax scrolling city skyline & clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    for (let i = 0; i < 20; i++) {
      const bx = ((i * 300) - (cameraX * 0.2)) % (width + 600);
      ctx.fillRect(bx - 100, 160, 140, 420);
      // Windows
      ctx.fillStyle = 'rgba(255, 215, 0, 0.08)';
      ctx.fillRect(bx - 80, 200, 20, 20);
      ctx.fillRect(bx - 40, 240, 20, 20);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    }
    ctx.restore();
  }

  // --------------------------------------------------------------------------
  // Detailed 16-Bit Pixel-Art Level Elements & Pickups Renderer
  // --------------------------------------------------------------------------
  drawLevel(ctx, cameraX, cameraY) {
    const bob = Math.sin(this.animTick * 0.08) * 3;

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
        ctx.fillStyle = '#2f2b4a';
        for (let bx = 0; bx < p.w; bx += 40) {
          ctx.fillRect(px + bx, py + 8, 36, 12);
        }
      } else if (p.type === 'steel' || p.type === 'neonSteel') {
        ctx.fillStyle = '#2c3e50';
        ctx.fillRect(px, py, p.w, p.h);
        ctx.fillStyle = '#00d2d3';
        ctx.fillRect(px, py, p.w, 3);
        ctx.fillStyle = '#34495e';
        ctx.fillRect(px + 4, py + 6, p.w - 8, 4);
      } else {
        // Hologram / Cloud Platform
        ctx.fillStyle = 'rgba(0, 210, 211, 0.35)';
        ctx.fillRect(px, py, p.w, p.h);
        ctx.fillStyle = '#00d2d3';
        ctx.fillRect(px, py, p.w, 3);
      }
      ctx.restore();
    }

    // 2. Draw Interactive Objects (Lanterns, Mirrors, Circuits)
    for (const obj of this.interactiveObjects) {
      const ox = Math.round(obj.x - cameraX);
      const oy = Math.round(obj.y - cameraY);

      ctx.save();
      if (obj.type === 'teaLantern') {
        // 16-Bit Tea Lantern
        ctx.fillStyle = '#2f3542';
        ctx.fillRect(ox - 8, oy - 26, 16, 4);
        ctx.fillStyle = obj.activated ? '#ffd700' : '#57606f';
        ctx.fillRect(ox - 10, oy - 22, 20, 22);
        if (obj.activated) {
          ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
          ctx.beginPath();
          ctx.arc(ox, oy - 11, 35, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (obj.type === 'mirror') {
        // 16-Bit Optical Solar Mirror
        ctx.fillStyle = '#747d8c';
        ctx.fillRect(ox - 4, oy - 28, 8, 32);
        ctx.fillStyle = obj.activated ? '#00d2d3' : '#a4b0be';
        ctx.fillRect(ox - 8, oy - 24, 16, 20);
      } else if (obj.type === 'circuit' || obj.type === 'laserValve') {
        // 16-Bit Circuit Terminal
        ctx.fillStyle = '#2f3542';
        ctx.fillRect(ox - 12, oy - 14, 24, 24);
        ctx.fillStyle = obj.activated ? '#2ed573' : '#ff4757';
        ctx.fillRect(ox - 8, oy - 10, 16, 16);
      }
      ctx.restore();
    }

    // 3. Draw 16-Bit Pixel-Art Pickups
    for (const p of this.pickups) {
      const px = Math.round(p.x - cameraX);
      const py = Math.round(p.y - cameraY + bob);

      ctx.save();
      if (p.type.startsWith('subDiamond')) {
        // Diamond 50k Badge
        ctx.fillStyle = '#70a1ff';
        ctx.beginPath();
        ctx.moveTo(px, py - 12);
        ctx.lineTo(px + 12, py);
        ctx.lineTo(px, py + 12);
        ctx.lineTo(px - 12, py);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - 3, py - 3, 6, 6);
      } else if (p.type.startsWith('subCoin')) {
        // 16-Bit YouTube Play Button Medal
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(px - 12, py - 10, 24, 20);
        ctx.fillStyle = '#ff0055';
        ctx.fillRect(px - 10, py - 8, 20, 16);
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(px - 3, py - 5);
        ctx.lineTo(px + 5, py);
        ctx.lineTo(px - 3, py + 5);
        ctx.closePath();
        ctx.fill();
      } else if (p.type === 'potatoSack') {
        // 16-Bit Golden Potato Sack
        ctx.fillStyle = '#f5cd79';
        ctx.fillRect(px - 10, py - 12, 20, 22);
        ctx.fillStyle = '#eccc68';
        ctx.fillRect(px - 8, py - 10, 16, 4);
        ctx.fillStyle = '#d35400';
        ctx.fillRect(px - 6, py - 2, 12, 8);
      } else if (p.type === 'dataBattery') {
        // 16-Bit Cyber Battery
        ctx.fillStyle = '#2f3542';
        ctx.fillRect(px - 8, py - 12, 16, 24);
        ctx.fillStyle = '#00d2d3';
        ctx.fillRect(px - 5, py - 8, 10, 16);
      } else if (p.type === 'secretKey') {
        // 16-Bit Ornate Purple Key
        ctx.fillStyle = '#9b59b6';
        ctx.fillRect(px - 8, py - 10, 16, 6);
        ctx.fillRect(px - 2, py - 4, 4, 16);
        ctx.fillRect(px + 2, py + 4, 6, 4);
      } else if (p.type === 'redstoneIngot') {
        // 16-Bit Redstone Ingot
        ctx.fillStyle = '#ff4757';
        ctx.fillRect(px - 10, py - 8, 20, 16);
        ctx.fillStyle = '#ff6b81';
        ctx.fillRect(px - 6, py - 4, 12, 8);
      } else if (p.type === 'shawarma') {
        // 16-Bit Wrapped Shawarma
        ctx.fillStyle = '#f5cd79';
        ctx.fillRect(px - 12, py - 6, 24, 12);
        ctx.fillStyle = '#2ed573';
        ctx.fillRect(px - 8, py - 4, 6, 8);
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(px + 2, py - 4, 6, 8);
      } else if (p.type === 'karak') {
        // 16-Bit Karak Tea Cup
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - 8, py - 8, 16, 16);
        ctx.fillStyle = '#e67e22';
        ctx.fillRect(px - 6, py - 4, 12, 10);
      }
      ctx.restore();
    }

    // 4. Draw Exit Portal (Glow & State)
    if (this.portal) {
      const isQuestDone = window.game && window.game.objectives && window.game.objectives.isCompleted;
      const hasEnoughSubs = window.game && (window.game.levelSubscribers >= this.stage.requiredSubsQuota);
      const isFullyUnlocked = isQuestDone && hasEnoughSubs;

      const ptx = Math.round(this.portal.x - cameraX);
      const pty = Math.round(this.portal.y - cameraY);

      ctx.save();
      // Outer Frame
      ctx.fillStyle = '#2f3542';
      ctx.fillRect(ptx - 6, pty - 6, 52, 92);

      // Energy Field
      ctx.fillStyle = isFullyUnlocked ? 'rgba(46, 213, 115, 0.85)' : 'rgba(255, 71, 87, 0.4)';
      ctx.fillRect(ptx, pty, 40, 80);

      // Vortex lines
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(ptx + 10, pty + 10 + (this.animTick % 60), 20, 4);

      ctx.font = 'bold 10px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillStyle = isFullyUnlocked ? '#2ed573' : '#ff4757';
      const portalLabel = isFullyUnlocked ? '🚪 البوابة مفتوحة' : '🔒 اجمع المشتركين';
      ctx.fillText(portalLabel, ptx + 20, pty - 10);
      ctx.restore();
    }
  }
}

window.CAMPAIGN_STAGES = CAMPAIGN_STAGES;
window.LevelManager = LevelManager;
