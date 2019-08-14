const D = {
    REAL_WIDTH: 0,
    REAL_HEIGHT: 0,
    INNER_WIDTH: 640,
    INNER_HEIGHT: 640,
    LEFT: 0,
    RIGHT: 0,
    TOP: 0,
    BOTTOM: 0,
    SCALE: 1,
    refreshSizes: () => {
        D.REAL_WIDTH = window.innerWidth;
        D.REAL_HEIGHT = window.innerHeight;
        const scale = {
            x: D.REAL_WIDTH / D.INNER_WIDTH,
            y: D.REAL_HEIGHT / D.INNER_HEIGHT
        };

        D.SCALE = Math.min(scale.x, scale.y);
        const INVS = 1 / D.SCALE;

        D.CENTER_X = D.INNER_WIDTH / 2;
        D.CENTER_Y = D.INNER_HEIGHT / 2;
        D.LEFT = -((D.REAL_WIDTH / 2) - D.CENTER_X * D.SCALE) * INVS;
        D.RIGHT = -D.LEFT + D.INNER_WIDTH;
        D.TOP = -((D.REAL_HEIGHT / 2) - D.CENTER_Y * D.SCALE) * INVS;
        D.BOTTOM = -D.TOP + D.INNER_HEIGHT;
        D.TOTAL_WIDTH = D.RIGHT - D.LEFT;
        D.TOTAL_HEIGHT = D.BOTTOM - D.TOP;
    },

    letterBoxCont: (container) => {
        container.setScale(D.SCALE);
        container.x = (D.REAL_WIDTH / 2) - (D.CENTER_X * D.SCALE);
        container.y = (D.REAL_HEIGHT / 2) - (D.CENTER_Y * D.SCALE);
    }
};

export default D;
