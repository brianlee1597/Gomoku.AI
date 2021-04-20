"use strict";
var playingField = document.getElementById('placeStoneLayer');
const on = playingField.addEventListener;
const whateverPlayerChose = '#457b9d';
let x, y = null;
let visualAI = false;
let playerStoneColor = whateverPlayerChose, AIStoneColor = whateverPlayerChose == '#457b9d' ? '#f1faee' : '#457b9d';
makeBoard(11);
on('mousedown', function (e) {
    const RECT = playingField.getBoundingClientRect();
    x = e.clientX - RECT.left;
    y = e.clientY - RECT.top;
    if (x < 0 || x > 550 || y < 0 || y > 550)
        return;
    playOneRound(e);
});
/*if(5InRow) endGame()*/ 
