"use strict";
const stoneCanvas = document.getElementById('placeStoneLayer');
const context = stoneCanvas.getContext('2d');
const playRound = (x, y) => {
    x = getRounded(x), y = getRounded(y);
    const ROW_NUM = (y + 25) / 50, COL_NUM = (x + 25) / 50, CLICKED_NODE = nodeAt(ROW_NUM, COL_NUM);
    if (CLICKED_NODE.isEmpty()) {
        CLICKED_NODE.stone = true;
        CLICKED_NODE.color = playerStoneColor;
        youPlaceStone(x, y);
        AIPlaceStone();
    }
};
const getRounded = (raw) => {
    const FIRST_DIGITS = Math.floor(raw / 100), LAST_TWO_ROUNDED = parseInt(`${~~(raw / 10) % 10}${raw % 10}`) <= 50 ? 25 : 75;
    return parseInt("" + FIRST_DIGITS + LAST_TWO_ROUNDED);
};
const youPlaceStone = (X, Y) => {
    context.beginPath();
    context.arc(X, Y, 20, 0, 2 * Math.PI, false);
    context.fillStyle = playerStoneColor;
    context.fill();
    context.stroke();
};
