let _main = null;

export default class Background extends Phaser.GameObjects.Container {
  constructor(parent) {
    super(parent.scene);

    parent.add(this);
    _main = parent._main;

    this.init();
  }

  init() {
    this.alpha = 0;

    let bg = this.bg = this.scene.add.graphics();
    this.add(bg);

    this.woody_bg = this.scene.add.image(0, 0, 'wood_background');
    this.woody_bg.setScale(0.5);
    this.add(this.woody_bg);

    this.balloon = this.scene.add.image(0, 0, 'atlas', 'balloon0.png');
    this.add(this.balloon);

    this.logoWords = this.scene.add.image(0, 0, 'atlas', 'logo.png');
    this.add(this.logoWords);
    this.logoWords.setScale(1.5);

    this.ctaBtn = this.scene.make.text({
      x: 0,
      y: 0,
      text: 'P L A Y  N O W',
      style: {
        fontSize: '76px',
        fontFamily: '"Oswald"',
        color: '#FFFFFF',
        align: 'center',
      },
      add: true
    });
    this.add(this.ctaBtn);
    this.ctaBtn.setOrigin(0.5);

    this.hand = this.scene.add.image(0, 0, 'atlas', 'hand.png');
    this.add(this.hand);
    this.hand.setOrigin(0.5, 0);

    this.woody_bg.alpha = 0;
    this.balloon.setScale(0);
    this.logoWords.setScale(0);
    this.ctaBtn.setScale(0);

    this.resize();
  }

  resize() {
    const { bg } = this;
    bg.clear();
    bg.fillStyle(0x000000, 1);
    bg.fillRect(_main.LEFT, _main.TOP, _main.TOTAL_WIDTH, _main.TOTAL_HEIGHT);

    this.woody_bg.setPosition(_main.CENTER_X, _main.TOP + _main.TOTAL_HEIGHT * 0.3);
    this.balloon.setPosition(_main.CENTER_X, _main.TOP + _main.TOTAL_HEIGHT * 0.3);
    this.logoWords.setPosition(_main.CENTER_X, _main.TOP + _main.TOTAL_HEIGHT * 0.55);
    this.ctaBtn.setPosition(_main.CENTER_X, _main.TOP + _main.TOTAL_HEIGHT * 0.8);
    this.hand.setPosition(_main.CENTER_X, _main.BOT);
  }

  start() {
    const timeline = this.scene.tweens.createTimeline();

    timeline.add({
      targets: this,
      alpha: 1,
      duration: 200,
    });

    timeline.add({
      targets: this.woody_bg,
      alpha: 1,
      duration: 100,
    });

    timeline.add({
      targets: this.balloon,
      scaleX: 1,
      scaleY: 1,
      duration: 600,
      ease: 'Quart',
    });

    timeline.add({
      targets: this.logoWords,
      scaleX: 1.3,
      scaleY: 1.3,
      duration: 300,
      ease: 'Quad',
    });

    timeline.add({
      targets: this.ctaBtn,
      scaleX: 1,
      scaleY: 1,
      duration: 600,
      ease: 'Back',
    });

    timeline.add({
      targets: this.hand,
      y: this.ctaBtn.y,
      duration: 900,
      ease: 'Sine',
    });

    timeline.add({
      targets: this.hand,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: 600,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: 2,
    });

    timeline.add({
      targets: this.hand,
      alpha: 0,
      duration: 600,
    });

    timeline.play();
  }

  update() {

  }
}
