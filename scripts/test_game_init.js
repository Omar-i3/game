const fs = require('fs');
global.window = global;
global.addEventListener = (evt, cb) => {};
global.removeEventListener = () => {};
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
      addEventListener: (evt, cb) => {},
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
      })
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

global.Image = class { constructor() { this.src = ''; } };
global.AudioContext = class {
  constructor() { this.destination = {}; }
  createGain() { return { gain: { value: 1, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, connect: () => {} }; }
};
global.webkitAudioContext = global.AudioContext;
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);

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

try {
  for (const s of scripts) {
    console.log('Loading', s);
    const code = fs.readFileSync(s, 'utf-8');
    eval(code);
  }
  console.log('Constructing Game...');
  const g = new window.Game();
  console.log('Game instantiated successfully! State:', g.state);
} catch (err) {
  console.error('Error during Game instantiation:', err);
}
