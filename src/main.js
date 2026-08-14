// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Main Controller & Game Modes
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

    this.gameMode = 'campaign'; // campaign, bossRush, endless
    this.bossRushIndex = 1;
    this.endlessWave = 1;

    this.state = 'menu'; // menu, campaignMap, lore, shop, studio, achievements, modes, weaponSelect, dialogue, playing, stageClear, paused, gameover, victory
    this.score = 0;
    this.totalSubscribers = 1000;
    this.levelSubscribers = 0;
    this.stageTimer = 0;
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
    this.setupResizeHandler();
    this.startLoop();
  }

  setupResizeHandler() {
    const resize = () => {
      const container = document.getElementById('game-viewport-container');
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const targetAspect = 16 / 9;
      let w = rect.width;
      let h = rect.height;

      if (w / h > targetAspect) {
        w = h * targetAspect;
      } else {
        h = w / targetAspect;
      }

      this.canvas.style.width = `${Math.floor(w)}px`;
      this.canvas.style.height = `${Math.floor(h)}px`;
    };

    window.addEventListener('resize', resize);
    resize();
  }

  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      if (window.audio) window.audio.ensureContext();
      if (e.repeat) return;

      switch (e.code) {
        case 'KeyA': case 'ArrowLeft': this.inputs.left = true; break;
        case 'KeyD': case 'ArrowRight': this.inputs.right = true; break;
        case 'KeyW': case 'ArrowUp': case 'Space':
          this.inputs.jump = true;
          this.handleJumpPress();
          break;
        case 'KeyS': case 'ArrowDown': this.inputs.down = true; break;

        case 'KeyJ': case 'KeyZ':
          this.inputs.attack = true;
          this.handleAttackPress();
          break;

        case 'KeyK': case 'KeyX': case 'KeyL':
          this.handleDashPress();
          break;

        case 'KeyU': case 'KeyI': case 'KeyC':
          this.inputs.special = true;
          this.handleSpecialPress();
          break;

        case 'KeyF':
          this.handleAssistPress();
          break;

        case 'KeyE': case 'Enter':
          if (this.state === 'dialogue') this.dialogue.advance();
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
        case 'KeyW': case 'ArrowUp': case 'Space': this.inputs.jump = false; break;
        case 'KeyS': case 'ArrowDown': this.inputs.down = false; break;
        case 'KeyJ': case 'KeyZ': this.inputs.attack = false; break;
        case 'KeyU': case 'KeyI': case 'KeyC': this.inputs.special = false; break;
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

  handleAssistPress() {
    if (this.state === 'playing' && window.assists) {
      const success = window.assists.triggerAssist(this.player, this.levelManager.enemies, this.enemyProjectiles, this.levelManager.boss);
      if (success) this.addScreenShake(6);
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
    this.gameMode = 'campaign';
    this.enemyProjectiles = [];
    this.levelSubscribers = 0;
    this.stageTimer = 0;
    this.combo = 0;
    this.comboTimer = 0;
    window.particles.reset();
    if (window.events) window.events.reset();

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

  startBossRush(bossIndex = 1) {
    this.gameMode = 'bossRush';
    this.bossRushIndex = bossIndex;
    this.enemyProjectiles = [];
    this.levelSubscribers = 0;
    this.stageTimer = 0;
    this.combo = 0;
    this.comboTimer = 0;
    window.particles.reset();
    if (window.events) window.events.reset();

    this.player.setHero('banderita');
    this.player.resetPosition(80, 420);
    this.levelManager.loadBossRushStage(bossIndex);

    this.state = 'playing';
    this.ui.showScreen('game');
  }

  restartStage() {
    if (this.gameMode === 'bossRush') {
      this.startBossRush(this.bossRushIndex);
    } else {
      const currentIdx = this.levelManager.currentStageIndex || 1;
      const stage = window.CAMPAIGN_STAGES[currentIdx];
      this.startStage(currentIdx, stage ? stage.heroId : 'banderita');
    }
  }

  completeStage() {
    const currentIdx = this.levelManager.currentStageIndex;
    const stage = this.levelManager.stage;

    // Calculate Star Rating
    const totalSec = Math.floor(this.stageTimer / 60);
    let stars = 3;
    if (totalSec > 90) stars = 2;
    if (totalSec > 150) stars = 1;

    // Save Progress to localStorage
    if (this.gameMode === 'campaign' && window.PROGRESSION) {
      window.PROGRESSION.unlockNextLevel(currentIdx);
      window.PROGRESSION.saveLevelStats(currentIdx, stars, this.score);
    }

    // Check & Trigger Achievements
    if (window.achievements) {
      if (this.player.heroId === 'banderita' && totalSec <= 35) {
        window.achievements.unlock('speedrun_banderita');
      }
      if (this.player.heroId === 'mlzlz' && this.player.hp >= this.player.maxHp) {
        window.achievements.unlock('no_damage_mlzlz');
      }
      if ((this.totalSubscribers + this.levelSubscribers) >= 1000000) {
        window.achievements.unlock('million_subs');
      }
      if (this.player.heroId === 'opiilz' && this.objectives.current >= 6) {
        window.achievements.unlock('master_hacker');
      }
      if (this.player.heroId === 'abuAbed' && stage.objectiveType === 'BOSS_DEFEAT') {
        window.achievements.unlock('bald_supremacy');
      }
    }

    if (this.gameMode === 'bossRush') {
      if (this.bossRushIndex < 5) {
        this.startBossRush(this.bossRushIndex + 1);
      } else {
        this.ui.showVictory({
          subs: this.totalSubscribers + this.levelSubscribers,
          score: this.score,
          heroName: 'بطل البوس راش الخارق 👑'
        });
      }
      return;
    }

    // Trigger Outro Dialogue
    this.dialogue.startDialogue(currentIdx, 'outro', () => {
      this.addScore(1500);
      this.totalSubscribers += this.levelSubscribers;

      const mins = Math.floor(totalSec / 60).toString().padStart(2, '0');
      const secs = (totalSec % 60).toString().padStart(2, '0');
      const timeStr = `${mins}:${secs} ثانية`;

      if (currentIdx >= 20) {
        // Grand Campaign Victory
        this.ui.showVictory({
          subs: this.totalSubscribers,
          score: this.score,
          heroName: 'أساطير اليوتيوب العرب'
        });
      } else {
        // Show Stage Clear Rating Screen
        this.ui.showStageClear({
          stageIndex: currentIdx,
          nextStageIndex: currentIdx + 1,
          stars: stars,
          subs: this.levelSubscribers,
          quota: stage.requiredSubsQuota,
          timeStr: timeStr,
          score: this.score
        });
      }
    });
  }

  addScore(pts) {
    const multiplier = 1 + Math.min(4, Math.floor(this.combo / 3) * 0.5);
    this.score += Math.round(pts * multiplier);
  }

  addSubscribers(count) {
    let rate = 1.0;
    if (window.studio && window.studio.hasPerk('gold_play_button')) rate *= 1.3;
    if (window.events && window.events.subsMultiplier > 1) rate *= window.events.subsMultiplier;

    const finalSubs = Math.round(count * rate);
    this.levelSubscribers += finalSubs;
    this.addScore(Math.floor(finalSubs / 100));
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

    // Check Live Stream Events Freeze State
    const isStreamLagged = window.events ? window.events.update(this.player, this.levelManager.enemies, this.cameraX, this.width) : false;
    if (isStreamLagged) return;

    this.stageTimer++;

    let moveDir = 0;
    if (this.inputs.left) moveDir -= 1;
    if (this.inputs.right) moveDir += 1;
    this.player.move(moveDir);

    this.player.update(this.levelManager.platforms, this.levelManager.enemies, this.levelManager.boss, this.levelManager.interactiveObjects);
    this.levelManager.update(this.player);
    this.objectives.update(this.player);

    if (window.assists) {
      window.assists.update(this.player, this.levelManager.enemies, this.levelManager.boss);
    }

    // Update Enemies
    for (let i = this.levelManager.enemies.length - 1; i >= 0; i--) {
      const enemy = this.levelManager.enemies[i];
      enemy.update(this.player, this.levelManager.platforms, this.enemyProjectiles);

      if (!enemy.isDead && enemy.frozenTimer <= 0) {
        if (this.player.x < enemy.x + enemy.width && this.player.x + this.player.width > enemy.x &&
            this.player.y < enemy.y + enemy.height && this.player.y + this.player.height > enemy.y) {

          // Fake Sub Trap triggers explosion & deducts subscribers
          if (enemy.isFakeSub) {
            this.levelSubscribers = Math.max(0, this.levelSubscribers - 1500);
            this.player.takeDamage(15);
            window.particles.burst(enemy.x, enemy.y, 25, ['#ffd700', '#ff4757', '#000000'], 3, 7);
            window.particles.addFloatingText(this.player.x, this.player.y - 25, '⚠️ فخ مشترك وهمي! (-1,500 مشترك)', '#ff4757', 14);
            if (window.audio) window.audio.sfxExplosion();
            this.levelManager.enemies.splice(i, 1);
            continue;
          }

          const knockback = Math.sign(this.player.x - enemy.x) || 1;
          this.player.takeDamage(enemy.damage, knockback);

          // Copyright Drone steals subscribers
          if (enemy.isCopyright) {
            this.levelSubscribers = Math.max(0, this.levelSubscribers - 2000);
            window.particles.addFloatingText(this.player.x, this.player.y - 25, '⚠️ مخالفة كوبي رايت! (-2,000 مشترك)', '#ffa502', 13);
            if (window.audio) window.audio.sfxPortalLocked();
          }
        }
      }

      if (enemy.isDead) {
        this.addScore(enemy.scoreReward);
        this.addSubscribers(enemy.subsReward || 500);
        this.player.addEnergy(15);
        this.combo++;
        this.comboTimer = 90;

        if (window.events) window.events.recordEnemyKill();
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
          this.player.takeDamage(28, knockback);
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

          if (enemy.isAdBarrier) {
            enemy.takeDamage(1, 0); // 5 hits to break
          } else {
            enemy.takeDamage(hitbox.damage, hitbox.knockback);
          }

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

      // Check interactive objects
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
        if (proj.isToxicComment) {
          this.player.lagTimer = 90; // Toxic comment slows player
          window.particles.addFloatingText(this.player.x, this.player.y - 20, '🤢 تعليق سلبي سام!', '#2ed573', 12);
        }
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

    // Check Exit Portal & Subscriber Quota
    if (this.levelManager.portal) {
      const port = this.levelManager.portal;
      if (this.player.x + this.player.width > port.x && this.player.x < port.x + port.w &&
          this.player.y + this.player.height > port.y && this.player.y < port.y + port.h) {

        const isQuestDone = this.objectives.isCompleted;
        const requiredSubs = this.levelManager.stage.requiredSubsQuota || 0;
        const hasEnoughSubs = this.levelSubscribers >= requiredSubs;

        if (!isQuestDone) {
          window.particles.addFloatingText(this.player.x + this.player.width / 2, this.player.y - 20, '⚠️ لم تكتمل المهمة المطلوبة بعد!', '#ff4757', 14);
          if (window.audio) window.audio.sfxPortalLocked();
        } else if (!hasEnoughSubs) {
          window.particles.addFloatingText(this.player.x + this.player.width / 2, this.player.y - 20, `⚠️ المشتركين غير كافيين! (${this.levelSubscribers.toLocaleString()} / ${requiredSubs.toLocaleString()})`, '#ff4757', 14);
          if (window.audio) window.audio.sfxPortalLocked();
        } else {
          this.completeStage();
        }
      }
    }

    // Shadow Ban Pit Checkpoint Respawn
    if (this.player.y > 640) {
      if (this.levelManager.lastCheckpoint) {
        this.player.resetPosition(this.levelManager.lastCheckpoint.x, this.levelManager.lastCheckpoint.y);
        this.player.takeDamage(20);
        this.addScreenShake(8);
        window.particles.burst(this.player.x, this.player.y, 16, ['#5f27cd', '#a55eea', '#ff4757'], 2, 6);
        window.particles.addFloatingText(this.player.x, this.player.y - 30, '⚠️ شادو باند! تمت إعادتك لنقطة الحفظ!', '#a55eea', 13);
      } else {
        this.player.takeDamage(999);
      }
    }

    if (this.player.hp <= 0) {
      this.state = 'gameover';
      this.ui.showGameOver({ subs: this.levelSubscribers, score: this.score });
    }

    // Smooth-Follow Camera (X and Y with stage boundary clamping)
    const targetCamX = this.player.x - this.width / 2 + this.player.width / 2;
    const targetCamY = this.player.y - this.height / 2 + this.player.height / 2;
    const maxCamX = Math.max(0, this.levelManager.stage.width - this.width);
    const maxCamY = Math.max(0, (this.levelManager.stage.height || 650) - this.height);

    this.cameraX += (Math.max(0, Math.min(maxCamX, targetCamX)) - this.cameraX) * 0.12;
    this.cameraY += (Math.max(0, Math.min(maxCamY, targetCamY)) - this.cameraY) * 0.12;

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

    if (window.events) window.events.draw(this.ctx, this.cameraX, this.cameraY);
    if (this.player) this.player.draw(this.ctx, this.cameraX, this.cameraY);
    if (window.assists) window.assists.draw(this.ctx, this.cameraX, this.cameraY, this.player);
    window.particles.draw(this.ctx, this.cameraX, this.cameraY);

    if (this.combo > 1) {
      this.ctx.save();
      this.ctx.font = 'bold 16px "Press Start 2P", sans-serif';
      this.ctx.fillStyle = '#fffa65';
      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 3;
      this.ctx.textAlign = 'right';
      const comboTxt = `x${this.combo} COMBO! 🔥`;
      this.ctx.strokeText(comboTxt, this.width - 20, 110);
      this.ctx.fillText(comboTxt, this.width - 20, 110);
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
