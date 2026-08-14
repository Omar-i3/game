// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - UI, Progression & Menu Engine
// ============================================================================

class UIManager {
  constructor() {
    this.selectedHeroIndex = 0;
    this.heroKeys = ['banderita', 'mlzlz', 'ocmz', 'abuAbed', 'opiilz'];
    this.selectedStageIndex = 1;

    // DOM Elements
    this.hudElement = document.getElementById('hud');
    this.mainMenuModal = document.getElementById('main-menu-modal');
    this.campaignMapModal = document.getElementById('campaign-map-modal');
    this.loreModal = document.getElementById('lore-modal');
    this.weaponSelectModal = document.getElementById('weapon-select-modal');
    this.dialogueModal = document.getElementById('dialogue-modal');
    this.gameOverModal = document.getElementById('game-over-modal');
    this.victoryModal = document.getElementById('victory-modal');
    this.pauseModal = document.getElementById('pause-modal');

    this.initCampaignMapUI();
    this.setupEventListeners();
  }

  initCampaignMapUI() {
    const grid = document.getElementById('campaign-stages-grid');
    if (!grid) return;

    const unlockedLevel = window.PROGRESSION ? window.PROGRESSION.getUnlockedLevel() : 1;
    grid.innerHTML = '';

    for (let i = 1; i <= 20; i++) {
      const stage = window.CAMPAIGN_STAGES ? window.CAMPAIGN_STAGES[i] : null;
      if (!stage) continue;

      const hero = window.HERO_DATA ? window.HERO_DATA[stage.heroId] : null;
      const isBoss = (i === 4 || i === 8 || i === 12 || i === 16 || i === 20);
      const isLocked = (i > unlockedLevel);
      const stars = window.PROGRESSION ? window.PROGRESSION.getLevelStars(i) : 0;
      const starsDisplay = '★'.repeat(stars) + '☆'.repeat(Math.max(0, 3 - stars));

      const card = document.createElement('div');
      card.className = `stage-card ${i === this.selectedStageIndex ? 'selected' : ''} ${isBoss ? 'boss-stage' : ''} ${isLocked ? 'locked-stage' : ''}`;
      card.dataset.stage = i;
      card.innerHTML = `
        <div class="stage-num">${i} ${isLocked ? '🔒' : ''}</div>
        <div class="stage-details">
          <span class="stage-title">${stage.name}</span>
          <span class="stage-hero-badge" style="color: ${hero ? hero.color : '#ffd700'}">👤 ${hero ? hero.name : stage.heroId}</span>
          <span class="stage-quest-brief">${stage.objectiveTitle}</span>
          <span class="stage-quota-badge">👥 ${(stage.requiredSubsQuota || 50000).toLocaleString()}</span>
          ${stars > 0 ? `<span class="stage-stars">${starsDisplay}</span>` : ''}
        </div>
        ${isBoss ? '<span class="boss-tag">👑 BOSS</span>' : ''}
      `;

      card.addEventListener('click', () => {
        if (isLocked) {
          if (window.audio) window.audio.sfxPortalLocked();
          if (window.particles && window.game) {
            window.particles.addFloatingText(window.game.canvas.width / 2, 100, `🔒 المرحلة مقفلة! أنهِ مرحلة ${i - 1} أولاً`, '#ff4757', 14);
          }
          return;
        }

        if (this.selectedStageIndex === i) {
          this.launchSelectedStage();
        } else {
          this.selectStage(i);
        }
      });

      card.addEventListener('dblclick', () => {
        if (!isLocked) {
          this.selectStage(i);
          this.launchSelectedStage();
        }
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
        <p class="preview-quota"><strong>شرط المشتركين لفتح البوابة:</strong> 👥 ${(stage.requiredSubsQuota || 50000).toLocaleString()} مشترك</p>
      `;
    }
  }

  launchSelectedStage() {
    const unlockedLevel = window.PROGRESSION ? window.PROGRESSION.getUnlockedLevel() : 1;
    if (this.selectedStageIndex > unlockedLevel) {
      if (window.audio) window.audio.sfxPortalLocked();
      return;
    }

    try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
    const stage = window.CAMPAIGN_STAGES ? window.CAMPAIGN_STAGES[this.selectedStageIndex] : null;

    if (stage && stage.heroId === 'banderita') {
      this.showScreen('weaponSelect');
    } else if (window.game) {
      window.game.startStage(this.selectedStageIndex, stage ? stage.heroId : 'banderita');
    }
  }

  setupEventListeners() {
    // 1. Main Menu Buttons
    const btnStartStory = document.getElementById('btn-start-story');
    if (btnStartStory) {
      btnStartStory.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        const furthestStage = window.PROGRESSION ? window.PROGRESSION.getUnlockedLevel() : 1;
        this.selectedStageIndex = furthestStage;
        this.launchSelectedStage();
      });
    }

    const btnOpenMap = document.getElementById('btn-open-map');
    if (btnOpenMap) {
      btnOpenMap.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        this.initCampaignMapUI();
        this.showScreen('campaignMap');
      });
    }

    const btnOpenLore = document.getElementById('btn-open-lore');
    if (btnOpenLore) {
      btnOpenLore.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        this.showScreen('lore');
      });
    }

    const btnCloseLore = document.getElementById('btn-close-lore');
    if (btnCloseLore) {
      btnCloseLore.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        this.showScreen('menu');
      });
    }

    const btnResetProgress = document.getElementById('btn-reset-progress');
    if (btnResetProgress) {
      btnResetProgress.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        const confirmReset = (typeof window.confirm === 'function')
          ? window.confirm('هل أنت متأكد من إعادة ضبط التقدم والبدء من المرحلة 1؟')
          : true;

        if (confirmReset) {
          if (window.PROGRESSION) window.PROGRESSION.resetProgress();
          this.selectedStageIndex = 1;
          this.initCampaignMapUI();
          if (typeof window.alert === 'function') window.alert('تم إعادة ضبط التقدم بنجاح!');
        }
      });
    }

    const btnLaunchStage = document.getElementById('btn-launch-stage');
    if (btnLaunchStage) {
      btnLaunchStage.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        this.launchSelectedStage();
      });
    }

    // 2. Banderita Weapon Choice buttons
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

    // 3. Retry Button (Robust clean restart)
    const btnRetry = document.getElementById('btn-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        if (window.game) window.game.restartStage();
      });
    }

    // 4. Return to Main Menu / Map Buttons
    const btnGameOverMenu = document.getElementById('btn-gameover-menu');
    if (btnGameOverMenu) {
      btnGameOverMenu.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        this.showScreen('menu');
      });
    }

    const btnVictoryMenu = document.getElementById('btn-victory-menu');
    if (btnVictoryMenu) {
      btnVictoryMenu.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        this.showScreen('menu');
      });
    }

    const btnBackToMap = document.getElementById('btn-back-to-map');
    if (btnBackToMap) {
      btnBackToMap.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        this.initCampaignMapUI();
        this.showScreen('campaignMap');
      });
    }

    const btnMapBackToMenu = document.getElementById('btn-map-back-to-menu');
    if (btnMapBackToMenu) {
      btnMapBackToMenu.addEventListener('click', (e) => {
        if (e && e.preventDefault) e.preventDefault();
        try { if (window.audio && window.audio.sfxMenuConfirm) window.audio.sfxMenuConfirm(); } catch(err){}
        this.showScreen('menu');
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
    this.bindTouchButton('btn-touch-left', (p) => { if (window.game) window.game.inputs.left = p; });
    this.bindTouchButton('btn-touch-right', (p) => { if (window.game) window.game.inputs.right = p; });
    this.bindTouchButton('btn-touch-jump', (p) => { if (p && window.game) window.game.handleJumpPress(); });
    this.bindTouchButton('btn-touch-attack', (p) => { if (p && window.game) window.game.handleAttackPress(); });
    this.bindTouchButton('btn-touch-dash', (p) => { if (p && window.game) window.game.handleDashPress(); });
    this.bindTouchButton('btn-touch-special', (p) => { if (p && window.game) window.game.handleSpecialPress(); });
    this.bindTouchButton('btn-touch-switch', (p) => {
      if (p && window.game) {
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
      else if (screenName === 'lore') window.game.state = 'lore';
      else if (screenName === 'menu') window.game.state = 'menu';
    }

    if (this.mainMenuModal) this.mainMenuModal.classList.toggle('hidden', screenName !== 'menu');
    if (this.campaignMapModal) this.campaignMapModal.classList.toggle('hidden', screenName !== 'campaignMap');
    if (this.loreModal) this.loreModal.classList.toggle('hidden', screenName !== 'lore');
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
          ultStatus.textContent = '⚡ جاهز! (K / ULT)';
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

    // Subscriber Quota Progress HUD
    const subsEl = document.getElementById('hud-subs-counter');
    const quotaEl = document.getElementById('hud-quota-status');
    if (window.game && window.game.levelManager && window.game.levelManager.stage) {
      const currentSubs = window.game.levelSubscribers || 0;
      const requiredSubs = window.game.levelManager.stage.requiredSubsQuota || 50000;
      const quotaPct = Math.min(100, Math.floor((currentSubs / requiredSubs) * 100));

      if (subsEl) subsEl.textContent = `${currentSubs.toLocaleString()} / ${requiredSubs.toLocaleString()} 👥`;
      if (quotaEl) {
        if (currentSubs >= requiredSubs) {
          quotaEl.textContent = '✅ شرط المشتركين مكتمل!';
          quotaEl.className = 'quota-status completed';
        } else {
          quotaEl.textContent = `⏳ التقدم: ${quotaPct}%`;
          quotaEl.className = 'quota-status';
        }
      }
    }

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
    if (subStat) subStat.textContent = Number(stats.subs || 0).toLocaleString();
    if (scoreStat) scoreStat.textContent = Number(stats.score || 0).toLocaleString();
    this.showScreen('gameOver');
  }

  showVictory(stats) {
    if (window.audio) window.audio.sfxVictory();
    if (window.particles) window.particles.spawnConfetti(window.game.canvas.width, window.game.canvas.height, 150);

    const subStat = document.getElementById('victory-subs');
    const scoreStat = document.getElementById('victory-score');
    const heroStat = document.getElementById('victory-hero');
    const rankStat = document.getElementById('victory-rank');

    if (subStat) subStat.textContent = Number(stats.subs || 0).toLocaleString();
    if (scoreStat) scoreStat.textContent = Number(stats.score || 0).toLocaleString();
    if (heroStat) heroStat.textContent = stats.heroName || 'أساطير اليوتيوب';
    if (rankStat) rankStat.textContent = 'S+ (أسطوري خارق)';
    this.showScreen('victory');
  }
}

window.UIManager = UIManager;
