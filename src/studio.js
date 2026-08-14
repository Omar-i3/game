// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Studio Builder (غرفة البث الاحترافية)
// ============================================================================

const STUDIO_PERKS = {
  gaming_chair: {
    id: 'gaming_chair',
    name: 'كرسي الجيمنج الاحترافي',
    nameEn: 'Pro Gaming Chair',
    desc: 'راحة وثبات استثنائي يمنح زيادة في الصحة القصوى (+20% Max HP) لجميع الأبطال.',
    cost: 60000,
    icon: '💺✨'
  },
  ambient_rgb: {
    id: 'ambient_rgb',
    name: 'إضاءة نيون RGB المحيطية',
    nameEn: 'Ambient RGB Lighting',
    desc: 'أجواء حماسية تزيد سرعة ركض وحركة جميع الشخصيات بنسبة +15%.',
    cost: 75000,
    icon: '💡🌈'
  },
  studio_mic: {
    id: 'studio_mic',
    name: 'مايكروفون البودكاست الذهبي',
    nameEn: 'Golden Studio Mic',
    desc: 'صوت جهوري يزيد من تأثير وقوة مهارات الفزعة المتبادلة ويسرع شحنها بنسبة 25%.',
    cost: 80000,
    icon: '🎙️🥇'
  },
  gold_play_button: {
    id: 'gold_play_button',
    name: 'درع اليوتيوب الذهبي المعلق',
    nameEn: 'Mounted Gold Play Button',
    desc: 'فخر الإنجاز يرفع معدل كسب المشتركين في جميع المراحل بنسبة +30%.',
    cost: 150000,
    icon: '🏆⭐'
  },
  dual_monitors: {
    id: 'dual_monitors',
    name: 'شاشات العرض المنحنية المزدوجة',
    nameEn: 'Dual Curved Displays',
    desc: 'رؤية شاملة تكشف الممرات السرية ومواقع المفاتيح والألغاز على الخريطة تلقائياً.',
    cost: 200000,
    icon: '🖥️✨'
  }
};

class StudioManager {
  constructor() {
    this.unlockedPerks = this.loadPerks();
  }

  loadPerks() {
    try {
      const data = localStorage.getItem('arab_gamers_studio_perks');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  savePerks() {
    try {
      localStorage.setItem('arab_gamers_studio_perks', JSON.stringify(this.unlockedPerks));
    } catch (e) {}
  }

  hasPerk(perkId) {
    return !!this.unlockedPerks[perkId];
  }

  buyPerk(perkId, totalSubs) {
    const perk = STUDIO_PERKS[perkId];
    if (!perk) return { success: false, reason: 'العنصر غير موجود' };
    if (this.hasPerk(perkId)) return { success: false, reason: 'تم تأثيث هذا العنصر في غرفتك بالفعل!' };
    if (totalSubs < perk.cost) return { success: false, reason: `المشتركون غير كافيين! يتطلب ${perk.cost.toLocaleString()} مشترك 👥` };

    this.unlockedPerks[perkId] = true;
    this.savePerks();

    if (window.audio) window.audio.sfxVictory();
    return { success: true, perk: perk, cost: perk.cost };
  }
}

window.STUDIO_PERKS = STUDIO_PERKS;
window.StudioManager = StudioManager;
window.studio = new StudioManager();
