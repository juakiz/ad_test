import BattleMain from './battle/battle-main';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    this.battleMain = new BattleMain(this);
    this.scale.on('resize', this.canvasResize, this);
  }

  canvasResize(gameSize, baseSize, displaySize, resolution) {
    var width = gameSize.width;
    var height = gameSize.height;

    this.cameras.resize(width, height);

    this.battleMain.resize();
  }

  update(time, delta) {
    this.battleMain.update(time, delta);
  }
}
