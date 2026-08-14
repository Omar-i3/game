// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - 16-Bit Enemies & 5 Boss Engines
// ============================================================================

class Enemy {
  constructor(arg1, arg2, arg3) {
    // Robust constructor signature: handles both (type, x, y) and (x, y, type)
    let type = 'glitchBot';
    let x = 100;
    let y = 480;

    if (typeof arg1 === 'string') {
      type = arg1;
      x = typeof arg2 === 'number' ? arg2 : 100;
      y = typeof arg3 === 'number' ? arg3 : 480;
    } else if (typeof arg1 === 'number') {
      x = arg1;
      y = typeof arg2 === 'number' ? arg2 : 480;
      type = typeof arg3 === 'string' ? arg3 : 'glitchBot';
    }

    this.x = x;
    this.y = y;
    this.type = type;
    this.startX = x;
    this.patrolDist = 140;
    this.vx = 1.4;
    this.vy = 0;
    this.isDead = false;
    this.facing = -1;
    this.animTimer = 0;
    this.animFrame = 0;
    this.frozenTimer = 0;
    this.hitFlashTimer = 0;
    this.shootCooldown = Math.floor(Math.random() * 80) + 40;

    this.initType();
  }

  initType() {
    switch (this.type) {
      case 'glitchBot':
        this.name = 'روبوت الجليتش';
        this.width = 36; this.height = 42;
        this.hp = 50; this.maxHp = 50; this.damage = 16; this.speed = 1.5;
        this.subsReward = 1500; this.scoreReward = 250; this.color = '#ff4757';
        break;

      case 'dislikeDrone':
        this.name = 'طائرة الديسلايك';
        this.width = 34; this.height = 30;
        this.hp = 40; this.maxHp = 40; this.damage = 14; this.speed = 2.1;
        this.isFlying = true;
        this.subsReward = 1200; this.scoreReward = 200; this.color = '#70a1ff';
        break;

      case 'toxicCrawler':
        this.name = 'وحش التعليقات السامة';
        this.width = 40; this.height = 28;
        this.hp = 45; this.maxHp = 45; this.damage = 18; this.speed = 1.3;
        this.subsReward = 1600; this.scoreReward = 220; this.color = '#2ed573';
        break;

      case 'horrorGhost':
        this.name = 'شبح الرعب';
        this.width = 36; this.height = 42;
        this.hp = 60; this.maxHp = 60; this.damage = 22; this.speed = 1.9;
        this.isFlying = true;
        this.subsReward = 2000; this.scoreReward = 300; this.color = '#a55eea';
        break;

      case 'glitchPirate':
        this.name = 'قرصان الجليتش الطائر';
        this.width = 36; this.height = 40;
        this.hp = 55; this.maxHp = 55; this.damage = 20; this.speed = 2.2;
        this.isFlying = true;
        this.subsReward = 2200; this.scoreReward = 320; this.color = '#f1c40f';
        break;

      case 'cyberSpider':
        this.name = 'عنكبوت إلكتروني';
        this.width = 38; this.height = 28;
        this.hp = 40; this.maxHp = 40; this.damage = 20; this.speed = 2.4;
        this.subsReward = 1500; this.scoreReward = 220; this.color = '#badc58';
        break;

      case 'eliteGuard':
        this.name = 'حارس النخبة';
        this.width = 40; this.height = 48;
        this.hp = 100; this.maxHp = 100; this.damage = 26; this.speed = 1.8;
        this.subsReward = 3500; this.scoreReward = 500; this.color = '#eb4d4b';
        break;

      case 'copyrightDrone':
        this.name = 'طائرة الكوبي رايت ⚠️';
        this.width = 38; this.height = 34;
        this.hp = 65; this.maxHp = 65; this.damage = 18; this.speed = 2.6;
        this.isFlying = true;
        this.isCopyright = true;
        this.subsReward = 3000; this.scoreReward = 450; this.color = '#ffa502';
        break;

      case 'unskippableAdBarrier':
        this.name = 'جدار الإعلانات الإجباري 🛑';
        this.width = 34; this.height = 80;
        this.hp = 5; this.maxHp = 5; this.damage = 0; this.speed = 0;
        this.isAdBarrier = true;
        this.subsReward = 2000; this.scoreReward = 300; this.color = '#ff0055';
        break;

      default:
        this.name = 'فيروس جليتش';
        this.width = 32; this.height = 36;
        this.hp = 40; this.maxHp = 40; this.damage = 15; this.speed = 1.5;
        this.subsReward = 1000; this.scoreReward = 150; this.color = '#ff4757';
        break;
    }
  }

  takeDamage(amount, knockbackDir = 0) {
    if (this.isDead) return;
    this.hp -= amount;
    this.hitFlashTimer = 10;
    this.vx = knockbackDir * 4;
    this.vy = -3;

    if (window.audio) window.audio.sfxEnemyHurt();
    if (window.particles) {
      window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 10, [this.color, '#ffffff', '#ffd700'], 2, 5);
      window.particles.addFloatingText(this.x + this.width / 2, this.y - 12, `-${Math.round(amount)}`, '#fffa65', 13);
    }

    if (this.hp <= 0) this.die();
  }

  die() {
    this.isDead = true;
    if (window.audio) window.audio.sfxExplosion();
    if (window.particles) {
      window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 22, [this.color, '#ff4757', '#ffa502', '#ffffff'], 3, 8);
      window.particles.addFloatingText(this.x + this.width / 2, this.y - 20, `+${this.subsReward.toLocaleString()} 👥`, '#2ed573', 14, '★');
    }

    if (window.game && window.game.objectives) {
      window.game.objectives.recordKill();
    }
  }

  update(player, platforms, projectiles) {
    if (this.isDead) return;

    if (this.hitFlashTimer > 0) this.hitFlashTimer--;

    if (this.frozenTimer > 0) {
      this.frozenTimer--;
      return;
    }

    this.animTimer++;
    if (this.animTimer >= 8) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }

    // AI Behaviors
    if (this.isFlying) {
      this.y += Math.sin(this.animTimer * 0.15) * 1.2;
      this.x += this.vx;
      if (Math.abs(this.x - this.startX) > this.patrolDist) {
        this.vx = -this.vx;
        this.facing = Math.sign(this.vx);
      }

      // Drone Projectile Shooting
      if (this.type === 'dislikeDrone' && player && projectiles) {
        this.shootCooldown--;
        if (this.shootCooldown <= 0 && Math.abs(player.x - this.x) < 320) {
          this.shootCooldown = 90;
          projectiles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height,
            vx: (player.x - this.x) * 0.015,
            vy: 4,
            radius: 5,
            damage: 15,
            color: '#70a1ff'
          });
        }
      }
    } else {
      // Ground Patrol Physics
      this.vy += 0.5;
      if (this.vy > 10) this.vy = 10;

      this.x += this.vx;
      this.checkPlatformCollisionHorizontal(platforms);

      this.y += this.vy;
      this.checkPlatformCollisionVertical(platforms);

      if (Math.abs(this.x - this.startX) > this.patrolDist) {
        this.vx = -this.vx;
        this.facing = Math.sign(this.vx);
      }
    }
  }

  checkPlatformCollisionHorizontal(platforms) {
    if (!platforms) return;
    for (const p of platforms) {
      if (p.isOneWay) continue;
      if (this.x < p.x + p.w && this.x + this.width > p.x && this.y < p.y + p.h && this.y + this.height > p.y) {
        this.facing *= -1;
        this.vx = this.facing * this.speed;
        this.x += this.vx * 2;
        break;
      }
    }
  }

  checkPlatformCollisionVertical(platforms) {
    if (!platforms) return;
    for (const p of platforms) {
      if (p.isOneWay) {
        if (this.vy > 0 && this.x + this.width > p.x && this.x < p.x + p.w &&
            this.y + this.height >= p.y && this.y + this.height - this.vy <= p.y + 8) {
          this.y = p.y - this.height;
          this.vy = 0;
        }
      } else {
        if (this.x < p.x + p.w && this.x + this.width > p.x && this.y < p.y + p.h && this.y + this.height > p.y) {
          if (this.vy > 0) { this.y = p.y - this.height; this.vy = 0; }
        }
      }
    }
  }

  // --------------------------------------------------------------------------
  // Detailed 16-Bit Pixel-Art Rendering for Enemies
  // --------------------------------------------------------------------------
  draw(ctx, cameraX = 0, cameraY = 0) {
    if (this.isDead) return;
    const ex = Math.round(this.x - cameraX);
    const ey = Math.round(this.y - cameraY);

    ctx.save();

    // 1. Overhead Mini Health Bar
    if (this.hp < this.maxHp) {
      const barW = this.width;
      const hpPct = Math.max(0, this.hp / this.maxHp);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.fillRect(ex, ey - 8, barW, 4);
      ctx.fillStyle = '#ff4757';
      ctx.fillRect(ex, ey - 8, barW * hpPct, 4);
    }

    ctx.translate(ex + this.width / 2, ey + this.height / 2);
    ctx.scale(this.facing, 1);

    // Hit Flash
    if (this.hitFlashTimer > 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
      return;
    }

    if (this.frozenTimer > 0) {
      ctx.fillStyle = 'rgba(0, 210, 211, 0.5)';
      ctx.fillRect(-this.width / 2 - 4, -this.height / 2 - 4, this.width + 8, this.height + 8);
    }

    const bob = Math.sin(this.animFrame * Math.PI / 2) * 2;

    switch (this.type) {
      case 'glitchBot':
        this.drawGlitchBot(ctx, bob);
        break;

      case 'dislikeDrone':
        this.drawDislikeDrone(ctx, bob);
        break;

      case 'toxicCrawler':
        this.drawToxicCrawler(ctx, bob);
        break;

      case 'horrorGhost':
        this.drawHorrorGhost(ctx, bob);
        break;

      case 'glitchPirate':
        this.drawGlitchPirate(ctx, bob);
        break;

      case 'cyberSpider':
        this.drawCyberSpider(ctx, bob);
        break;

      case 'eliteGuard':
        this.drawEliteGuard(ctx, bob);
        break;

      case 'copyrightDrone':
        this.drawCopyrightDrone(ctx, bob);
        break;

      case 'unskippableAdBarrier':
        this.drawAdBarrier(ctx);
        break;

      default:
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
        break;
    }

    ctx.restore();
  }

  drawCopyrightDrone(ctx, bob) {
    ctx.fillStyle = '#ffa502';
    ctx.beginPath();
    ctx.ellipse(0, 0 + bob, 18, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-6, -14 + bob, 12, 4); // Yellow warning badge
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 9px "Press Start 2P", sans-serif';
    ctx.fillText('!', 0, -5 + bob);
  }

  drawAdBarrier(ctx) {
    ctx.fillStyle = 'rgba(255, 0, 85, 0.85)';
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 10px "Cairo", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('AD 🛑', 0, -10);
    ctx.font = 'bold 8px "Cairo", sans-serif';
    ctx.fillText(`إعلان (${this.hp})`, 0, 10);
  }

  drawGlitchBot(ctx, bob) {
    // Body & Treads
    ctx.fillStyle = '#2f3542';
    ctx.fillRect(-14, -16 + bob, 28, 26);
    // Dark Screen
    ctx.fillStyle = '#1e1a38';
    ctx.fillRect(-10, -13 + bob, 20, 14);
    // Glowing Red Visor / Eye
    ctx.fillStyle = '#ff4757';
    ctx.fillRect(-8, -10 + bob, 16, 6);
    // Antenna
    ctx.fillStyle = '#747d8c';
    ctx.fillRect(-2, -22 + bob, 4, 6);
    ctx.fillStyle = '#fffa65';
    ctx.fillRect(-3, -25 + bob, 6, 4);
    // Mechanical Wheels / Treads
    ctx.fillStyle = '#57606f';
    ctx.fillRect(-16, 10, 32, 10);
    ctx.fillStyle = '#1e272e';
    ctx.fillRect(-12, 12, 6, 6);
    ctx.fillRect(6, 12, 6, 6);
  }

  drawDislikeDrone(ctx, bob) {
    // Propeller spinning
    ctx.fillStyle = '#dfe4ea';
    ctx.fillRect(-16, -14 + bob, 32, 3);
    // Drone Capsule
    ctx.fillStyle = '#3742fa';
    ctx.beginPath();
    ctx.ellipse(0, 0 + bob, 16, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    // Glowing Thumbs-Down Symbol
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-5, -5 + bob, 10, 4);
    ctx.fillRect(-5, -1 + bob, 6, 6);
    // Jet Exhaust
    ctx.fillStyle = '#70a1ff';
    ctx.fillRect(-6, 10 + bob, 12, 4);
  }

  drawToxicCrawler(ctx, bob) {
    // Spiky toxic shell
    ctx.fillStyle = '#2ed573';
    ctx.beginPath();
    ctx.ellipse(0, 0 + bob, 18, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    // Spikes
    ctx.fillStyle = '#7bed9f';
    ctx.fillRect(-12, -14 + bob, 4, 6);
    ctx.fillRect(8, -14 + bob, 4, 6);
    // Evil yellow eyes
    ctx.fillStyle = '#fffa65';
    ctx.fillRect(6, -4 + bob, 6, 5);
    ctx.fillRect(8, -2 + bob, 2, 2);
  }

  drawHorrorGhost(ctx, bob) {
    ctx.fillStyle = 'rgba(165, 94, 234, 0.85)';
    ctx.beginPath();
    ctx.arc(0, -6 + bob, 14, Math.PI, 0);
    ctx.lineTo(14, 12 + bob);
    ctx.lineTo(8, 6 + bob);
    ctx.lineTo(0, 12 + bob);
    ctx.lineTo(-8, 6 + bob);
    ctx.lineTo(-14, 12 + bob);
    ctx.closePath();
    ctx.fill();
    // Hollow Eyes
    ctx.fillStyle = '#11052C';
    ctx.fillRect(-8, -8 + bob, 6, 6);
    ctx.fillRect(2, -8 + bob, 6, 6);
  }

  drawGlitchPirate(ctx, bob) {
    // Flying Pirate Body
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(-12, -10 + bob, 24, 20);
    // Pirate Hat / Bandana
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(-14, -20 + bob, 28, 8);
    // Eye Patch
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(2, -8 + bob, 6, 6);
    // Cutlass Sword
    ctx.fillStyle = '#bdc3c7';
    ctx.fillRect(10, -4 + bob, 10, 3);
  }

  drawCyberSpider(ctx, bob) {
    // Metal Body
    ctx.fillStyle = '#303952';
    ctx.beginPath();
    ctx.arc(0, 0 + bob, 12, 0, Math.PI * 2);
    ctx.fill();
    // Red Cyber Eyes
    ctx.fillStyle = '#ff4757';
    ctx.fillRect(2, -4 + bob, 4, 4);
    ctx.fillRect(6, 0 + bob, 4, 4);
    // Robotic Legs
    ctx.strokeStyle = '#57606f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-8, 0 + bob); ctx.lineTo(-18, 10);
    ctx.moveTo(0, 0 + bob); ctx.lineTo(0, 12);
    ctx.moveTo(8, 0 + bob); ctx.lineTo(18, 10);
    ctx.stroke();
  }

  drawEliteGuard(ctx, bob) {
    // Cyber Armor
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-14, -18 + bob, 28, 30);
    // Red Shoulder Pads
    ctx.fillStyle = '#eb4d4b';
    ctx.fillRect(-18, -16 + bob, 6, 12);
    ctx.fillRect(12, -16 + bob, 6, 12);
    // Glowing Visor
    ctx.fillStyle = '#fffa65';
    ctx.fillRect(-6, -12 + bob, 12, 5);
    // Laser Katana
    ctx.fillStyle = '#00d2d3';
    ctx.fillRect(14, -24 + bob, 4, 28);
    // Legs
    ctx.fillStyle = '#1e272e';
    ctx.fillRect(-10, 12, 8, 12);
    ctx.fillRect(2, 12, 8, 12);
  }
}


// ============================================================================
// 5 Campaign Boss Engines (Robust Constructor & 16-Bit Pixel Art)
// ============================================================================

class CampaignBoss {
  constructor(arg1, arg2, arg3) {
    // Robust constructor signature: handles both (type, x, y) and (x, y, type)
    let bossType = 'lagTitan';
    let x = 2400;
    let y = 300;

    if (typeof arg1 === 'string') {
      bossType = arg1;
      x = typeof arg2 === 'number' ? arg2 : 2400;
      y = typeof arg3 === 'number' ? arg3 : 300;
    } else if (typeof arg1 === 'number') {
      x = arg1;
      y = typeof arg2 === 'number' ? arg2 : 300;
      bossType = typeof arg3 === 'string' ? arg3 : 'lagTitan';
    }

    this.x = x;
    this.y = y;
    this.bossType = bossType;
    this.facing = -1;
    this.animTimer = 0;
    this.attackTimer = 0;
    this.isDead = false;
    this.phase = 1;
    this.hitFlashTimer = 0;
    this.tauntText = '';
    this.tauntTimer = 0;

    this.initBossStats();
  }

  initBossStats() {
    switch (this.bossType) {
      case 'lagTitan':
        this.name = 'وحش اللاغ العملاق (Lag Titan)';
        this.maxHp = 600; this.hp = 600; this.width = 96; this.height = 110;
        this.color = '#ff9f43';
        this.tauntText = 'البينغ 9999ms! لن تتحرك!';
        break;

      case 'dislikeGhost':
        this.name = 'شبح الديسلايك الأسود (Black Dislike Ghost)';
        this.maxHp = 700; this.hp = 700; this.width = 100; this.height = 110;
        this.color = '#5f27cd';
        this.tauntText = 'ديسلايكات لا تنتهي!';
        break;

      case 'captainBan':
        this.name = 'كابتن الباند الطائر (Airship Captain Ban)';
        this.maxHp = 800; this.hp = 800; this.width = 115; this.height = 95;
        this.color = '#e74c3c';
        this.tauntText = 'صواريخ الحظر جاهزة للإطلاق!';
        break;

      case 'glitchDrill':
        this.name = 'حفار الجليتش العملاق (The Glitch Drill)';
        this.maxHp = 900; this.hp = 900; this.width = 120; this.height = 115;
        this.color = '#badc58';
        this.tauntText = 'سأسحق كل ما بنيتموه!';
        break;

      case 'darkAlgorithm':
        this.name = 'الخوارزمية المظلمة (Error 404)';
        this.maxHp = 1400; this.hp = 1400; this.width = 135; this.height = 125;
        this.color = '#ff0055';
        this.tauntText = 'أنا من يتحكم باليوتيوب! حظر نهائي!';
        break;
    }
  }

  takeDamage(amount) {
    if (this.isDead) return;
    this.hp -= amount;
    this.hitFlashTimer = 12;

    if (window.audio) window.audio.sfxBossHit();
    if (window.particles) {
      window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 14, [this.color, '#ffffff', '#ffd700'], 3, 7);
      window.particles.addFloatingText(this.x + this.width / 2, this.y - 20, `-${Math.round(amount)}`, '#ff4757', 16);
    }

    if (this.hp < this.maxHp * 0.5 && this.phase === 1) {
      this.phase = 2;
      this.tauntText = '⚡ تفعيل طور الغضب الشامل!';
      this.tauntTimer = 90;
      if (window.audio) window.audio.sfxBossRoar();
      if (window.game) window.game.addScreenShake(12);
    }

    if (this.hp <= 0) this.die();
  }

  die() {
    this.isDead = true;
    if (window.audio) window.audio.sfxExplosion();
    if (window.particles) {
      window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 50, ['#ffd700', '#ff0055', '#ffffff'], 4, 12);
      window.particles.addFloatingText(this.x + this.width / 2, this.y - 30, '👑 تم سحق الزعيم!', '#ffd700', 20, '★');
    }

    if (window.game && window.game.objectives) {
      window.game.objectives.recordBossDefeat();
    }
  }

  update(player, platforms, projectiles, minionList) {
    if (this.isDead) return;

    if (this.hitFlashTimer > 0) this.hitFlashTimer--;

    this.animTimer++;
    this.attackTimer++;

    if (player) {
      this.facing = Math.sign(player.x - this.x) || -1;
    }

    // Boss Attack Patterns
    if (this.attackTimer >= (this.phase === 2 ? 65 : 95)) {
      this.attackTimer = 0;
      this.executeAttack(player, projectiles, minionList);
    }
  }

  executeAttack(player, projectiles, minionList) {
    if (!player || !projectiles) return;

    if (window.audio) window.audio.sfxBossRoar();

    switch (this.bossType) {
      case 'lagTitan':
        // 3 Lag Shockwave orbs
        for (let i = -1; i <= 1; i++) {
          projectiles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            vx: this.facing * 7,
            vy: i * 2.5,
            radius: 9,
            damage: 22,
            color: '#ff9f43'
          });
        }
        break;

      case 'dislikeGhost':
        // Ghost projectile barrage
        for (let i = 0; i < 4; i++) {
          projectiles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2 + (i - 2) * 15,
            vx: this.facing * (6 + i),
            vy: Math.sin(i) * 3,
            radius: 8,
            damage: 20,
            color: '#a55eea'
          });
        }
        break;

      case 'captainBan':
        // Ban Missiles
        projectiles.push({
          x: this.x + this.width / 2,
          y: this.y + 10,
          vx: this.facing * 9,
          vy: 0,
          radius: 12,
          damage: 28,
          color: '#e74c3c'
        });
        break;

      case 'glitchDrill':
        // Ground Rocks / Sparks
        for (let i = 0; i < 3; i++) {
          projectiles.push({
            x: this.x + (this.facing > 0 ? this.width : 0),
            y: this.y + this.height - 20,
            vx: this.facing * (5 + i * 2),
            vy: -4 - i,
            radius: 8,
            damage: 24,
            color: '#badc58'
          });
        }
        break;

      case 'darkAlgorithm':
        // Error 404 Laser Barrage
        for (let i = -2; i <= 2; i++) {
          projectiles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            vx: this.facing * 8,
            vy: i * 2,
            radius: 10,
            damage: 30,
            color: '#ff0055'
          });
        }
        break;
    }
  }

  draw(ctx, cameraX = 0, cameraY = 0) {
    if (this.isDead) return;
    const bx = Math.round(this.x - cameraX);
    const by = Math.round(this.y - cameraY);

    ctx.save();
    ctx.translate(bx + this.width / 2, by + this.height / 2);
    ctx.scale(this.facing, 1);

    if (this.hitFlashTimer > 0) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
      return;
    }

    const bob = Math.sin(this.animTimer * 0.08) * 4;

    // Draw Boss Body
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2 + bob, this.width, this.height);

    // Glowing Core / Armor
    ctx.fillStyle = '#11052c';
    ctx.fillRect(-this.width / 2 + 10, -this.height / 2 + 10 + bob, this.width - 20, this.height - 20);

    ctx.fillStyle = (this.phase === 2) ? '#ff0055' : '#ffd700';
    ctx.fillRect(-15, -10 + bob, 30, 20);

    ctx.restore();
  }
}

window.Enemy = Enemy;
window.Boss = CampaignBoss;
window.CampaignBoss = CampaignBoss;
