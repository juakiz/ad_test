export default class Balloon extends Phaser.GameObjects.Image {
  constructor(parent, x, y, type, key, radius, periodFactor) {
    super(parent.scene, x, y, 'atlas', key);
    parent.scene.add.existing(this);
    parent.add(this);

    this.original_pos = { x, y };
    this.type = type;
    this.radius = radius;
    this.periodFactor = periodFactor;

    this.setScale(1.2, 1.2);
  }

  rotate(time) {
    var period = time * this.periodFactor;
    this.x = this.original_pos.x + Math.cos(period) * this.radius;
    this.y = this.original_pos.y + Math.sin(period) * this.radius;
  }

  explode() {
    this.setTexture('atlas', 'explosion.png');
    this.scene.tweens.add({
      targets: this,
      scaleX: 2,
      scaleY: 2,
      alpha: 0,
      ease: 'Quart',
      duration: 200,
      onComplete: () => { this.destroy(); },
      onCompleteScope: this,
    });
  }
}