"use strict";
var stoneCanvas = document.getElementById('placeStoneLayer');
var context = stoneCanvas.getContext('2d');
var playOneRound = function (onClick) {
    getRoundedXY(stoneCanvas, onClick);
    if (x < 0 || x > 550 || y < 0 || y > 550)
        return;
    var rownum = (y + 25) / 50, colnum = (x + 25) / 50;
    var clickedNode = nodeAt(rownum, colnum);
    if (clickedNode === undefined)
        return;
    if (!clickedNode.hasStone()) {
        clickedNode.stone = true;
        clickedNode.color = playerStoneColor;
        youPlaceStone(x, y);
        AIPlaceStone();
    }
    console.log(clickedNode.name);
};
//Helper Functions
var getRoundedXY = function (canvas, onClick) {
    var rect = canvas.getBoundingClientRect();
    x = onClick.clientX - rect.left;
    y = onClick.clientY - rect.top;
    if (x < 0 || x > 550 || y < 0 || y > 550)
        return;
    var firstDigitsX = ~~(x / 100), lastTwoDigitX = (+("" + (~~(x / 10) % 10) + (x % 10)) <= 50 ? 25 : 75);
    var firstDigitsY = ~~(y / 100), lastTwoDigitY = (+("" + (~~(y / 10) % 10) + (y % 10)) <= 50 ? 25 : 75);
    x = +("" + firstDigitsX + lastTwoDigitX);
    y = +("" + firstDigitsY + lastTwoDigitY);
};
var youPlaceStone = function (x, y) {
    context.beginPath();
    context.arc(x, y, 20, 0, 2 * Math.PI, false);
    context.fillStyle = playerStoneColor;
    playerStoneColor = playerStoneColor === '#457b9d' ? '#f1faee' : '#457b9d';
    context.fill();
    context.stroke();
};
