// ============================================================================
// Arab Gamers: Pixel Legends - AI Enemies & "The Ban" Boss Engine
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
        this.name = 'روبوت القلتش';
        this.width = 30;
        this.height = 36;
        this.hp = 50;
        this.maxHp = 50;
        this.damage = 18;
        this.speed = 1.6;
        this.subsReward = 150;
        this.scoreReward = 200;
        this.color = '#ff4757';
        break;

      case 'dislikeDrone':
        this.name = 'طائرة الديسلايك';
        this.width = 28;
        this.height = 24;
        this.hp = 35;
        this.maxHp = 35;
        this.damage = 15;
        this.speed = 2.0;
        this.isFlying = true;
        this.subsReward = 120;
        this.scoreReward = 180;
        this.color = '#70a1ff';
        break;

      case 'toxicCrawler':
        this.name = 'وحش التعليقات';
        this.width = 36;
        this.height = 22;
        this.hp = 45;
        this.maxHp = 45;
        this.damage = 22;
        this.speed = 1.2;
        this.subsReward = 180;
        this.scoreReward = 250;
        this.color = '#2ed573';
        break;

      case 'horrorGhost':
        this.name = 'شبح الرعب';
        this.width = 32;
        this.height = 36;
        this.hp = 60;
        this.maxHp = 60;
        this.damage = 25;
        this.speed = 2.2;
        this.isFlying = true;
        this.subsReward = 250;
        this.scoreReward = 350;
        this.color = '#a55eea';
        break;

      case 'creepBlock':
        this.name = 'بلوك متفجر';
        this.width = 26;
        this.height = 26;
        this.hp = 25;
        this.maxHp = 25;
        this.damage = 35;
        this.speed = 0.8;
        this.subsReward = 100;
        this.scoreReward = 150;
        this.color = '#e74c3c';
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

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.isDead = true;
    window.audio.sfxExplosion();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 20, [this.color, '#ff4757', '#ffa502', '#ffffff'], 3, 8);
    window.particles.addFloatingText(this.x + this.width / 2, this.y - 20, `+${this.subsReward} SUBS`, '#2ed573', 14, '★');
  }

  update(player, platforms, enemyProjectiles) {
    if (this.isDead) return;

    // Freeze effect (MLZLZ ultimate)
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

    // AI Behaviors
    if (this.type === 'glitchBot') {
      // Patrol and charge when near
      if (distToPlayer < 240) {
        this.facing = dirToPlayer;
        this.vx = this.facing * (this.speed * 1.5);
      } else {
        this.vx = this.facing * this.speed;
      }

      this.vy += 0.45;
      this.x += this.vx;
      this.checkPlatformCollisionHorizontal(platforms);
      this.y += this.vy;
      this.checkPlatformCollisionVertical(platforms);

    } else if (this.type === 'dislikeDrone') {
      // Fly and hover above player, drop dislike darts
      this.facing = dirToPlayer;
      const targetY = player.y - 90;
      this.y += (targetY - this.y) * 0.04;
      this.x += (player.x - this.x) * 0.03;

      this.shootCooldown--;
      if (this.shootCooldown <= 0 && distToPlayer < 350) {
        this.shootCooldown = 90;
        window.audio.sfxLaser();
        enemyProjectiles.push({
          x: this.x + this.width / 2,
          y: this.y + this.height,
          vx: (player.x - this.x) * 0.02,
          vy: 4.5,
          damage: this.damage,
          color: '#ff4757',
          radius: 5,
          type: 'dislike'
        });
      }

    } else if (this.type === 'toxicCrawler') {
      // Wall/floor crawler
      this.vx = this.facing * this.speed;
      this.vy += 0.45;
      this.x += this.vx;
      this.checkPlatformCollisionHorizontal(platforms);
      this.y += this.vy;
      this.checkPlatformCollisionVertical(platforms);

      this.shootCooldown--;
      if (this.shootCooldown <= 0 && distToPlayer < 220) {
        this.shootCooldown = 110;
        enemyProjectiles.push({
          x: this.x + (this.facing > 0 ? this.width : 0),
          y: this.y + 4,
          vx: this.facing * 5,
          vy: -2,
          damage: this.damage,
          color: '#2ed573',
          radius: 6,
          type: 'toxic'
        });
      }

    } else if (this.type === 'horrorGhost') {
      // Ghost floating through air towards player
      this.facing = dirToPlayer;
      this.x += (player.x - this.x) * 0.025;
      this.y += ((player.y - 10) - this.y) * 0.025 + Math.sin(this.animTimer * 0.2) * 1.5;

    } else if (this.type === 'creepBlock') {
      this.vx = this.facing * this.speed;
      this.vy += 0.45;
      this.x += this.vx;
      this.checkPlatformCollisionHorizontal(platforms);
      this.y += this.vy;
      this.checkPlatformCollisionVertical(platforms);

      if (distToPlayer < 50) {
        this.takeDamage(100, 0); // Self-destruct
        if (distToPlayer < 65) {
          player.takeDamage(this.damage, dirToPlayer);
        }
      }
    }
  }

  checkPlatformCollisionHorizontal(platforms) {
    for (const p of platforms) {
      if (p.isOneWay) continue;
      if (this.x < p.x + p.w && this.x + this.width > p.x &&
          this.y < p.y + p.h && this.y + this.height > p.y) {
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
        if (this.vy > 0 &&
            this.x + this.width > p.x && this.x < p.x + p.w &&
            this.y + this.height >= p.y && this.y + this.height - this.vy <= p.y + 8) {
          this.y = p.y - this.height;
          this.vy = 0;
        }
      } else {
        if (this.x < p.x + p.w && this.x + this.width > p.x &&
            this.y < p.y + p.h && this.y + this.height > p.y) {
          if (this.vy > 0) {
            this.y = p.y - this.height;
            this.vy = 0;
          }
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
      // Cyan ice freeze effect
      ctx.fillStyle = '#00d2d3';
      ctx.fillRect(-this.width / 2 - 2, -this.height / 2 - 2, this.width + 4, this.height + 4);
    }

    if (this.type === 'glitchBot') {
      // Glitch Robot Body
      ctx.fillStyle = '#2c3e50';
      ctx.fillRect(-12, -14, 24, 24);
      // Screen face with red glitch eyes
      ctx.fillStyle = '#111';
      ctx.fillRect(-9, -11, 18, 12);
      ctx.fillStyle = '#ff4757';
      ctx.fillRect(-6, -8, 4, 4);
      ctx.fillRect(2, -8, 4, 4);
      // Legs
      ctx.fillStyle = '#747d8c';
      ctx.fillRect(-10, 10, 6, 8);
      ctx.fillRect(4, 10, 6, 8);
      // Antenna
      ctx.fillStyle = '#ff4757';
      ctx.fillRect(-2, -18, 4, 5);

    } else if (this.type === 'dislikeDrone') {
      // Dislike Drone Body
      ctx.fillStyle = '#3742fa';
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      // Propeller blades
      ctx.fillStyle = '#f1f2f6';
      const bladeW = (this.animFrame % 2 === 0) ? 22 : 8;
      ctx.fillRect(-bladeW / 2, -10, bladeW, 2);
      // Dislike Thumbs-Down Icon on side
      ctx.fillStyle = '#ff4757';
      ctx.fillRect(-3, -2, 6, 6);
      ctx.fillRect(-1, 4, 3, 3);

    } else if (this.type === 'toxicCrawler') {
      // Toxic Slime Crawler
      ctx.fillStyle = '#2ed573';
      ctx.beginPath();
      ctx.arc(0, 2, 12, Math.PI, 0);
      ctx.lineTo(12, 10);
      ctx.lineTo(-12, 10);
      ctx.closePath();
      ctx.fill();
      // Toxic glowing bubbles
      ctx.fillStyle = '#7bed9f';
      ctx.beginPath();
      ctx.arc(-4, -2, 3, 0, Math.PI * 2);
      ctx.arc(4, -4, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // Evil yellow eyes
      ctx.fillStyle = '#ffa502';
      ctx.fillRect(2, 0, 3, 3);

    } else if (this.type === 'horrorGhost') {
      // Ghost apparition
      ctx.fillStyle = 'rgba(165, 94, 234, 0.85)';
      ctx.beginPath();
      ctx.arc(0, -6, 14, Math.PI, 0);
      ctx.lineTo(14, 12);
      ctx.lineTo(-14, 12);
      ctx.closePath();
      ctx.fill();
      // Glowing purple eyes & mouth
      ctx.fillStyle = '#ff3838';
      ctx.fillRect(1, -6, 4, 4);
      ctx.fillRect(1, 0, 5, 3);

    } else if (this.type === 'creepBlock') {
      // Red TNT Block
      ctx.fillStyle = '#ff4757';
      ctx.fillRect(-12, -12, 24, 24);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-12, -4, 24, 8);
      ctx.fillStyle = '#000000';
      ctx.font = '8px monospace';
      ctx.fillText('TNT', -7, 2);
    }

    ctx.restore();
  }
}


// ============================================================================
// The Ban / Copyright Strike Boss (الزعيم الشرير "الباند")
// ============================================================================

class BossBan {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 90;
    this.height = 110;
    this.maxHp = 600;
    this.hp = 600;
    this.vx = 2.0;
    this.vy = 0;
    this.facing = -1;
    this.phase = 1; // 1 (100%-65%), 2 (65%-30%), 3 (30%-0% Enrage)
    this.isDead = false;
    this.attackTimer = 0;
    this.attackState = 'idle'; // 'idle', 'laser', 'slam', 'barrage', 'shield'
    this.animTimer = 0;
    this.animFrame = 0;
    this.shieldActive = false;
    this.tauntText = 'سأغلق قنواتكم جميعاً!';
    this.tauntTimer = 180;
    this.shockwaves = [];
  }

  takeDamage(amount) {
    if (this.isDead) return;

    let actualDamage = amount;
    if (this.shieldActive) {
      actualDamage *= 0.35; // 65% damage reduction when shield is active
    }

    this.hp -= actualDamage;
    window.audio.sfxBossHit();
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 12, ['#ff0055', '#ff9f1a', '#ffffff'], 3, 7);
    window.particles.addFloatingText(this.x + this.width / 2, this.y - 15, `-${Math.round(actualDamage)}`, '#ff4757', 18, '💥');

    // Phase Transitions
    if (this.hp <= this.maxHp * 0.30 && this.phase < 3) {
      this.phase = 3;
      this.tauntText = 'غضب الباند النهائي! لا مفر من السترايك!';
      this.tauntTimer = 220;
      window.audio.sfxBossRoar();
      window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 50, ['#ff0033', '#ff6600', '#ffffff'], 5, 12);
    } else if (this.hp <= this.maxHp * 0.65 && this.phase < 2) {
      this.phase = 2;
      this.tauntText = 'درع حقوق النشر مفعل! تم إعطاؤكم إنذار!';
      this.tauntTimer = 200;
      this.shieldActive = true;
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
    window.particles.burst(this.x + this.width / 2, this.y + this.height / 2, 80, ['#ff0055', '#ffd700', '#2ed573', '#ffffff'], 4, 15);
    window.particles.addFloatingText(this.x + this.width / 2, this.y - 40, 'تم كسر الباند! VICTORY!', '#ffd700', 22, '👑');
  }

  update(player, platforms, enemyProjectiles, enemies) {
    if (this.isDead) return;

    this.animTimer++;
    if (this.animTimer >= 6) {
      this.animTimer = 0;
      this.animFrame = (this.animFrame + 1) % 4;
    }

    if (this.tauntTimer > 0) {
      this.tauntTimer--;
    }

    const dirToPlayer = Math.sign(player.x - this.x);
    this.facing = dirToPlayer || -1;
    const distToPlayer = Math.hypot((player.x + player.width / 2) - (this.x + this.width / 2), (player.y + player.height / 2) - (this.y + this.height / 2));

    // Phase 2 shield pulse
    if (this.phase === 2) {
      this.shieldActive = Math.sin(this.animTimer * 0.08) > -0.2;
    } else {
      this.shieldActive = false;
    }

    // Boss Attack Loop
    this.attackTimer++;

    const attackInterval = (this.phase === 3) ? 75 : (this.phase === 2 ? 110 : 140);

    if (this.attackTimer >= attackInterval) {
      this.attackTimer = 0;
      const attackType = Math.floor(Math.random() * (this.phase === 3 ? 4 : (this.phase === 2 ? 3 : 2)));

      if (attackType === 0) {
        // Attack 1: Strike Laser Beam
        this.tauntText = 'حقوق نشر فورية!';
        this.tauntTimer = 80;
        window.audio.sfxLaser();
        for (let i = -1; i <= 1; i++) {
          enemyProjectiles.push({
            x: this.x + (this.facing > 0 ? this.width : 0),
            y: this.y + 40 + i * 15,
            vx: this.facing * (this.phase === 3 ? 8 : 6),
            vy: i * 1.5,
            damage: 25,
            color: '#ff0055',
            radius: 8,
            type: 'strike'
          });
        }
      } else if (attackType === 1) {
        // Attack 2: Ban Hammer Slam & Floor Shockwave
        this.tauntText = 'مطرقة الباند!';
        this.tauntTimer = 80;
        this.vy = -7; // Jump up before slam
        setTimeout(() => {
          window.audio.sfxExplosion();
          window.particles.burst(this.x + this.width / 2, this.y + this.height, 25, ['#ff4757', '#ffa502'], 3, 8);
          // Ground rolling shockwaves left and right
          for (let dir of [-1, 1]) {
            enemyProjectiles.push({
              x: this.x + this.width / 2,
              y: this.y + this.height - 10,
              vx: dir * 5.5,
              vy: 0,
              damage: 30,
              color: '#ff3838',
              radius: 12,
              type: 'shockwave'
            });
          }
        }, 350);
      } else if (attackType === 2) {
        // Attack 3: Summon Glitch Minion
        if (enemies && enemies.length < 5) {
          enemies.push(new Enemy(this.x + (Math.random() - 0.5) * 100, this.y - 20, 'glitchBot'));
          window.particles.burst(this.x + this.width / 2, this.y, 15, ['#ff4757', '#ffffff'], 2, 6);
        }
      } else if (attackType === 3 && this.phase === 3) {
        // Attack 4: Bullet Hell Glitch Spiral
        this.tauntText = 'حذف الحساب نهائياً!!';
        this.tauntTimer = 100;
        window.audio.sfxBossRoar();
        for (let a = 0; a < 8; a++) {
          const angle = (Math.PI * 2 / 8) * a;
          enemyProjectiles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            vx: Math.cos(angle) * 5,
            vy: Math.sin(angle) * 5,
            damage: 20,
            color: '#ff0033',
            radius: 7,
            type: 'spiral'
          });
        }
      }
    }

    // Boss Movement Physics
    const spd = (this.phase === 3) ? 2.6 : 1.6;
    if (distToPlayer > 120) {
      this.vx = dirToPlayer * spd;
    } else {
      this.vx = -dirToPlayer * spd * 0.5;
    }

    this.vy += 0.4;
    this.x += this.vx;
    this.y += this.vy;

    // Platform collisions
    for (const p of platforms) {
      if (this.x < p.x + p.w && this.x + this.width > p.x &&
          this.y < p.y + p.h && this.y + this.height > p.y) {
        if (this.vy > 0) {
          this.y = p.y - this.height;
          this.vy = 0;
        }
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

    // Enrage Fire Aura (Phase 3)
    if (this.phase === 3) {
      ctx.fillStyle = 'rgba(255, 0, 51, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, 65 + Math.sin(this.animTimer * 0.3) * 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Shield Aura (Phase 2)
    if (this.shieldActive) {
      ctx.strokeStyle = '#00d2d3';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 60, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Giant Glitch Mech Armor
    ctx.fillStyle = (this.phase === 3) ? '#4b1212' : '#1e272e';
    ctx.fillRect(-35, -35, 70, 75);

    // Red Glitch Plate
    ctx.fillStyle = '#ff3838';
    ctx.fillRect(-28, -25, 56, 35);

    // Copyright Strike "©" / Ban Emblem on chest
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('©', 0, 0);

    // Boss Mech Head & Horns
    ctx.fillStyle = '#2f3542';
    ctx.fillRect(-22, -50, 44, 22);

    // Red Horns
    ctx.fillStyle = '#ff4757';
    ctx.fillRect(-25, -60, 8, 14);
    ctx.fillRect(17, -60, 8, 14);

    // Glowing Glitch Eyes
    ctx.fillStyle = (this.phase === 3) ? '#ffff00' : '#ff0055';
    ctx.fillRect(4, -42, 10, 6);

    // Heavy Robot Legs
    ctx.fillStyle = '#747d8c';
    ctx.fillRect(-28, 40, 22, 15);
    ctx.fillRect(6, 40, 22, 15);

    // Giant Ban Hammer in Hand
    ctx.fillStyle = '#dcdde1';
    ctx.fillRect(35, -20, 10, 45); // Handle
    ctx.fillStyle = '#e84118';
    ctx.fillRect(28, -40, 24, 22); // Hammer head
    ctx.fillStyle = '#f5f6fa';
    ctx.font = 'bold 10px monospace';
    ctx.fillText('BAN', 40, -25);

    ctx.restore();

    // Draw Boss Taunt Speech Bubble
    if (this.tauntTimer > 0) {
      ctx.save();
      ctx.font = 'bold 12px "Cairo", "Press Start 2P", sans-serif';
      ctx.textAlign = 'center';
      const textW = ctx.measureText(this.tauntText).width + 20;
      const bubbleX = bx + this.width / 2;
      const bubbleY = by - 24;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(bubbleX - textW / 2, bubbleY - 14, textW, 24);
      ctx.strokeStyle = '#ff4757';
      ctx.lineWidth = 2;
      ctx.strokeRect(bubbleX - textW / 2, bubbleY - 14, textW, 24);

      ctx.fillStyle = '#ffd700';
      ctx.fillText(this.tauntText, bubbleX, bubbleY + 3);
      ctx.restore();
    }
  }
}

window.Enemy = Enemy;
window.BossBan = BossBan;
