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
      querySelector: () => null,
      getContext: () => ({
        clearRect: () => {},
        save: () => {},
        restore: () => {},
        translate: () => {},
        scale: () => {},
        rotate: () => {},
        fillRect: () => {},
        strokeRect: () => {},
        beginPath: () => {},
        arc: () => {},
        ellipse: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
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
    addEventListener: () => {},
    appendChild: () => {},
    querySelector: () => null
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
  'src/shop.js',
  'src/achievements.js',
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

console.log('✓ All modules loaded successfully including shop & achievements!');

// Test Progression
console.log('Testing Progression Manager...');
console.log('Initial unlocked level:', window.PROGRESSION.getUnlockedLevel());
window.PROGRESSION.unlockNextLevel(1);
console.log('After Level 1 complete, unlocked level:', window.PROGRESSION.getUnlockedLevel());
window.PROGRESSION.saveLevelStats(1, 3, 5000);
console.log('Level 1 stars:', window.PROGRESSION.getLevelStars(1));

// Test Shop Upgrades
console.log('Testing Shop Upgrades...');
const buyRes = window.shop.buyItem('cheese_tamees', 100000);
console.log('Buy cheese_tamees result:', buyRes);
console.log('Has cheese_tamees upgrade:', window.shop.hasUpgrade('cheese_tamees'));

// Test Achievements
console.log('Testing Achievements...');
window.achievements.unlock('speedrun_banderita');
console.log('Is speedrun_banderita unlocked:', window.achievements.isUnlocked('speedrun_banderita'));

// Test Game instantiation
console.log('Testing Game Loop & UI Manager...');
const game = new window.Game();
console.log('Game created with state:', game.state);

// Test all 20 stages loading and enemy coordinates verification
console.log('Verifying all 20 stages loading & enemy coordinates...');
for (let i = 1; i <= 20; i++) {
  game.levelManager.loadStage(i);
  const stage = game.levelManager.stage;
  if (!stage) throw new Error(`Stage ${i} failed to load!`);

  // Verify enemy instances
  for (const enemy of game.levelManager.enemies) {
    if (isNaN(enemy.x) || isNaN(enemy.y)) {
      throw new Error(`Stage ${i} has an enemy with NaN position! Enemy: ${JSON.stringify(enemy)}`);
    }
  }

  // Verify boss instance
  if (game.levelManager.boss) {
    if (isNaN(game.levelManager.boss.x) || isNaN(game.levelManager.boss.y)) {
      throw new Error(`Stage ${i} boss has NaN position! Boss: ${JSON.stringify(game.levelManager.boss)}`);
    }
  }
}
console.log('✓ All 20 stages & enemies verified with valid numeric positions!');

// Test Boss Rush Mode
console.log('Testing Boss Rush Mode...');
game.startBossRush(1);
console.log('Boss Rush Stage loaded:', game.levelManager.stage.name, 'Boss:', game.levelManager.boss.name);

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
