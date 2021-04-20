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
    let i = 1, random = ~~(Math.random() * 4 + 1);
    const POINTER = POINTER_MAP.get(random);
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
        throw new Error("Error on Bot.ts / scanBoard: pointer map has invalid value: " + random);
};
const highlight = (node, POINTER) => {
    let scanEachColumn = () => {
        setTimeout(() => {
            twinkle(node, x, y);
            if (node.has(POINTER)) {
                node = node.to(POINTER);
                scanEachColumn();
            }
            else
                clearCanvas(POINTER);
        }, 50);
    };
    scanEachColumn();
};
const twinkle = (NODE, X, Y) => {
    if (NODE.hasStone())
        return;
    const fill = (canvas, color) => {
        canvas.beginPath();
        canvas.arc(NODE.coord_x, NODE.coord_y, 3, 0, 2 * Math.PI, false);
        canvas.fillStyle = color;
        canvas.fill();
    };
    if (NODE.hasScore())
        fill(highlightCtx, colorBy(NODE.score));
    else
        fill(AIContext, 'grey');
};
const clearCanvas = (POINTER) => {
    let i = POINTER === 'right' || POINTER === 'down' ? 0 : 550;
    let clearCol = (i) => {
        if (i > 550 || i < 0)
            return;
        setTimeout(() => {
            if (POINTER === 'right' || POINTER === 'down') {
                POINTER === 'right' ? AIContext.clearRect(0, 0, i, 550)
                    : AIContext.clearRect(0, 0, 550, i);
                clearCol(i + 50);
            }
            else {
                POINTER === 'up' ? AIContext.clearRect(0, i, 550, 50)
                    : AIContext.clearRect(i, 0, 50, 550);
                clearCol(i - 50);
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
const POINTER_MAP = new Map([
    [1, 'up'],
    [2, 'down'],
    [3, 'left'],
    [4, 'right']
]);
