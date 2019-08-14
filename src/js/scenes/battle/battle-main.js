import Background from './bg/background';
import Crossbow from './content/crossbow';
import Level from './content/level';
import Hand from './content/hand';
import GUI from './ui/gui';
import CTA from '../cta/cta';

export default class BattleMain extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene);

    this.name = 'BattleMain';

    // Layout config properties //
    this.INNER_WIDTH = 640;
    this.INNER_HEIGHT = 640;
    this.REAL_WIDTH = 0;
    this.REAL_HEIGHT = 0;
    this.LEFT = 0;
    this.RIGHT = 0;
    this.TOP = 0;
    this.BOT = 0;
    this.SCALE = 1;
    this._main = this;

    scene.add.existing(this);

    this.resize();

    this.init();
  }

  init() {
    // Key game objects
    this.balloons = [];
    this.flyingArrows = [];
    this.tailingArrows = [];

    // Key props
    this.currentLevel = 0;
    this.disableShooting = false;

    // Event emitter
    this.ee = this.scene.events;

    this.ee.once('allLevelsDone', this.transitionToCTA, this);

    // Group with everything related background
    this.background = new Background(this);

    this.tails = this.scene.add.container();
    this.add(this.tails);

    this.objectContainer = this.scene.add.container();
    this.add(this.objectContainer);
    this.objectContainer._main = this;

    this.crossbow = new Crossbow(this, this.CENTER_X, this.CENTER_Y + 50);
    this.scene.input.on('pointerdown', this.crossbow.shoot, this.crossbow);

    this.level = new Level(this);
    this.nextLevel();

    this.ui = new GUI(this);

    this.nagTxt = this.tapToShoot();

    this.hand = new Hand(this);

    this.CTA = new CTA(this);
  }

  // Gameplay methods
  arrowsVSballoons() {
    this.flyingArrows.forEach((arrow, index, array) => {
      // Balloon collision
      this.balloons.forEach((balloon, balloon_index, balloon_array) => {
        const distance = Math.sqrt(
          (arrow.x - balloon.x) * (arrow.x - balloon.x) +
          (arrow.y - balloon.y) * (arrow.y - balloon.y)
        );

        // lets make collision easier...
        if (distance < balloon.displayWidth / 1.65) {
          arrow.succeeded = true;
          this.ee.emit('balloonHit', balloon.type);
          balloon.explode();
          balloon_array.splice(balloon_index, 1);
          console.log(`Balloon type ${balloon.type} hit. ${balloon_array.length} remaining...`);
        }
      });

      // Wall collision
      if (arrow.checkWallCollision(this.LEFT, this.TOP, this.TOTAL_WIDTH, this.TOTAL_HEIGHT)) {
        if (!arrow.succeeded) this.ee.emit('resetStreak');
        arrow.hitWall();
        array.splice(index, 1);
      } else {
        arrow.move();
      }
    });

    // No balloons? lets add some more!
    if (this.balloons.length <= 0 && !this.level.completed) {
      this.disableShooting = true;
      this.ee.emit('levelComplete');
      this.level.completed = true;
      this.scene.input.once('pointerdown', () => {
        this.nextLevel();
        this.disableShooting = false;
      }, this);
    }

    // Manage arrow tails independantly if flying or not
    this.tailingArrows.forEach((arrow, index, array) => {
      arrow.tail();
    });
  }

  nextLevel() {
    this.currentLevel++;
    this.level.placeBalloons(this.currentLevel);
  }

  transitionToCTA() {
    this.CTA.start();
  }

  tapToShoot() {
    const txt = this.scene.make.text({
      x: 0,
      y: 0,
      text: 'TAP TO SHOOT',
      style: {
        fontSize: '54px',
        fontFamily: '"Oswald"',
        color: '#FFFFFF',
        align: 'center',
      },
      add: true
    });

    txt.setOrigin(0.5);

    this.add(txt);

    this.ee.on('hideNag', () => { txt.alpha = 0; }, this);
    this.ee.on('showNag', () => { if (!this.disableShooting) txt.alpha = 1; }, this);

    (txt.resize = () => {
      txt.x = this.CENTER_X;
      txt.y = this.BOT - txt.displayHeight;
    })();

    return txt;
  }

  update(time, delta) {
    // this.crossbow.update(time, delta);
    this.level.update(time, delta);

    this.arrowsVSballoons();
  }

  // Layouting methods
  resize() {
    this.refreshSizes();
    this.letterBox(this);

    this.list.forEach((value, index, array) => {
      if (value.resize) value.resize();
    });
  }

  refreshSizes() {
    this.REAL_WIDTH = window.innerWidth;
    this.REAL_HEIGHT = window.innerHeight;
    const scale = {
      x: this.REAL_WIDTH / this.INNER_WIDTH,
      y: this.REAL_HEIGHT / this.INNER_HEIGHT
    };

    this.SCALE = Math.min(scale.x, scale.y);
    const INVS = 1 / this.SCALE;

    this.CENTER_X = this.INNER_WIDTH / 2;
    this.CENTER_Y = this.INNER_HEIGHT / 2;
    this.LEFT = -((this.REAL_WIDTH / 2) - this.CENTER_X * this.SCALE) * INVS;
    this.RIGHT = -this.LEFT + this.INNER_WIDTH;
    this.TOP = -((this.REAL_HEIGHT / 2) - this.CENTER_Y * this.SCALE) * INVS;
    this.BOT = -this.TOP + this.INNER_HEIGHT;
    this.TOTAL_WIDTH = this.RIGHT - this.LEFT;
    this.TOTAL_HEIGHT = this.BOT - this.TOP;
  }

  letterBox() {
    this.setScale(this.SCALE);
    this.x = (this.REAL_WIDTH / 2) - (this.CENTER_X * this.SCALE);
    this.y = (this.REAL_HEIGHT / 2) - (this.CENTER_Y * this.SCALE);
  }
}
