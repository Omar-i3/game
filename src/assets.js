// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Asset & Sprite Loader Engine
// ============================================================================

class AssetLoader {
  constructor() {
    this.images = {};
    this.loaded = false;
    this.spritePaths = {
      // Heroes
      hero_banderita: 'assets/sprites/banderita.png',
      hero_mlzlz: 'assets/sprites/mlzlz.png',
      hero_ocmz: 'assets/sprites/osms.png',
      hero_abuAbed: 'assets/sprites/abuabed.png',
      hero_opiilz: 'assets/sprites/opels.png',

      // Weapons
      weapon_tamees: 'assets/sprites/weapon_tamees.png',
      weapon_potato: 'assets/sprites/weapon_potato.png',
      weapon_tea: 'assets/sprites/weapon_tea.png',
      weapon_hat: 'assets/sprites/weapon_hat.png',
      weapon_bald: 'assets/sprites/weapon_bald.png',
      weapon_screwdriver: 'assets/sprites/weapon_screwdriver.png',

      // Enemies & Bosses
      enemy_glitch: 'assets/sprites/enemy_glitch.png',
      enemy_dislike: 'assets/sprites/enemy_dislike.png',
      enemy_spider: 'assets/sprites/enemy_spider.png',
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
        // Fallback gracefully to procedural 16-bit canvas rendering
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
