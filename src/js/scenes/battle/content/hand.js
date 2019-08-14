let _main = null;
export default class Hand extends Phaser.GameObjects.Image {
  constructor(parent) {
    super(parent.scene, 0, 0, 'atlas', 'hand.png');
    parent.scene.add.existing(this);
    parent.add(this);

    _main = parent._main;

    this.alpha = 0;

    this.resize();
    this.nag();

    this.showTimer = this.scene.time.delayedCall(200, this.show, [], this);
    this.program();
  }

  nag() {
    this.nagTwn = this.scene.tweens.add({
      targets: this,
      scaleX: 1.2,
      scaleY: 1.2,
      ease: 'Sine.easeInOut',
      duration: 900,
      repeat: -1,
      yoyo: true,
    });
  }

  hide() {
    _main.ee.emit('hideNag');
    this.hideTwn = this.scene.tweens.add({
      targets: this,
      alpha: 0,
      ease: 'Sine.easeInOut',
      duration: 100,
    });
  }

  show() {
    _main.ee.emit('showNag');
    this.showTwn = this.scene.tweens.add({
      targets: this,
      alpha: 1,
      ease: 'Sine.easeInOut',
      duration: 1200,
    });

    this.scene.input.once('pointerdown', () => {
      this.showTwn.stop();
      this.hide();
    }, this);
  }

  program() {
    this.scene.input.on('pointerdown', () => {
      this.showTimer.remove();
      this.showTimer = this.scene.time.delayedCall(5000, this.show, [], this);
    }, this);
  }

  resize() {
    this.x = _main.RIGHT - _main.TOTAL_WIDTH * 0.3;
    this.y = _main.BOT - _main.TOTAL_HEIGHT * 0.3;
  }
}
