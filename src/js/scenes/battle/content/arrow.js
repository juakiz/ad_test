const SPEED = 22;
export default class Arrow extends Phaser.GameObjects.Sprite {
  constructor(parent, x, y, angle) {
    super(parent.scene, x, y, 'atlas', 'arrow1.png');
    parent.scene.add.existing(this);
    parent.add(this);

    this.angle = this.init_angle = angle;
    this.setOrigin(1, 0.5);

    this.suceeded = false;

    this.tailLine = this.scene.add.graphics();
    parent._main.tails.add(this.tailLine);
    this.tailPoints = [];

    this.calculateDeltaPos();
  }

  calculateDeltaPos() {
    this.dX = SPEED * Math.cos(this.rotation);
    this.dY = SPEED * Math.sin(this.rotation);
  }

  move() {
    this.x += this.dX;
    this.y += this.dY;
  }

  checkWallCollision(x, y, width, height) {
    const containsX = this.x > x && this.x < x + width;
    const containsY = this.y > y && this.y < y + height;
    return !(containsX && containsY);
  }

  tail() {
    const { tailLine } = this;
    this.tailPoints.push(new Phaser.Math.Vector2(this.x, this.y));

    while (this.tailPoints.length > 20) {
      this.tailPoints.shift();
    }

    tailLine.clear();

    if (this.tailPoints.length > 1) {
      tailLine.moveTo(this.tailPoints[0].x, this.tailPoints[0].y);

      this.tailPoints.forEach((point, index) => {
        if (!index) return;
        tailLine.lineStyle((index / this.tailPoints.length) * 10, 0xFFFFFF, 0.08/* (index - 1) / this.tailPoints.length */);
        tailLine.lineTo(point.x, point.y);
        tailLine.strokePath();
      });
    }
  }

  hitWall() {
    const timeline = this.scene.tweens.createTimeline();

    timeline.add({
      targets: this,
      angle: '-=8',
      duration: 35,
    });

    timeline.add({
      targets: this,
      angle: '+=16',
      duration: 70,
      repeat: 1,
      yoyo: true,
    });

    timeline.add({
      targets: this,
      angle: this.init_angle,
      duration: 35,
    });

    timeline.play();

    this.scene.tweens.add({
      delay: 5000,
      targets: this,
      alpha: 0,
      // ease: 'Quad.easeIn',
      duration: 900,
      onComplete: () => {
        this.tailLine.destroy();
        this.destroy();
      },
      onCompleteScope: this,
    });
  }
}
