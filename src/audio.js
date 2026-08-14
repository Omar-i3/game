// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Pure SFX Audio Engine (No Music)
// STRICT POLICY: Zero background music, zero melodic chords. Mechanical SFX only.
// ============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.isMuted = false;
    this.initContext();
  }

  initContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && !this.ctx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();

        this.sfxGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.sfxGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch (e) {}
  }

  ensureContext() {
    if (!this.ctx) this.initContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 1, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Pure mechanical 8-bit sound generator
  playTone(freq, type = 'square', duration = 0.08, startVol = 0.3, endVol = 0.01, freqEnd = null) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      if (freqEnd !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, freqEnd), t + duration);
      }

      gain.gain.setValueAtTime(startVol, t);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, endVol), t + duration);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + duration);
    } catch (e) {}
  }

  // Pure white/pink noise burst (mechanical whooshes, impacts, thuds)
  playNoise(duration = 0.08, startVol = 0.3, filterFreq = 1000, isBandpass = false) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = isBandpass ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(startVol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  // --------------------------------------------------------------------------
  // Mechanical Gameplay Sound Effects (NO MUSIC)
  // --------------------------------------------------------------------------

  // Dialogue typewriter click
  playDialogueBleep() {
    this.playTone(750 + Math.random() * 80, 'square', 0.02, 0.06, 0.01);
  }

  // Movement SFX
  sfxJump() {
    this.playTone(220, 'square', 0.12, 0.28, 0.01, 580);
  }

  sfxDoubleJump() {
    this.playTone(380, 'triangle', 0.1, 0.25, 0.01, 750);
  }

  sfxTripleJump() {
    this.playTone(550, 'square', 0.12, 0.28, 0.01, 980);
  }

  sfxDash() {
    this.playNoise(0.12, 0.35, 2400, true);
    this.playTone(320, 'sawtooth', 0.1, 0.25, 0.01, 90);
  }

  // Weapon & Combat SFX
  sfxTameesSlash() {
    this.playNoise(0.1, 0.4, 1800);
    this.playTone(300, 'sawtooth', 0.08, 0.3, 0.01, 80);
  }

  sfxHotPotato() {
    this.playTone(480, 'square', 0.08, 0.25, 0.01, 160);
  }

  sfxPotatoRage() {
    this.playNoise(0.5, 0.5, 900);
    this.playTone(110, 'sawtooth', 0.4, 0.4, 0.01, 35);
  }

  sfxTeaSpray() {
    this.playNoise(0.18, 0.35, 3000, true);
  }

  sfxHorrorGhost() {
    this.playTone(700, 'sine', 0.25, 0.25, 0.01, 400);
  }

  sfxHatBoomerang() {
    this.playTone(400, 'triangle', 0.12, 0.25, 0.01, 700);
    this.playNoise(0.08, 0.2, 3200);
  }

  sfxBlockDrop() {
    this.playNoise(0.15, 0.4, 1000);
    this.playTone(280, 'square', 0.1, 0.25, 0.01, 80);
  }

  sfxBaldBeam() {
    this.playTone(900, 'sine', 0.2, 0.3, 0.01, 1300);
  }

  sfxTurretDeploy() {
    this.playTone(300, 'square', 0.08, 0.25, 0.01, 600);
  }

  sfxScrewdriverZap() {
    this.playTone(950, 'sawtooth', 0.08, 0.3, 0.01, 280);
    this.playNoise(0.06, 0.25, 4500, true);
  }

  sfxNeonDash() {
    this.playNoise(0.2, 0.3, 3500);
  }

  // Pickups & Items (Short mechanical blips)
  sfxCoin() {
    // Short retro subscriber click
    this.playTone(1100, 'square', 0.04, 0.22, 0.01, 1400);
  }

  sfxEnergyGem() {
    this.playTone(850, 'triangle', 0.05, 0.25, 0.01, 1200);
  }

  sfxHealth() {
    this.playTone(520, 'sine', 0.08, 0.3, 0.01, 880);
  }

  sfxPlayerHurt() {
    this.playNoise(0.12, 0.4, 800);
    this.playTone(180, 'sawtooth', 0.14, 0.35, 0.01, 60);
  }

  sfxEnemyHurt() {
    this.playTone(340, 'square', 0.06, 0.2, 0.01, 100);
  }

  sfxExplosion() {
    this.playNoise(0.3, 0.5, 700);
    this.playTone(100, 'square', 0.2, 0.35, 0.01, 30);
  }

  sfxBossHit() {
    this.playTone(150, 'sawtooth', 0.15, 0.4, 0.01, 40);
  }

  sfxBossRoar() {
    this.playNoise(0.6, 0.5, 600);
    this.playTone(80, 'sawtooth', 0.6, 0.5, 0.01, 30);
  }

  // Non-melodic mechanical UI clicks
  sfxMenuSelect() {
    this.playTone(600, 'square', 0.03, 0.2, 0.01, 750);
  }

  sfxMenuConfirm() {
    this.playTone(500, 'square', 0.04, 0.25, 0.01, 900);
  }

  sfxPortalLocked() {
    // Mechanical error double buzz
    this.playTone(180, 'sawtooth', 0.12, 0.35, 0.01, 120);
  }

  sfxPortalOpen() {
    // Metallic whoosh / latch release
    this.playNoise(0.25, 0.4, 1500, true);
    this.playTone(400, 'triangle', 0.2, 0.3, 0.01, 900);
  }

  sfxGameOver() {
    // Glitch crunch noise
    this.playNoise(0.4, 0.4, 500);
    this.playTone(120, 'sawtooth', 0.3, 0.35, 0.01, 40);
  }

  sfxVictory() {
    // Metallic power surge whoosh
    this.playNoise(0.3, 0.4, 2000, true);
    this.playTone(600, 'square', 0.2, 0.3, 0.01, 1200);
  }

  sfxLevelClear() {
    this.playNoise(0.2, 0.35, 2200, true);
    this.playTone(700, 'triangle', 0.15, 0.3, 0.01, 1100);
  }
}

window.audio = new SoundEngine();
