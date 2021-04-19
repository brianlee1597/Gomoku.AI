"use strict";
var playingField = document.getElementById('placeStoneLayer');
const on = playingField.addEventListener;
const whateverPlayerChose = '#457b9d';
let x, y = null;
let visualAI = false;
let playerStoneColor = whateverPlayerChose, AIStoneColor = whateverPlayerChose == '#457b9d' ? '#f1faee' : '#457b9d';
makeBoard(11);
on('mousedown', playOneRound);
/*if(5InRow) endGame()*/ 
