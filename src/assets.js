// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Asset & Sprite Loader Engine
// ============================================================================

class AssetLoader {
  constructor() {
    this.images = {};
    this.loaded = false;
    this.spritePaths = {
      // 1. BanderitaX Sprites
      banderita_idle: 'assets/sprites/banderita_idle.png',
      banderita_walk: 'assets/sprites/banderita_walk.png',
      banderita_attack: 'assets/sprites/banderita_attack.png',
      avatar_banderita: 'assets/sprites/avatar_banderita.png',

      // 2. MLZLZ Sprites
      mlzlz_idle: 'assets/sprites/mlzlz_idle.png',
      mlzlz_walk: 'assets/sprites/mlzlz_walk.png',
      mlzlz_attack: 'assets/sprites/mlzlz_attack.png',
      avatar_mlzlz: 'assets/sprites/avatar_mlzlz.png',

      // 3. oCMz Sprites
      ocmz_idle: 'assets/sprites/ocmz_idle.png',
      ocmz_walk: 'assets/sprites/ocmz_walk.png',
      ocmz_attack: 'assets/sprites/ocmz_attack.png',
      avatar_ocmz: 'assets/sprites/avatar_ocmz.png',

      // 4. Abu Abed (3Gaming) Sprites
      abuAbed_idle: 'assets/sprites/3gaming_idle.png',
      abuAbed_walk: 'assets/sprites/3gaming_walk.png',
      abuAbed_attack: 'assets/sprites/3gaming_attack.png',
      avatar_abuAbed: 'assets/sprites/avatar_3gaming.png',
      '3gaming_idle': 'assets/sprites/3gaming_idle.png',
      '3gaming_walk': 'assets/sprites/3gaming_walk.png',
      '3gaming_attack': 'assets/sprites/3gaming_attack.png',
      avatar_3gaming: 'assets/sprites/avatar_3gaming.png',

      // 5. oPiiLz Sprites
      opiilz_idle: 'assets/sprites/opiilz_idle.png',
      opiilz_walk: 'assets/sprites/opiilz_walk.png',
      opiilz_attack: 'assets/sprites/opiilz_attack.png',
      avatar_opiilz: 'assets/sprites/avatar_opiilz.png',

      // Bosses & Enemies
      boss_lag_titan: 'assets/sprites/boss_lag_titan.png',
      boss_dislike_ghost: 'assets/sprites/boss_dislike_ghost.png',
      boss_captain_ban: 'assets/sprites/boss_captain_ban.png',
      boss_glitch_drill: 'assets/sprites/boss_glitch_drill.png',
      boss_final: 'assets/sprites/boss_final.png'
    };
    this.init();
  }

  init() {
    let pending = Object.keys(this.spritePaths).length;
    for (const [key, path] of Object.entries(this.spritePaths)) {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        this.images[key] = img;
        pending--;
        if (pending <= 0) this.loaded = true;
      };
      img.onerror = () => {
        this.images[key] = null;
        pending--;
        if (pending <= 0) this.loaded = true;
      };
    }
  }

  getImage(key) {
    return this.images[key] || null;
  }
}

window.assets = new AssetLoader();
