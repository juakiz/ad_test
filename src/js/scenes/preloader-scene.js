
import wood_background from '../../assets/backgrounds/wood_background.jpg';

import atlasImg from '../../assets/assets.png';
import atlasData from '../../assets/assets.json';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('PreloaderScene');
  }

  preload() {
    // this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => { console.log(gameSize, baseSize, displaySize, resolution); });

    var progress = this.progress = this.add.graphics();
    const { width, height } = this.scale;

    this.load.on('progress', (value) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, (height / 2) - (height * 0.05), width * value, (height * 0.1));
    });

    // const scene = this;

    // this.load.on('complete', () => {

    //   const txt = scene.make.text({
    //     x: width / 2,
    //     y: height / 3,
    //     text: 'PUSH TO PLAY',
    //     style: {
    //       fontSize: '32px',
    //       fontFamily: '"Oswald"',
    //       color: '#FFFFFF',
    //       align: 'center',
    //     },
    //     add: true
    //   });
  
    //   txt.setShadow(4, 4, '#808080');
    //   txt.setOrigin(0.5);
  
    //   // this.add(txt);

    //   this.input.once('pointerdown', () => {
    //     progress.destroy();
    //     scene.scale.startFullscreen();
    //     this.scene.start('BattleScene');

    //   //   var music = this.sound.add('etnial-music',
    //   //     {
    //   //       mute: false,
    //   //       volume: 1,
    //   //       rate: 1,
    //   //       detune: 0,
    //   //       seek: 0,
    //   //       loop: true,
    //   //       delay: 0
    //   //     });

    //   //   music.play();
    //   });
    // });

    // this.load.audio('etnial-music', etnial);

    this.load.atlas('atlas', atlasImg, atlasData);

    this.load.image('wood_background', wood_background);
  }

  create() {
    this.progress.destroy();
    this.scene.start('BattleScene');
  }
}
