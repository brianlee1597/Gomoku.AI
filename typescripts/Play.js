"use strict";
const playingField = document.getElementById('placeStoneLayer');
const on = playingField.addEventListener;
const whateverPlayerChose = '#2D2D2A';
let visualAI = false, playerStoneColor = whateverPlayerChose, AIStoneColor = whateverPlayerChose == '#2D2D2A' ? '#E5DCC5' : '#2D2D2A';
const POINTER_MAP = new Map([
    [1, 'up'], [2, 'down'], [3, 'left'], [4, 'right'],
    [5, 'topLeft'], [6, 'topRight'], [7, 'bottomLeft'], [8, 'bottomRight']
]);
const PATTERN_MAP = new Map([
    [1, 'up'], [2, 'right'], [3, 'topLeft'], [4, 'topRight']
]);
makeBoard(11);
on('mousedown', function (e) {
    const RECT = playingField.getBoundingClientRect(), x = e.clientX - RECT.left, y = e.clientY - RECT.top;
    if (x < 0 || x > 550 || y < 0 || y > 550)
        return;
    playRound(x, y);
});
