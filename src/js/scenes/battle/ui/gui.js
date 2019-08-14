let _main = null;
export default class GUI extends Phaser.GameObjects.Container {
  constructor(parent) {
    super(parent.scene);

    parent.add(this);
    _main = parent._main;

    this.data_texts = [
      'Woaw',
      'Fantastic',
      'Amazing',
      'On Fire !',
      'Impressive !!'
    ];

    this.score = 0;
    this.hiScore = 23;
    this.level = 1;

    this.streak = 0;

    this.init();
  }

  init() {
    // Confetti
    this.particles = this.scene.add.particles('atlas');
    this.add(this.particles);

    this.particles.createEmitter({
      frame: [
        'confetti0.png',
        'confetti1.png',
        'confetti2.png',
        'confetti3.png',

      ],
      angle: { min: 0, max: 360 },
      speed: { min: 200, max: 600 },
      quantity: 50,
      lifespan: 2000,
      gravityY: 800,
      rotate: { start: 0, end: 600/* , ease: 'Back.easeOut' */ },
      on: false
    });

    // Border anchored GO
    this.scoreTxt = this.createText(0, 0, this.score, '62px', '#000000');
    this.hiScoreTxt = this.createText(0, 0, `Highscore: ${this.hiScore}`, '38px', '#000000');
    this.levelTxt = this.createText(0, 0, `Level: ${this.level}`, '60px', '#000000');

    // Inside view GO
    this.nextlevelTxt = this.createText(_main.CENTER_X, _main.CENTER_Y + 200, 'NEXT LEVEL', '96px', '#000000');
    this.nextlevelTxt.alpha = 0;

    this.motivTxt = this.createText(_main.CENTER_X, _main.CENTER_Y, this.data_texts[0], '68px', '#FFFFFF');
    this.motivTxt.alpha = 0;


    // this.scene.input.on('pointerdown', () => {
    //   this.fireMotivText(Math.floor(Math.random() * 5));
    // }, this);

    _main.ee.on('balloonHit', (balloonType) => {
      this.streak += 1 + balloonType;
      this.score += Math.round((balloonType + 1) * (1 + (this.streak * 0.2)));

      this.scoreTxt.setText(this.score);
      if (this.streak > 1) {
        this.fireMotivText(this.streak - 2)
      }
      if (this.score > this.hiScore) {
        this.hiScore = this.score;
        this.hiScoreTxt.setText(`Highscore: ${this.hiScore}`);
      }
    });

    _main.ee.on('levelComplete', () => {
      this.particles.emitParticleAt(_main.CENTER_X, _main.CENTER_Y);
      this.nextlevelTxt.alpha = 1;
      this.scene.input.once('pointerdown', () => {
        this.nextlevelTxt.alpha = 0;
        this.levelTxt.setText(`Level: ${++this.level}`);
      }, this);
    });

    _main.ee.on('resetStreak', () => {
      this.streak = 0;
    });

    this.resize();
  }

  resize() {
    this.positionTexts();
  }

  createText(x, y, text = 'Test', size = '64px', color = '#FFFFFF') {
    const txt = this.scene.make.text({
      x,
      y,
      text,
      style: {
        fontSize: size,
        fontFamily: '"Oswald"',
        color,
        align: 'center',
      },
      add: true
    });

    txt.setOrigin(0.5);

    this.add(txt);
    return txt;
  }

  positionTexts() {
    const { scoreTxt, levelTxt, hiScoreTxt } = this;

    scoreTxt.x = _main.LEFT + (scoreTxt.displayWidth / 2) + 15;
    scoreTxt.y = _main.TOP + 40;

    levelTxt.x = _main.CENTER_X;
    levelTxt.y = _main.TOP + (scoreTxt.displayWidth / 2) + (_main.TOTAL_HEIGHT * 0.12);

    hiScoreTxt.x = _main.RIGHT - (hiScoreTxt.displayWidth / 2) - 15;
    hiScoreTxt.y = _main.TOP + 40;
  }

  fireMotivText(amazingness) {
    const { motivTxt, data_texts } = this;
    const index = Math.min(amazingness, 4);

    if (this.motivTween) this.motivTween.stop();

    motivTxt.setText(data_texts[index]);
    motivTxt.alpha = 1;
    motivTxt.y = _main.CENTER_Y;

    this.motivTween = this.scene.tweens.add({
      targets: motivTxt,
      alpha: 0,
      y: '-=100',
      ease: 'Quad.easeIn',
      duration: 600,
    });
  }

  confetti() {
    var particles = this.add.particles('atlas');

    particles.createEmitter({
      frame: ['balloon0.png', 'balloon0.png', 'balloon0.png'],
      angle: { min: 0, max: 360 },
      speed: { min: 200, max: 300 },
      quantity: 6,
      lifespan: 2000,
      alpha: { start: 1, end: 0 },
      scale: { start: 1.5, end: 0.5 },
      on: false
    });
  }
}
