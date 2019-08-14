import Balloon from './balloon';

let _main = null;

// -1: no ballon
// 0: red
// 1: blue
// 2: yellow
const LEVELS = [
  // [0]
  [0, -1, -1, -1, 0, -1, 0, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 1, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 0, 2],
];

const ASSET_NAMES = [
  'balloon0.png',
  'balloon1.png',
  'balloon2.png',
];

export default class Level {
  constructor(parent, level) {
    _main = parent;
  }

  placeBalloons(level) {
    const data_balloons = this.data_balloons = LEVELS[level - 1];

    if (data_balloons) {

      this.completed = false;

      const ANGLE_GAP = (2 * Math.PI) / data_balloons.length;
      let angleGapSum = Math.random() * ANGLE_GAP;

      data_balloons.forEach((value, index, array) => {
        let balloon = null;
        let x = null;
        let y = null;
        let radius = null;
        let periodFactor = null;

        if (value !== -1) {
          x = 250 * Math.cos(angleGapSum) + _main.crossbow.x;
          y = 250 * Math.sin(angleGapSum) + _main.crossbow.y;

          if (value === 1) {
            x = 300 * Math.cos(angleGapSum) + _main.crossbow.x;
            y = 300 * Math.sin(angleGapSum) + _main.crossbow.y;

            radius = 60;
            periodFactor = 0.001 + Math.random() * 0.001;

          } else if (value === 2) {
            x = _main.crossbow.x;
            y = _main.crossbow.y;

            radius = 250;

            periodFactor = 0.001;
          }

          balloon = new Balloon(_main.objectContainer, x, y, value, ASSET_NAMES[value], radius, periodFactor);
          _main.balloons.push(balloon);
        }

        angleGapSum += ANGLE_GAP;

        // console.log(ASSET_NAMES[value]);
      });
      console.log(`Level ${level} set.`);
    } else {
      console.log('All levels Done.');
      _main.ee.emit('allLevelsDone');
    }
  }

  update(time, delta) {
    _main.balloons.forEach((value, index, array) => {
      if (value.radius) {
        value.rotate(time);
      }
    });
  }
}
