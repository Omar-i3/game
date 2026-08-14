// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Live Stream Events Engine
// ============================================================================

class StreamEventManager {
  constructor() {
    this.eventTimer = 0;
    this.nextEventIn = Math.floor(Math.random() * 900) + 1200; // Trigger every 20-35s
    this.activeEvent = null;
    this.activeEventDuration = 0;
    this.raidKillsLeft = 0;
    this.raidTimer = 0;
    this.subsMultiplier = 1;
    this.superChatPackage = null;
    this.disconnectFreezeTimer = 0;
  }

  reset() {
    this.eventTimer = 0;
    this.nextEventIn = Math.floor(Math.random() * 900) + 1200;
    this.activeEvent = null;
    this.activeEventDuration = 0;
    this.raidKillsLeft = 0;
    this.raidTimer = 0;
    this.subsMultiplier = 1;
    this.superChatPackage = null;
    this.disconnectFreezeTimer = 0;
  }

  update(player, enemies, cameraX, canvasWidth) {
    if (this.disconnectFreezeTimer > 0) {
      this.disconnectFreezeTimer--;
      return true; // Game freeze state
    }

    this.eventTimer++;

    if (this.eventTimer >= this.nextEventIn && !this.activeEvent) {
      this.eventTimer = 0;
      this.nextEventIn = Math.floor(Math.random() * 900) + 1400;
      this.triggerRandomEvent(player, enemies, cameraX, canvasWidth);
    }

    // Process Active Raid Event
    if (this.activeEvent === 'raid') {
      this.raidTimer--;
      if (this.raidTimer <= 0) {
        this.activeEvent = null;
        this.showBanner('❌ انتهى وقت الريد!', 'فشلت في القضاء على الريد في الوقت المحدد.');
      }
    }

    // Process Super Chat Falling Item
    if (this.superChatPackage) {
      this.superChatPackage.y += this.superChatPackage.vy;
      if (this.superChatPackage.y >= this.superChatPackage.targetY) {
        this.superChatPackage.y = this.superChatPackage.targetY;
        this.superChatPackage.vy = 0;
      }

      // Check pickup collision
      if (player.x + player.width > this.superChatPackage.x - 20 &&
          player.x < this.superChatPackage.x + 20 &&
          player.y + player.height > this.superChatPackage.y - 20 &&
          player.y < this.superChatPackage.y + 20) {

        player.invulnerableTimer = 480; // 8 seconds Invincibility Shield
        if (window.game) window.game.addSubscribers(10000);
        if (window.audio) window.audio.sfxVictory();
        window.particles.burst(this.superChatPackage.x, this.superChatPackage.y, 25, ['#ffd700', '#ffffff', '#ff0055'], 3, 7);
        window.particles.addFloatingText(player.x, player.y - 30, '💎 سوبر شات: درع المناعة الخارق! (8 ثوانٍ)', '#ffd700', 14);

        this.superChatPackage = null;
      }
    }

    return false;
  }

  triggerRandomEvent(player, enemies, cameraX, canvasWidth) {
    const eventTypes = ['raid', 'superChat', 'disconnect'];
    const chosen = eventTypes[Math.floor(Math.random() * eventTypes.length)];

    if (window.audio) window.audio.sfxPortalLocked();

    switch (chosen) {
      case 'raid':
        this.activeEvent = 'raid';
        this.raidTimer = 900; // 15 seconds
        this.raidKillsLeft = 8;
        this.showBanner('💥 هجوم الريد (STREAM RAID)!', 'اقضِ على 8 وحوش جليتش خلال 15 ثانية لمضاعفة المشتركين 2X!');

        // Spawn 8 fast glitch bots around player
        for (let i = 0; i < 8; i++) {
          const spawnX = player.x + (i % 2 === 0 ? 300 + i * 40 : -300 - i * 40);
          const bot = new window.Enemy('glitchBot', Math.max(50, spawnX), 440);
          bot.speed = 2.4;
          enemies.push(bot);
        }
        break;

      case 'superChat':
        this.activeEvent = 'superChat';
        this.showBanner('💎 سوبر شات أسطوري (SUPER CHAT)!', 'سقطت حزمة تبرع ذهبية من السماء! التقطها لدرع المناعة و+10K مشترك!');

        this.superChatPackage = {
          x: player.x + (Math.random() - 0.5) * 160,
          y: player.y - 300,
          targetY: player.y,
          vy: 4
        };
        break;

      case 'disconnect':
        this.activeEvent = 'disconnect';
        this.disconnectFreezeTimer = 120; // 2 seconds static freeze
        this.showBanner('⚠️ انقطاع السيرفر (STREAM LAG)!', 'توقف البث مؤقتاً بسبب ضغط السيرفرات! جاري إعادة الاتصال...');
        break;
    }
  }

  recordEnemyKill() {
    if (this.activeEvent === 'raid' && this.raidKillsLeft > 0) {
      this.raidKillsLeft--;
      if (this.raidKillsLeft <= 0) {
        this.activeEvent = null;
        this.subsMultiplier = 2;
        if (window.game) window.game.addSubscribers(15000);
        if (window.audio) window.audio.sfxVictory();
        this.showBanner('🎉 كفووو! نجحت في صد الريد!', 'كسبت مضاعفة المشتركين 2X و+15,000 مشترك إضافي!');
      }
    }
  }

  showBanner(title, desc) {
    const banner = document.getElementById('stream-event-banner');
    if (!banner) return;

    banner.innerHTML = `
      <div class="event-banner-inner">
        <span class="event-title">${title}</span>
        <span class="event-desc">${desc}</span>
      </div>
    `;
    banner.classList.remove('hidden');

    setTimeout(() => {
      banner.classList.add('hidden');
    }, 4500);
  }

  draw(ctx, cameraX, cameraY) {
    // Draw Super Chat Package
    if (this.superChatPackage) {
      const px = Math.round(this.superChatPackage.x - cameraX);
      const py = Math.round(this.superChatPackage.y - cameraY);

      ctx.save();
      // Glowing aura
      ctx.fillStyle = 'rgba(255, 215, 0, 0.4)';
      ctx.beginPath();
      ctx.arc(px, py, 22, 0, Math.PI * 2);
      ctx.fill();

      // Golden chest box
      ctx.fillStyle = '#ffd700';
      ctx.fillRect(px - 14, py - 14, 28, 28);
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(px - 4, py - 14, 8, 28);
      ctx.fillRect(px - 14, py - 4, 28, 8);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px "Press Start 2P", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💎', px, py + 5);
      ctx.restore();
    }
  }
}

window.StreamEventManager = StreamEventManager;
window.events = new StreamEventManager();
