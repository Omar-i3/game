// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Hero Assist System (نظام الفزعة)
// ============================================================================

class AssistSystem {
  constructor() {
    this.cooldown = 0;
    this.maxCooldown = 1800; // 30 seconds at 60 FPS
    this.activeAssist = null;
    this.assistTimer = 0;
    this.orbitingHatTimer = 0;
    this.orbitAngle = 0;
  }

  canUseAssist() {
    return this.cooldown <= 0 && !this.activeAssist;
  }

  getCooldownPercent() {
    return Math.max(0, Math.min(100, (1 - (this.cooldown / this.maxCooldown)) * 100));
  }

  triggerAssist(player, enemies, enemyProjectiles, boss) {
    if (!this.canUseAssist()) {
      if (window.audio) window.audio.sfxPortalLocked();
      return false;
    }

    // Cooldown reduction if Studio Mic upgrade is active
    let coolDuration = this.maxCooldown;
    if (window.studio && window.studio.hasPerk('studio_mic')) {
      coolDuration = Math.round(coolDuration * 0.75); // 25% faster
    }
    this.cooldown = coolDuration;

    // Pick a random hero teammate different from current player
    const teammates = ['banderita', 'mlzlz', 'ocmz', 'abuAbed', 'opiilz'].filter(h => h !== player.heroId);
    const chosen = teammates[Math.floor(Math.random() * teammates.length)] || 'mlzlz';

    this.activeAssist = chosen;
    this.assistTimer = 120; // 2 seconds display animation

    if (window.audio) window.audio.sfxVictory();

    switch (chosen) {
      case 'mlzlz':
        // فزعة ملزلز: سكب سيل شاي ساخن يطهر الشاشة ويشفي 25% من نقاط الدم
        player.heal(Math.round(player.maxHp * 0.25));
        window.particles.addFloatingText(player.x, player.y - 35, '🍵 فزعة ملزلز: شفاء وطهارة الشاي!', '#00d2d3', 15);
        if (enemies) {
          for (const e of enemies) {
            if (!e.isDead) {
              e.takeDamage(55, 0);
              e.frozenTimer = 80;
            }
          }
        }
        if (boss && !boss.isDead) boss.takeDamage(60);
        window.particles.burst(player.x, player.y, 30, ['#00d2d3', '#ffffff', '#e67e22'], 3, 8);
        break;

      case 'banderita':
        // فزعة بندريتا: عاصفة نارية تدمر جميع مقذوفات الأعداء وتضربهم
        window.particles.addFloatingText(player.x, player.y - 35, '⚡ فزعة بندريتا: عاصفة النار الساحقة!', '#ff3838', 15);
        if (enemyProjectiles) enemyProjectiles.length = 0; // Clear all enemy projectiles
        if (enemies) {
          for (const e of enemies) {
            if (!e.isDead) e.takeDamage(75, 8);
          }
        }
        if (boss && !boss.isDead) boss.takeDamage(90);
        window.particles.potatoRageBlast(player.x, player.y);
        break;

      case 'ocmz':
        // فزعة أوسمز: درع قبعة القش المدارية لمدة 6 ثوانٍ
        this.orbitingHatTimer = 360; // 6 seconds
        window.particles.addFloatingText(player.x, player.y - 35, '👒 فزعة أوسمز: درع قبعة القش المدارية!', '#2ed573', 15);
        break;

      case 'abuAbed':
        // فزعة أبو عابد: إشعاع الصلعة الذهبية يجمد كل الأعداء لمدة 4 ثوانٍ
        window.particles.addFloatingText(player.x, player.y - 35, '☀️ فزعة أبو عابد: تجميد بالصلعة الذهبية!', '#ffa502', 15);
        if (enemies) {
          for (const e of enemies) {
            if (!e.isDead) e.frozenTimer = 240; // 4 seconds freeze
          }
        }
        if (boss && !boss.isDead) boss.frozenTimer = 180;
        window.particles.burst(player.x, player.y, 35, ['#ffa502', '#ffd700', '#ffffff'], 4, 10);
        break;

      case 'opiilz':
        // فزعة أوبلز: صاعق تفكيك يعطل كافة أفخاخ الليزر والأعداء
        window.particles.addFloatingText(player.x, player.y - 35, '🪛 فزعة أوبلز: نبضة تفكيك كهربائية شاملة!', '#9b59b6', 15);
        if (enemies) {
          for (const e of enemies) {
            if (!e.isDead) e.takeDamage(60, 0);
          }
        }
        if (boss && !boss.isDead) boss.takeDamage(70);
        window.particles.burst(player.x, player.y, 30, ['#9b59b6', '#00d2d3', '#ffffff'], 3, 9);
        break;
    }

    return true;
  }

  update(player, enemies, boss) {
    if (this.cooldown > 0) this.cooldown--;

    if (this.assistTimer > 0) {
      this.assistTimer--;
      if (this.assistTimer <= 0) this.activeAssist = null;
    }

    // Update Orbiting Straw Hat Shield
    if (this.orbitingHatTimer > 0) {
      this.orbitingHatTimer--;
      this.orbitAngle += 0.15;

      const hatX = player.x + player.width / 2 + Math.cos(this.orbitAngle) * 55;
      const hatY = player.y + player.height / 2 + Math.sin(this.orbitAngle) * 45;

      window.particles.add(hatX, hatY, 0, 0, '#2ed573', 3, 8, 'spark');

      if (enemies) {
        for (const e of enemies) {
          if (!e.isDead && Math.hypot(hatX - (e.x + e.width / 2), hatY - (e.y + e.height / 2)) < 28) {
            e.takeDamage(12, Math.sign(e.x - player.x));
            window.particles.burst(hatX, hatY, 5, ['#2ed573', '#ffd700'], 1, 3);
          }
        }
      }

      if (boss && !boss.isDead && Math.hypot(hatX - (boss.x + boss.width / 2), hatY - (boss.y + boss.height / 2)) < 35) {
        boss.takeDamage(14);
      }
    }
  }

  draw(ctx, cameraX, cameraY, player) {
    // Draw Orbiting Straw Hat if active
    if (this.orbitingHatTimer > 0 && player) {
      const hx = Math.round(player.x + player.width / 2 + Math.cos(this.orbitAngle) * 55 - cameraX);
      const hy = Math.round(player.y + player.height / 2 + Math.sin(this.orbitAngle) * 45 - cameraY);

      ctx.save();
      ctx.translate(hx, hy);
      ctx.rotate(this.orbitAngle * 2);
      ctx.fillStyle = '#f1c40f';
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(-8, -3, 16, 3);
      ctx.restore();
    }
  }
}

window.AssistSystem = AssistSystem;
window.assists = new AssistSystem();
