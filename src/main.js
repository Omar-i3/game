// ============================================================================
// Arab Gamers: Pixel Legends - Main Game Engine, Loop & Controller
// ============================================================================

class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Virtual Internal Resolution (Retro 16:9 Pixel Aspect)
    this.width = 960;
    this.height = 540;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Camera & Screen Shake
    this.cameraX = 0;
    this.cameraY = 0;
    this.shakeIntensity = 0;
    this.shakeDecay = 0.9;

    // Game States: 'menu', 'playing', 'paused', 'gameover', 'victory'
    this.state = 'menu';
    this.score = 0;
    this.subscribers = 1000;
    this.combo = 0;
    this.comboTimer = 0;

    // Projectile tracking for enemies
    this.enemyProjectiles = [];

    // Modules
    this.player = new window.Player('banderita');
    this.levelManager = new window.LevelManager();
    this.ui = new window.UIManager();

    // Inputs
    this.inputs = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      attack: false,
      special: false
    };

    this.setupKeyboardListeners();
    this.startLoop();
  }

  // --------------------------------------------------------------------------
  // Keyboard & Controller Listeners
  // --------------------------------------------------------------------------
  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      window.audio.ensureContext();

      if (e.repeat) return;

      switch (e.code) {
        // Movement
        case 'KeyA':
        case 'ArrowLeft':
          this.inputs.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.inputs.right = true;
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'KeyK':
        case 'Space':
          this.inputs.jump = true;
          this.handleJumpPress();
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.inputs.down = true;
          break;

        // Combat Actions
        case 'KeyJ':
        case 'KeyZ':
          this.inputs.attack = true;
          this.handleAttackPress();
          break;
        case 'KeyL':
        case 'KeyX':
          this.inputs.special = true;
          this.handleSpecialPress();
          break;

        // Character Swap (1-5)
        case 'Digit1':
          this.switchHero(0);
          break;
        case 'Digit2':
          this.switchHero(1);
          break;
        case 'Digit3':
          this.switchHero(2);
          break;
        case 'Digit4':
          this.switchHero(3);
          break;
        case 'Digit5':
          this.switchHero(4);
          break;

        // Pause
        case 'KeyP':
        case 'Escape':
          this.togglePause();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyA':
        case 'ArrowLeft':
          this.inputs.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.inputs.right = false;
          break;
        case 'KeyW':
        case 'ArrowUp':
        case 'KeyK':
        case 'Space':
          this.inputs.jump = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.inputs.down = false;
          break;
        case 'KeyJ':
        case 'KeyZ':
          this.inputs.attack = false;
          break;
        case 'KeyL':
        case 'KeyX':
          this.inputs.special = false;
          break;
      }
    });
  }

  handleJumpPress() {
    if (this.state === 'playing') {
      this.player.jump();
    }
  }

  handleAttackPress() {
    if (this.state === 'playing') {
      this.player.attack();
    }
  }

  handleSpecialPress() {
    if (this.state === 'playing') {
      const triggered = this.player.triggerSpecial();
      if (triggered) {
        this.addScreenShake(8);
      }
    }
  }

  switchHero(index) {
    if (this.ui) {
      this.ui.selectHero(index);
      window.particles.burst(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, 15, ['#ffd700', '#ffffff'], 2, 5);
      window.particles.addFloatingText(this.player.x + this.player.width / 2, this.player.y - 20, `${this.player.heroData.name}!`, '#ffd700', 14);
    }
  }

  togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      this.ui.showScreen('pause');
    } else if (this.state === 'paused') {
      this.state = 'playing';
      this.ui.showScreen('game');
    }
  }

  startNewGame(chosenHero = 'banderita') {
    this.score = 0;
    this.subscribers = 1000;
    this.combo = 0;
    this.enemyProjectiles = [];
    window.particles.reset();

    this.player.setHero(chosenHero);
    this.player.resetPosition(80, 420);
    this.player.energy = 50; // Start with half energy

    this.levelManager.loadLevel(1);
    this.state = 'playing';
    this.cameraX = 0;
    this.cameraY = 0;
  }

  restartLevel() {
    this.enemyProjectiles = [];
    window.particles.reset();
    this.player.hp = this.player.maxHp;
    this.player.energy = 50;
    this.player.resetPosition(80, 420);
    this.levelManager.loadLevel(this.levelManager.currentLevelIndex);
    this.state = 'playing';
  }

  loadNextLevel() {
    window.audio.sfxLevelClear();
    this.addScore(500);
    this.addSubscribers(500);

    const nextIndex = this.levelManager.currentLevelIndex + 1;
    if (nextIndex <= 3) {
      window.particles.reset();
      this.enemyProjectiles = [];
      this.player.resetPosition(80, 420);
      this.player.heal(50);
      this.player.addEnergy(40);
      this.levelManager.loadLevel(nextIndex);
      window.particles.addFloatingText(this.player.x + 100, 250, `مرحلة ${nextIndex}!`, '#ffd700', 20, '🚀');
    } else {
      // Victory! All levels completed!
      this.state = 'victory';
      this.ui.showVictory({
        subs: this.subscribers,
        score: this.score,
        heroName: this.player.heroData.name
      });
    }
  }

  addScore(pts) {
    const multiplier = 1 + Math.min(4, Math.floor(this.combo / 3) * 0.5);
    this.score += Math.round(pts * multiplier);
  }

  addSubscribers(count) {
    this.subscribers += count;
  }

  addScreenShake(intensity) {
    this.shakeIntensity = Math.max(this.shakeIntensity, intensity);
  }

  // --------------------------------------------------------------------------
  // Main Game Loop (60 FPS)
  // --------------------------------------------------------------------------
  startLoop() {
    const loop = () => {
      this.update();
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  // --------------------------------------------------------------------------
  // Update Cycle
  // --------------------------------------------------------------------------
  update() {
    if (this.state !== 'playing') {
      window.particles.update();
      return;
    }

    // Process Movement Inputs
    let moveDir = 0;
    if (this.inputs.left) moveDir -= 1;
    if (this.inputs.right) moveDir += 1;
    this.player.move(moveDir);

    // Update Player & Level
    this.player.update(this.levelManager.platforms, this.levelManager.enemies, this.levelManager.boss);
    this.levelManager.update(this.player);

    // Update Enemies
    for (let i = this.levelManager.enemies.length - 1; i >= 0; i--) {
      const enemy = this.levelManager.enemies[i];
      enemy.update(this.player, this.levelManager.platforms, this.enemyProjectiles);

      // Enemy Melee Contact Damage
      if (!enemy.isDead && enemy.frozenTimer <= 0) {
        if (this.player.x < enemy.x + enemy.width && this.player.x + this.player.width > enemy.x &&
            this.player.y < enemy.y + enemy.height && this.player.y + this.player.height > enemy.y) {
          const knockback = Math.sign(this.player.x - enemy.x) || 1;
          this.player.takeDamage(enemy.damage, knockback);
        }
      }

      // Cleanup dead enemies after particles
      if (enemy.isDead) {
        this.addScore(enemy.scoreReward);
        this.addSubscribers(enemy.subsReward);
        this.player.addEnergy(15);
        this.combo++;
        this.comboTimer = 90;
        this.levelManager.enemies.splice(i, 1);
      }
    }

    // Update Boss (Level 3)
    if (this.levelManager.boss) {
      const boss = this.levelManager.boss;
      boss.update(this.player, this.levelManager.platforms, this.enemyProjectiles, this.levelManager.enemies);

      // Boss Contact Damage
      if (!boss.isDead) {
        if (this.player.x < boss.x + boss.width && this.player.x + this.player.width > boss.x &&
            this.player.y < boss.y + boss.height && this.player.y + this.player.height > boss.y) {
          const knockback = Math.sign(this.player.x - boss.x) || 1;
          this.player.takeDamage(28, knockback);
        }
      } else {
        // Boss Defeated!
        setTimeout(() => {
          this.loadNextLevel(); // Trigger victory
        }, 1500);
      }
    }

    // Process Player Melee / Normal Attack Hitbox
    const hitbox = this.player.getAttackHitbox();
    if (hitbox) {
      // Check Hit against standard enemies
      for (const enemy of this.levelManager.enemies) {
        if (!enemy.isDead &&
            hitbox.x < enemy.x + enemy.width && hitbox.x + hitbox.width > enemy.x &&
            hitbox.y < enemy.y + enemy.height && hitbox.y + hitbox.height > enemy.y) {
          enemy.takeDamage(hitbox.damage, hitbox.knockback);
          this.player.addEnergy(12);
          this.combo++;
          this.comboTimer = 90;
          this.addScreenShake(3);
        }
      }

      // Check Hit against Boss
      if (this.levelManager.boss && !this.levelManager.boss.isDead) {
        const boss = this.levelManager.boss;
        if (hitbox.x < boss.x + boss.width && hitbox.x + hitbox.width > boss.x &&
            hitbox.y < boss.y + boss.height && hitbox.y + hitbox.height > boss.y) {
          boss.takeDamage(hitbox.damage);
          this.player.addEnergy(10);
          this.combo++;
          this.comboTimer = 90;
          this.addScreenShake(4);
        }
      }
    }

    // Update Enemy Projectiles
    for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
      const proj = this.enemyProjectiles[i];
      proj.x += proj.vx;
      proj.y += proj.vy;

      // Check hit on player
      const pDist = Math.hypot((this.player.x + this.player.width / 2) - proj.x, (this.player.y + this.player.height / 2) - proj.y);
      if (pDist < (proj.radius + this.player.width / 2)) {
        this.player.takeDamage(proj.damage, Math.sign(proj.vx));
        window.particles.burst(proj.x, proj.y, 8, [proj.color, '#ffffff'], 2, 4);
        this.enemyProjectiles.splice(i, 1);
        continue;
      }

      // Check screen bounds or expiration
      if (proj.x < -100 || proj.x > this.levelManager.level.width + 100 || proj.y > 650) {
        this.enemyProjectiles.splice(i, 1);
      }
    }

    // Update Combo Timer
    if (this.comboTimer > 0) {
      this.comboTimer--;
      if (this.comboTimer <= 0) {
        this.combo = 0;
      }
    }

    // Check Warp Portal to Next Level
    if (this.levelManager.portal) {
      const port = this.levelManager.portal;
      if (this.player.x + this.player.width > port.x && this.player.x < port.x + port.w &&
          this.player.y + this.player.height > port.y && this.player.y < port.y + port.h) {
        this.loadNextLevel();
      }
    }

    // Fall in pit death check
    if (this.player.y > 620) {
      this.player.takeDamage(999);
    }

    // Check Player Death / Game Over
    if (this.player.hp <= 0) {
      this.state = 'gameover';
      this.ui.showGameOver({
        subs: this.subscribers,
        score: this.score
      });
    }

    // Smooth Camera Following Player
    const targetCamX = this.player.x - this.width / 2 + this.player.width / 2;
    const maxCamX = Math.max(0, this.levelManager.level.width - this.width);
    this.cameraX += (Math.max(0, Math.min(maxCamX, targetCamX)) - this.cameraX) * 0.1;

    // Decay Screen Shake
    if (this.shakeIntensity > 0) {
      this.shakeIntensity *= this.shakeDecay;
      if (this.shakeIntensity < 0.1) this.shakeIntensity = 0;
    }

    // Update Particle System
    window.particles.update();

    // Update HUD
    this.ui.updateHUD(this.player);
  }

  // --------------------------------------------------------------------------
  // Render Cycle
  // --------------------------------------------------------------------------
  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.save();

    // Apply Screen Shake
    if (this.shakeIntensity > 0) {
      const shakeX = (Math.random() - 0.5) * this.shakeIntensity * 2;
      const shakeY = (Math.random() - 0.5) * this.shakeIntensity * 2;
      this.ctx.translate(shakeX, shakeY);
    }

    // 1. Draw Parallax Background
    if (this.levelManager && this.levelManager.level) {
      this.levelManager.drawBackground(this.ctx, this.cameraX, this.cameraY, this.width, this.height);
      this.levelManager.drawLevel(this.ctx, this.cameraX, this.cameraY);
    }

    // 2. Draw Enemies
    for (const enemy of this.levelManager.enemies) {
      enemy.draw(this.ctx, this.cameraX, this.cameraY);
    }

    // 3. Draw Boss (Level 3)
    if (this.levelManager.boss) {
      this.levelManager.boss.draw(this.ctx, this.cameraX, this.cameraY);
    }

    // 4. Draw Enemy Projectiles
    for (const proj of this.enemyProjectiles) {
      const prx = Math.round(proj.x - this.cameraX);
      const pry = Math.round(proj.y - this.cameraY);
      this.ctx.save();
      this.ctx.fillStyle = proj.color;
      this.ctx.beginPath();
      this.ctx.arc(prx, pry, proj.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1.5;
      this.ctx.stroke();
      this.ctx.restore();
    }

    // 5. Draw Player Character
    if (this.player) {
      this.player.draw(this.ctx, this.cameraX, this.cameraY);
    }

    // 6. Draw Particle System & Shockwaves
    window.particles.draw(this.ctx, this.cameraX, this.cameraY);

    // 7. Draw Combo Counter if active
    if (this.combo > 1) {
      this.ctx.save();
      this.ctx.font = 'bold 18px "Press Start 2P", sans-serif';
      this.ctx.fillStyle = '#fffa65';
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 3;
      this.ctx.textAlign = 'right';
      const comboTxt = `x${this.combo} COMBO! 🔥`;
      this.ctx.strokeText(comboTxt, this.width - 24, 100);
      this.ctx.fillText(comboTxt, this.width - 24, 100);
      this.ctx.restore();
    }

    this.ctx.restore();
  }
}

// Global bootstrap
window.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
