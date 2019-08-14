let _main = null;

export default class Background extends Phaser.GameObjects.Container {
  constructor(parent) {
    super(parent.scene);

    parent.add(this);
    _main = parent._main;

    this.init();
  }

  init() {
    const texture = this.scene.textures.get('wood_background');
    const bg_base = this.bg_base = this.scene.make.tileSprite({
      x: _main.CENTER_X,
      y: _main.CENTER_Y,
      // width: _main.TOTAL_WIDTH,
      // height: _main.TOTAL_HEIGHT,
      key: texture.key,
      add: true,
    });
    this.add(bg_base);

    bg_base._tiledTexture = texture;

    this.resize();
  }

  // Layout methods
  resize() {
    this.fitTileToScreen(this.bg_base);
  }

  fitTileToScreen(tile) {
    tile.width = _main.TOTAL_WIDTH;
    tile.height = _main.TOTAL_HEIGHT;
    tile.tilePositionX = -_main.TOTAL_WIDTH / 2;
    tile.tilePositionY = -_main.TOTAL_HEIGHT / 2;
  }

  update() {
  }
}
