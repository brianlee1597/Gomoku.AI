"use strict";
var AICanvas = document.getElementById('botScanLayer');
var AIContext = AICanvas.getContext('2d');
var AIPlaceStone = function () {
    if (visualAI) {
        checkForAdjacent();
        checkForTwoInRow();
        scanBoard();
        highlightCtx.clearRect(0, 0, 550, 550);
        setTimeout(clearAllScore, 1000);
    }
};
var scanBoard = function () {
    var i = 1;
    var dir = dirArr[~~(Math.random() * 4)];
    if (dir === 'up')
        do {
            scan(nodeAt(11, i++), dir);
        } while (i <= 11);
    else if (dir === 'down')
        do {
            scan(nodeAt(1, i++), dir);
        } while (i <= 11);
    else if (dir === 'left')
        do {
            scan(nodeAt(i++, 11), dir);
        } while (i <= 11);
    else if (dir === 'right')
        do {
            scan(nodeAt(i++, 1), dir);
        } while (i <= 11);
    else
        throw new Error("Error on Bot.ts / scanBoard: dir array has invalid value");
};
var scan = function (node, dir) {
    var scanEachColumn = function () {
        setTimeout(function () {
            highlight(node);
            if (!node.has(dir)) {
                clearCanvas(dir);
                return;
            }
            node = node.to(dir);
            scanEachColumn();
        }, 50);
    };
    scanEachColumn();
};
var highlight = function (node) {
    if (node.hasStone())
        return;
    var x = coordinateOf(node.y), y = coordinateOf(node.x), fill = function (canvas, color) {
        canvas.beginPath();
        canvas.arc(x, y, 3, 0, 2 * Math.PI, false);
        canvas.fillStyle = color;
        canvas.fill();
    };
    if (node.hasScore())
        fill(highlightCtx, colorBy(node.score));
    else
        fill(AIContext, 'red');
};
var clearCanvas = function (dir) {
    var i;
    if (dir === 'right' || dir === 'down')
        i = 0;
    else if (dir === 'left' || dir === 'up')
        i = 550;
    else
        throw new Error('Error on Bot.ts / clearCanvas(): input is ' + dir);
    var clearCol = function (i) {
        setTimeout(function () {
            switch (dir) {
                case 'right':
                case 'down':
                    if (i <= 550) {
                        dir === 'right' ? AIContext.clearRect(0, 0, i, 550)
                            : AIContext.clearRect(0, 0, 550, i);
                        clearCol(i + 50);
                    }
                    break;
                case 'up':
                case 'left':
                    if (i >= 0) {
                        dir === 'up' ? AIContext.clearRect(0, i, 550, 50)
                            : AIContext.clearRect(i, 0, 50, 550);
                        clearCol(i - 50);
                    }
                    break;
            }
        }, 50);
    };
    clearCol(i + 50); // i+50 = clears 1 column at a time each loop
};
var toggleVis = function () {
    visualAI = visualAI === false ? true : false;
    var vizAlert = document.querySelector('p').classList;
    vizAlert.contains('hidden') ? vizAlert.remove('hidden') : vizAlert.add('hidden');
};
var coordinateOf = function (xOrY) { return xOrY * 25 + (25 * (xOrY - 1)); };
var dirArr = ['up', 'down', 'right', 'left'];
