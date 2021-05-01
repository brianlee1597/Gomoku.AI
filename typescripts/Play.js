"use strict";
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
