"use strict";
var playingField = document.getElementById('placeStoneLayer');
var on = playingField.addEventListener;
var whateverPlayerChose = '#457b9d';
var x, y = null;
var visualAI = false;
var playerStoneColor = whateverPlayerChose, AIStoneColor = whateverPlayerChose == '#457b9d' ? '#f1faee' : '#457b9d';
makeBoard(11);
on('mousedown', playOneRound);
/*if(5InRow) endGame()*/ 
