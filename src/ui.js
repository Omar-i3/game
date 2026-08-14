// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - UI & Campaign Map Manager
// ============================================================================

class UIManager {
  constructor() {
    this.selectedHeroIndex = 0;
    this.heroKeys = ['banderita', 'mlzlz', 'ocmz', 'abuAbed', 'opiilz'];
    this.selectedStageIndex = 1;
    this.unlockedStage = 20; // All 20 stages unlocked for immediate playability

    // DOM Elements
    this.hudElement = document.getElementById('hud');
    this.campaignMapModal = document.getElementById('campaign-map-modal');
    this.weaponSelectModal = document.getElementById('weapon-select-modal');
    this.dialogueModal = document.getElementById('dialogue-modal');
    this.gameOverModal = document.getElementById('game-over-modal');
    this.victoryModal = document.getElementById('victory-modal');
    this.pauseModal = document.getElementById('pause-modal');
    this.mainMenuModal = document.getElementById('main-menu-modal');

    this.initCampaignMapUI();
    this.setupEventListeners();
  }

  initCampaignMapUI() {
    const grid = document.getElementById('campaign-stages-grid');
    if (!grid) return;

    grid.innerHTML = '';
    for (let i = 1; i <= 20; i++) {
      const stage = window.CAMPAIGN_STAGES[i];
      const hero = window.HERO_DATA[stage.heroId] || window.HERO_DATA.banderita;
      const isBoss = (i === 4 || i === 8 || i === 12 || i === 16 || i === 20);

      const card = document.createElement('div');
      card.className = `stage-card ${i === 1 ? 'selected' : ''} ${isBoss ? 'boss-stage' : ''}`;
      card.dataset.stage = i;
      card.innerHTML = `
        <div class="stage-num">${i}</div>
        <div class="stage-details">
          <span class="stage-title">${stage.name}</span>
          <span class="stage-hero-badge" style="color: ${hero.color}">👤 ${hero.name}</span>
          <span class="stage-quest-brief">${stage.objectiveTitle}</span>
        </div>
        ${isBoss ? '<span class="boss-tag">👑 BOSS</span>' : ''}
      `;

      card.addEventListener('click', () => {
        if (this.selectedStageIndex === i) {
          // If already selected, launch it directly!
          this.launchSelectedStage();
        } else {
          this.selectStage(i);
        }
      });
      card.addEventListener('dblclick', () => {
        this.selectStage(i);
        this.launchSelectedStage();
      });

      grid.appendChild(card);
    }
  }

  selectStage(stageIndex) {
    this.selectedStageIndex = stageIndex;
    try { if (window.audio && window.audio.sfxMenuSelect) window.audio.sfxMenuSelect(); } catch(e){}

    const cards = document.querySelectorAll('.stage-card');
    cards.forEach((c, idx) => {
      c.classList.toggle('selected', idx + 1 === stageIndex);
    });

    const stage = window.CAMPAIGN_STAGES ? window.CAMPAIGN_STAGES[stageIndex] : null;
    const previewEl = document.getElementById('map-stage-preview');
    if (previewEl && stage) {
      const hero = window.HERO_DATA ? window.HERO_DATA[stage.heroId] : null;
      const heroName = hero ? hero.name : stage.heroId;
      const heroClass = hero ? hero.class : '';
      previewEl.innerHTML = `
        <h3>مرحلة ${stageIndex}: ${stage.name} (${stage.nameEn})</h3>
        <p class="preview-quest"><strong>المهمة:</strong> ${stage.objectiveDesc}</p>
        <p class="preview-hero"><strong>البطل المخصص:</strong> ${heroName} (${heroClass})</p>
      `;
    }
  }

  launchSelectedStage() {
    try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
    const stage = window.CAMPAIGN_STAGES ? window.CAMPAIGN_STAGES[this.selectedStageIndex] : null;

    // If stage is Banderita, open Weapon Selection modal first
    if (stage && stage.heroId === 'banderita') {
      this.showScreen('weaponSelect');
    } else if (window.game) {
      window.game.startStage(this.selectedStageIndex, stage ? stage.heroId : 'banderita');
    }
  }

  setupEventListeners() {
    // Menu buttons
    const btnStart = document.getElementById('btn-start-game');
    if (btnStart) {
      btnStart.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try {
          if (window.audio) {
            window.audio.ensureContext();
            if (window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm();
          }
        } catch(err) {
          console.warn('Audio play error:', err);
        }
        this.showScreen('campaignMap');
      });
    }

    const btnLaunchStage = document.getElementById('btn-launch-stage');
    if (btnLaunchStage) {
      btnLaunchStage.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.launchSelectedStage();
      });
    }

    // Banderita Weapon Choice buttons
    const btnChooseTamees = document.getElementById('btn-weapon-tamees');
    if (btnChooseTamees) {
      btnChooseTamees.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        if (window.game) window.game.startStage(this.selectedStageIndex, 'banderita', 'tamees');
      });
    }

    const btnChoosePotato = document.getElementById('btn-weapon-potato');
    if (btnChoosePotato) {
      btnChoosePotato.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        if (window.game) window.game.startStage(this.selectedStageIndex, 'banderita', 'potato');
      });
    }

    const btnRetry = document.getElementById('btn-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        if (window.game) window.game.restartStage();
      });
    }

    const btnBackToMap = document.getElementById('btn-back-to-map');
    if (btnBackToMap) {
      btnBackToMap.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        this.showScreen('campaignMap');
      });
    }

    const btnSoundToggle = document.getElementById('btn-toggle-sound');
    if (btnSoundToggle) {
      btnSoundToggle.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (window.audio) {
          const isMuted = window.audio.toggleMute();
          btnSoundToggle.textContent = isMuted ? '🔇 الصوت: مغلق' : '🔊 الصوت: يعمل';
          btnSoundToggle.classList.toggle('muted', isMuted);
        }
      });
    }

    const btnResume = document.getElementById('btn-resume');
    if (btnResume) {
      btnResume.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (window.game) window.game.togglePause();
      });
    }

    // Touch controls
    this.bindTouchButton('btn-touch-left', (p) => { window.game.inputs.left = p; });
    this.bindTouchButton('btn-touch-right', (p) => { window.game.inputs.right = p; });
    this.bindTouchButton('btn-touch-jump', (p) => { if (p) window.game.handleJumpPress(); });
    this.bindTouchButton('btn-touch-attack', (p) => { if (p) window.game.handleAttackPress(); });
    this.bindTouchButton('btn-touch-dash', (p) => { if (p) window.game.handleDashPress(); });
    this.bindTouchButton('btn-touch-special', (p) => { if (p) window.game.handleSpecialPress(); });
    this.bindTouchButton('btn-touch-switch', (p) => {
      if (p) {
        this.selectedHeroIndex = (this.selectedHeroIndex + 1) % this.heroKeys.length;
        window.game.switchHero(this.selectedHeroIndex);
      }
    });
  }

  bindTouchButton(id, callback) {
    const el = document.getElementById(id);
    if (!el) return;
    const startHandler = (e) => { e.preventDefault(); callback(true); el.classList.add('active'); };
    const endHandler = (e) => { e.preventDefault(); callback(false); el.classList.remove('active'); };
    el.addEventListener('touchstart', startHandler, { passive: false });
    el.addEventListener('touchend', endHandler, { passive: false });
    el.addEventListener('mousedown', startHandler);
    el.addEventListener('mouseup', endHandler);
    el.addEventListener('mouseleave', endHandler);
  }

  showScreen(screenName) {
    if (window.game) {
      if (screenName === 'game') window.game.state = 'playing';
      else if (screenName === 'pause') window.game.state = 'paused';
      else if (screenName === 'gameOver') window.game.state = 'gameover';
      else if (screenName === 'victory') window.game.state = 'victory';
      else if (screenName === 'campaignMap') window.game.state = 'campaignMap';
      else if (screenName === 'weaponSelect') window.game.state = 'weaponSelect';
      else if (screenName === 'menu') window.game.state = 'menu';
    }

    if (this.mainMenuModal) this.mainMenuModal.classList.toggle('hidden', screenName !== 'menu');
    if (this.campaignMapModal) this.campaignMapModal.classList.toggle('hidden', screenName !== 'campaignMap');
    if (this.weaponSelectModal) this.weaponSelectModal.classList.toggle('hidden', screenName !== 'weaponSelect');
    if (this.gameOverModal) this.gameOverModal.classList.toggle('hidden', screenName !== 'gameOver');
    if (this.victoryModal) this.victoryModal.classList.toggle('hidden', screenName !== 'victory');
    if (this.pauseModal) this.pauseModal.classList.toggle('hidden', screenName !== 'pause');
    if (this.hudElement) this.hudElement.classList.toggle('hidden', screenName !== 'game' && screenName !== 'pause' && screenName !== 'dialogue');
  }

  updateHUD(player) {
    if (!player) return;

    const avatarEl = document.getElementById('hud-avatar');
    if (avatarEl) {
      avatarEl.className = `hud-avatar avatar-${player.heroId}`;
      avatarEl.style.borderColor = player.heroData.avatarBorder;
    }

    const heroNameEl = document.getElementById('hud-hero-name');
    if (heroNameEl) {
      heroNameEl.textContent = `${player.heroData.name} (${player.heroData.nameEn})`;
    }

    const hpFill = document.getElementById('hud-hp-fill');
    const hpText = document.getElementById('hud-hp-text');
    if (hpFill && hpText) {
      const hpPct = Math.max(0, (player.hp / player.maxHp) * 100);
      hpFill.style.width = `${hpPct}%`;
      hpText.textContent = `${Math.ceil(player.hp)} / ${player.maxHp}`;
    }

    const energyFill = document.getElementById('hud-energy-fill');
    const energyText = document.getElementById('hud-energy-text');
    const ultStatus = document.getElementById('hud-ult-status');
    if (energyFill && energyText) {
      const energyPct = Math.min(100, Math.max(0, (player.energy / player.maxEnergy) * 100));
      energyFill.style.width = `${energyPct}%`;
      energyText.textContent = `${Math.floor(energyPct)}%`;

      if (energyPct >= 100) {
        energyFill.classList.add('ready');
        if (ultStatus) {
          ultStatus.textContent = '⚡ جاهز! (L / SP)';
          ultStatus.classList.add('glowing');
        }
      } else {
        energyFill.classList.remove('ready');
        if (ultStatus) {
          ultStatus.textContent = player.heroData.specialName;
          ultStatus.classList.remove('glowing');
        }
      }
    }

    const subsEl = document.getElementById('hud-subs-counter');
    if (subsEl && window.game) subsEl.textContent = Number(window.game.subscribers).toLocaleString();

    const scoreEl = document.getElementById('hud-score-counter');
    if (scoreEl && window.game) scoreEl.textContent = Number(window.game.score).toLocaleString();

    const levelEl = document.getElementById('hud-level-title');
    if (levelEl && window.game && window.game.levelManager && window.game.levelManager.stage) {
      levelEl.textContent = `مرحلة ${window.game.levelManager.currentStageIndex}: ${window.game.levelManager.stage.name}`;
    }

    // Boss Health Bar
    const bossHud = document.getElementById('boss-hud-bar');
    if (bossHud) {
      const boss = window.game ? window.game.levelManager.boss : null;
      if (boss && !boss.isDead) {
        bossHud.classList.remove('hidden');
        const bossFill = document.getElementById('boss-hp-fill');
        const bossPct = (boss.hp / boss.maxHp) * 100;
        if (bossFill) bossFill.style.width = `${Math.max(0, bossPct)}%`;
        const bossName = document.getElementById('boss-hud-name');
        if (bossName) bossName.textContent = `${boss.name} (Phase ${boss.phase})`;
      } else {
        bossHud.classList.add('hidden');
      }
    }
  }

  showGameOver(stats) {
    if (window.audio) window.audio.sfxGameOver();
    const subStat = document.getElementById('gameover-subs');
    const scoreStat = document.getElementById('gameover-score');
    if (subStat) subStat.textContent = Number(stats.subs).toLocaleString();
    if (scoreStat) scoreStat.textContent = Number(stats.score).toLocaleString();
    this.showScreen('gameOver');
  }

  showVictory(stats) {
    if (window.audio) window.audio.sfxVictory();
    if (window.particles) window.particles.spawnConfetti(window.game.canvas.width, window.game.canvas.height, 150);

    const subStat = document.getElementById('victory-subs');
    const scoreStat = document.getElementById('victory-score');
    const heroStat = document.getElementById('victory-hero');
    const rankStat = document.getElementById('victory-rank');

    if (subStat) subStat.textContent = Number(stats.subs).toLocaleString();
    if (scoreStat) scoreStat.textContent = Number(stats.score).toLocaleString();
    if (heroStat) heroStat.textContent = stats.heroName || 'أساطير اليوتيوب';
    if (rankStat) rankStat.textContent = 'S+ (أسطوري خارق)';
    this.showScreen('victory');
  }
}

window.UIManager = UIManager;
