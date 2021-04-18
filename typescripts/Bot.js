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
    var POINTER = POINTER_ARRAY[~~(Math.random() * 4)];
    if (POINTER === 'up')
        do {
            scan(nodeAt(11, i++), POINTER);
        } while (i <= 11);
    else if (POINTER === 'down')
        do {
            scan(nodeAt(1, i++), POINTER);
        } while (i <= 11);
    else if (POINTER === 'left')
        do {
            scan(nodeAt(i++, 11), POINTER);
        } while (i <= 11);
    else if (POINTER === 'right')
        do {
            scan(nodeAt(i++, 1), POINTER);
        } while (i <= 11);
    else
        throw new Error("Error on Bot.ts / scanBoard: pointer array has invalid value");
};
var scan = function (node, POINTER) {
    var scanEachColumn = function () {
        setTimeout(function () {
            highlight(node);
            if (!node.has(POINTER)) {
                clearCanvas(POINTER);
                return;
            }
            node = node.to(POINTER);
            scanEachColumn();
        }, 50);
    };
    scanEachColumn();
};
var highlight = function (NODE) {
    if (NODE.hasStone())
        return;
    var x = coordinateOf(NODE.y), y = coordinateOf(NODE.x), fill = function (canvas, color) {
        canvas.beginPath();
        canvas.arc(x, y, 3, 0, 2 * Math.PI, false);
        canvas.fillStyle = color;
        canvas.fill();
    };
    if (NODE.hasScore())
        fill(highlightCtx, colorBy(NODE.score));
    else
        fill(AIContext, 'red');
};
var clearCanvas = function (POINTER) {
    var i;
    if (POINTER === 'right' || POINTER === 'down')
        i = 0;
    else if (POINTER === 'left' || POINTER === 'up')
        i = 550;
    else
        throw new Error('Error on Bot.ts / clearCanvas(): input is ' + POINTER);
    var clearCol = function (i) {
        setTimeout(function () {
            switch (POINTER) {
                case 'right':
                case 'down':
                    if (i <= 550) {
                        POINTER === 'right' ? AIContext.clearRect(0, 0, i, 550)
                            : AIContext.clearRect(0, 0, 550, i);
                        clearCol(i + 50);
                    }
                    break;
                case 'up':
                case 'left':
                    if (i >= 0) {
                        POINTER === 'up' ? AIContext.clearRect(0, i, 550, 50)
                            : AIContext.clearRect(i, 0, 50, 550);
                        clearCol(i - 50);
                    }
                    break;
            }
        }, 50);
    };
    clearCol(i); // clears 1 column at a time each loop
};
var toggleVis = function () {
    visualAI = visualAI === false ? true : false;
    var visual_text = document.querySelector('p').classList;
    if (visual_text.contains('hidden'))
        visual_text.remove('hidden');
    else
        visual_text.add('hidden');
};
var coordinateOf = function (X_OR_Y) { return X_OR_Y * 25 + (25 * (X_OR_Y - 1)); };
var POINTER_ARRAY = ['up', 'down', 'right', 'left'];
