// ============================================================================
// Arab Gamers: Pixel Legends - Web Audio API 8-Bit / 16-Bit Sound Engine
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
        this.bgmGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

        this.sfxGain.connect(this.masterGain);
        this.bgmGain.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch (e) {
      console.warn("AudioContext init error:", e);
    }
  }

  ensureContext() {
    if (!this.ctx) {
      this.initContext();
    }
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
      this.bgmGain.gain.setValueAtTime(this.isBgmActive ? 0.25 : 0, this.ctx.currentTime);
    }
    return this.isBgmActive;
  }

  // --------------------------------------------------------------------------
  // Core Oscillator Generator Helpers
  // --------------------------------------------------------------------------
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
      const bufferSize = this.ctx.sampleRate * duration;
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
  // Retro Sound Effects (SFX)
  // --------------------------------------------------------------------------
  sfxJump() {
    this.playTone(180, 'square', 0.18, 0.35, 0.01, 520);
  }

  sfxDoubleJump() {
    this.playTone(320, 'triangle', 0.12, 0.3, 0.01, 680);
    setTimeout(() => this.playTone(450, 'square', 0.15, 0.3, 0.01, 900), 40);
  }

  sfxAttackSlash() {
    this.playTone(480, 'sawtooth', 0.1, 0.3, 0.01, 140);
    this.playNoise(0.08, 0.25, 2500);
  }

  sfxPunch() {
    this.playTone(220, 'triangle', 0.12, 0.4, 0.01, 60);
    this.playNoise(0.12, 0.35, 1200);
  }

  sfxLaser() {
    this.playTone(980, 'sawtooth', 0.14, 0.25, 0.01, 200);
  }

  sfxExplosion() {
    this.playNoise(0.35, 0.5, 600);
    this.playTone(120, 'square', 0.25, 0.4, 0.01, 30);
  }

  // Banderita Ultimate: Potato Rage
  sfxPotatoRage() {
    this.playTone(90, 'sawtooth', 0.6, 0.5, 0.01, 40);
    this.playNoise(0.7, 0.6, 800);
    setTimeout(() => {
      this.playTone(300, 'square', 0.3, 0.4, 0.01, 900);
      this.playNoise(0.4, 0.5, 2000);
    }, 150);
  }

  // MLZLZ Ultimate: Horror Flash & Ghosts
  sfxHorrorGhost() {
    this.playTone(880, 'sine', 0.4, 0.3, 0.01, 440);
    this.playTone(550, 'triangle', 0.5, 0.35, 0.01, 1100);
    this.playNoise(0.3, 0.2, 3500, true);
  }

  // oCMz Ultimate: Block Barrage
  sfxBlockDrop() {
    this.playTone(350, 'square', 0.15, 0.3, 0.01, 90);
    this.playNoise(0.2, 0.4, 800);
  }

  // 3Gaming Ultimate: Turret Deploy & Shoot
  sfxTurretDeploy() {
    this.playTone(260, 'square', 0.1, 0.3, 0.01, 520);
    setTimeout(() => this.playTone(520, 'square', 0.15, 0.3, 0.01, 780), 80);
    setTimeout(() => this.playTone(780, 'triangle', 0.2, 0.35, 0.01, 1040), 160);
  }

  // oPiiLz Ultimate: Neon Hoverboard Dash
  sfxNeonDash() {
    this.playTone(300, 'sawtooth', 0.35, 0.4, 0.01, 1200);
    this.playTone(600, 'sine', 0.4, 0.3, 0.01, 1500);
    this.playNoise(0.25, 0.2, 4000);
  }

  // Pickups
  sfxCoin() {
    this.playTone(987.77, 'square', 0.08, 0.25, 0.01, 1318.51);
  }

  sfxEnergyGem() {
    this.playTone(659.25, 'triangle', 0.08, 0.25, 0.01, 987.77);
    setTimeout(() => this.playTone(1318.51, 'square', 0.12, 0.3, 0.01, 1567.98), 50);
  }

  sfxHealth() {
    this.playTone(440, 'sine', 0.1, 0.3, 0.01, 660);
    setTimeout(() => this.playTone(660, 'sine', 0.1, 0.3, 0.01, 880), 80);
    setTimeout(() => this.playTone(880, 'sine', 0.18, 0.35, 0.01, 1320), 160);
  }

  // Combat
  sfxPlayerHurt() {
    this.playTone(220, 'sawtooth', 0.18, 0.4, 0.01, 80);
    this.playNoise(0.12, 0.3, 900);
  }

  sfxEnemyHurt() {
    this.playTone(380, 'square', 0.08, 0.25, 0.01, 120);
  }

  sfxBossHit() {
    this.playTone(160, 'sawtooth', 0.2, 0.5, 0.01, 50);
    this.playNoise(0.25, 0.45, 700);
  }

  sfxBossRoar() {
    this.playTone(70, 'sawtooth', 0.8, 0.6, 0.01, 30);
    this.playNoise(0.7, 0.5, 500);
  }

  sfxMenuSelect() {
    this.playTone(440, 'square', 0.05, 0.2, 0.01, 660);
  }

  sfxMenuConfirm() {
    this.playTone(523.25, 'square', 0.08, 0.3, 0.01, 783.99);
    setTimeout(() => this.playTone(1046.50, 'square', 0.15, 0.35, 0.01, 1318.51), 70);
  }

  sfxLevelClear() {
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'square', 0.18, 0.35, 0.01);
      }, i * 90);
    });
  }

  sfxGameOver() {
    const notes = [440, 415.3, 392, 349.23, 329.63, 261.63];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 'sawtooth', 0.28, 0.4, 0.01, freq * 0.85);
      }, i * 150);
    });
  }

  sfxVictory() {
    const notes = [
      { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.12 },
      { f: 523.25, d: 0.3 },
      { f: 415.30, d: 0.3 },
      { f: 466.16, d: 0.3 },
      { f: 523.25, d: 0.2 },
      { f: 466.16, d: 0.1 },
      { f: 523.25, d: 0.6 }
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
  // Procedural 8-Bit Chiptune Background Music (BGM)
  // --------------------------------------------------------------------------
  playBgmTrack(trackName) {
    if (this.currentTrack === trackName) return;
    this.stopBgm();
    this.currentTrack = trackName;
    this.stepIndex = 0;

    let bassPattern = [];
    let leadPattern = [];
    let intervalMs = 150;

    if (trackName === 'menu') {
      // Upbeat Arab gaming arcade anthem
      this.tempo = 125;
      intervalMs = 60000 / (this.tempo * 4); // 16th notes
      bassPattern = [
        220, 0, 220, 0,  261.6, 0, 220, 0,
        196, 0, 196, 0,  246.9, 0, 196, 0,
        174.6, 0, 174.6, 0, 220, 0, 174.6, 0,
        196, 0, 220, 0,  246.9, 0, 293.6, 0
      ];
      leadPattern = [
        440, 440, 523.2, 659.2, 0, 659.2, 587.3, 523.2,
        493.8, 0, 493.8, 523.2, 587.3, 659.2, 493.8, 0,
        440, 0, 523.2, 0, 659.2, 0, 783.9, 659.2,
        587.3, 523.2, 493.8, 440, 493.8, 523.2, 587.3, 659.2
      ];
    } else if (trackName === 'city') {
      // Level 1: YouTube Neon City - High energy cyberpunk beat
      this.tempo = 140;
      intervalMs = 60000 / (this.tempo * 4);
      bassPattern = [
        130.8, 130.8, 0, 130.8,  164.8, 0, 146.8, 0,
        130.8, 0, 174.6, 0,      164.8, 146.8, 130.8, 0,
        110.0, 110.0, 0, 110.0,  146.8, 0, 130.8, 0,
        98.0, 0, 123.4, 0,       146.8, 0, 164.8, 0
      ];
      leadPattern = [
        523.2, 0, 659.2, 783.9,  0, 1046.5, 783.9, 659.2,
        523.2, 587.3, 659.2, 0,   783.9, 0, 659.2, 587.3,
        440.0, 0, 587.3, 659.2,  0, 880.0, 659.2, 587.3,
        392.0, 440.0, 493.8, 587.3, 659.2, 783.9, 880.0, 1046.5
      ];
    } else if (trackName === 'horror') {
      // Level 2: Horror & Blocks Realm - Mysterious, spooky minor-mode groove
      this.tempo = 115;
      intervalMs = 60000 / (this.tempo * 4);
      bassPattern = [
        110.0, 0, 110.0, 116.5, 0, 110.0, 0, 103.8,
        110.0, 0, 130.8, 0,     123.4, 0, 116.5, 0,
        98.0, 0, 98.0, 103.8,   0, 98.0, 0, 92.5,
        87.3, 0, 110.0, 0,      116.5, 0, 123.4, 0
      ];
      leadPattern = [
        440.0, 466.1, 440.0, 0,  554.3, 0, 440.0, 0,
        587.3, 0, 554.3, 0,      466.1, 440.0, 370.0, 0,
        392.0, 415.3, 392.0, 0,  493.8, 0, 392.0, 0,
        523.2, 0, 493.8, 0,      440.0, 392.0, 349.2, 440.0
      ];
    } else if (trackName === 'boss') {
      // Boss Fight: The Ban Boss - Fast paced, relentless boss theme
      this.tempo = 155;
      intervalMs = 60000 / (this.tempo * 4);
      bassPattern = [
        82.4, 82.4, 110.0, 82.4,  98.0, 82.4, 123.4, 82.4,
        82.4, 82.4, 130.8, 82.4,  123.4, 110.0, 98.0, 82.4,
        73.4, 73.4, 98.0, 73.4,   87.3, 73.4, 110.0, 73.4,
        65.4, 65.4, 87.3, 65.4,   98.0, 110.0, 123.4, 130.8
      ];
      leadPattern = [
        329.6, 329.6, 440.0, 0,   392.0, 329.6, 493.8, 0,
        523.2, 493.8, 440.0, 392.0, 523.2, 587.3, 659.2, 0,
        293.6, 293.6, 392.0, 0,   349.2, 293.6, 440.0, 0,
        523.2, 493.8, 440.0, 493.8, 523.2, 659.2, 783.9, 880.0
      ];
    }

    this.bgmInterval = setInterval(() => {
      if (this.isMuted || !this.isBgmActive || !this.ctx) {
        this.stepIndex++;
        return;
      }

      const totalSteps = bassPattern.length;
      const step = this.stepIndex % totalSteps;
      const bFreq = bassPattern[step];
      const lFreq = leadPattern[step];

      // Play bass note
      if (bFreq > 0) {
        this.playToneCustom(bFreq, 'sawtooth', 0.1, 0.15, this.bgmGain);
      }

      // Play lead note
      if (lFreq > 0) {
        this.playToneCustom(lFreq, 'square', 0.12, 0.12, this.bgmGain);
      }

      // 8-bit Hi-hat & Snare percussion on beats
      if (step % 4 === 0) {
        // Bass drum thump
        this.playToneCustom(90, 'triangle', 0.08, 0.22, this.bgmGain, 30);
      } else if (step % 4 === 2) {
        // Snare noise
        this.playNoiseCustom(0.06, 0.16, 1800, this.bgmGain);
      } else if (step % 2 === 1) {
        // Hi-hat tick
        this.playNoiseCustom(0.02, 0.08, 5000, this.bgmGain, true);
      }

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
      if (freqEnd !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, freqEnd), t + duration);
      }

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
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

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

// Export a single instance
window.audio = new SoundEngine();
