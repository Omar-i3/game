// ============================================================================
// Arab Gamers: Pixel Legends - Arcade UI, Menus, HUD & Mobile Controls
// ============================================================================

class UIManager {
  constructor() {
    this.selectedHeroIndex = 0;
    this.heroKeys = ['banderita', 'mlzlz', 'ocmz', 'abuAbed', 'opiilz'];
    this.hudElement = document.getElementById('hud');
    this.characterSelectModal = document.getElementById('character-select-modal');
    this.gameOverModal = document.getElementById('game-over-modal');
    this.victoryModal = document.getElementById('victory-modal');
    this.pauseModal = document.getElementById('pause-modal');
    this.mainMenuModal = document.getElementById('main-menu-modal');
    this.touchControls = document.getElementById('touch-controls');

    this.initHeroSelectUI();
    this.setupEventListeners();
  }

  initHeroSelectUI() {
    const grid = document.getElementById('hero-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';
    this.heroKeys.forEach((key, index) => {
      const hero = window.HERO_DATA[key];
      const card = document.createElement('div');
      card.className = `hero-card ${index === 0 ? 'selected' : ''}`;
      card.dataset.hero = key;
      card.innerHTML = `
        <div class="hero-avatar-frame" style="border-color: ${hero.avatarBorder}">
          <div class="hero-pixel-avatar avatar-${key}"></div>
        </div>
        <div class="hero-info">
          <div class="hero-names">
            <span class="hero-ar-name">${hero.name}</span>
            <span class="hero-en-name">${hero.nameEn}</span>
          </div>
          <div class="hero-class">${hero.class}</div>
          <div class="hero-stat-bars">
            <div class="stat-row"><span>HP</span><div class="bar-bg"><div class="bar-fill" style="width: ${(hero.maxHp/150)*100}%; background: #e74c3c"></div></div></div>
            <div class="stat-row"><span>ATK</span><div class="bar-bg"><div class="bar-fill" style="width: ${(hero.attackPower/35)*100}%; background: #e67e22"></div></div></div>
            <div class="stat-row"><span>SPD</span><div class="bar-bg"><div class="bar-fill" style="width: ${(hero.speed/6.5)*100}%; background: #2ecc71"></div></div></div>
            <div class="stat-row"><span>DEF</span><div class="bar-bg"><div class="bar-fill" style="width: ${(hero.defense/30)*100}%; background: #3498db"></div></div></div>
          </div>
          <div class="hero-special-box">
            <span class="special-label">⚡ ${hero.specialName}</span>
            <p class="special-desc">${hero.specialDesc}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        this.selectHero(index);
      });

      grid.appendChild(card);
    });
  }

  selectHero(index) {
    this.selectedHeroIndex = index;
    window.audio.sfxMenuSelect();

    const cards = document.querySelectorAll('.hero-card');
    cards.forEach((c, idx) => {
      c.classList.toggle('selected', idx === index);
    });

    const heroKey = this.heroKeys[index];
    if (window.game && window.game.player) {
      window.game.player.setHero(heroKey);
      this.updateHUD(window.game.player);
    }
  }

  setupEventListeners() {
    // Menu buttons
    const btnStart = document.getElementById('btn-start-game');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        window.audio.ensureContext();
        window.audio.sfxMenuConfirm();
        this.showScreen('charSelect');
      });
    }

    const btnConfirmHero = document.getElementById('btn-confirm-hero');
    if (btnConfirmHero) {
      btnConfirmHero.addEventListener('click', () => {
        window.audio.sfxMenuConfirm();
        const chosenHero = this.heroKeys[this.selectedHeroIndex];
        window.game.startNewGame(chosenHero);
        this.showScreen('game');
      });
    }

    const btnRetry = document.getElementById('btn-retry');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        window.audio.sfxMenuConfirm();
        window.game.restartLevel();
        this.showScreen('game');
      });
    }

    const btnPlayAgain = document.getElementById('btn-play-again');
    if (btnPlayAgain) {
      btnPlayAgain.addEventListener('click', () => {
        window.audio.sfxMenuConfirm();
        this.showScreen('charSelect');
      });
    }

    const btnResume = document.getElementById('btn-resume');
    if (btnResume) {
      btnResume.addEventListener('click', () => {
        window.game.togglePause();
      });
    }

    const btnSoundToggle = document.getElementById('btn-toggle-sound');
    if (btnSoundToggle) {
      btnSoundToggle.addEventListener('click', () => {
        const isMuted = window.audio.toggleMute();
        btnSoundToggle.textContent = isMuted ? '🔇 الصوت: مغلق' : '🔊 الصوت: يعمل';
        btnSoundToggle.classList.toggle('muted', isMuted);
      });
    }

    // Touch on-screen buttons
    this.bindTouchButton('btn-touch-left', (pressed) => {
      window.game.inputs.left = pressed;
    });
    this.bindTouchButton('btn-touch-right', (pressed) => {
      window.game.inputs.right = pressed;
    });
    this.bindTouchButton('btn-touch-jump', (pressed) => {
      if (pressed) window.game.handleJumpPress();
    });
    this.bindTouchButton('btn-touch-attack', (pressed) => {
      if (pressed) window.game.handleAttackPress();
    });
    this.bindTouchButton('btn-touch-special', (pressed) => {
      if (pressed) window.game.handleSpecialPress();
    });
    this.bindTouchButton('btn-touch-switch', (pressed) => {
      if (pressed) {
        this.selectedHeroIndex = (this.selectedHeroIndex + 1) % this.heroKeys.length;
        this.selectHero(this.selectedHeroIndex);
      }
    });
  }

  bindTouchButton(id, callback) {
    const el = document.getElementById(id);
    if (!el) return;

    const startHandler = (e) => {
      e.preventDefault();
      callback(true);
      el.classList.add('active');
    };

    const endHandler = (e) => {
      e.preventDefault();
      callback(false);
      el.classList.remove('active');
    };

    el.addEventListener('touchstart', startHandler, { passive: false });
    el.addEventListener('touchend', endHandler, { passive: false });
    el.addEventListener('mousedown', startHandler);
    el.addEventListener('mouseup', endHandler);
    el.addEventListener('mouseleave', endHandler);
  }

  showScreen(screenName) {
    if (this.mainMenuModal) this.mainMenuModal.classList.toggle('hidden', screenName !== 'menu');
    if (this.characterSelectModal) this.characterSelectModal.classList.toggle('hidden', screenName !== 'charSelect');
    if (this.gameOverModal) this.gameOverModal.classList.toggle('hidden', screenName !== 'gameOver');
    if (this.victoryModal) this.victoryModal.classList.toggle('hidden', screenName !== 'victory');
    if (this.pauseModal) this.pauseModal.classList.toggle('hidden', screenName !== 'pause');
    if (this.hudElement) this.hudElement.classList.toggle('hidden', screenName !== 'game' && screenName !== 'pause');
  }

  updateHUD(player) {
    if (!player) return;

    // Active Hero Avatar & Info
    const avatarEl = document.getElementById('hud-avatar');
    if (avatarEl) {
      avatarEl.className = `hud-avatar avatar-${player.heroId}`;
      avatarEl.style.borderColor = player.heroData.avatarBorder;
    }

    const heroNameEl = document.getElementById('hud-hero-name');
    if (heroNameEl) {
      heroNameEl.textContent = `${player.heroData.name} (${player.heroData.nameEn})`;
    }

    // Health Bar
    const hpFill = document.getElementById('hud-hp-fill');
    const hpText = document.getElementById('hud-hp-text');
    if (hpFill && hpText) {
      const hpPct = Math.max(0, (player.hp / player.maxHp) * 100);
      hpFill.style.width = `${hpPct}%`;
      hpText.textContent = `${Math.ceil(player.hp)} / ${player.maxHp}`;
    }

    // Energy / Ultimate Bar
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

    // Subs & Score Counter
    const subsEl = document.getElementById('hud-subs-counter');
    if (subsEl && window.game) {
      subsEl.textContent = Number(window.game.subscribers).toLocaleString();
    }

    const scoreEl = document.getElementById('hud-score-counter');
    if (scoreEl && window.game) {
      scoreEl.textContent = Number(window.game.score).toLocaleString();
    }

    const levelEl = document.getElementById('hud-level-title');
    if (levelEl && window.game && window.game.levelManager && window.game.levelManager.level) {
      levelEl.textContent = `مرحلة ${window.game.levelManager.currentLevelIndex}: ${window.game.levelManager.level.name}`;
    }

    // Boss Health Bar in Level 3
    const bossHud = document.getElementById('boss-hud-bar');
    if (bossHud) {
      const boss = window.game ? window.game.levelManager.boss : null;
      if (boss && !boss.isDead) {
        bossHud.classList.remove('hidden');
        const bossFill = document.getElementById('boss-hp-fill');
        const bossPct = (boss.hp / boss.maxHp) * 100;
        if (bossFill) bossFill.style.width = `${Math.max(0, bossPct)}%`;
        const bossName = document.getElementById('boss-hud-name');
        if (bossName) bossName.textContent = `الزعيم الشرير "الباند" (Phase ${boss.phase})`;
      } else {
        bossHud.classList.add('hidden');
      }
    }
  }

  showGameOver(stats) {
    window.audio.sfxGameOver();
    const subStat = document.getElementById('gameover-subs');
    const scoreStat = document.getElementById('gameover-score');
    if (subStat) subStat.textContent = Number(stats.subs).toLocaleString();
    if (scoreStat) scoreStat.textContent = Number(stats.score).toLocaleString();
    this.showScreen('gameOver');
  }

  showVictory(stats) {
    window.audio.sfxVictory();
    window.particles.spawnConfetti(window.game.canvas.width, window.game.canvas.height, 120);

    const subStat = document.getElementById('victory-subs');
    const scoreStat = document.getElementById('victory-score');
    const heroStat = document.getElementById('victory-hero');
    const rankStat = document.getElementById('victory-rank');

    if (subStat) subStat.textContent = Number(stats.subs).toLocaleString();
    if (scoreStat) scoreStat.textContent = Number(stats.score).toLocaleString();
    if (heroStat) heroStat.textContent = stats.heroName;

    // Calculate Rank S / A / B
    let rank = 'A';
    if (stats.score > 8000 && stats.subs > 4000) rank = 'S+ (أسطوري)';
    else if (stats.score > 5000) rank = 'S (محترف)';
    else if (stats.score > 3000) rank = 'A (بطل)';
    else rank = 'B (جيد)';

    if (rankStat) rankStat.textContent = rank;
    this.showScreen('victory');
  }
}

window.UIManager = UIManager;
