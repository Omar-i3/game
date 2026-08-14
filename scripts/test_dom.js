// Comprehensive test for all UI button click handlers
const fs = require('fs');

const clickListeners = {};

global.window = global;
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
      querySelectorAll: () => []
    };
  },
  createElement: (tag) => {
    return {
      tagName: tag,
      className: '',
      dataset: {},
      innerHTML: '',
      classList: { add: () => {}, remove: () => {}, toggle: () => {} },
      style: {},
      addEventListener: () => {}
    };
  }
};

global.Image = class { constructor() { this.src = ''; } };
global.AudioContext = class {
  constructor() { this.destination = {}; }
  createGain() { return { gain: { value: 1, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; }
};
global.webkitAudioContext = global.AudioContext;

const scripts = [
  'src/assets.js',
  'src/audio.js',
  'src/particles.js',
  'src/dialogue.js',
  'src/objectives.js',
  'src/player.js',
  'src/enemies.js',
  'src/levels.js',
  'src/ui.js'
];

for (const s of scripts) {
  const code = fs.readFileSync(s, 'utf-8');
  eval(code);
}

// Mock game instance
window.game = {
  startStage: (idx, hero, weapon) => console.log(`game.startStage called with stage=${idx}, hero=${hero}, weapon=${weapon}`),
  restartStage: () => console.log('game.restartStage called'),
  togglePause: () => console.log('game.togglePause called')
};

const ui = new window.UIManager();
console.log('Registered click listeners:', Object.keys(clickListeners));

for (const [id, cb] of Object.entries(clickListeners)) {
  console.log(`Testing click on #${id}...`);
  cb();
  console.log(`✓ #${id} works!`);
}

console.log('ALL UI BUTTONS TESTED SUCCESSFULLY!');
