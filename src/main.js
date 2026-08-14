// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Main Controller & Game Loop
// ============================================================================

class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    this.width = 960;
    this.height = 540;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.cameraX = 0;
    this.cameraY = 0;
    this.shakeIntensity = 0;
    this.shakeDecay = 0.9;

    this.state = 'menu'; // menu, campaignMap, weaponSelect, dialogue, playing, paused, gameover, victory
    this.score = 0;
    this.subscribers = 1000;
    this.combo = 0;
    this.comboTimer = 0;

    this.enemyProjectiles = [];

    // Instantiate Modules
    this.player = new window.Player('banderita');
    this.levelManager = new window.LevelManager();
    this.dialogue = new window.DialogueManager();
    this.objectives = new window.ObjectiveEngine();
    this.ui = new window.UIManager();

    this.inputs = { left: false, right: false, up: false, down: false, jump: false, attack: false, special: false };

    this.setupKeyboardListeners();
    this.startLoop();
  }

  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      if (window.audio) window.audio.ensureContext();
      if (e.repeat) return;

      switch (e.code) {
        case 'KeyA': case 'ArrowLeft': this.inputs.left = true; break;
        case 'KeyD': case 'ArrowRight': this.inputs.right = true; break;
        case 'KeyW': case 'ArrowUp': case 'KeyK': case 'Space':
          this.inputs.jump = true;
          this.handleJumpPress();
          break;
        case 'KeyS': case 'ArrowDown': this.inputs.down = true; break;

        case 'KeyJ': case 'KeyZ':
          this.inputs.attack = true;
          this.handleAttackPress();
          break;
        case 'KeyL': case 'KeyX':
          this.inputs.special = true;
          this.handleSpecialPress();
          break;
        case 'ShiftLeft': case 'ShiftRight':
          this.handleDashPress();
          break;

        case 'Digit1': this.switchHero(0); break;
        case 'Digit2': this.switchHero(1); break;
        case 'Digit3': this.switchHero(2); break;
        case 'Digit4': this.switchHero(3); break;
        case 'Digit5': this.switchHero(4); break;

        case 'KeyP': case 'Escape': this.togglePause(); break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyA': case 'ArrowLeft': this.inputs.left = false; break;
        case 'KeyD': case 'ArrowRight': this.inputs.right = false; break;
        case 'KeyW': case 'ArrowUp': case 'KeyK': case 'Space': this.inputs.jump = false; break;
        case 'KeyS': case 'ArrowDown': this.inputs.down = false; break;
        case 'KeyJ': case 'KeyZ': this.inputs.attack = false; break;
        case 'KeyL': case 'KeyX': this.inputs.special = false; break;
      }
    });
  }

  handleJumpPress() {
    if (this.state === 'playing') this.player.jump();
  }

  handleAttackPress() {
    if (this.state === 'playing') this.player.attack();
  }

  handleDashPress() {
    if (this.state === 'playing') this.player.flashDash();
  }

  handleSpecialPress() {
    if (this.state === 'playing') {
      const triggered = this.player.triggerSpecial();
      if (triggered) this.addScreenShake(8);
    }
  }

  switchHero(index) {
    const heroKeys = ['banderita', 'mlzlz', 'ocmz', 'abuAbed', 'opiilz'];
    const key = heroKeys[index] || 'banderita';
    this.player.setHero(key);
    window.particles.burst(this.player.x + this.player.width / 2, this.player.y + this.player.height / 2, 14, ['#ffd700', '#ffffff'], 2, 5);
    window.particles.addFloatingText(this.player.x + this.player.width / 2, this.player.y - 20, `${this.player.heroData.name}!`, '#ffd700', 14);
    if (this.ui) this.ui.updateHUD(this.player);
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

  startStage(stageIndex, heroId = 'banderita', weaponChoice = null) {
    this.enemyProjectiles = [];
    window.particles.reset();

    this.player.setHero(heroId, weaponChoice);
    this.player.resetPosition(80, 420);
    this.levelManager.loadStage(stageIndex);

    this.cameraX = 0;
    this.cameraY = 0;

    // Trigger Intro Dialogue
    this.dialogue.startDialogue(stageIndex, 'intro', () => {
      this.state = 'playing';
      this.ui.showScreen('game');
    });
  }

  restartStage() {
    const currentIdx = this.levelManager.currentStageIndex || 1;
    const stage = window.CAMPAIGN_STAGES[currentIdx];
    this.startStage(currentIdx, stage.heroId);
  }

  completeStage() {
    const currentIdx = this.levelManager.currentStageIndex;

    // Trigger Outro Dialogue
    this.dialogue.startDialogue(currentIdx, 'outro', () => {
      this.addScore(500);
      this.addSubscribers(500);

      const nextStage = currentIdx + 1;
      if (nextStage <= 20) {
        const nextData = window.CAMPAIGN_STAGES[nextStage];
        if (nextData.heroId === 'banderita') {
          this.levelManager.currentStageIndex = nextStage;
          this.ui.showScreen('weaponSelect');
        } else {
          this.startStage(nextStage, nextData.heroId);
        }
      } else {
        // Victory! Finished all 20 stages!
        this.state = 'victory';
        this.ui.showVictory({
          subs: this.subscribers,
          score: this.score,
          heroName: 'أساطير اليوتيوب العرب'
        });
      }
    });
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

  startLoop() {
    const loop = () => {
      this.update();
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  update() {
    if (this.state !== 'playing') {
      window.particles.update();
      return;
    }

    let moveDir = 0;
    if (this.inputs.left) moveDir -= 1;
    if (this.inputs.right) moveDir += 1;
    this.player.move(moveDir);

    this.player.update(this.levelManager.platforms, this.levelManager.enemies, this.levelManager.boss, this.levelManager.interactiveObjects);
    this.levelManager.update(this.player);
    this.objectives.update(this.player);

    // Update Enemies
    for (let i = this.levelManager.enemies.length - 1; i >= 0; i--) {
      const enemy = this.levelManager.enemies[i];
      enemy.update(this.player, this.levelManager.platforms, this.enemyProjectiles);

      if (!enemy.isDead && enemy.frozenTimer <= 0) {
        if (this.player.x < enemy.x + enemy.width && this.player.x + this.player.width > enemy.x &&
            this.player.y < enemy.y + enemy.height && this.player.y + this.player.height > enemy.y) {
          const knockback = Math.sign(this.player.x - enemy.x) || 1;
          this.player.takeDamage(enemy.damage, knockback);
        }
      }

      if (enemy.isDead) {
        this.addScore(enemy.scoreReward);
        this.addSubscribers(enemy.subsReward);
        this.player.addEnergy(15);
        this.combo++;
        this.comboTimer = 90;
        this.levelManager.enemies.splice(i, 1);
      }
    }

    // Update Boss
    if (this.levelManager.boss) {
      const boss = this.levelManager.boss;
      boss.update(this.player, this.levelManager.platforms, this.enemyProjectiles, this.levelManager.enemies);

      if (!boss.isDead) {
        if (this.player.x < boss.x + boss.width && this.player.x + this.player.width > boss.x &&
            this.player.y < boss.y + boss.height && this.player.y + this.player.height > boss.y) {
          const knockback = Math.sign(this.player.x - boss.x) || 1;
          this.player.takeDamage(30, knockback);
        }
      }
    }

    // Process Melee Hitbox
    const hitbox = this.player.getAttackHitbox();
    if (hitbox) {
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

      if (this.levelManager.boss && !this.levelManager.boss.isDead) {
        const boss = this.levelManager.boss;
        if (hitbox.x < boss.x + boss.width && hitbox.x + hitbox.width > boss.x &&
            hitbox.y < boss.y + boss.height && hitbox.y + hitbox.height > boss.y) {
          boss.takeDamage(hitbox.damage);
          this.player.addEnergy(12);
          this.combo++;
          this.comboTimer = 90;
          this.addScreenShake(4);
        }
      }

      // Check interactive objects with screwdriver / melee
      if (this.levelManager.interactiveObjects) {
        for (const obj of this.levelManager.interactiveObjects) {
          if (!obj.activated &&
              hitbox.x < obj.x + 20 && hitbox.x + hitbox.width > obj.x - 20 &&
              hitbox.y < obj.y + 20 && hitbox.y + hitbox.height > obj.y - 20) {
            obj.activated = true;
            this.objectives.recordPuzzleTrigger(obj.id);
            window.particles.burst(obj.x, obj.y, 14, ['#ffd700', '#2ed573'], 2, 5);
          }
        }
      }
    }

    // Update Enemy Projectiles
    for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
      const proj = this.enemyProjectiles[i];
      proj.x += proj.vx;
      proj.y += proj.vy;

      const pDist = Math.hypot((this.player.x + this.player.width / 2) - proj.x, (this.player.y + this.player.height / 2) - proj.y);
      if (pDist < (proj.radius + this.player.width / 2)) {
        this.player.takeDamage(proj.damage, Math.sign(proj.vx));
        window.particles.burst(proj.x, proj.y, 8, [proj.color, '#ffffff'], 2, 4);
        this.enemyProjectiles.splice(i, 1);
        continue;
      }

      if (proj.x < -100 || proj.x > this.levelManager.stage.width + 100 || proj.y > 650) {
        this.enemyProjectiles.splice(i, 1);
      }
    }

    if (this.comboTimer > 0) {
      this.comboTimer--;
      if (this.comboTimer <= 0) this.combo = 0;
    }

    // Check Exit Portal
    if (this.levelManager.portal && this.objectives.isCompleted) {
      const port = this.levelManager.portal;
      if (this.player.x + this.player.width > port.x && this.player.x < port.x + port.w &&
          this.player.y + this.player.height > port.y && this.player.y < port.y + port.h) {
        this.completeStage();
      }
    }

    if (this.player.y > 620) {
      this.player.takeDamage(999);
    }

    if (this.player.hp <= 0) {
      this.state = 'gameover';
      this.ui.showGameOver({ subs: this.subscribers, score: this.score });
    }

    // Camera
    const targetCamX = this.player.x - this.width / 2 + this.player.width / 2;
    const maxCamX = Math.max(0, this.levelManager.stage.width - this.width);
    this.cameraX += (Math.max(0, Math.min(maxCamX, targetCamX)) - this.cameraX) * 0.1;

    if (this.shakeIntensity > 0) {
      this.shakeIntensity *= this.shakeDecay;
      if (this.shakeIntensity < 0.1) this.shakeIntensity = 0;
    }

    window.particles.update();
    this.ui.updateHUD(this.player);
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();

    if (this.shakeIntensity > 0) {
      const shakeX = (Math.random() - 0.5) * this.shakeIntensity * 2;
      const shakeY = (Math.random() - 0.5) * this.shakeIntensity * 2;
      this.ctx.translate(shakeX, shakeY);
    }

    if (this.levelManager && this.levelManager.stage) {
      this.levelManager.drawBackground(this.ctx, this.cameraX, this.cameraY, this.width, this.height);
      this.levelManager.drawLevel(this.ctx, this.cameraX, this.cameraY);
    }

    for (const enemy of this.levelManager.enemies) enemy.draw(this.ctx, this.cameraX, this.cameraY);
    if (this.levelManager.boss) this.levelManager.boss.draw(this.ctx, this.cameraX, this.cameraY);

    for (const proj of this.enemyProjectiles) {
      const prx = Math.round(proj.x - this.cameraX);
      const pry = Math.round(proj.y - this.cameraY);
      this.ctx.save();
      this.ctx.fillStyle = proj.color;
      this.ctx.beginPath();
      this.ctx.arc(prx, pry, proj.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    if (this.player) this.player.draw(this.ctx, this.cameraX, this.cameraY);
    window.particles.draw(this.ctx, this.cameraX, this.cameraY);

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

window.Game = Game;

function initGame() {
  if (!window.game) {
    window.game = new Game();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGame);
} else {
  initGame();
}
