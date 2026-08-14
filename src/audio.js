// ============================================================================
// Arab Gamers: The 20-Stage Pixel Campaign - Web Audio API Sound Engine
// ============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.bgmGain = null;
    this.isMuted = false;
    this.isBgmActive = true;
    this.currentTrack = null;
    this.bgmInterval = null;
    this.stepIndex = 0;
    this.tempo = 130;
    this.initContext();
  }

  initContext() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx && !this.ctx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.sfxGain = this.ctx.createGain();
        this.bgmGain = this.ctx.createGain();

        this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.bgmGain.gain.setValueAtTime(0.22, this.ctx.currentTime);

        this.sfxGain.connect(this.masterGain);
        this.bgmGain.connect(this.masterGain);
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

  toggleBgm() {
    this.isBgmActive = !this.isBgmActive;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.isBgmActive ? 0.22 : 0, this.ctx.currentTime);
    }
    return this.isBgmActive;
  }

  playTone(freq, type = 'square', duration = 0.1, startVol = 0.3, endVol = 0.01, freqEnd = null) {
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

  playNoise(duration = 0.1, startVol = 0.3, filterFreq = 1000, isBandpass = false) {
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
  // SFX Library
  // --------------------------------------------------------------------------
  playDialogueBleep() {
    this.playTone(600 + Math.random() * 200, 'square', 0.03, 0.08, 0.01);
  }

  sfxJump() {
    this.playTone(190, 'square', 0.16, 0.35, 0.01, 560);
  }

  sfxDoubleJump() {
    this.playTone(340, 'triangle', 0.12, 0.3, 0.01, 720);
  }

  sfxTripleJump() {
    this.playTone(500, 'square', 0.14, 0.35, 0.01, 950);
  }

  sfxDash() {
    this.playTone(280, 'sawtooth', 0.14, 0.3, 0.01, 80);
    this.playNoise(0.12, 0.25, 3000);
  }

  // Banderita Weapons
  sfxTameesSlash() {
    this.playTone(320, 'sawtooth', 0.14, 0.4, 0.01, 90);
    this.playNoise(0.12, 0.35, 1800);
  }

  sfxHotPotato() {
    this.playTone(520, 'square', 0.1, 0.3, 0.01, 180);
  }

  sfxPotatoRage() {
    this.playTone(90, 'sawtooth', 0.6, 0.5, 0.01, 40);
    this.playNoise(0.7, 0.6, 800);
  }

  // MLZLZ Weapons
  sfxTeaSpray() {
    this.playNoise(0.22, 0.35, 2600, true);
    this.playTone(680, 'sine', 0.15, 0.25, 0.01, 420);
  }

  sfxHorrorGhost() {
    this.playTone(880, 'sine', 0.4, 0.3, 0.01, 440);
    this.playTone(550, 'triangle', 0.5, 0.35, 0.01, 1100);
  }

  // oCMz Weapons
  sfxHatBoomerang() {
    this.playTone(420, 'triangle', 0.15, 0.3, 0.01, 780);
    this.playNoise(0.1, 0.2, 3500);
  }

  sfxBlockDrop() {
    this.playTone(350, 'square', 0.15, 0.3, 0.01, 90);
    this.playNoise(0.2, 0.4, 800);
  }

  // 3Gaming Weapons
  sfxBaldBeam() {
    this.playTone(820, 'sine', 0.25, 0.4, 0.01, 1200);
    this.playTone(1200, 'square', 0.2, 0.2, 0.01, 600);
  }

  sfxTurretDeploy() {
    this.playTone(260, 'square', 0.1, 0.3, 0.01, 520);
  }

  // oPiiLz Weapons
  sfxScrewdriverZap() {
    this.playTone(920, 'sawtooth', 0.12, 0.35, 0.01, 300);
    this.playNoise(0.08, 0.3, 4500, true);
  }

  sfxNeonDash() {
    this.playTone(300, 'sawtooth', 0.35, 0.4, 0.01, 1200);
    this.playNoise(0.25, 0.2, 4000);
  }

  // Pickups & Events
  sfxCoin() {
    this.playTone(987.77, 'square', 0.08, 0.25, 0.01, 1318.51);
  }

  sfxEnergyGem() {
    this.playTone(659.25, 'triangle', 0.08, 0.25, 0.01, 987.77);
  }

  sfxHealth() {
    this.playTone(440, 'sine', 0.1, 0.3, 0.01, 660);
    setTimeout(() => this.playTone(880, 'sine', 0.18, 0.35, 0.01, 1320), 100);
  }

  sfxPlayerHurt() {
    this.playTone(220, 'sawtooth', 0.18, 0.4, 0.01, 80);
    this.playNoise(0.12, 0.3, 900);
  }

  sfxEnemyHurt() {
    this.playTone(380, 'square', 0.08, 0.25, 0.01, 120);
  }

  sfxExplosion() {
    this.playNoise(0.35, 0.5, 600);
    this.playTone(120, 'square', 0.25, 0.4, 0.01, 30);
  }

  sfxBossHit() {
    this.playTone(160, 'sawtooth', 0.2, 0.5, 0.01, 50);
  }

  sfxBossRoar() {
    this.playTone(70, 'sawtooth', 0.8, 0.6, 0.01, 30);
    this.playNoise(0.7, 0.5, 500);
  }

  sfxLevelClear() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'square', 0.18, 0.35, 0.01), i * 80);
    });
  }

  sfxGameOver() {
    const notes = [440, 415.3, 392, 349.23, 329.63, 261.63];
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sawtooth', 0.28, 0.4, 0.01, freq * 0.85), i * 140);
    });
  }

  sfxVictory() {
    const notes = [
      { f: 523.25, d: 0.12 }, { f: 523.25, d: 0.12 }, { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.3 }, { f: 415.30, d: 0.3 }, { f: 466.16, d: 0.3 },
      { f: 523.25, d: 0.2 }, { f: 466.16, d: 0.1 }, { f: 523.25, d: 0.6 }
    ];
    let time = 0;
    notes.forEach(n => {
      setTimeout(() => {
        this.playTone(n.f, 'triangle', n.d, 0.4, 0.01);
        this.playTone(n.f * 1.5, 'square', n.d * 0.8, 0.2, 0.01);
      }, time * 1000);
      time += n.d + 0.04;
    });
  }

  // --------------------------------------------------------------------------
  // Dynamic BGM Chiptune Tracks
  // --------------------------------------------------------------------------
  playBgmTrack(trackName) {
    if (this.currentTrack === trackName) return;
    this.stopBgm();
    this.currentTrack = trackName;
    this.stepIndex = 0;

    let bassPattern = [];
    let leadPattern = [];
    this.tempo = 130;

    if (trackName === 'city') {
      this.tempo = 140;
      bassPattern = [130.8, 130.8, 0, 130.8, 164.8, 0, 146.8, 0, 130.8, 0, 174.6, 0, 164.8, 146.8, 130.8, 0];
      leadPattern = [523.2, 0, 659.2, 783.9, 0, 1046.5, 783.9, 659.2, 523.2, 587.3, 659.2, 0, 783.9, 0, 659.2, 587.3];
    } else if (trackName === 'horror') {
      this.tempo = 115;
      bassPattern = [110.0, 0, 110.0, 116.5, 0, 110.0, 0, 103.8, 110.0, 0, 130.8, 0, 123.4, 0, 116.5, 0];
      leadPattern = [440.0, 466.1, 440.0, 0, 554.3, 0, 440.0, 0, 587.3, 0, 554.3, 0, 466.1, 440.0, 370.0, 0];
    } else if (trackName === 'cloud') {
      this.tempo = 135;
      bassPattern = [174.6, 0, 174.6, 196.0, 0, 220.0, 0, 261.6, 174.6, 0, 196.0, 0, 220.0, 0, 261.6, 0];
      leadPattern = [698.4, 783.9, 880.0, 0, 1046.5, 880.0, 783.9, 698.4, 880.0, 0, 1046.5, 1174.6, 1318.5, 0, 1046.5, 880.0];
    } else if (trackName === 'mines') {
      this.tempo = 120;
      bassPattern = [98.0, 98.0, 0, 123.4, 110.0, 0, 98.0, 0, 87.3, 0, 110.0, 0, 98.0, 0, 130.8, 0];
      leadPattern = [392.0, 0, 493.8, 0, 440.0, 392.0, 349.2, 0, 392.0, 440.0, 493.8, 0, 523.2, 493.8, 440.0, 392.0];
    } else if (trackName === 'cyber') {
      this.tempo = 145;
      bassPattern = [146.8, 146.8, 0, 146.8, 174.6, 0, 164.8, 0, 130.8, 0, 146.8, 0, 174.6, 196.0, 220.0, 0];
      leadPattern = [587.3, 0, 698.4, 0, 880.0, 783.9, 698.4, 587.3, 698.4, 880.0, 1046.5, 0, 880.0, 783.9, 698.4, 587.3];
    } else if (trackName === 'boss') {
      this.tempo = 155;
      bassPattern = [82.4, 82.4, 110.0, 82.4, 98.0, 82.4, 123.4, 82.4, 82.4, 82.4, 130.8, 82.4, 123.4, 110.0, 98.0, 82.4];
      leadPattern = [329.6, 329.6, 440.0, 0, 392.0, 329.6, 493.8, 0, 523.2, 493.8, 440.0, 392.0, 523.2, 587.3, 659.2, 0];
    } else {
      // Menu
      this.tempo = 125;
      bassPattern = [220, 0, 220, 0, 261.6, 0, 220, 0, 196, 0, 196, 0, 246.9, 0, 196, 0];
      leadPattern = [440, 440, 523.2, 659.2, 0, 659.2, 587.3, 523.2, 493.8, 0, 493.8, 523.2, 587.3, 659.2, 493.8, 0];
    }

    const intervalMs = 60000 / (this.tempo * 4);

    this.bgmInterval = setInterval(() => {
      if (this.isMuted || !this.isBgmActive || !this.ctx) {
        this.stepIndex++;
        return;
      }

      const totalSteps = bassPattern.length;
      const step = this.stepIndex % totalSteps;
      const bFreq = bassPattern[step];
      const lFreq = leadPattern[step];

      if (bFreq > 0) this.playToneCustom(bFreq, 'sawtooth', 0.1, 0.15, this.bgmGain);
      if (lFreq > 0) this.playToneCustom(lFreq, 'square', 0.12, 0.12, this.bgmGain);

      if (step % 4 === 0) this.playToneCustom(90, 'triangle', 0.08, 0.22, this.bgmGain, 30);
      else if (step % 4 === 2) this.playNoiseCustom(0.06, 0.16, 1800, this.bgmGain);
      else if (step % 2 === 1) this.playNoiseCustom(0.02, 0.08, 5000, this.bgmGain, true);

      this.stepIndex++;
    }, intervalMs);
  }

  playToneCustom(freq, type, duration, vol, destinationGain, freqEnd = null) {
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      if (freqEnd !== null) osc.frequency.exponentialRampToValueAtTime(Math.max(10, freqEnd), t + duration);
      gain.gain.setValueAtTime(vol, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);
      osc.connect(gain);
      gain.connect(destinationGain);
      osc.start(t);
      osc.stop(t + duration);
    } catch (e) {}
  }

  playNoiseCustom(duration, vol, filterFreq, destinationGain, isBandpass = false) {
    try {
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) output[i] = Math.random() * 2 - 1;
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = isBandpass ? 'bandpass' : 'lowpass';
      filter.frequency.setValueAtTime(filterFreq, this.ctx.currentTime);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(destinationGain);
      whiteNoise.start();
      whiteNoise.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  stopBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    this.currentTrack = null;
  }
}

window.audio = new SoundEngine();
