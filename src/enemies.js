// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Enemies & 5 Epic Boss Engines
// ============================================================================

class Enemy {
  constructor(x, y, type = 'glitchBot') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.vx = 1.2;
    this.vy = 0;
    this.isDead = false;
    this.facing = 1;
    this.animTimer = 0;
    this.animFrame = 0;
    this.frozenTimer = 0;
    this.shootCooldown = Math.floor(Math.random() * 60);

    this.initType();
  }

  initType() {
    switch (this.type) {
      case 'glitchBot':
        this.name = 'روبوت الجليتش';
        this.width = 30; this.height = 36;
        this.hp = 45; this.maxHp = 45; this.damage = 16; this.speed = 1.6;
        this.subsReward = 150; this.scoreReward = 200; this.color = '#ff4757';
        break;

      case 'dislikeDrone':
        this.name = 'طائرة الديسلايك';
        this.width = 28; this.height = 24;
        this.hp = 35; this.maxHp = 35; this.damage = 14; this.speed = 2.0;
        this.isFlying = true;
        this.subsReward = 120; this.scoreReward = 180; this.color = '#70a1ff';
        break;

      case 'toxicCrawler':
        this.name = 'وحش التعليقات';
        this.width = 36; this.height = 22;
        this.hp = 40; this.maxHp = 40; this.damage = 18; this.speed = 1.3;
        this.subsReward = 160; this.scoreReward = 220; this.color = '#2ed573';
        break;

      case 'horrorGhost':
        this.name = 'شبح الرعب';
        this.width = 32; this.height = 36;
        this.hp = 55; this.maxHp = 55; this.damage = 22; this.speed = 2.0;
        this.isFlying = true;
        this.subsReward = 200; this.scoreReward = 300; this.color = '#a55eea';
        break;

      case 'glitchPirate':
        this.name = 'قرصان السحاب';
        this.width = 30; this.height = 34;
        this.hp = 50; this.maxHp = 50; this.damage = 20; this.speed = 2.2;
        this.isFlying = true;
        this.subsReward = 220; this.scoreReward = 320; this.color = '#f1c40f';
        break;

      case 'cyberSpider':
        this.name = 'عنكبوت إلكتروني';
        this.width = 32; this.height = 24;
        this.hp = 35; this.maxHp = 35; this.damage = 20; this.speed = 2.4;
        this.subsReward = 140; this.scoreReward = 200; this.color = '#badc58';
        break;

      case 'eliteGuard':
        this.name = 'حارس النخبة';
        this.width = 34; this.height = 44;
        this.hp = 90; this.maxHp = 90; this.damage = 26; this.speed = 1.8;
        this.subsReward = 350; this.scoreReward = 500; this.color = '#eb4d4b';
        break;
    }
  }

  takeDamage(amount, knockbackDir = 0) {
    if (this.isDead) return;
    this.hp -= amount;
    this.vx = knockbackDir * 4;
    this.vy = -3;

    window.audio.sfxEnemyHurt();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 8, [this.color, '#ffffff'], 2, 5);
    window.particles.addFloatingText(this.x + this.width / 2, this.y - 10, `-${Math.round(amount)}`, '#fffa65', 13);

    if (this.hp <= 0) this.die();
  }

  die() {
    this.isDead = true;
    window.audio.sfxExplosion();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 18, [this.color, '#ff4757', '#ffa502', '#ffffff'], 3, 8);
    window.particles.addFloatingText(this.x + this.width / 2, this.y - 20, `+${this.subsReward} SUBS`, '#2ed573', 14, '★');

    if (window.game && window.game.objectives) {
      window.game.objectives.recordEnemyKilled(this.type);
    }
  }

  update(player, platforms, enemyProjectiles) {
    if (this.isDead) return;
    if (this.frozenTimer > 0) {
      this.frozenTimer--;
      return;
    }

    this.animTimer++;
    if (this.animTimer >= 8) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }

    const distToPlayer = Math.hypot((player.x + player.width / 2) - (this.x + this.width / 2), (player.y + player.height / 2) - (this.y + this.height / 2));
    const dirToPlayer = Math.sign(player.x - this.x);

    if (this.isFlying) {
      this.facing = dirToPlayer || 1;
      this.x += (player.x - this.x) * 0.025;
      this.y += ((player.y - 40) - this.y) * 0.025 + Math.sin(this.animTimer * 0.2) * 1.5;

      this.shootCooldown--;
      if (this.shootCooldown <= 0 && distToPlayer < 350) {
        this.shootCooldown = 95;
        window.audio.playTone(850, 'sawtooth', 0.1, 0.2, 0.01, 200);
        enemyProjectiles.push({
          x: this.x + this.width / 2, y: this.y + this.height,
          vx: (player.x - this.x) * 0.02, vy: 4.5,
          damage: this.damage, color: this.color, radius: 5, type: 'bullet'
        });
      }
    } else {
      // Ground Patrol / Chase
      if (distToPlayer < 240) {
        this.facing = dirToPlayer || 1;
        this.vx = this.facing * (this.speed * 1.3);
      } else {
        this.vx = this.facing * this.speed;
      }
      this.vy += 0.45;
      this.x += this.vx;
      this.checkPlatformCollisionHorizontal(platforms);
      this.y += this.vy;
      this.checkPlatformCollisionVertical(platforms);
    }
  }

  checkPlatformCollisionHorizontal(platforms) {
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

  draw(ctx, cameraX = 0, cameraY = 0) {
    if (this.isDead) return;
    const ex = Math.round(this.x - cameraX);
    const ey = Math.round(this.y - cameraY);

    ctx.save();
    ctx.translate(ex + this.width / 2, ey + this.height / 2);
    ctx.scale(this.facing, 1);

    if (this.frozenTimer > 0) {
      ctx.fillStyle = '#00d2d3';
      ctx.fillRect(-this.width / 2 - 2, -this.height / 2 - 2, this.width + 4, this.height + 4);
    }

    if (this.type === 'glitchBot' || this.type === 'eliteGuard') {
      ctx.fillStyle = this.color;
      ctx.fillRect(-12, -14, 24, 24);
      ctx.fillStyle = '#111';
      ctx.fillRect(-9, -11, 18, 12);
      ctx.fillStyle = '#fff';
      ctx.fillRect(-6, -8, 4, 4);
      ctx.fillRect(2, -8, 4, 4);
      ctx.fillStyle = '#747d8c';
      ctx.fillRect(-10, 10, 6, 8);
      ctx.fillRect(4, 10, 6, 8);
    } else if (this.type === 'dislikeDrone' || this.type === 'glitchPirate') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.fillRect(-8, -10, 16, 2);
    } else if (this.type === 'cyberSpider') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(-3, -3, 6, 4);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }

    ctx.restore();
  }
}


// ============================================================================
// 5 Campaign Boss Engines
// ============================================================================

class CampaignBoss {
  constructor(x, y, bossType = 'lagTitan') {
    this.x = x;
    this.y = y;
    this.bossType = bossType; // lagTitan (Stage 4), dislikeGhost (Stage 8), captainBan (Stage 12), glitchDrill (Stage 16), darkAlgorithm (Stage 20)
    this.facing = -1;
    this.animTimer = 0;
    this.attackTimer = 0;
    this.isDead = false;
    this.phase = 1;
    this.tauntText = '';
    this.tauntTimer = 0;

    this.initBossStats();
  }

  initBossStats() {
    switch (this.bossType) {
      case 'lagTitan':
        this.name = 'وحش اللاغ العملاق (Lag Titan)';
        this.maxHp = 500; this.hp = 500; this.width = 90; this.height = 100;
        this.color = '#ff9f43';
        this.tauntText = 'البينغ 9999ms! لن تتحرك!';
        break;

      case 'dislikeGhost':
        this.name = 'شبح الديسلايك الأسود (Black Dislike Ghost)';
        this.maxHp = 600; this.hp = 600; this.width = 95; this.height = 105;
        this.color = '#5f27cd';
        this.tauntText = 'ديسلايكات لا تنتهي!';
        break;

      case 'captainBan':
        this.name = 'كابتن الباند الطائر (Airship Captain Ban)';
        this.maxHp = 700; this.hp = 700; this.width = 110; this.height = 90;
        this.color = '#e74c3c';
        this.tauntText = 'صواريخ الحظر جاهزة للإطلاق!';
        break;

      case 'glitchDrill':
        this.name = 'حفار الجليتش العملاق (The Glitch Drill)';
        this.maxHp = 800; this.hp = 800; this.width = 120; this.height = 110;
        this.color = '#badc58';
        this.tauntText = 'سأسحق كل ما بنيتموه!';
        break;

      case 'darkAlgorithm':
        this.name = 'الخوارزمية المظلمة (Error 404)';
        this.maxHp = 1200; this.hp = 1200; this.width = 130; this.height = 120;
        this.color = '#ff0055';
        this.tauntText = 'أنا من يتحكم بيوتيوب! حظر نهائي!';
        break;
    }
  }

  takeDamage(amount) {
    if (this.isDead) return;
    this.hp -= amount;

    window.audio.sfxBossHit();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 14, [this.color, '#ff0055', '#ffffff'], 3, 8);
    window.particles.addFloatingText(this.x + this.width / 2, this.y - 20, `-${Math.round(amount)}`, '#ff4757', 18, '💥');

    // Phase checks
    if (this.hp <= this.maxHp * 0.33 && this.phase < 3) {
      this.phase = 3;
      this.tauntText = 'غضب أقصى! طور الهلاك!';
      this.tauntTimer = 180;
      window.audio.sfxBossRoar();
    } else if (this.hp <= this.maxHp * 0.66 && this.phase < 2) {
      this.phase = 2;
      this.tauntText = 'درع الطوارئ مفعل!';
      this.tauntTimer = 160;
      window.audio.sfxBossRoar();
    }

    if (this.hp <= 0) {
      this.hp = 0;
      this.die();
    }
  }

  die() {
    this.isDead = true;
    window.audio.sfxExplosion();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 80, ['#ffd700', '#2ed573', '#ff0055', '#ffffff'], 4, 14);

    if (window.game && window.game.objectives) {
      window.game.objectives.recordBossDefeated();
    }
  }

  update(player, platforms, enemyProjectiles, enemies) {
    if (this.isDead) return;

    this.animTimer++;
    if (this.tauntTimer > 0) this.tauntTimer--;

    const dirToPlayer = Math.sign(player.x - this.x);
    this.facing = dirToPlayer || -1;

    this.attackTimer++;
    const interval = (this.phase === 3) ? 70 : (this.phase === 2 ? 100 : 130);

    if (this.attackTimer >= interval) {
      this.attackTimer = 0;
      window.audio.playTone(180, 'sawtooth', 0.2, 0.3, 0.01, 60);

      // Boss special attacks
      if (this.bossType === 'lagTitan') {
        // Shockwave fists
        for (let dir of [-1, 1]) {
          enemyProjectiles.push({
            x: this.x + this.width / 2, y: this.y + this.height - 10,
            vx: dir * 5.5, vy: 0, damage: 24, color: '#ff9f43', radius: 10, type: 'lagShock'
          });
        }
      } else if (this.bossType === 'dislikeGhost') {
        // Dislike Dark Orbs
        for (let i = -1; i <= 1; i++) {
          enemyProjectiles.push({
            x: this.x + (this.facing > 0 ? this.width : 0), y: this.y + 40 + i * 15,
            vx: this.facing * 7, vy: i * 2, damage: 26, color: '#5f27cd', radius: 8, type: 'dislikeOrb'
          });
        }
      } else if (this.bossType === 'captainBan') {
        // Airship Ban Missiles
        for (let i = 0; i < 3; i++) {
          enemyProjectiles.push({
            x: this.x + (Math.random() - 0.5) * 60, y: this.y + this.height,
            vx: (player.x - this.x) * 0.02, vy: 5 + i * 1.5, damage: 28, color: '#e74c3c', radius: 9, type: 'missile'
          });
        }
      } else if (this.bossType === 'glitchDrill') {
        // Drill Quake & Flying Rocks
        for (let i = 0; i < 4; i++) {
          enemyProjectiles.push({
            x: this.x + (this.facing * 30), y: this.y + 20,
            vx: (this.facing * 6) + (Math.random() - 0.5) * 3, vy: -4 - Math.random() * 4,
            damage: 28, color: '#badc58', radius: 9, type: 'rock'
          });
        }
      } else if (this.bossType === 'darkAlgorithm') {
        // Spiral Bullet Hell Error 404
        for (let a = 0; a < 8; a++) {
          const angle = (Math.PI * 2 / 8) * a + this.animTimer * 0.1;
          enemyProjectiles.push({
            x: this.x + this.width / 2, y: this.y + this.height / 2,
            vx: Math.cos(angle) * 6, vy: Math.sin(angle) * 6,
            damage: 30, color: '#ff0055', radius: 8, type: 'error404'
          });
        }
      }
    }

    // Boss Movement
    const spd = (this.phase === 3) ? 2.4 : 1.5;
    this.x += this.facing * spd;

    // Platform collision
    for (const p of platforms) {
      if (this.x < p.x + p.w && this.x + this.width > p.x && this.y < p.y + p.h && this.y + this.height > p.y) {
        this.y = p.y - this.height;
      }
    }
  }

  draw(ctx, cameraX = 0, cameraY = 0) {
    if (this.isDead) return;
    const bx = Math.round(this.x - cameraX);
    const by = Math.round(this.y - cameraY);

    ctx.save();
    ctx.translate(bx + this.width / 2, by + this.height / 2);
    ctx.scale(this.facing, 1);

    // Aura
    ctx.fillStyle = (this.phase === 3) ? 'rgba(255, 0, 85, 0.3)' : 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.arc(0, 0, this.width * 0.65, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

    // Glowing Eyes
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, -15, 12, 8);
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(14, -13, 6, 6);

    // Boss Title Plate
    ctx.fillStyle = '#111';
    ctx.fillRect(-this.width / 2 + 6, 0, this.width - 12, 18);
    ctx.fillStyle = '#ffd700';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('BOSS', 0, 12);

    ctx.restore();

    // Speech Bubble
    if (this.tauntTimer > 0) {
      ctx.save();
      ctx.font = 'bold 12px "Cairo", sans-serif';
      ctx.textAlign = 'center';
      const textW = ctx.measureText(this.tauntText).width + 20;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
      ctx.fillRect(bx + this.width / 2 - textW / 2, by - 26, textW, 24);
      ctx.strokeStyle = '#ff0055';
      ctx.lineWidth = 2;
      ctx.strokeRect(bx + this.width / 2 - textW / 2, by - 26, textW, 24);
      ctx.fillStyle = '#ffd700';
      ctx.fillText(this.tauntText, bx + this.width / 2, by - 10);
      ctx.restore();
    }
  }
}

window.Enemy = Enemy;
window.CampaignBoss = CampaignBoss;
