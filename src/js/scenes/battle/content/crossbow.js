let _main = null;
import Arrow from './arrow';
export default class Crossbow extends Phaser.GameObjects.Image {
  constructor(parent, x, y) {
    super(parent.scene, x, y, 'atlas', 'crossbow.png');
    parent.scene.add.existing(this);
    parent.add(this);

    this._main = _main = parent._main;

    this.setScale(1.2, 1.2);

    this.init();
  }

  init() {
    this.scene.tweens.add({
      targets: this,
      angle: -360,
      // ease: 'Quad.easeIn',
      duration: 3200,
      repeat: -1,
    });
  }

  shoot() {
    if (!_main.disableShooting) {
      const arrowheadX = this.x + ((this.displayWidth / 2) * Math.cos(this.rotation));
      const arrowheadY = this.y + ((this.displayWidth / 2) * Math.sin(this.rotation));
  
      const arrow = new Arrow(_main.objectContainer, arrowheadX, arrowheadY, this.angle);
      _main.flyingArrows.push(arrow);
      _main.tailingArrows.push(arrow);
    }
  }

  update() {
  }
}
