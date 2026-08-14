// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - YouTube Merch & Upgrades Shop
// ============================================================================

const SHOP_ITEMS = {
  // Banderita Upgrades
  cheese_tamees: {
    id: 'cheese_tamees',
    heroId: 'banderita',
    name: 'تميس بالجبن الأسطوري',
    nameEn: 'Legendary Cheese Tamees',
    desc: 'زيادة مدى القوس الناري بنسبة +30% وقوة دفع ارتدادية هائلة تسحق الأعداء.',
    cost: 50000,
    icon: '🧀🥖',
    category: 'weapon'
  },
  spicy_potato: {
    id: 'spicy_potato',
    heroId: 'banderita',
    name: 'بطاطس الشطة المتفجرة',
    nameEn: 'Spicy Cluster Potato',
    desc: 'تتفتت البطاطس عند الارتطام إلى 3 شظايا نارية متفجرة إضافية.',
    cost: 75000,
    icon: '🥔🌶️',
    category: 'weapon'
  },

  // MLZLZ Upgrades
  volcanic_karak: {
    id: 'volcanic_karak',
    heroId: 'mlzlz',
    name: 'شاي كرك بركاني',
    nameEn: 'Volcanic Karak Tea',
    desc: 'يترك رذاذ الشاي بركة نارية على الأرض تذيب وحوش الرعب والأشباح.',
    cost: 60000,
    icon: '🍵🌋',
    category: 'weapon'
  },

  // oCMz Upgrades
  diamond_straw_hat: {
    id: 'diamond_straw_hat',
    heroId: 'ocmz',
    name: 'قبعة القراصنة الماسية',
    nameEn: 'Diamond Straw Hat',
    desc: 'تخترق قبعة القش جميع الأعداء دون توقف وتعود فوراً بسرعة مضاعفة.',
    cost: 80000,
    icon: '👒💎',
    category: 'weapon'
  },

  // Abu Abed Upgrades
  reflective_shades: {
    id: 'reflective_shades',
    heroId: 'abuAbed',
    name: 'نظارة العكس الفولاذية',
    nameEn: 'Steel Reflective Shades',
    desc: 'مضاعفة مدى شعاع الصلعة الذهبية ونصف قطر الصعق لليزر الشمسي.',
    cost: 65000,
    icon: '🕶️✨',
    category: 'weapon'
  },

  // oPiiLz Upgrades
  teravolt_screwdriver: {
    id: 'teravolt_screwdriver',
    heroId: 'opiilz',
    name: 'مفك التيرافولت النبضي',
    nameEn: 'Teravolt Screwdriver',
    desc: 'صعق كهربي متسلسل يعطل حتى 3 روبوتات وأفخاخ ليزرية في ضربة واحدة.',
    cost: 70000,
    icon: '🪛⚡',
    category: 'weapon'
  },

  // Creator Skins
  skin_silver_suit: {
    id: 'skin_silver_suit',
    heroId: 'all',
    name: 'بدلة درع المئة ألف الفضية',
    nameEn: 'Silver Creator Suit',
    desc: 'درع فضي لامع يمنح +10% سرعة حركة لجميع الأبطال.',
    cost: 100000,
    icon: '🥈👔',
    category: 'skin'
  },
  skin_gold_armor: {
    id: 'skin_gold_armor',
    heroId: 'all',
    name: 'درع المليونير الذهبي الخارق',
    nameEn: 'Golden 1M Armor',
    desc: 'هالة ذهبية متوهجة تقلل الضرر المتلقى بنسبة 15%.',
    cost: 250000,
    icon: '🥇👑',
    category: 'skin'
  },
  skin_diamond_skin: {
    id: 'skin_diamond_skin',
    heroId: 'all',
    name: 'كسوة الـ 10 ملايين الماسية',
    nameEn: 'Diamond 10M Skin',
    desc: 'مظهر أسطوري ماسي يمنح مضاعفة شحن الـ Ultimate بنسبة 50%.',
    cost: 500000,
    icon: '💎✨',
    category: 'skin'
  }
};

class ShopManager {
  constructor() {
    this.purchasedItems = this.loadPurchased();
  }

  loadPurchased() {
    try {
      const data = localStorage.getItem('arab_gamers_shop_purchases');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  savePurchased() {
    try {
      localStorage.setItem('arab_gamers_shop_purchases', JSON.stringify(this.purchasedItems));
    } catch (e) {}
  }

  hasUpgrade(itemId) {
    return !!this.purchasedItems[itemId];
  }

  buyItem(itemId, totalSubs) {
    const item = SHOP_ITEMS[itemId];
    if (!item) return { success: false, reason: 'العنصر غير موجود' };
    if (this.hasUpgrade(itemId)) return { success: false, reason: 'تم شراء هذا العنصر بالفعل!' };
    if (totalSubs < item.cost) return { success: false, reason: `المشتركون غير كافيين! يتطلب ${item.cost.toLocaleString()} مشترك 👥` };

    this.purchasedItems[itemId] = true;
    this.savePurchased();

    if (window.audio) window.audio.sfxCoin();
    return { success: true, item: item, cost: item.cost };
  }
}

window.SHOP_ITEMS = SHOP_ITEMS;
window.ShopManager = ShopManager;
window.shop = new ShopManager();
