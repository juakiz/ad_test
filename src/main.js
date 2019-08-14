import Phaser from 'phaser';

import Preloader from './js/scenes/preloader-scene';
import Battle from './js/scenes/battle-scene';
// import CTA from './js/scenes/cta-scene';

const gameHeight = 640;

const ratio = window.innerWidth / gameHeight;
console.log(window.innerWidth, window.innerHeight);

const config = {
  type: Phaser.AUTO,
  // parent: 'phaser-example',
  // width: window.innerWidth,
  // height: window.innerHeight,
  autoresize: true,
  scale: {
    mode: Phaser.Scale.RESIZE,
    // parent: 'phaser-example',
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    // width: gameHeight,//window.innerWidth / ratio,//"100%",
    // height: 640,//"100%"
  },
  // pixelArt: true,
  scene: [
    Preloader,
    Battle,
    // CTA,
  ]
};

const game = new Phaser.Game(config);
