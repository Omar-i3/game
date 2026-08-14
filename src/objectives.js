// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Objective & Quest Engine
// ============================================================================

class ObjectiveEngine {
  constructor() {
    this.currentQuest = null;
    this.isCompleted = false;
    this.timer = 0;
    this.currentCount = 0;
    this.targetCount = 0;
    this.hudQuestTitle = document.getElementById('hud-quest-title');
    this.hudQuestDesc = document.getElementById('hud-quest-desc');
    this.hudQuestProgress = document.getElementById('hud-quest-progress');
    this.hudQuestBox = document.getElementById('hud-quest-box');
  }

  initStageObjective(stageData) {
    this.isCompleted = false;
    this.currentQuest = {
      type: stageData.objectiveType || 'REACH_EXIT', // COLLECT, KILL_COUNT, SURVIVE_TIMER, SPEEDRUN_TIMER, PUZZLE_TRIGGER, BOSS_DEFEAT
      title: stageData.objectiveTitle || 'الوصول للنهاية',
      desc: stageData.objectiveDesc || 'اعبر المسار إلى بوابة الخروج',
      target: stageData.objectiveTarget || 1,
      timeLimit: stageData.objectiveTimeLimit || 0
    };

    this.targetCount = this.currentQuest.target;
    this.currentCount = 0;

    if (this.currentQuest.type === 'SPEEDRUN_TIMER' || this.currentQuest.type === 'SURVIVE_TIMER') {
      this.timer = this.currentQuest.timeLimit * 60; // 60 frames per sec
    } else {
      this.timer = 0;
    }

    this.updateHUD();
  }

  recordItemCollected(itemType) {
    if (this.isCompleted) return;
    if (this.currentQuest.type === 'COLLECT') {
      this.currentCount++;
      if (this.currentCount >= this.targetCount) {
        this.completeObjective();
      }
      this.updateHUD();
    }
  }

  recordEnemyKilled(enemyType) {
    if (this.isCompleted) return;
    if (this.currentQuest.type === 'KILL_COUNT') {
      this.currentCount++;
      if (this.currentCount >= this.targetCount) {
        this.completeObjective();
      }
      this.updateHUD();
    }
  }

  recordPuzzleTrigger(triggerId) {
    if (this.isCompleted) return;
    if (this.currentQuest.type === 'PUZZLE_TRIGGER') {
      this.currentCount++;
      if (this.currentCount >= this.targetCount) {
        this.completeObjective();
      }
      this.updateHUD();
    }
  }

  recordBossDefeated() {
    if (this.isCompleted) return;
    if (this.currentQuest.type === 'BOSS_DEFEAT') {
      this.currentCount = 1;
      this.completeObjective();
      this.updateHUD();
    }
  }

  completeObjective() {
    if (this.isCompleted) return;
    this.isCompleted = true;
    if (window.audio) window.audio.sfxLevelClear();
    if (window.particles && window.game && window.game.player) {
      window.particles.burst(window.game.player.x + 20, window.game.player.y, 25, ['#ffd700', '#2ecc71', '#ffffff'], 3, 8);
      window.particles.addFloatingText(window.game.player.x + 20, window.game.player.y - 30, 'تم إنجاز المهمة! البوابة مفتوحة!', '#2ecc71', 16, '✅');
    }
    this.updateHUD();
  }

  update(player) {
    if (!this.currentQuest) return;

    // Timer modes
    if (this.currentQuest.type === 'SPEEDRUN_TIMER') {
      if (!this.isCompleted) {
        this.timer--;
        if (this.timer <= 0) {
          // Failed speedrun!
          this.timer = 0;
          if (player) player.takeDamage(999);
        }
      }
      this.updateHUD();
    } else if (this.currentQuest.type === 'SURVIVE_TIMER') {
      if (!this.isCompleted) {
        this.timer--;
        this.currentCount = Math.floor((this.currentQuest.timeLimit * 60 - this.timer) / 60);
        if (this.timer <= 0) {
          this.timer = 0;
          this.completeObjective();
        }
      }
      this.updateHUD();
    }
  }

  updateHUD() {
    if (!this.currentQuest) return;

    if (this.hudQuestTitle) this.hudQuestTitle.textContent = this.currentQuest.title;
    if (this.hudQuestDesc) this.hudQuestDesc.textContent = this.currentQuest.desc;

    if (this.hudQuestProgress) {
      if (this.isCompleted) {
        this.hudQuestProgress.textContent = '✅ مكتمل!';
        this.hudQuestProgress.className = 'quest-progress completed';
      } else if (this.currentQuest.type === 'SPEEDRUN_TIMER') {
        const secsLeft = Math.ceil(this.timer / 60);
        this.hudQuestProgress.textContent = `⏱️ متبقي: ${secsLeft} ثانية`;
        this.hudQuestProgress.className = (secsLeft <= 10) ? 'quest-progress urgent' : 'quest-progress';
      } else if (this.currentQuest.type === 'SURVIVE_TIMER') {
        const secsLeft = Math.ceil(this.timer / 60);
        this.hudQuestProgress.textContent = `🛡️ اصمد: ${secsLeft} ثانية`;
        this.hudQuestProgress.className = 'quest-progress';
      } else if (this.currentQuest.type === 'BOSS_DEFEAT') {
        this.hudQuestProgress.textContent = '☠️ اهزم الزعيم!';
        this.hudQuestProgress.className = 'quest-progress boss';
      } else {
        this.hudQuestProgress.textContent = `التقدم: ${this.currentCount} / ${this.targetCount}`;
        this.hudQuestProgress.className = 'quest-progress';
      }
    }
  }
}

window.ObjectiveEngine = ObjectiveEngine;
