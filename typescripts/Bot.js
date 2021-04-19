"use strict";
var AICanvas = document.getElementById('botScanLayer');
var AIContext = AICanvas.getContext('2d');
const AIPlaceStone = () => {
    if (visualAI) {
        checkForAdjacent();
        checkForTwoInRow();
        highlightBoard();
        highlightCtx.clearRect(0, 0, 550, 550);
        setTimeout(clearAllScore, 1000);
    }
};
const highlightBoard = () => {
    let i = 1, randomKey = ~~(Math.random() * 4 + 1);
    const POINTER = POINTER_MAP.get(randomKey);
    if (POINTER === 'up')
        do {
            highlight(nodeAt(11, i++), POINTER);
        } while (i <= 11);
    else if (POINTER === 'down')
        do {
            highlight(nodeAt(1, i++), POINTER);
        } while (i <= 11);
    else if (POINTER === 'left')
        do {
            highlight(nodeAt(i++, 11), POINTER);
        } while (i <= 11);
    else if (POINTER === 'right')
        do {
            highlight(nodeAt(i++, 1), POINTER);
        } while (i <= 11);
    else
        throw new Error("Error on Bot.ts / scanBoard: pointer map has invalid value: " + randomKey);
};
const highlight = (node, POINTER) => {
    let scanEachColumn = () => {
        setTimeout(() => {
            let x = coordinateOf(node.y), y = coordinateOf(node.x);
            twinkle(node, x, y);
            if (!node.has(POINTER)) {
                clearCanvas(POINTER);
            }
            else {
                node = node.to(POINTER);
                scanEachColumn();
            }
        }, 50);
    };
    scanEachColumn();
};
const twinkle = (NODE, X, Y) => {
    if (NODE.hasStone())
        return;
    const fill = (canvas, color) => {
        canvas.beginPath();
        canvas.arc(X, Y, 3, 0, 2 * Math.PI, false);
        canvas.fillStyle = color;
        canvas.fill();
    };
    if (NODE.hasScore())
        fill(highlightCtx, colorBy(NODE.score));
    else
        fill(AIContext, 'red');
};
const clearCanvas = (POINTER) => {
    let i;
    if (POINTER === 'right' || POINTER === 'down')
        i = 0;
    else if (POINTER === 'left' || POINTER === 'up')
        i = 550;
    else
        throw new Error('Error on Bot.ts / clearCanvas(): input is ' + POINTER);
    let clearCol = (i) => {
        setTimeout(() => {
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
const toggleVis = () => {
    visualAI = visualAI === false ? true : false;
    let visual_text = document.querySelector('p').classList;
    if (visual_text.contains('hidden'))
        visual_text.remove('hidden');
    else
        visual_text.add('hidden');
};
const coordinateOf = (X_OR_Y) => X_OR_Y * 25 + (25 * (X_OR_Y - 1));
const POINTER_MAP = new Map([
    [1, 'up'],
    [2, 'down'],
    [3, 'left'],
    [4, 'right']
]);
