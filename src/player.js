// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Hero System & Weapon Mechanics
// ============================================================================

const HERO_DATA = {
  banderita: {
    id: 'banderita',
    name: 'بندريتا',
    nameEn: 'BanderitaX',
    title: 'ملك البطاطا والسرعة النارية',
    titleEn: 'King of Potatoes & Flash Speed',
    class: 'Flash Speed / Heavy Brawler',
    color: '#ff3838',
    secondaryColor: '#f5b041',
    avatarBorder: '#e74c3c',
    maxHp: 160,
    speed: 6.5,
    jumpPower: -11.8,
    attackPower: 38,
    defense: 25,
    attackRange: 55,
    attackDuration: 16,
    hasFlashDash: true,
    availableWeapons: ['tamees', 'potato'],
    selectedWeapon: 'tamees',
    specialName: 'إعصار الغضب الناري (Fiery Rage Tornado)',
    specialDesc: 'إعصار ناري جارف يمسح شاشة اللعبة من الأعداء والصواريخ',
    specialDescEn: 'A blazing tornado of fire and exploding potatoes clearing the entire screen.'
  },
  mlzlz: {
    id: 'mlzlz',
    name: 'ملزلز',
    nameEn: 'MLZLZ',
    title: 'صياد الرعب والهدوء التكتيكي',
    titleEn: 'Horror Hunter & Tactical Calm',
    class: 'Horror Detective / Tea Master',
    color: '#00d2d3',
    secondaryColor: '#5f27cd',
    avatarBorder: '#00d2d3',
    maxHp: 120,
    speed: 4.8,
    jumpPower: -12.0,
    attackPower: 30,
    defense: 18,
    attackRange: 75,
    attackDuration: 18,
    critRate: 0.35,
    hasTacticalCalm: true,
    selectedWeapon: 'hotTea',
    specialName: 'فلاش الرعب وعاصفة الشاي (Horror Flash)',
    specialDesc: 'تجميد الأعداء برذاذ الشاي واستدعاء أشباح شاي تطاردهم',
    specialDescEn: 'Freezes all enemies and summons tea ghost spirits hunting them.'
  },
  ocmz: {
    id: 'ocmz',
    name: 'أوسمز',
    nameEn: 'oCMz',
    title: 'سيد البلوكات وقبعة القش',
    titleEn: 'Straw Hat & Block Master',
    class: 'Speedster / Anime Master',
    color: '#2ed573',
    secondaryColor: '#1e90ff',
    avatarBorder: '#2ed573',
    maxHp: 105,
    speed: 5.8,
    jumpPower: -11.5,
    attackPower: 28,
    defense: 12,
    attackRange: 180,
    attackDuration: 14,
    maxJumps: 3,
    hasAnimeJump: true,
    selectedWeapon: 'strawHat',
    specialName: 'بناء الماينكرافت المطور (Block Barrage)',
    specialDesc: 'إمطار السماء ببلوكات TNT وديموند متفجرة',
    specialDescEn: 'Calls down explosive TNT and Minecraft block meteors.'
  },
  abuAbed: {
    id: 'abuAbed',
    name: 'أبو عابد',
    nameEn: 'Abu Abed (3Gaming)',
    title: 'مهندس الريدستون والصلعة الذهبية',
    titleEn: 'Redstone Engineer & Golden Bald',
    class: 'Workshop Tank / Light Master',
    color: '#ffa502',
    secondaryColor: '#eb2f06',
    avatarBorder: '#ffa502',
    maxHp: 150,
    speed: 4.2,
    jumpPower: -11.2,
    attackPower: 34,
    defense: 50,
    attackRange: 140,
    attackDuration: 20,
    hasSuperArmor: true,
    selectedWeapon: 'goldenBald',
    specialName: 'برج الريدستون الآلي (Redstone Turret)',
    specialDesc: 'بناء برج ليزر أوتوماتيكي ذكي يطلق النار بكثافة',
    specialDescEn: 'Deploys an automated rapid-fire redstone laser turret.'
  },
  opiilz: {
    id: 'opiilz',
    name: 'أوبلز',
    nameEn: 'oPiiLz',
    title: 'ساحر النيون والمفك الأسطوري',
    titleEn: 'Master Screwdriver & Neon Skater',
    class: 'Dark Mage / Security Engineer',
    color: '#9b59b6',
    secondaryColor: '#e056fd',
    avatarBorder: '#9b59b6',
    maxHp: 115,
    speed: 5.4,
    jumpPower: -12.2,
    attackPower: 32,
    defense: 15,
    attackRange: 60,
    attackDuration: 14,
    hasSecurityEngineer: true,
    selectedWeapon: 'masterScrewdriver',
    specialName: 'لوح النيون النفاث (Hoverboard Strike)',
    specialDesc: 'اندفاع نفاث بلوح النيون مع درب ناري بنفسجي مدمر',
    specialDescEn: 'Supersonic hoverboard dash leaving an incinerating purple flame trail.'
  }
};

class Player {
  constructor(heroId = 'banderita') {
    this.setHero(heroId);
    this.x = 100;
    this.y = 300;
    this.vx = 0;
    this.vy = 0;
    this.width = 38;
    this.height = 54;
    this.facing = 1;
    this.isGrounded = false;
    this.jumpsLeft = 1;
    this.isAttacking = false;
    this.attackTimer = 0;
    this.energy = 50;
    this.maxEnergy = 100;
    this.isSpecialActive = false;
    this.specialTimer = 0;
    this.invulnerableTimer = 0;
    this.dashTimer = 0;
    this.dashCooldown = 0;
    this.animFrame = 0;
    this.animTimer = 0;
    this.state = 'idle';

    // Boomerangs & Projectiles
    this.projectiles = [];
    this.boomerangs = [];
    this.turrets = [];
    this.activeGhosts = [];
    this.fallingBlocks = [];
    this.teaParticles = [];
    this.baldBeamActive = false;
    this.baldBeamAngle = 0;
  }

  setHero(heroId, weaponChoice = null) {
    this.heroData = HERO_DATA[heroId] || HERO_DATA.banderita;
    this.heroId = this.heroData.id;
    this.hp = this.heroData.maxHp;
    this.maxHp = this.heroData.maxHp;
    this.speed = this.heroData.speed;
    this.jumpPower = this.heroData.jumpPower;
    this.attackPower = this.heroData.attackPower;
    this.defense = this.heroData.defense;
    this.maxJumps = this.heroData.maxJumps || (this.heroData.hasDoubleJump ? 2 : 1);
    this.jumpsLeft = this.maxJumps;

    if (this.heroId === 'banderita') {
      this.selectedWeapon = weaponChoice || this.heroData.selectedWeapon || 'tamees';
    } else {
      this.selectedWeapon = this.heroData.selectedWeapon;
    }
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
    this.dashTimer = 0;
    this.projectiles = [];
    this.boomerangs = [];
    this.turrets = [];
    this.activeGhosts = [];
    this.fallingBlocks = [];
    this.teaParticles = [];
    this.baldBeamActive = false;
    this.jumpsLeft = this.maxJumps;
  }

  move(dir) {
    if (this.dashTimer > 0) return;
    if (this.isSpecialActive && this.heroId === 'opiilz') return;

    this.vx = dir * this.speed;
    if (dir !== 0) this.facing = dir;
  }

  jump() {
    if (this.jumpsLeft > 0) {
      this.vy = this.jumpPower;
      this.isGrounded = false;
      this.jumpsLeft--;

      if (this.jumpsLeft === 1 && this.maxJumps === 3) {
        window.audio.sfxDoubleJump();
        window.particles.burst(this.x + this.width / 2, this.y + this.height, 8, ['#2ed573', '#ffffff'], 2, 5);
      } else if (this.jumpsLeft === 0 && this.maxJumps === 3) {
        window.audio.sfxTripleJump();
        window.particles.burst(this.x + this.width / 2, this.y + this.height, 14, ['#ffd700', '#2ed573', '#ffffff'], 3, 7);
      } else if (this.jumpsLeft === 0 && this.maxJumps === 2) {
        window.audio.sfxDoubleJump();
        window.particles.burst(this.x + this.width / 2, this.y + this.height, 10, ['#2ed573', '#ffffff'], 2, 5);
      } else {
        window.audio.sfxJump();
        window.particles.burst(this.x + this.width / 2, this.y + this.height, 6, ['#ecf0f1', '#bdc3c7'], 1, 4);
      }
    }
  }

  flashDash() {
    if (this.dashCooldown > 0 || this.dashTimer > 0) return;
    this.dashTimer = 16;
    this.dashCooldown = 45;
    this.invulnerableTimer = 20;
    this.vx = this.facing * 16;
    this.vy = 0;
    window.audio.sfxDash();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 15, ['#fffa65', '#ff3838', '#ffffff'], 3, 7);
  }

  attack() {
    if (this.isAttacking || this.isSpecialActive) return;
    this.isAttacking = true;
    this.attackTimer = this.heroData.attackDuration;

    if (this.heroId === 'banderita') {
      if (this.selectedWeapon === 'tamees') {
        window.audio.sfxTameesSlash();
        window.particles.burst(this.x + (this.facing > 0 ? this.width + 10 : -10), this.y + 20, 10, ['#f39c12', '#e74c3c'], 2, 5);
      } else {
        window.audio.sfxHotPotato();
        this.projectiles.push({
          x: this.facing > 0 ? this.x + this.width : this.x - 14,
          y: this.y + 16,
          vx: this.facing * 10,
          vy: -1,
          radius: 9,
          damage: this.attackPower,
          color: '#f5b041',
          life: 45,
          type: 'potato'
        });
      }
    } else if (this.heroId === 'mlzlz') {
      window.audio.sfxTeaSpray();
      for (let i = 0; i < 5; i++) {
        this.teaParticles.push({
          x: this.facing > 0 ? this.x + this.width : this.x - 10,
          y: this.y + 14 + (Math.random() - 0.5) * 8,
          vx: this.facing * (6 + Math.random() * 4),
          vy: (Math.random() - 0.5) * 3,
          damage: this.attackPower * 0.35,
          color: '#e67e22',
          life: 25,
          size: 6
        });
      }
    } else if (this.heroId === 'ocmz') {
      window.audio.sfxHatBoomerang();
      this.boomerangs.push({
        x: this.x + this.width / 2,
        y: this.y + 18,
        startX: this.x,
        vx: this.facing * 12,
        vy: 0,
        maxDist: 260,
        distanceTraveled: 0,
        returning: false,
        damage: this.attackPower,
        rotation: 0,
        life: 70
      });
    } else if (this.heroId === 'abuAbed') {
      window.audio.sfxBaldBeam();
      this.baldBeamActive = true;
      this.baldBeamTimer = 20;
    } else if (this.heroId === 'opiilz') {
      window.audio.sfxScrewdriverZap();
      window.particles.burst(this.x + (this.facing > 0 ? this.width + 12 : -12), this.y + 18, 8, ['#9b59b6', '#00d2d3', '#ffffff'], 2, 5);
    }
  }

  triggerSpecial() {
    if (this.energy < this.maxEnergy || this.isSpecialActive) return false;

    this.energy = 0;
    this.isSpecialActive = true;
    this.invulnerableTimer = 70;

    window.particles.addFloatingText(this.x + this.width / 2, this.y - 20, this.heroData.specialName, '#fffa65', 16, '⚡');

    switch (this.heroId) {
      case 'banderita':
        this.specialTimer = 45;
        window.audio.sfxPotatoRage();
        window.particles.potatoRageBlast(this.x + this.width / 2, this.y + this.height / 2);
        break;

      case 'mlzlz':
        this.specialTimer = 60;
        window.audio.sfxHorrorGhost();
        window.particles.horrorFlash(this.x + this.width / 2, this.y + this.height / 2);
        for (let i = 0; i < 5; i++) {
          this.activeGhosts.push({
            x: this.x + (Math.random() - 0.5) * 80,
            y: this.y - 40 - Math.random() * 40,
            vx: (Math.random() - 0.5) * 6,
            vy: -2 - Math.random() * 3,
            damage: 60,
            life: 180
          });
        }
        break;

      case 'ocmz':
        this.specialTimer = 70;
        window.audio.sfxBlockDrop();
        for (let i = 0; i < 10; i++) {
          this.fallingBlocks.push({
            x: this.x - 220 + i * 55 + (Math.random() - 0.5) * 30,
            y: this.y - 320 - i * 25,
            vy: 8 + Math.random() * 4,
            damage: 65,
            size: 26,
            color: i % 2 === 0 ? '#2ecc71' : '#e74c3c'
          });
        }
        break;

      case 'abuAbed':
        this.specialTimer = 30;
        window.audio.sfxTurretDeploy();
        this.turrets.push({
          x: this.x + (this.facing * 40),
          y: this.y + 10,
          shootCooldown: 0,
          duration: 540,
          facing: this.facing
        });
        window.particles.burst(this.x + (this.facing * 40), this.y + 20, 15, ['#e74c3c', '#ffa502'], 2, 6);
        break;

      case 'opiilz':
        this.specialTimer = 55;
        window.audio.sfxNeonDash();
        this.vx = this.facing * 15;
        this.vy = 0;
        break;
    }

    return true;
  }

  takeDamage(amount, knockbackDir = 0) {
    if (this.invulnerableTimer > 0) return 0;

    let defRatio = this.defense / 100;
    if (this.heroData.hasSuperArmor) defRatio = 0.5;

    const actualDamage = Math.max(5, Math.round(amount * (1 - defRatio)));
    this.hp -= actualDamage;
    this.invulnerableTimer = 45;
    this.vx = knockbackDir * 5;
    this.vy = -4;

    window.audio.sfxPlayerHurt();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 14, ['#ff4757', '#ff6b81'], 2, 6);
    window.particles.addFloatingText(this.x + this.width / 2, this.y - 10, `-${actualDamage}`, '#ff4757', 15);

    if (this.hp <= 0) this.hp = 0;
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

  update(platforms, enemies, boss, interactiveObjects) {
    if (!this.isGrounded) {
      const gravity = (this.heroData.hasAnimeJump && this.vy > 0) ? 0.35 : 0.55;
      this.vy += gravity;
      if (this.vy > 12) this.vy = 12;
    }

    if (this.dashTimer > 0) {
      this.dashTimer--;
      window.particles.add(this.x + this.width / 2, this.y + this.height / 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, '#fffa65', 4, 12, 'spark');
    } else if (this.isSpecialActive && this.heroId === 'opiilz') {
      this.vx = this.facing * 15;
      this.vy = 0;
      window.particles.neonTrail(this.x + (this.facing > 0 ? 0 : this.width), this.y + 30, this.facing);
    } else {
      this.vx *= 0.82;
    }

    if (this.dashCooldown > 0) this.dashCooldown--;

    this.x += this.vx;
    this.checkPlatformCollisionHorizontal(platforms);

    this.y += this.vy;
    this.isGrounded = false;
    this.checkPlatformCollisionVertical(platforms);

    if (this.isAttacking) {
      this.attackTimer--;
      if (this.attackTimer <= 0) this.isAttacking = false;
    }

    if (this.isSpecialActive) {
      this.specialTimer--;
      if (this.specialTimer <= 0) this.isSpecialActive = false;
    }

    if (this.invulnerableTimer > 0) this.invulnerableTimer--;

    if (this.baldBeamActive) {
      this.baldBeamTimer--;
      this.baldBeamAngle += 0.2;
      if (this.baldBeamTimer <= 0) this.baldBeamActive = false;
    }

    this.animTimer++;
    if (this.animTimer >= 6) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }

    if (this.isSpecialActive) this.state = 'special';
    else if (this.isAttacking) this.state = 'attack';
    else if (!this.isGrounded) this.state = this.vy < 0 ? 'jump' : 'fall';
    else if (Math.abs(this.vx) > 0.5) this.state = 'run';
    else this.state = 'idle';

    // 1. Hot Potato Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.x += proj.vx;
      proj.y += proj.vy;
      proj.life--;

      window.particles.add(proj.x, proj.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, '#ff4757', 3, 10, 'spark');

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
        window.audio.sfxExplosion();
        window.particles.burst(proj.x, proj.y, 12, ['#f5b041', '#ff4757', '#ffffff'], 2, 6);
        this.projectiles.splice(i, 1);
      }
    }

    // 2. MLZLZ Tea Spray
    for (let i = this.teaParticles.length - 1; i >= 0; i--) {
      const tea = this.teaParticles[i];
      tea.x += tea.vx;
      tea.y += tea.vy;
      tea.life--;

      if (enemies) {
        for (const enemy of enemies) {
          if (!enemy.isDead && Math.hypot(tea.x - (enemy.x + enemy.width / 2), tea.y - (enemy.y + enemy.height / 2)) < (tea.size + enemy.width / 2)) {
            enemy.takeDamage(tea.damage, Math.sign(tea.vx));
            enemy.frozenTimer = 30;
            this.addEnergy(4);
          }
        }
      }
      if (boss && !boss.isDead) {
        if (Math.hypot(tea.x - (boss.x + boss.width / 2), tea.y - (boss.y + boss.height / 2)) < (tea.size + boss.width / 2)) {
          boss.takeDamage(tea.damage);
          this.addEnergy(4);
        }
      }

      if (interactiveObjects) {
        for (const obj of interactiveObjects) {
          if (!obj.activated && Math.hypot(tea.x - obj.x, tea.y - obj.y) < 40) {
            obj.activated = true;
            if (window.game && window.game.objectives) {
              window.game.objectives.recordPuzzleTrigger(obj.id);
            }
            window.particles.burst(obj.x, obj.y, 15, ['#f39c12', '#ffd700'], 2, 6);
          }
        }
      }

      if (tea.life <= 0) this.teaParticles.splice(i, 1);
    }

    // 3. oCMz Straw Hat Boomerang
    for (let i = this.boomerangs.length - 1; i >= 0; i--) {
      const hat = this.boomerangs[i];
      hat.rotation += 0.4;
      hat.life--;

      if (!hat.returning) {
        hat.x += hat.vx;
        hat.distanceTraveled += Math.abs(hat.vx);
        if (hat.distanceTraveled >= hat.maxDist) hat.returning = true;
      } else {
        const angle = Math.atan2((this.y + 18) - hat.y, (this.x + this.width / 2) - hat.x);
        hat.vx = Math.cos(angle) * 14;
        hat.vy = Math.sin(angle) * 14;
        hat.x += hat.vx;
        hat.y += hat.vy;

        if (Math.hypot(hat.x - (this.x + this.width / 2), hat.y - (this.y + 18)) < 24) {
          window.particles.burst(hat.x, hat.y, 6, ['#ffd700', '#f1c40f'], 1, 3);
          this.boomerangs.splice(i, 1);
          continue;
        }
      }

      if (enemies) {
        for (const enemy of enemies) {
          if (!enemy.isDead && Math.hypot(hat.x - (enemy.x + enemy.width / 2), hat.y - (enemy.y + enemy.height / 2)) < (16 + enemy.width / 2)) {
            enemy.takeDamage(hat.damage * 0.4, Math.sign(hat.vx));
            this.addEnergy(6);
          }
        }
      }
      if (boss && !boss.isDead) {
        if (Math.hypot(hat.x - (boss.x + boss.width / 2), hat.y - (boss.y + boss.height / 2)) < (16 + boss.width / 2)) {
          boss.takeDamage(hat.damage * 0.5);
          this.addEnergy(6);
        }
      }

      if (hat.life <= 0) this.boomerangs.splice(i, 1);
    }

    // 4. Abu Abed Solar Light Beam
    if (this.baldBeamActive) {
      if (enemies) {
        for (const enemy of enemies) {
          if (!enemy.isDead && Math.hypot(this.x - enemy.x, this.y - enemy.y) < 140) {
            enemy.takeDamage(12, Math.sign(enemy.x - this.x));
          }
        }
      }
      if (boss && !boss.isDead && Math.hypot(this.x - boss.x, this.y - boss.y) < 150) {
        boss.takeDamage(15);
      }
      if (interactiveObjects) {
        for (const obj of interactiveObjects) {
          if (!obj.activated && obj.type === 'mirror' && Math.hypot(this.x - obj.x, this.y - obj.y) < 150) {
            obj.activated = true;
            if (window.game && window.game.objectives) {
              window.game.objectives.recordPuzzleTrigger(obj.id);
            }
            window.particles.burst(obj.x, obj.y, 18, ['#ffd700', '#ffffff'], 3, 7);
          }
        }
      }
    }

    // 5. Turrets
    for (let i = this.turrets.length - 1; i >= 0; i--) {
      const turret = this.turrets[i];
      turret.duration--;
      turret.shootCooldown--;
      if (turret.shootCooldown <= 0) {
        let target = (boss && !boss.isDead) ? boss : null;
        if (!target && enemies) {
          for (const e of enemies) {
            if (!e.isDead && Math.hypot(turret.x - e.x, turret.y - e.y) < 380) {
              target = e;
              break;
            }
          }
        }
        if (target) {
          turret.shootCooldown = 26;
          window.audio.playTone(980, 'sawtooth', 0.1, 0.2, 0.01, 200);
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
      if (turret.duration <= 0) this.turrets.splice(i, 1);
    }
  }

  checkPlatformCollisionHorizontal(platforms) {
    for (const p of platforms) {
      if (p.isOneWay) continue;
      if (this.x < p.x + p.w && this.x + this.width > p.x &&
          this.y < p.y + p.h && this.y + this.height > p.y) {
        if (this.vx > 0) { this.x = p.x - this.width; this.vx = 0; }
        else if (this.vx < 0) { this.x = p.x + p.w; this.vx = 0; }
      }
    }
  }

  checkPlatformCollisionVertical(platforms) {
    for (const p of platforms) {
      if (p.isOneWay) {
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
      return { x: this.x - 10, y: this.y - 10, width: this.width + 20, height: this.height + 20, damage: 95, knockback: this.facing * 12 };
    }

    const range = this.heroData.attackRange;
    return {
      x: this.facing > 0 ? this.x + this.width : this.x - range,
      y: this.y + 6,
      width: range,
      height: this.height - 12,
      damage: this.heroData.critRate && Math.random() < this.heroData.critRate ? this.attackPower * 2.0 : this.attackPower,
      knockback: this.facing * (this.selectedWeapon === 'tamees' ? 10 : 6)
    };
  }

  // --------------------------------------------------------------------------
  // Dynamic Sprite Sheet & Procedural Renderer
  // --------------------------------------------------------------------------
  draw(ctx, cameraX = 0, cameraY = 0) {
    const px = Math.round(this.x - cameraX);
    const py = Math.round(this.y - cameraY);

    // Boomerangs
    for (const hat of this.boomerangs) {
      const hx = Math.round(hat.x - cameraX);
      const hy = Math.round(hat.y - cameraY);
      ctx.save();
      ctx.translate(hx, hy);
      ctx.rotate(hat.rotation);
      ctx.fillStyle = '#f1c40f';
      ctx.beginPath();
      ctx.ellipse(0, 0, 16, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(-8, -3, 16, 3);
      ctx.restore();
    }

    // Tea Spray
    for (const tea of this.teaParticles) {
      const tx = Math.round(tea.x - cameraX);
      const ty = Math.round(tea.y - cameraY);
      ctx.save();
      ctx.fillStyle = tea.color;
      ctx.beginPath();
      ctx.arc(tx, ty, tea.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Solar Light Beam
    if (this.baldBeamActive) {
      ctx.save();
      const beamGrad = ctx.createRadialGradient(px + this.width / 2, py - 10, 5, px + this.width / 2, py - 10, 140);
      beamGrad.addColorStop(0, 'rgba(255, 250, 101, 0.9)');
      beamGrad.addColorStop(0.5, 'rgba(255, 215, 0, 0.5)');
      beamGrad.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.arc(px + this.width / 2, py - 10, 140, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Projectiles
    for (const proj of this.projectiles) {
      const prx = Math.round(proj.x - cameraX);
      const pry = Math.round(proj.y - cameraY);
      ctx.save();
      ctx.fillStyle = proj.color;
      ctx.beginPath();
      ctx.arc(prx, pry, proj.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer / 4) % 2 === 0) return;

    ctx.save();
    ctx.translate(px + this.width / 2, py + this.height / 2);
    ctx.scale(this.facing, 1);

    // Check if custom transparent sprite images are available from assets
    const heroKey = this.heroId;
    const walkImg = window.assets ? window.assets.getImage(`${heroKey}_walk`) : null;
    const idleImg = window.assets ? window.assets.getImage(`${heroKey}_idle`) : null;
    const attackImg = window.assets ? window.assets.getImage(`${heroKey}_attack`) : null;

    let spriteRendered = false;

    if (this.state === 'attack' && attackImg && attackImg.complete) {
      // 4-frame attack strip
      const progress = 1 - (this.attackTimer / this.heroData.attackDuration);
      const fIdx = Math.min(3, Math.floor(progress * 4));
      const fw = attackImg.width / 4;
      const fh = attackImg.height;
      const dw = this.width * 1.5;
      const dh = this.height * 1.25;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(attackImg, fIdx * fw, 0, fw, fh, -dw / 2, -dh / 2, dw, dh);
      spriteRendered = true;

    } else if (this.state === 'run' && walkImg && walkImg.complete) {
      // 4-frame walk strip
      const fIdx = this.animFrame % 4;
      const fw = walkImg.width / 4;
      const fh = walkImg.height;
      const dw = this.width * 1.45;
      const dh = this.height * 1.2;

      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(walkImg, fIdx * fw, 0, fw, fh, -dw / 2, -dh / 2, dw, dh);
      spriteRendered = true;

    } else if (idleImg && idleImg.complete) {
      // Idle standing sprite
      const dw = this.width * 1.4;
      const dh = this.height * 1.2;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(idleImg, 0, 0, idleImg.width, idleImg.height, -dw / 2, -dh / 2, dw, dh);
      spriteRendered = true;
    }

    // Procedural Fallback if sprite not loaded
    if (!spriteRendered) {
      const bob = (this.state === 'run') ? Math.sin(this.animFrame * Math.PI / 2) * 3 : 0;
      const legOffset = (this.state === 'run') ? (this.animFrame % 2 === 0 ? 4 : -4) : 0;

      switch (this.heroId) {
        case 'banderita': this.drawBanderita(ctx, bob, legOffset); break;
        case 'mlzlz': this.drawMLZLZ(ctx, bob, legOffset); break;
        case 'ocmz': this.drawOCMz(ctx, bob, legOffset); break;
        case 'abuAbed': this.drawAbuAbed(ctx, bob, legOffset); break;
        case 'opiilz': this.drawOPiiLz(ctx, bob, legOffset); break;
      }
    }

    if (this.isAttacking && !spriteRendered) this.drawWeaponSlash(ctx);

    ctx.restore();
  }

  drawBanderita(ctx, bob, legOffset) {
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-10, 10 + bob, 8, 14 + legOffset);
    ctx.fillRect(2, 10 + bob, 8, 14 - legOffset);
    ctx.fillStyle = '#f1c40f';
    ctx.fillRect(-12, 22 + bob + legOffset, 10, 4);
    ctx.fillRect(2, 22 + bob - legOffset, 10, 4);

    ctx.fillStyle = '#c0392b';
    ctx.fillRect(-14, -8 + bob, 28, 20);
    ctx.fillStyle = '#fcd0a1';
    ctx.fillRect(-10, -26 + bob, 20, 18);
    ctx.fillStyle = '#1c1208';
    ctx.fillRect(-10, -12 + bob, 20, 7);
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(-12, -26 + bob, 24, 5);

    if (this.selectedWeapon === 'tamees') {
      ctx.fillStyle = '#f5cd79';
      ctx.beginPath();
      ctx.ellipse(14, 0 + bob, 12, 6, 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#f5b041';
      ctx.beginPath();
      ctx.arc(12, 0 + bob, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawMLZLZ(ctx, bob, legOffset) {
    ctx.fillStyle = '#1e272e';
    ctx.fillRect(-8, 10 + bob, 7, 14 + legOffset);
    ctx.fillRect(1, 10 + bob, 7, 14 - legOffset);
    ctx.fillStyle = '#2f3542';
    ctx.fillRect(-12, -8 + bob, 24, 22);
    ctx.fillStyle = '#ffeaa7';
    ctx.fillRect(-9, -24 + bob, 18, 16);
    ctx.fillStyle = '#00d2d3';
    ctx.fillRect(-11, -26 + bob, 4, 10);
    ctx.fillRect(-9, -29 + bob, 18, 3);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, -2 + bob, 10, 10);
    ctx.fillStyle = '#e67e22';
    ctx.fillRect(12, -4 + bob, 6, 2);
  }

  drawOCMz(ctx, bob, legOffset) {
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(-8, 10 + bob, 7, 14 + legOffset);
    ctx.fillRect(1, 10 + bob, 7, 14 - legOffset);
    ctx.fillStyle = '#20bf6b';
    ctx.fillRect(-11, -8 + bob, 22, 19);
    ctx.fillStyle = '#fed330';
    ctx.fillRect(-8, -24 + bob, 16, 16);

    if (this.boomerangs.length === 0) {
      ctx.fillStyle = '#f1c40f';
      ctx.fillRect(-12, -30 + bob, 24, 5);
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(-6, -33 + bob, 12, 3);
    }
  }

  drawAbuAbed(ctx, bob, legOffset) {
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(-9, 10 + bob, 8, 14 + legOffset);
    ctx.fillRect(1, 10 + bob, 8, 14 - legOffset);
    ctx.fillStyle = '#f0932b';
    ctx.fillRect(-12, -8 + bob, 24, 20);
    ctx.fillStyle = '#ffbe76';
    ctx.fillRect(-9, -24 + bob, 18, 16);
    ctx.fillStyle = '#30336b';
    ctx.fillRect(-9, -12 + bob, 18, 5);

    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    ctx.arc(0, -24 + bob, 10, Math.PI, 0);
    ctx.fill();
  }

  drawOPiiLz(ctx, bob, legOffset) {
    ctx.fillStyle = '#8e44ad';
    ctx.fillRect(-16, 24 + bob, 32, 5);
    ctx.fillStyle = '#6c5ce7';
    ctx.fillRect(-11, -8 + bob, 22, 18);
    ctx.fillStyle = '#ffeaa7';
    ctx.fillRect(-8, -24 + bob, 16, 16);

    ctx.fillStyle = '#badc58';
    ctx.fillRect(10, 0 + bob, 14, 4);
    ctx.fillStyle = '#e74c3c';
    ctx.fillRect(6, -1 + bob, 6, 6);
  }

  drawWeaponSlash(ctx) {
    ctx.save();
    ctx.strokeStyle = this.heroData.secondaryColor || '#ffff00';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(14, 0, this.heroData.attackRange * 0.7, -0.6, 0.6);
    ctx.stroke();
    ctx.restore();
  }
}

window.HERO_DATA = HERO_DATA;
window.Player = Player;
