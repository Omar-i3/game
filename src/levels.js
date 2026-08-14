// ============================================================================
// Arab Gamers: Pixel Legends - Level Layouts, Parallax Backgrounds & Pickups
// ============================================================================

const LEVEL_DATA = {
  1: {
    id: 1,
    name: 'يوتيوب سيتي',
    nameEn: 'YouTube Neon City',
    bgm: 'city',
    width: 2600,
    height: 600,
    theme: 'city',
    skyColor: '#0a081e',
    ambientColor: '#ff007f',
    platforms: [
      // Floor & City Rooftops
      { x: 0, y: 520, w: 750, h: 80, type: 'roof' },
      { x: 820, y: 520, w: 600, h: 80, type: 'roof' },
      { x: 1500, y: 520, w: 1100, h: 80, type: 'roof' },

      // Floating holographic & steel platforms
      { x: 180, y: 400, w: 140, h: 20, type: 'holo', isOneWay: true },
      { x: 380, y: 320, w: 160, h: 20, type: 'steel', isOneWay: true },
      { x: 600, y: 250, w: 140, h: 20, type: 'holo', isOneWay: true },

      // Rooftop gap jump platforms
      { x: 740, y: 430, w: 90, h: 18, type: 'holo', isOneWay: true },
      { x: 920, y: 380, w: 150, h: 20, type: 'steel', isOneWay: true },
      { x: 1150, y: 300, w: 160, h: 20, type: 'holo', isOneWay: true },
      { x: 1380, y: 410, w: 120, h: 20, type: 'steel', isOneWay: true },

      // High Rise Billboard platforms
      { x: 1620, y: 390, w: 180, h: 20, type: 'steel', isOneWay: true },
      { x: 1880, y: 320, w: 160, h: 20, type: 'holo', isOneWay: true },
      { x: 2120, y: 260, w: 180, h: 20, type: 'holo', isOneWay: true },
      { x: 2350, y: 420, w: 200, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [
      // Glitch Neon Pitfalls between rooftops
      { x: 750, y: 560, w: 70, h: 40, type: 'glitchPit' },
      { x: 1420, y: 560, w: 80, h: 40, type: 'glitchPit' }
    ],
    pickups: [
      // Subs (+100), Like Gems (+Energy), Shawarma/Karak (+HP), Golden Play Button
      { x: 220, y: 360, type: 'sub' },
      { x: 260, y: 360, type: 'sub' },
      { x: 440, y: 280, type: 'like' },
      { x: 650, y: 210, type: 'shawarma' },
      { x: 980, y: 340, type: 'sub' },
      { x: 1020, y: 340, type: 'sub' },
      { x: 1200, y: 260, type: 'like' },
      { x: 1420, y: 370, type: 'karak' },
      { x: 1700, y: 350, type: 'goldenButton' },
      { x: 1940, y: 280, type: 'like' },
      { x: 2180, y: 220, type: 'sub' },
      { x: 2220, y: 220, type: 'sub' }
    ],
    enemies: [
      { x: 450, y: 480, type: 'glitchBot' },
      { x: 680, y: 200, type: 'dislikeDrone' },
      { x: 1000, y: 480, type: 'toxicCrawler' },
      { x: 1250, y: 250, type: 'dislikeDrone' },
      { x: 1650, y: 480, type: 'glitchBot' },
      { x: 1950, y: 480, type: 'toxicCrawler' },
      { x: 2200, y: 480, type: 'glitchBot' }
    ],
    exitPortal: { x: 2460, y: 440, w: 40, h: 80 }
  },

  2: {
    id: 2,
    name: 'عالم الرعب والبلوكات',
    nameEn: 'Horror & Blocks Realm',
    bgm: 'horror',
    width: 2800,
    height: 600,
    theme: 'horror',
    skyColor: '#12071f',
    ambientColor: '#8e44ad',
    platforms: [
      // Nether & Dungeon Islands
      { x: 0, y: 520, w: 550, h: 80, type: 'nether' },
      { x: 650, y: 520, w: 500, h: 80, type: 'nether' },
      { x: 1250, y: 520, w: 450, h: 80, type: 'nether' },
      { x: 1800, y: 520, w: 1000, h: 80, type: 'nether' },

      // Floating Minecraft Stone & Obsidian blocks
      { x: 200, y: 410, w: 120, h: 22, type: 'blockPlatform', isOneWay: true },
      { x: 380, y: 330, w: 130, h: 22, type: 'blockPlatform', isOneWay: true },
      { x: 560, y: 240, w: 110, h: 22, type: 'blockPlatform', isOneWay: true },

      // Floating Spooky steps
      { x: 720, y: 400, w: 100, h: 22, type: 'blockPlatform', isOneWay: true },
      { x: 900, y: 320, w: 140, h: 22, type: 'blockPlatform', isOneWay: true },
      { x: 1100, y: 230, w: 120, h: 22, type: 'blockPlatform', isOneWay: true },

      // Castle bridges
      { x: 1320, y: 390, w: 160, h: 22, type: 'blockPlatform', isOneWay: true },
      { x: 1550, y: 310, w: 150, h: 22, type: 'blockPlatform', isOneWay: true },
      { x: 1950, y: 400, w: 180, h: 22, type: 'blockPlatform', isOneWay: true },
      { x: 2250, y: 320, w: 170, h: 22, type: 'blockPlatform', isOneWay: true },
      { x: 2520, y: 240, w: 160, h: 22, type: 'blockPlatform', isOneWay: true }
    ],
    hazards: [
      // Lava glitch chasms & floor spikes
      { x: 550, y: 560, w: 100, h: 40, type: 'lavaPit' },
      { x: 1150, y: 560, w: 100, h: 40, type: 'lavaPit' },
      { x: 1700, y: 560, w: 100, h: 40, type: 'lavaPit' },
      { x: 920, y: 500, w: 60, h: 20, type: 'spikes' },
      { x: 2050, y: 500, w: 70, h: 20, type: 'spikes' }
    ],
    pickups: [
      { x: 240, y: 370, type: 'sub' },
      { x: 420, y: 290, type: 'like' },
      { x: 600, y: 200, type: 'shawarma' },
      { x: 950, y: 280, type: 'sub' },
      { x: 1140, y: 190, type: 'goldenButton' },
      { x: 1400, y: 350, type: 'karak' },
      { x: 1600, y: 270, type: 'like' },
      { x: 2000, y: 360, type: 'sub' },
      { x: 2300, y: 280, type: 'like' },
      { x: 2560, y: 200, type: 'shawarma' }
    ],
    enemies: [
      { x: 300, y: 480, type: 'creepBlock' },
      { x: 580, y: 190, type: 'horrorGhost' },
      { x: 800, y: 480, type: 'toxicCrawler' },
      { x: 1050, y: 270, type: 'horrorGhost' },
      { x: 1450, y: 480, type: 'creepBlock' },
      { x: 1750, y: 260, type: 'dislikeDrone' },
      { x: 2100, y: 480, type: 'horrorGhost' },
      { x: 2400, y: 480, type: 'creepBlock' }
    ],
    exitPortal: { x: 2650, y: 440, w: 40, h: 80 }
  },

  3: {
    id: 3,
    name: 'قاعة الزعيم - الباند',
    nameEn: 'The Ban Boss Arena',
    bgm: 'boss',
    width: 1400,
    height: 600,
    theme: 'bossArena',
    skyColor: '#1a0505',
    ambientColor: '#e74c3c',
    platforms: [
      // Main High-Tech Arena Floor
      { x: 0, y: 520, w: 1400, h: 80, type: 'arenaFloor' },

      // Strategic Battle Platforms
      { x: 160, y: 390, w: 180, h: 20, type: 'steel', isOneWay: true },
      { x: 440, y: 290, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 740, y: 290, w: 220, h: 20, type: 'holo', isOneWay: true },
      { x: 1060, y: 390, w: 180, h: 20, type: 'steel', isOneWay: true }
    ],
    hazards: [],
    pickups: [
      { x: 200, y: 350, type: 'like' },
      { x: 550, y: 250, type: 'shawarma' },
      { x: 850, y: 250, type: 'karak' },
      { x: 1150, y: 350, type: 'like' }
    ],
    enemies: [],
    boss: { x: 950, y: 380 }
  }
};

class LevelManager {
  constructor() {
    this.currentLevelIndex = 1;
    this.level = null;
    this.platforms = [];
    this.hazards = [];
    this.pickups = [];
    this.enemies = [];
    this.boss = null;
    this.portal = null;
    this.animTime = 0;
  }

  loadLevel(levelIndex) {
    this.currentLevelIndex = levelIndex;
    const data = LEVEL_DATA[levelIndex] || LEVEL_DATA[1];
    this.level = data;
    this.platforms = JSON.parse(JSON.stringify(data.platforms));
    this.hazards = JSON.parse(JSON.stringify(data.hazards));
    this.portal = data.exitPortal ? { ...data.exitPortal } : null;

    // Initialize Pickups
    this.pickups = data.pickups.map(p => ({
      x: p.x,
      y: p.y,
      type: p.type,
      collected: false,
      bobOffset: Math.random() * Math.PI * 2
    }));

    // Initialize Enemies
    this.enemies = data.enemies.map(e => new window.Enemy(e.x, e.y, e.type));

    // Initialize Boss if level 3
    if (data.boss) {
      this.boss = new window.BossBan(data.boss.x, data.boss.y);
    } else {
      this.boss = null;
    }

    // Play Level Music
    window.audio.playBgmTrack(data.bgm);
  }

  update(player) {
    this.animTime += 0.05;

    // Check Pickup Collections
    for (const p of this.pickups) {
      if (p.collected) continue;

      const pDist = Math.hypot((player.x + player.width / 2) - p.x, (player.y + player.height / 2) - p.y);
      if (pDist < 32) {
        p.collected = true;
        this.applyPickup(p, player);
      }
    }

    // Check Hazard Collisions (spikes, pits)
    for (const h of this.hazards) {
      if (player.x + player.width > h.x && player.x < h.x + h.w &&
          player.y + player.height > h.y && player.y < h.y + h.h) {
        player.takeDamage(25, -player.facing);
        if (h.type === 'glitchPit' || h.type === 'lavaPit') {
          // Bounce player back up to platform
          player.vy = -10;
          player.y = h.y - player.height - 20;
        }
      }
    }
  }

  applyPickup(pickup, player) {
    if (pickup.type === 'sub') {
      window.audio.sfxCoin();
      window.game.addSubscribers(100);
      window.game.addScore(100);
      player.addEnergy(8);
      window.particles.burst(pickup.x, pickup.y, 8, ['#ffd700', '#ffffff'], 2, 5);
      window.particles.addFloatingText(pickup.x, pickup.y - 10, '+100 SUBS', '#ffd700', 13, '★');
    } else if (pickup.type === 'like') {
      window.audio.sfxEnergyGem();
      player.addEnergy(35);
      window.game.addScore(150);
      window.particles.burst(pickup.x, pickup.y, 10, ['#00d2d3', '#54a0ff'], 2, 5);
      window.particles.addFloatingText(pickup.x, pickup.y - 10, '+ENERGY', '#00d2d3', 13, '👍');
    } else if (pickup.type === 'shawarma') {
      player.heal(35);
      window.game.addScore(200);
      window.particles.burst(pickup.x, pickup.y, 10, ['#2ed573', '#ff9f43'], 2, 5);
      window.particles.addFloatingText(pickup.x, pickup.y - 10, 'شاورما! +35 HP', '#2ed573', 14, '🌯');
    } else if (pickup.type === 'karak') {
      player.heal(25);
      player.addEnergy(20);
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
      window.particles.burst(pickup.x, pickup.y, 30, ['#ffd700', '#ffffff', '#ff9f43'], 3, 9);
      window.particles.addFloatingText(pickup.x, pickup.y - 20, 'الدرع الذهبي! +1,000 SUBS!', '#ffd700', 16, '🏆');
    }
  }

  // --------------------------------------------------------------------------
  // Parallax Background & Tile Renderer
  // --------------------------------------------------------------------------
  drawBackground(ctx, cameraX, cameraY, canvasWidth, canvasHeight) {
    // Sky Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, canvasHeight);
    grad.addColorStop(0, this.level.skyColor);
    grad.addColorStop(1, '#05030a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (this.level.theme === 'city') {
      // Layer 1: Distant Neon Pixel Skyline (Speed: 0.15)
      ctx.save();
      const pX1 = -(cameraX * 0.15) % 300;
      ctx.fillStyle = '#18122B';
      for (let i = -1; i < (canvasWidth / 60) + 6; i++) {
        const bh = 140 + (Math.sin(i * 99) * 0.5 + 0.5) * 120;
        ctx.fillRect(i * 60 + pX1, canvasHeight - bh - 80, 50, bh);
        // Distant skyscraper windows
        ctx.fillStyle = (i % 2 === 0) ? '#ff0055' : '#00ffff';
        ctx.globalAlpha = 0.25;
        for (let w = 0; w < 3; w++) {
          ctx.fillRect(i * 60 + pX1 + 10 + w * 12, canvasHeight - bh - 60, 6, 8);
        }
        ctx.globalAlpha = 1.0;
        ctx.fillStyle = '#18122B';
      }
      ctx.restore();

      // Layer 2: Midground Cyber Buildings & Neon Billboards (Speed: 0.35)
      ctx.save();
      const pX2 = -(cameraX * 0.35) % 400;
      for (let i = -1; i < (canvasWidth / 120) + 4; i++) {
        const bx = i * 120 + pX2;
        const bh = 190 + (Math.cos(i * 77) * 0.5 + 0.5) * 140;
        ctx.fillStyle = '#201642';
        ctx.fillRect(bx, canvasHeight - bh - 80, 100, bh);

        // Neon Billboard Sign
        if (i % 3 === 0) {
          ctx.fillStyle = 'rgba(0,0,0,0.8)';
          ctx.fillRect(bx + 10, canvasHeight - bh - 40, 80, 24);
          ctx.strokeStyle = '#ff007f';
          ctx.lineWidth = 2;
          ctx.strokeRect(bx + 10, canvasHeight - bh - 40, 80, 24);
          ctx.fillStyle = '#00ffff';
          ctx.font = 'bold 9px "Cairo", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('▶ YOUTUBE', bx + 50, canvasHeight - bh - 24);
        }
      }
      ctx.restore();

    } else if (this.level.theme === 'horror') {
      // Layer 1: Eerie Purple Nether Mountains
      ctx.save();
      const pX1 = -(cameraX * 0.2) % 360;
      ctx.fillStyle = '#2c1038';
      for (let i = -1; i < (canvasWidth / 80) + 5; i++) {
        const mh = 160 + Math.sin(i * 1.5) * 80;
        ctx.beginPath();
        ctx.moveTo(i * 80 + pX1, canvasHeight - 80);
        ctx.lineTo(i * 80 + 40 + pX1, canvasHeight - mh - 80);
        ctx.lineTo(i * 80 + 80 + pX1, canvasHeight - 80);
        ctx.fill();
      }
      ctx.restore();

      // Layer 2: Floating Nether Crystals & Pixel Clouds
      ctx.save();
      const pX2 = -(cameraX * 0.4) % 240;
      ctx.fillStyle = '#5f27cd';
      ctx.globalAlpha = 0.3;
      for (let i = -1; i < 8; i++) {
        ctx.fillRect(i * 240 + pX2, 100 + Math.sin(this.animTime + i) * 15, 140, 30);
      }
      ctx.restore();

    } else if (this.level.theme === 'bossArena') {
      // High-Tech Cyber YouTube HQ under Boss Glitch Attack
      ctx.save();
      // Flashing Warning Screens on background wall
      const isRedAlert = Math.floor(Date.now() / 300) % 2 === 0;
      ctx.fillStyle = isRedAlert ? 'rgba(231, 76, 60, 0.15)' : 'rgba(0, 0, 0, 0.4)';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Warning text banners
      ctx.fillStyle = isRedAlert ? '#ff3838' : '#e056fd';
      ctx.font = 'bold 20px "Press Start 2P", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('⚠ COPYRIGHT STRIKE ALERT ⚠', canvasWidth / 2, 120);
      ctx.fillText('حظر الحساب قيد التنفيذ', canvasWidth / 2, 160);
      ctx.restore();
    }
  }

  // --------------------------------------------------------------------------
  // Foreground Elements (Platforms, Hazards, Pickups, Portal)
  // --------------------------------------------------------------------------
  drawLevel(ctx, cameraX, cameraY) {
    // 1. Draw Platforms
    for (const p of this.platforms) {
      const px = Math.round(p.x - cameraX);
      const py = Math.round(p.y - cameraY);

      if (p.type === 'roof' || p.type === 'steel' || p.type === 'arenaFloor') {
        // Modern Steel / Neon Rooftop
        ctx.fillStyle = '#1e272e';
        ctx.fillRect(px, py, p.w, p.h);
        // Neon edge top border
        ctx.fillStyle = (this.level.theme === 'city') ? '#ff007f' : '#00d2d3';
        ctx.fillRect(px, py, p.w, 4);
        // Tech grid lines
        ctx.fillStyle = 'rgba(255,255,255,0.06)';
        for (let gx = 0; gx < p.w; gx += 20) {
          ctx.fillRect(px + gx, py + 4, 1, p.h - 4);
        }

      } else if (p.type === 'holo') {
        // Holographic Glowing Floating Platform
        ctx.fillStyle = 'rgba(0, 210, 211, 0.65)';
        ctx.fillRect(px, py, p.w, p.h);
        ctx.strokeStyle = '#54a0ff';
        ctx.lineWidth = 2;
        ctx.strokeRect(px, py, p.w, p.h);

      } else if (p.type === 'nether' || p.type === 'blockPlatform') {
        // Minecraft Netherrack & Obsidian Blocks
        ctx.fillStyle = '#4b1e2f';
        ctx.fillRect(px, py, p.w, p.h);
        // Green / Purple grass top
        ctx.fillStyle = '#8e44ad';
        ctx.fillRect(px, py, p.w, 5);
        // Pixel block texture
        ctx.fillStyle = '#2d0f1b';
        for (let bx = 0; bx < p.w; bx += 16) {
          ctx.fillRect(px + bx, py + 5, 2, p.h - 5);
        }
      }
    }

    // 2. Draw Hazards
    for (const h of this.hazards) {
      const hx = Math.round(h.x - cameraX);
      const hy = Math.round(h.y - cameraY);

      if (h.type === 'spikes') {
        ctx.fillStyle = '#e74c3c';
        for (let s = 0; s < h.w; s += 12) {
          ctx.beginPath();
          ctx.moveTo(hx + s, hy + h.h);
          ctx.lineTo(hx + s + 6, hy);
          ctx.lineTo(hx + s + 12, hy + h.h);
          ctx.fill();
        }
      } else if (h.type === 'glitchPit' || h.type === 'lavaPit') {
        ctx.fillStyle = (h.type === 'lavaPit') ? '#e74c3c' : '#ff007f';
        ctx.fillRect(hx, hy, h.w, h.h);
        // Lava bubbles
        ctx.fillStyle = '#f1c40f';
        ctx.fillRect(hx + 10, hy + 4, 8, 4);
        ctx.fillRect(hx + h.w - 18, hy + 6, 8, 4);
      }
    }

    // 3. Draw Pickups
    for (const p of this.pickups) {
      if (p.collected) continue;

      const bobY = Math.sin(this.animTime * 3 + p.bobOffset) * 4;
      const px = Math.round(p.x - cameraX);
      const py = Math.round(p.y + bobY - cameraY);

      ctx.save();
      if (p.type === 'sub') {
        // Golden Subscriber Play Badge
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(px - 10, py - 10, 20, 20);
        ctx.fillStyle = '#c0392b';
        ctx.beginPath();
        ctx.moveTo(px - 4, py - 6);
        ctx.lineTo(px + 6, py);
        ctx.lineTo(px - 4, py + 6);
        ctx.fill();

      } else if (p.type === 'like') {
        // Neon Blue Like Gem
        ctx.fillStyle = '#00d2d3';
        ctx.beginPath();
        ctx.moveTo(px, py - 12);
        ctx.lineTo(px + 10, py);
        ctx.lineTo(px, py + 12);
        ctx.lineTo(px - 10, py);
        ctx.closePath();
        ctx.fill();

      } else if (p.type === 'shawarma') {
        // Delicious Pixel Shawarma
        ctx.fillStyle = '#f5cd79';
        ctx.fillRect(px - 10, py - 6, 20, 12);
        ctx.fillStyle = '#e15f41';
        ctx.fillRect(px - 6, py - 4, 12, 8);
        ctx.fillStyle = '#26de81';
        ctx.fillRect(px - 2, py - 3, 4, 6);

      } else if (p.type === 'karak') {
        // Karak Tea Cup
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(px - 8, py - 8, 16, 16);
        ctx.fillStyle = '#e67e22';
        ctx.fillRect(px - 6, py - 6, 12, 10);

      } else if (p.type === 'goldenButton') {
        // Golden 10M Diamond Play Button
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(px - 14, py - 14, 28, 28);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(px - 14, py - 14, 28, 28);
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(px - 5, py - 8);
        ctx.lineTo(px + 8, py);
        ctx.lineTo(px - 5, py + 8);
        ctx.fill();
      }
      ctx.restore();
    }

    // 4. Draw Exit Portal (if level has one)
    if (this.portal) {
      const ptx = Math.round(this.portal.x - cameraX);
      const pty = Math.round(this.portal.y - cameraY);

      ctx.save();
      // Glowing warp portal
      const pGrad = ctx.createRadialGradient(ptx + 20, pty + 40, 5, ptx + 20, pty + 40, 35);
      pGrad.addColorStop(0, '#ffffff');
      pGrad.addColorStop(0.5, '#00d2d3');
      pGrad.addColorStop(1, 'rgba(95, 39, 205, 0)');

      ctx.fillStyle = pGrad;
      ctx.fillRect(ptx - 15, pty - 15, 70, 110);

      // Portal Frame
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(ptx, pty, 6, 80);
      ctx.fillRect(ptx + 34, pty, 6, 80);
      ctx.fillRect(ptx, pty, 40, 6);

      // Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 10px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('المرحلة التالية ▶', ptx + 20, pty - 10);
      ctx.restore();
    }
  }
}

window.LEVEL_DATA = LEVEL_DATA;
window.LevelManager = LevelManager;
