// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Dynamic Objective & Quest Engine
// ============================================================================

class ObjectiveEngine {
  constructor() {
    this.stage = null;
    this.type = null;
    this.title = '';
    this.description = '';
    this.target = 0;
    this.current = 0;
    this.timeLimit = 0;
    this.timeRemaining = 0;
    this.isCompleted = false;
    this.isFailed = false;

    this.hudBox = document.getElementById('hud-quest-box');
    this.hudTitle = document.getElementById('hud-quest-title');
    this.hudDesc = document.getElementById('hud-quest-desc');
    this.hudProgress = document.getElementById('hud-quest-progress');
  }

  initObjective(stageData) {
    this.stage = stageData;
    this.type = stageData.objectiveType || 'COLLECT';
    this.title = stageData.objectiveTitle || 'المهمة';
    this.description = stageData.objectiveDesc || '';
    this.target = stageData.objectiveTarget || 1;
    this.current = 0;
    this.isCompleted = false;
    this.isFailed = false;

    if (this.type === 'SURVIVE_TIMER' || this.type === 'SPEEDRUN_TIMER') {
      this.timeLimit = stageData.objectiveTimeLimit || 60;
      this.timeRemaining = this.timeLimit * 60; // In ticks (60fps)
    }

    this.updateHUD();
  }

  recordCollect(itemType) {
    if (this.type === 'COLLECT') {
      this.current++;
      if (this.current >= this.target) {
        this.completeObjective();
      }
      this.updateHUD();
    }
  }

  recordKill() {
    if (this.type === 'KILL_COUNT') {
      this.current++;
      if (this.current >= this.target) {
        this.completeObjective();
      }
      this.updateHUD();
    }
  }

  recordPuzzleTrigger(triggerId) {
    if (this.type === 'PUZZLE_TRIGGER') {
      this.current++;
      if (this.current >= this.target) {
        this.completeObjective();
      }
      this.updateHUD();
    }
  }

  recordBossDefeat() {
    if (this.type === 'BOSS_DEFEAT') {
      this.completeObjective();
      this.updateHUD();
    }
  }

  completeObjective() {
    if (this.isCompleted) return;
    this.isCompleted = true;
    if (window.audio) window.audio.sfxPortalOpen();
    if (window.particles) {
      window.particles.addFloatingText(window.game.canvas.width / 2, 120, '✅ اكتملت المهمة! اتجه نحو البوابة!', '#2ed573', 18);
    }
  }

  update(player) {
    if (this.isCompleted || this.isFailed) return;

    if (this.type === 'SURVIVE_TIMER') {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.completeObjective();
      }
      this.updateHUD();
    } else if (this.type === 'SPEEDRUN_TIMER') {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.isFailed = true;
        if (player) player.takeDamage(999);
      }
      this.updateHUD();
    }
  }

  updateHUD() {
    if (!this.hudBox) {
      this.hudBox = document.getElementById('hud-quest-box');
      this.hudTitle = document.getElementById('hud-quest-title');
      this.hudDesc = document.getElementById('hud-quest-desc');
      this.hudProgress = document.getElementById('hud-quest-progress');
    }

    if (this.hudTitle) this.hudTitle.textContent = this.title;
    if (this.hudDesc) this.hudDesc.textContent = this.description;

    if (this.hudProgress) {
      if (this.isCompleted) {
        this.hudProgress.textContent = '✅ اكتملت المهمة (توجه للبوابة)';
        this.hudProgress.className = 'quest-progress completed';
      } else if (this.type === 'SURVIVE_TIMER') {
        const secs = Math.ceil(this.timeRemaining / 60);
        this.hudProgress.textContent = `⏱ صمود متبقي: ${secs} ثانية`;
        this.hudProgress.className = secs <= 10 ? 'quest-progress urgent' : 'quest-progress';
      } else if (this.type === 'SPEEDRUN_TIMER') {
        const secs = Math.ceil(this.timeRemaining / 60);
        this.hudProgress.textContent = `⚡ وقت متبقي: ${secs} ثانية`;
        this.hudProgress.className = secs <= 10 ? 'quest-progress urgent' : 'quest-progress';
      } else if (this.type === 'BOSS_DEFEAT') {
        this.hudProgress.textContent = '⚔️ اسحق الزعيم!';
        this.hudProgress.className = 'quest-progress';
      } else {
        this.hudProgress.textContent = `التقدم: ${this.current} / ${this.target}`;
        this.hudProgress.className = 'quest-progress';
      }
    }
  }
}

window.ObjectiveEngine = ObjectiveEngine;
