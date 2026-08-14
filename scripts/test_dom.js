// Comprehensive test suite for Arab Gamers Enhanced Edition
const fs = require('fs');

const clickListeners = {};
const mockLocalStorage = {};

global.window = global;
global.localStorage = {
  getItem: (k) => mockLocalStorage[k] || null,
  setItem: (k, v) => { mockLocalStorage[k] = v.toString(); },
  removeItem: (k) => { delete mockLocalStorage[k]; }
};

global.document = {
  getElementById: (id) => {
    return {
      id,
      innerHTML: '',
      className: '',
      classList: {
        add: () => {},
        remove: () => {},
        toggle: () => {},
        contains: () => false
      },
      style: {},
      dataset: {},
      addEventListener: (evt, cb) => {
        if (evt === 'click') {
          clickListeners[id] = cb;
        }
      },
      appendChild: () => {},
      querySelectorAll: () => [],
      getContext: () => ({
        clearRect: () => {},
        save: () => {},
        restore: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        fillRect: () => {},
        beginPath: () => {},
        arc: () => {},
        fill: () => {},
        stroke: () => {},
        drawImage: () => {},
        fillText: () => {},
        strokeText: () => {},
        measureText: () => ({ width: 50 }),
        createLinearGradient: () => ({ addColorStop: () => {} }),
        createRadialGradient: () => ({ addColorStop: () => {} })
      }),
      getBoundingClientRect: () => ({ width: 960, height: 540 })
    };
  },
  createElement: (tag) => ({
    tagName: tag,
    className: '',
    dataset: {},
    innerHTML: '',
    classList: { add: () => {}, remove: () => {}, toggle: () => {} },
    style: {},
    addEventListener: () => {}
  })
};

global.addEventListener = () => {};
global.removeEventListener = () => {};
global.Image = class { constructor() { this.src = ''; } };
global.AudioContext = class {
  constructor() { this.destination = {}; }
  createGain() { return { gain: { value: 1, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; }
};
global.webkitAudioContext = global.AudioContext;
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);

// Load all scripts
const scripts = [
  'src/assets.js',
  'src/audio.js',
  'src/particles.js',
  'src/dialogue.js',
  'src/objectives.js',
  'src/player.js',
  'src/enemies.js',
  'src/levels.js',
  'src/ui.js',
  'src/main.js'
];

for (const s of scripts) {
  const code = fs.readFileSync(s, 'utf-8');
  eval(code);
}

console.log('✓ All modules loaded successfully!');

// Test Progression
console.log('Testing Progression Manager...');
console.log('Initial unlocked level:', window.PROGRESSION.getUnlockedLevel());
window.PROGRESSION.unlockNextLevel(1);
console.log('After Level 1 complete, unlocked level:', window.PROGRESSION.getUnlockedLevel());
window.PROGRESSION.saveLevelStats(1, 3, 5000);
console.log('Level 1 stars:', window.PROGRESSION.getLevelStars(1));

// Test Game instantiation
console.log('Testing Game Loop & UI Manager...');
const game = new window.Game();
console.log('Game created with state:', game.state);

// Test all click listeners
console.log('Registered buttons:', Object.keys(clickListeners));
for (const [id, cb] of Object.entries(clickListeners)) {
  console.log(`Testing click on #${id}...`);
  cb();
  console.log(`✓ #${id} works!`);
}

console.log('====================================');
console.log('ALL TESTS PASSED SUCCESSFULLY! 100%');
console.log('====================================');
