"use strict";
const STCV = document.getElementById('placeStoneLayer');
const CTXT = STCV.getContext('2d');
const playingField = document.getElementById('placeStoneLayer');
const on = playingField.addEventListener;
makeBoard(11);
on('mousedown', function (e) {
    const RECT = playingField.getBoundingClientRect(), x = e.clientX - RECT.left, y = e.clientY - RECT.top;
    if (x < 0 || x > 550 || y < 0 || y > 550)
        return;
    console.time();
    playRound(x, y);
    console.timeEnd();
});
const playRound = (X, Y) => {
    var getRounded = (RAW) => {
        const FIRST_DIGITS = Math.floor(RAW / 100), LAST_TWO_ROUNDED = parseInt(`${~~(RAW / 10) % 10}${RAW % 10}`) <= 50 ? 25 : 75;
        return parseInt("" + FIRST_DIGITS + LAST_TWO_ROUNDED);
    };
    X = getRounded(X), Y = getRounded(Y);
    var ROW_NUM = (Y + 25) / 50, COL_NUM = (X + 25) / 50, CLICKED_NODE = nodeAt(ROW_NUM, COL_NUM);
    if (CLICKED_NODE.isEmpty()) {
        CLICKED_NODE.stone = true;
        CLICKED_NODE.color = Player.StoneColor;
        Player.PlaceStone(X, Y);
        AI.PlaceStone();
    }
};
