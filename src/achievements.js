// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Retro Achievements Engine
// ============================================================================

const ACHIEVEMENTS_DATA = {
  speedrun_banderita: {
    id: 'speedrun_banderita',
    title: 'أسرع من اللاغ ⚡',
    titleEn: 'Faster Than Lag',
    desc: 'أنهِ أي مرحلة من مراحل بندريتا في أقل من 35 ثانية.',
    icon: '⚡🏎️'
  },
  no_damage_mlzlz: {
    id: 'no_damage_mlzlz',
    title: 'مخ مروّق 🍵',
    titleEn: 'Tactical Chill',
    desc: 'أنهِ مرحلة رعب لملزلز دون تلقي أي ضرر نهائياً مع ارتشاف الشاي.',
    icon: '🍵🧘'
  },
  million_subs: {
    id: 'million_subs',
    title: 'مليونية المشتركين 👑',
    titleEn: '1,000,000 Subscribers Club',
    desc: 'اجمع أكثر من 1,000,000 مشترك إجمالي عبر مسيرتك في اللعبة.',
    icon: '👑💎'
  },
  master_hacker: {
    id: 'master_hacker',
    title: 'المخترق العظيم 🔧',
    titleEn: 'Grand Cyber Hacker',
    desc: 'فكك وعطل 15 فخاً أو دائرة روبوتية بالمفك الأسطوري مع أوبلز.',
    icon: '🔧⚡'
  },
  bald_supremacy: {
    id: 'bald_supremacy',
    title: 'الصلعة التي لا تقهر 🛡️',
    titleEn: 'Invincible Bald Head',
    desc: 'اهزم أي زعيم باستخدام إشعاع الصلعة الذهبية لأبو عابد.',
    icon: '🛡️✨'
  }
};

class AchievementEngine {
  constructor() {
    this.unlocked = this.loadUnlocked();
    this.toastQueue = [];
    this.isShowingToast = false;
  }

  loadUnlocked() {
    try {
      const data = localStorage.getItem('arab_gamers_achievements');
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  }

  saveUnlocked() {
    try {
      localStorage.setItem('arab_gamers_achievements', JSON.stringify(this.unlocked));
    } catch (e) {}
  }

  isUnlocked(id) {
    return !!this.unlocked[id];
  }

  unlock(id) {
    if (this.unlocked[id]) return; // Already unlocked

    const ach = ACHIEVEMENTS_DATA[id];
    if (!ach) return;

    this.unlocked[id] = {
      unlockedAt: new Date().toISOString()
    };
    this.saveUnlocked();

    if (window.audio) window.audio.sfxVictory();
    this.showToast(ach);
  }

  showToast(ach) {
    const container = document.getElementById('achievement-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
      <div class="ach-toast-icon">${ach.icon}</div>
      <div class="ach-toast-details">
        <span class="ach-toast-badge">🏆 إنجاز مفتوح! (ACHIEVEMENT UNLOCKED)</span>
        <span class="ach-toast-title">${ach.title}</span>
        <span class="ach-toast-desc">${ach.desc}</span>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 4500);
  }
}

window.ACHIEVEMENTS_DATA = ACHIEVEMENTS_DATA;
window.AchievementEngine = AchievementEngine;
window.achievements = new AchievementEngine();
