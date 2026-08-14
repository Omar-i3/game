// ============================================================================
// Arab Gamers: Pixel Legends - Player Character System & 5 Hero Classes
// ============================================================================

const HERO_DATA = {
  banderita: {
    id: 'banderita',
    name: 'بندريتا',
    nameEn: 'BanderitaX',
    title: 'ملك البطاطا والملاكمة',
    titleEn: 'King of Potatoes & Brawling',
    class: 'Heavy Tank / Brawler',
    color: '#ff3838',
    secondaryColor: '#f5b041',
    avatarBorder: '#e74c3c',
    maxHp: 150,
    speed: 4.2,
    jumpPower: -11.8,
    attackPower: 35,
    defense: 25,
    attackRange: 52,
    attackDuration: 18,
    specialName: 'غضبة البطاطا (Potato Rage)',
    specialDesc: 'انفجار ناري مدمر من البطاطا يمسح الشاشة من الأعداء',
    specialDescEn: 'Unleashes a massive explosive potato shockwave wiping surrounding enemies.'
  },
  mlzlz: {
    id: 'mlzlz',
    name: 'ملزلز',
    nameEn: 'MLZLZ',
    title: 'صياد الرعب والمحقق',
    titleEn: 'Horror Hunter & Detective',
    class: 'Horror Hunter / Detective',
    color: '#00d2d3',
    secondaryColor: '#5f27cd',
    avatarBorder: '#00d2d3',
    maxHp: 110,
    speed: 4.8,
    jumpPower: -12.0,
    attackPower: 28,
    defense: 15,
    attackRange: 60,
    attackDuration: 16,
    critRate: 0.35,
    specialName: 'فلاش الرعب (Horror Flash)',
    specialDesc: 'تجميد جميع الأعداء في الشاشة وإطلاق أشباح رقمية تهاجمهم',
    specialDescEn: 'Freezes all screen enemies and summons spectral pixel ghosts to hunt them.'
  },
  ocmz: {
    id: 'ocmz',
    name: 'أوسمز',
    nameEn: 'oCMz',
    title: 'سيد البلوكات والسرعة',
    titleEn: 'Speedster & Block Master',
    class: 'Speedster / Block Master',
    color: '#2ed573',
    secondaryColor: '#1e90ff',
    avatarBorder: '#2ed573',
    maxHp: 95,
    speed: 6.2,
    jumpPower: -11.5,
    attackPower: 25,
    defense: 10,
    attackRange: 46,
    attackDuration: 12,
    hasDoubleJump: true,
    specialName: 'بناء الماينكرافت (Block Barrage)',
    specialDesc: 'إمطار السماء ببلوكات ماينكرافت متفجرة تدمر الأعداء',
    specialDescEn: 'Calls down exploding pixel TNT & Minecraft blocks from the sky.'
  },
  abuAbed: {
    id: 'abuAbed',
    name: 'أبو عابد',
    nameEn: '3Gaming',
    title: 'مهندس الريدستون والصناعة',
    titleEn: 'Redstone Engineer & Crafter',
    class: 'Engineer / Crafter',
    color: '#ffa502',
    secondaryColor: '#eb2f06',
    avatarBorder: '#ffa502',
    maxHp: 130,
    speed: 4.0,
    jumpPower: -11.2,
    attackPower: 30,
    defense: 30,
    attackRange: 50,
    attackDuration: 20,
    specialName: 'برج الريدستون (Redstone Turret)',
    specialDesc: 'بناء برج ليزر أوتوماتيكي ذكي يطلق النار على الأعداء',
    specialDescEn: 'Constructs an automated redstone laser turret attacking nearby targets.'
  },
  opiilz: {
    id: 'opiilz',
    name: 'أوبلز',
    nameEn: 'oPiiLz',
    title: 'ساحر النيون والمتزلج',
    titleEn: 'Neon Skater & Dark Mage',
    class: 'Dark Mage / Skater',
    color: '#9b59b6',
    secondaryColor: '#e056fd',
    avatarBorder: '#9b59b6',
    maxHp: 100,
    speed: 5.4,
    jumpPower: -12.2,
    attackPower: 29,
    defense: 12,
    attackRange: 160,
    attackDuration: 15,
    canHover: true,
    specialName: 'لوح النيون (Hoverboard Strike)',
    specialDesc: 'اندفاع نفاث بلوح النيون مع درب ناري بنفسجي يحرق كل شيء',
    specialDescEn: 'Dashes at supersonic speed on a neon hoverboard leaving a trail of plasma fire.'
  }
};

class Player {
  constructor(heroId = 'banderita') {
    this.setHero(heroId);
    this.x = 100;
    this.y = 300;
    this.vx = 0;
    this.vy = 0;
    this.width = 34;
    this.height = 50;
    this.facing = 1; // 1 = right, -1 = left
    this.isGrounded = false;
    this.jumpsLeft = 1;
    this.isAttacking = false;
    this.attackTimer = 0;
    this.energy = 0; // 0 to 100
    this.maxEnergy = 100;
    this.isSpecialActive = false;
    this.specialTimer = 0;
    this.invulnerableTimer = 0;
    this.animFrame = 0;
    this.animTimer = 0;
    this.state = 'idle'; // idle, running, jumping, falling, attacking, special, hurt
    this.projectiles = []; // Ranged attacks / special summons
    this.turrets = []; // 3Gaming turrets
    this.activeGhosts = []; // MLZLZ ghosts
    this.fallingBlocks = []; // oCMz blocks
  }

  setHero(heroId) {
    this.heroData = HERO_DATA[heroId] || HERO_DATA.banderita;
    this.heroId = this.heroData.id;
    this.hp = this.heroData.maxHp;
    this.maxHp = this.heroData.maxHp;
    this.speed = this.heroData.speed;
    this.jumpPower = this.heroData.jumpPower;
    this.attackPower = this.heroData.attackPower;
    this.defense = this.heroData.defense;
    this.maxJumps = this.heroData.hasDoubleJump ? 2 : 1;
    this.jumpsLeft = this.maxJumps;
    this.energy = Math.min(this.energy || 0, 100);
  }

  resetPosition(x = 100, y = 300) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.isGrounded = false;
    this.isAttacking = false;
    this.attackTimer = 0;
    this.isSpecialActive = false;
    this.specialTimer = 0;
    this.invulnerableTimer = 0;
    this.projectiles = [];
    this.turrets = [];
    this.activeGhosts = [];
    this.fallingBlocks = [];
    this.jumpsLeft = this.maxJumps;
  }

  // --------------------------------------------------------------------------
  // Movement & Input Handlers
  // --------------------------------------------------------------------------
  move(dir) {
    if (this.isSpecialActive && this.heroId === 'opiilz') return; // Locked in super dash
    this.vx = dir * this.speed;
    if (dir !== 0) {
      this.facing = dir;
    }
  }

  jump() {
    if (this.jumpsLeft > 0) {
      this.vy = this.jumpPower;
      this.isGrounded = false;
      this.jumpsLeft--;

      if (this.jumpsLeft === 0 && this.maxJumps > 1) {
        window.audio.sfxDoubleJump();
        window.particles.burst(this.x + this.width / 2, this.y + this.height, 12, ['#2ecc71', '#58d68d', '#ffffff'], 2, 5);
      } else {
        window.audio.sfxJump();
        window.particles.burst(this.x + this.width / 2, this.y + this.height, 8, ['#ecf0f1', '#bdc3c7'], 1, 4);
      }
    }
  }

  attack() {
    if (this.isAttacking || this.isSpecialActive) return;

    this.isAttacking = true;
    this.attackTimer = this.heroData.attackDuration;

    if (this.heroId === 'banderita') {
      window.audio.sfxAttackSlash();
    } else if (this.heroId === 'mlzlz') {
      window.audio.sfxAttackSlash();
    } else if (this.heroId === 'ocmz') {
      window.audio.sfxPunch();
    } else if (this.heroId === 'abuAbed') {
      window.audio.sfxPunch();
    } else if (this.heroId === 'opiilz') {
      // Ranged projectile attack
      window.audio.sfxLaser();
      this.projectiles.push({
        x: this.facing > 0 ? this.x + this.width : this.x - 14,
        y: this.y + 18,
        vx: this.facing * 9,
        vy: 0,
        radius: 8,
        damage: this.attackPower,
        color: '#e056fd',
        life: 45,
        type: 'plasma'
      });
    }
  }

  triggerSpecial() {
    if (this.energy < this.maxEnergy || this.isSpecialActive) return false;

    this.energy = 0;
    this.isSpecialActive = true;
    this.invulnerableTimer = 60; // Temporary invincibility during ult

    window.particles.addFloatingText(this.x + this.width / 2, this.y - 20, this.heroData.specialName, '#fffa65', 16, '⚡');

    switch (this.heroId) {
      case 'banderita':
        // Potato Rage
        this.specialTimer = 40;
        window.audio.sfxPotatoRage();
        window.particles.potatoRageBlast(this.x + this.width / 2, this.y + this.height / 2);
        break;

      case 'mlzlz':
        // Horror Flash & Ghosts
        this.specialTimer = 60;
        window.audio.sfxHorrorGhost();
        window.particles.horrorFlash(this.x + this.width / 2, this.y + this.height / 2);
        for (let i = 0; i < 4; i++) {
          this.activeGhosts.push({
            x: this.x + (Math.random() - 0.5) * 80,
            y: this.y - 40 - Math.random() * 40,
            vx: (Math.random() - 0.5) * 6,
            vy: -2 - Math.random() * 3,
            targetEnemy: null,
            damage: 55,
            life: 180
          });
        }
        break;

      case 'ocmz':
        // Block Barrage
        this.specialTimer = 70;
        window.audio.sfxBlockDrop();
        for (let i = 0; i < 8; i++) {
          this.fallingBlocks.push({
            x: this.x - 200 + i * 65 + (Math.random() - 0.5) * 30,
            y: this.y - 320 - i * 25,
            vy: 7 + Math.random() * 4,
            damage: 60,
            size: 24,
            color: i % 2 === 0 ? '#2ecc71' : '#e74c3c',
            exploded: false
          });
        }
        break;

      case 'abuAbed':
        // Turret Craft
        this.specialTimer = 30;
        window.audio.sfxTurretDeploy();
        this.turrets.push({
          x: this.x + (this.facing * 40),
          y: this.y + 10,
          shootCooldown: 0,
          duration: 480, // 8 seconds
          facing: this.facing
        });
        window.particles.burst(this.x + (this.facing * 40), this.y + 20, 15, ['#e74c3c', '#ffa502'], 2, 6);
        break;

      case 'opiilz':
        // Neon Hoverboard Dash
        this.specialTimer = 50;
        window.audio.sfxNeonDash();
        this.vx = this.facing * 14;
        this.vy = 0;
        break;
    }

    return true;
  }

  takeDamage(amount, knockbackDir = 0) {
    if (this.invulnerableTimer > 0) return 0;

    const actualDamage = Math.max(5, Math.round(amount * (1 - this.defense / 100)));
    this.hp -= actualDamage;
    this.invulnerableTimer = 45; // 45 frames i-frames
    this.vx = knockbackDir * 5;
    this.vy = -4;

    window.audio.sfxPlayerHurt();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 14, ['#ff4757', '#ff6b81'], 2, 6);
    window.particles.addFloatingText(this.x + this.width / 2, this.y - 10, `-${actualDamage}`, '#ff4757', 15);

    if (this.hp <= 0) {
      this.hp = 0;
    }
    return actualDamage;
  }

  addEnergy(amount) {
    this.energy = Math.min(this.maxEnergy, this.energy + amount);
    if (this.energy >= this.maxEnergy) {
      window.particles.addFloatingText(this.x + this.width / 2, this.y - 25, 'ULTIMATE READY!', '#2ed573', 13, '⚡');
    }
  }

  heal(amount) {
    const prev = this.hp;
    this.hp = Math.min(this.maxHp, this.hp + amount);
    const restored = this.hp - prev;
    if (restored > 0) {
      window.audio.sfxHealth();
      window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 10, ['#2ed573', '#7bed9f'], 1, 4);
      window.particles.addFloatingText(this.x + this.width / 2, this.y - 10, `+${restored} HP`, '#2ed573', 14, '❤️');
    }
  }

  // --------------------------------------------------------------------------
  // Update Cycle
  // --------------------------------------------------------------------------
  update(platforms, enemies, boss) {
    // Gravity & Air Resistance
    if (!this.isGrounded) {
      // oPiiLz hover capability when holding jump / gliding
      const gravity = (this.heroId === 'opiilz' && this.vy > 0) ? 0.38 : 0.55;
      this.vy += gravity;
      if (this.vy > 12) this.vy = 12;
    }

    // Special dash for oPiiLz
    if (this.isSpecialActive && this.heroId === 'opiilz') {
      this.vx = this.facing * 14;
      this.vy = 0;
      window.particles.neonTrail(this.x + (this.facing > 0 ? 0 : this.width), this.y + 30, this.facing);
    } else {
      this.vx *= 0.82; // Friction
    }

    // Move horizontally & collide with platforms
    this.x += this.vx;
    this.checkPlatformCollisionHorizontal(platforms);

    // Move vertically & collide with platforms
    this.y += this.vy;
    this.isGrounded = false;
    this.checkPlatformCollisionVertical(platforms);

    // Attack timer
    if (this.isAttacking) {
      this.attackTimer--;
      if (this.attackTimer <= 0) {
        this.isAttacking = false;
      }
    }

    // Special timer
    if (this.isSpecialActive) {
      this.specialTimer--;
      if (this.specialTimer <= 0) {
        this.isSpecialActive = false;
      }
    }

    // Invulnerability i-frames
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer--;
    }

    // Animation frames
    this.animTimer++;
    if (this.animTimer >= 6) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }

    // Determine state
    if (this.isSpecialActive) {
      this.state = 'special';
    } else if (this.isAttacking) {
      this.state = 'attack';
    } else if (!this.isGrounded) {
      this.state = this.vy < 0 ? 'jump' : 'fall';
    } else if (Math.abs(this.vx) > 0.5) {
      this.state = 'run';
    } else {
      this.state = 'idle';
    }

    // Update Player Projectiles (oPiiLz plasma orbs, etc.)
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.x += proj.vx;
      proj.y += proj.vy;
      proj.life--;

      window.particles.add(proj.x, proj.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, proj.color, 3, 10, 'spark');

      // Check hit on enemies / boss
      let hit = false;
      if (enemies) {
        for (const enemy of enemies) {
          if (!enemy.isDead && Math.hypot(proj.x - (enemy.x + enemy.width / 2), proj.y - (enemy.y + enemy.height / 2)) < (proj.radius + enemy.width / 2)) {
            enemy.takeDamage(proj.damage, Math.sign(proj.vx));
            this.addEnergy(10);
            hit = true;
            break;
          }
        }
      }

      if (!hit && boss && !boss.isDead) {
        if (Math.hypot(proj.x - (boss.x + boss.width / 2), proj.y - (boss.y + boss.height / 2)) < (proj.radius + boss.width / 2)) {
          boss.takeDamage(proj.damage);
          this.addEnergy(12);
          hit = true;
        }
      }

      if (hit || proj.life <= 0) {
        window.particles.burst(proj.x, proj.y, 8, [proj.color, '#ffffff'], 2, 5);
        this.projectiles.splice(i, 1);
      }
    }

    // Update Turrets (3Gaming)
    for (let i = this.turrets.length - 1; i >= 0; i--) {
      const turret = this.turrets[i];
      turret.duration--;
      turret.shootCooldown--;

      if (turret.shootCooldown <= 0) {
        // Target nearest active enemy or boss
        let target = null;
        let minDist = 380;

        if (boss && !boss.isDead) {
          const d = Math.hypot(turret.x - boss.x, turret.y - boss.y);
          if (d < minDist) {
            target = boss;
            minDist = d;
          }
        }

        if (enemies) {
          for (const e of enemies) {
            if (!e.isDead) {
              const d = Math.hypot(turret.x - e.x, turret.y - e.y);
              if (d < minDist) {
                target = e;
                minDist = d;
              }
            }
          }
        }

        if (target) {
          turret.shootCooldown = 28;
          window.audio.sfxLaser();
          const angle = Math.atan2((target.y + target.height / 2) - turret.y, (target.x + target.width / 2) - turret.x);
          this.projectiles.push({
            x: turret.x,
            y: turret.y,
            vx: Math.cos(angle) * 11,
            vy: Math.sin(angle) * 11,
            radius: 5,
            damage: 22,
            color: '#e74c3c',
            life: 40,
            type: 'laser'
          });
        }
      }

      if (turret.duration <= 0) {
        window.particles.burst(turret.x, turret.y, 15, ['#e74c3c', '#ffa502'], 2, 5);
        this.turrets.splice(i, 1);
      }
    }

    // Update Ghosts (MLZLZ)
    for (let i = this.activeGhosts.length - 1; i >= 0; i--) {
      const ghost = this.activeGhosts[i];
      ghost.life--;

      // Home towards nearest enemy or boss
      let target = null;
      let minDist = 450;
      if (boss && !boss.isDead) {
        target = boss;
        minDist = Math.hypot(ghost.x - boss.x, ghost.y - boss.y);
      }
      if (enemies) {
        for (const e of enemies) {
          if (!e.isDead) {
            const d = Math.hypot(ghost.x - e.x, ghost.y - e.y);
            if (d < minDist) {
              minDist = d;
              target = e;
            }
          }
        }
      }

      if (target) {
        const angle = Math.atan2((target.y + target.height / 2) - ghost.y, (target.x + target.width / 2) - ghost.x);
        ghost.vx += Math.cos(angle) * 0.45;
        ghost.vy += Math.sin(angle) * 0.45;
        const spd = Math.hypot(ghost.vx, ghost.vy);
        if (spd > 7) {
          ghost.vx = (ghost.vx / spd) * 7;
          ghost.vy = (ghost.vy / spd) * 7;
        }

        // Check hit
        if (minDist < 30) {
          if (target === boss) {
            boss.takeDamage(ghost.damage);
          } else {
            target.takeDamage(ghost.damage, Math.sign(ghost.vx));
            target.frozenTimer = 60; // Horror freeze
          }
          this.addEnergy(8);
          window.particles.burst(ghost.x, ghost.y, 12, ['#00d2d3', '#5f27cd', '#ffffff'], 2, 5);
          this.activeGhosts.splice(i, 1);
          continue;
        }
      }

      ghost.x += ghost.vx;
      ghost.y += ghost.vy;

      if (ghost.life <= 0) {
        this.activeGhosts.splice(i, 1);
      }
    }

    // Update Falling Minecraft Blocks (oCMz)
    for (let i = this.fallingBlocks.length - 1; i >= 0; i--) {
      const block = this.fallingBlocks[i];
      block.y += block.vy;

      // Check hit on ground or enemies
      let hit = false;
      if (enemies) {
        for (const e of enemies) {
          if (!e.isDead && Math.hypot(block.x - (e.x + e.width / 2), block.y - (e.y + e.height / 2)) < (block.size + e.width / 2)) {
            e.takeDamage(block.damage, 0);
            hit = true;
          }
        }
      }
      if (boss && !boss.isDead && Math.hypot(block.x - (boss.x + boss.width / 2), block.y - (boss.y + boss.height / 2)) < (block.size + boss.width / 2)) {
        boss.takeDamage(block.damage);
        hit = true;
      }

      // Check ground collision
      for (const p of platforms) {
        if (block.x > p.x && block.x < p.x + p.w && block.y > p.y) {
          hit = true;
          break;
        }
      }

      if (hit) {
        window.audio.sfxExplosion();
        window.particles.blockBarrageImpact(block.x, block.y);
        this.fallingBlocks.splice(i, 1);
      }
    }
  }

  // --------------------------------------------------------------------------
  // Collision Detection
  // --------------------------------------------------------------------------
  checkPlatformCollisionHorizontal(platforms) {
    for (const p of platforms) {
      if (p.isOneWay) continue;
      if (this.x < p.x + p.w && this.x + this.width > p.x &&
          this.y < p.y + p.h && this.y + this.height > p.y) {
        if (this.vx > 0) {
          this.x = p.x - this.width;
          this.vx = 0;
        } else if (this.vx < 0) {
          this.x = p.x + p.w;
          this.vx = 0;
        }
      }
    }
  }

  checkPlatformCollisionVertical(platforms) {
    for (const p of platforms) {
      if (p.isOneWay) {
        // One way platform: only collide when falling down and feet are at top
        if (this.vy > 0 &&
            this.x + this.width > p.x && this.x < p.x + p.w &&
            this.y + this.height >= p.y && this.y + this.height - this.vy <= p.y + 8) {
          this.y = p.y - this.height;
          this.vy = 0;
          this.isGrounded = true;
          this.jumpsLeft = this.maxJumps;
        }
      } else {
        if (this.x < p.x + p.w && this.x + this.width > p.x &&
            this.y < p.y + p.h && this.y + this.height > p.y) {
          if (this.vy > 0) {
            this.y = p.y - this.height;
            this.vy = 0;
            this.isGrounded = true;
            this.jumpsLeft = this.maxJumps;
          } else if (this.vy < 0) {
            this.y = p.y + p.h;
            this.vy = 0;
          }
        }
      }
    }
  }

  getAttackHitbox() {
    if (!this.isAttacking && (!this.isSpecialActive || this.heroId !== 'opiilz')) return null;

    if (this.isSpecialActive && this.heroId === 'opiilz') {
      return {
        x: this.x - 10,
        y: this.y - 10,
        width: this.width + 20,
        height: this.height + 20,
        damage: 90,
        knockback: this.facing * 12
      };
    }

    const range = this.heroData.attackRange;
    return {
      x: this.facing > 0 ? this.x + this.width : this.x - range,
      y: this.y + 6,
      width: range,
      height: this.height - 12,
      damage: this.heroData.critRate && Math.random() < this.heroData.critRate ? this.attackPower * 1.8 : this.attackPower,
      knockback: this.facing * 6
    };
  }

  // --------------------------------------------------------------------------
  // Pixel Art Character Sprite Renderer
  // --------------------------------------------------------------------------
  draw(ctx, cameraX = 0, cameraY = 0) {
    const px = Math.round(this.x - cameraX);
    const py = Math.round(this.y - cameraY);

    // Draw active turrets
    for (const turret of this.turrets) {
      const tx = Math.round(turret.x - cameraX);
      const ty = Math.round(turret.y - cameraY);
      ctx.save();
      // Turret base
      ctx.fillStyle = '#7f8c8d';
      ctx.fillRect(tx - 12, ty + 12, 24, 8);
      // Redstone core
      ctx.fillStyle = (Math.floor(Date.now() / 150) % 2 === 0) ? '#e74c3c' : '#ff7675';
      ctx.fillRect(tx - 8, ty - 4, 16, 16);
      // Cannon barrel
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(tx + (turret.facing * 4), ty, turret.facing * 14, 6);
      ctx.restore();
    }

    // Draw active ghosts (MLZLZ)
    for (const ghost of this.activeGhosts) {
      const gx = Math.round(ghost.x - cameraX);
      const gy = Math.round(ghost.y - cameraY);
      ctx.save();
      ctx.fillStyle = '#00d2d3';
      ctx.beginPath();
      ctx.arc(gx, gy, 10, Math.PI, 0);
      ctx.lineTo(gx + 10, gy + 12);
      ctx.lineTo(gx - 10, gy + 12);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(gx - 4, gy - 2, 3, 3);
      ctx.fillRect(gx + 2, gy - 2, 3, 3);
      ctx.restore();
    }

    // Draw falling blocks (oCMz)
    for (const block of this.fallingBlocks) {
      const bx = Math.round(block.x - cameraX);
      const by = Math.round(block.y - cameraY);
      ctx.save();
      ctx.fillStyle = block.color;
      ctx.fillRect(bx - block.size / 2, by - block.size / 2, block.size, block.size);
      ctx.fillStyle = '#2c3e50';
      ctx.font = '10px monospace';
      ctx.fillText('TNT', bx - 9, by + 4);
      ctx.restore();
    }

    // Draw projectiles
    for (const proj of this.projectiles) {
      const prx = Math.round(proj.x - cameraX);
      const pry = Math.round(proj.y - cameraY);
      ctx.save();
      ctx.fillStyle = proj.color;
      ctx.beginPath();
      ctx.arc(prx, pry, proj.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }

    // Invulnerability blink effect
    if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer / 4) % 2 === 0) {
      return;
    }

    ctx.save();
    ctx.translate(px + this.width / 2, py + this.height / 2);
    ctx.scale(this.facing, 1);

    const bob = (this.state === 'run') ? Math.sin(this.animFrame * Math.PI / 2) * 3 : 0;
    const legOffset = (this.state === 'run') ? (this.animFrame % 2 === 0 ? 4 : -4) : 0;

    // Draw Hero based on ID
    switch (this.heroId) {
      case 'banderita':
        this.drawBanderita(ctx, bob, legOffset);
        break;
      case 'mlzlz':
        this.drawMLZLZ(ctx, bob, legOffset);
        break;
      case 'ocmz':
        this.drawOCMz(ctx, bob, legOffset);
        break;
      case 'abuAbed':
        this.drawAbuAbed(ctx, bob, legOffset);
        break;
      case 'opiilz':
        this.drawOPiiLz(ctx, bob, legOffset);
        break;
    }

    // Draw Normal Attack Animations
    if (this.isAttacking) {
      this.drawAttackSlash(ctx);
    }

    ctx.restore();
  }

  // 1. BANDERITAX SPRITE
  drawBanderita(ctx, bob, legOffset) {
    const w = 32;
    const h = 48;

    // Legs & Golden Boots
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-10, 10 + bob, 8, 14 + legOffset);
    ctx.fillRect(2, 10 + bob, 8, 14 - legOffset);
    ctx.fillStyle = '#f1c40f'; // Golden shoes
    ctx.fillRect(-12, 22 + bob + legOffset, 10, 4);
    ctx.fillRect(2, 22 + bob - legOffset, 10, 4);

    // Heavy Armor / Red Hoodie
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(-14, -8 + bob, 28, 20);
    // Golden potato emblem on chest
    ctx.fillStyle = '#f39c12';
    ctx.beginPath();
    ctx.arc(0, 0 + bob, 4, 0, Math.PI * 2);
    ctx.fill();

    // Head / Face
    ctx.fillStyle = '#fcd0a1';
    ctx.fillRect(-10, -26 + bob, 20, 18);

    // Beard
    ctx.fillStyle = '#1c1208';
    ctx.fillRect(-10, -12 + bob, 20, 7);
    ctx.fillRect(-6, -8 + bob, 12, 4);

    // Red Headband
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(-12, -26 + bob, 24, 5);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, -26 + bob, 4, 5);

    // Hair
    ctx.fillStyle = '#1c1208';
    ctx.fillRect(-12, -29 + bob, 24, 4);

    // Determined Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(2, -20 + bob, 3, 3);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(4, -20 + bob, 1, 1);

    // Golden Sword in hand
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(12, -4 + bob, 16, 4);
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(10, -6 + bob, 4, 8);
  }

  // 2. MLZLZ SPRITE
  drawMLZLZ(ctx, bob, legOffset) {
    // Legs & Boots
    ctx.fillStyle = '#1e272e';
    ctx.fillRect(-8, 10 + bob, 7, 14 + legOffset);
    ctx.fillRect(1, 10 + bob, 7, 14 - legOffset);
    ctx.fillStyle = '#0abde3';
    ctx.fillRect(-10, 22 + bob + legOffset, 9, 4);
    ctx.fillRect(1, 22 + bob - legOffset, 9, 4);

    // Detective Trench Coat
    ctx.fillStyle = '#2f3542';
    ctx.fillRect(-12, -8 + bob, 24, 22);
    ctx.fillStyle = '#00d2d3'; // Cyan neon collar
    ctx.fillRect(-4, -8 + bob, 8, 18);

    // Face
    ctx.fillStyle = '#ffeaa7';
    ctx.fillRect(-9, -24 + bob, 18, 16);

    // Hair & Gamer Headset
    ctx.fillStyle = '#2d3436';
    ctx.fillRect(-10, -28 + bob, 20, 6);
    // Cyan Neon Headset
    ctx.fillStyle = '#00d2d3';
    ctx.fillRect(-11, -26 + bob, 4, 10);
    ctx.fillRect(-9, -29 + bob, 18, 3);

    // Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(2, -18 + bob, 3, 3);
    ctx.fillStyle = '#00d2d3';
    ctx.fillRect(3, -18 + bob, 1, 1);

    // Tactical Flashlight
    ctx.fillStyle = '#57606f';
    ctx.fillRect(10, 0 + bob, 12, 6);
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(20, -1 + bob, 4, 8);
  }

  // 3. OCMZ SPRITE
  drawOCMz(ctx, bob, legOffset) {
    // Legs & Sneakers
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-8, 10 + bob, 7, 14 + legOffset);
    ctx.fillRect(1, 10 + bob, 7, 14 - legOffset);
    ctx.fillStyle = '#2ed573'; // Green speed sneakers
    ctx.fillRect(-10, 22 + bob + legOffset, 9, 4);
    ctx.fillRect(1, 22 + bob - legOffset, 9, 4);

    // Green & Dark Gamer Hoodie
    ctx.fillStyle = '#20bf6b';
    ctx.fillRect(-11, -8 + bob, 22, 19);
    ctx.fillStyle = '#0fb9b1';
    ctx.fillRect(-3, -8 + bob, 6, 19);

    // Face
    ctx.fillStyle = '#fed330';
    ctx.fillRect(-8, -24 + bob, 16, 16);

    // Spiky Hair
    ctx.fillStyle = '#4b6584';
    ctx.fillRect(-9, -28 + bob, 18, 6);
    ctx.fillRect(2, -30 + bob, 6, 4);

    // Eyes
    ctx.fillStyle = '#000000';
    ctx.fillRect(2, -18 + bob, 3, 3);

    // Diamond Pickaxe
    ctx.fillStyle = '#795548'; // Handle
    ctx.fillRect(8, -6 + bob, 4, 16);
    ctx.fillStyle = '#00d2d3'; // Diamond head
    ctx.fillRect(4, -10 + bob, 14, 5);
    ctx.fillRect(14, -8 + bob, 4, 6);
  }

  // 4. ABU ABED (3GAMING) SPRITE
  drawAbuAbed(ctx, bob, legOffset) {
    // Legs & Heavy Boots
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(-9, 10 + bob, 8, 14 + legOffset);
    ctx.fillRect(1, 10 + bob, 8, 14 - legOffset);
    ctx.fillStyle = '#eb4d4b';
    ctx.fillRect(-11, 22 + bob + legOffset, 10, 4);
    ctx.fillRect(1, 22 + bob - legOffset, 10, 4);

    // Engineer Jumpsuit & Tool Belt
    ctx.fillStyle = '#f0932b';
    ctx.fillRect(-12, -8 + bob, 24, 20);
    ctx.fillStyle = '#6ab04c'; // Tool belt
    ctx.fillRect(-13, 4 + bob, 26, 4);

    // Face & Beard
    ctx.fillStyle = '#ffbe76';
    ctx.fillRect(-9, -24 + bob, 18, 16);
    ctx.fillStyle = '#30336b'; // Beard
    ctx.fillRect(-9, -12 + bob, 18, 5);

    // Redstone Engineering Goggles
    ctx.fillStyle = '#eb4d4b';
    ctx.fillRect(-10, -22 + bob, 20, 6);
    ctx.fillStyle = '#badc58'; // Glow lenses
    ctx.fillRect(0, -21 + bob, 6, 4);

    // Hair & Cap
    ctx.fillStyle = '#130f40';
    ctx.fillRect(-10, -27 + bob, 20, 5);

    // Giant Redstone Wrench
    ctx.fillStyle = '#95afc0';
    ctx.fillRect(10, -4 + bob, 6, 18);
    ctx.fillStyle = '#eb4d4b';
    ctx.fillRect(8, -10 + bob, 10, 6);
  }

  // 5. OPIILZ SPRITE
  drawOPiiLz(ctx, bob, legOffset) {
    // Neon Hoverboard under feet
    ctx.fillStyle = '#8e44ad';
    ctx.fillRect(-16, 24 + bob, 32, 5);
    ctx.fillStyle = '#e056fd'; // Glowing edge
    ctx.fillRect(-18, 23 + bob, 36, 2);

    // Legs
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-7, 8 + bob, 6, 16 + legOffset);
    ctx.fillRect(1, 8 + bob, 6, 16 - legOffset);

    // Purple Neon Hoodie
    ctx.fillStyle = '#6c5ce7';
    ctx.fillRect(-11, -8 + bob, 22, 18);
    ctx.fillStyle = '#a29bfe';
    ctx.fillRect(-3, -8 + bob, 6, 18);

    // Face
    ctx.fillStyle = '#ffeaa7';
    ctx.fillRect(-8, -24 + bob, 16, 16);

    // Backward Cap & Hair
    ctx.fillStyle = '#fd79a8';
    ctx.fillRect(-10, -27 + bob, 20, 5);
    ctx.fillRect(-14, -25 + bob, 5, 3); // Cap visor

    // Eyes
    ctx.fillStyle = '#e056fd';
    ctx.fillRect(2, -18 + bob, 3, 3);

    // Glowing Purple Magic Orb in Hand
    ctx.fillStyle = '#e056fd';
    ctx.beginPath();
    ctx.arc(12, 2 + bob, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawAttackSlash(ctx) {
    ctx.save();
    const progress = 1 - (this.attackTimer / this.heroData.attackDuration);
    const slashAngle = (progress - 0.5) * Math.PI;

    ctx.strokeStyle = this.heroData.secondaryColor || '#ffff00';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(12, 0, this.heroData.attackRange * 0.7, -0.6 + slashAngle, 0.6 + slashAngle);
    ctx.stroke();

    // Slash spark
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(24 + Math.cos(slashAngle) * 14, Math.sin(slashAngle) * 14, 5, 5);
    ctx.restore();
  }
}

window.HERO_DATA = HERO_DATA;
window.Player = Player;
