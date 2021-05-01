"use strict";
const AICV = document.getElementById('botScanLayer'), AICX = AICV.getContext('2d'), HLCV = document.getElementById('scoredNodeHighlightLayer'), HCTX = HLCV.getContext('2d');
const maxScoredNode = () => {
    var ARRAY = new MaxNode();
    for (let i = 1; i <= 11; i++) {
        let node = nodeAt(i, 1);
        while (node.has('right')) {
            if (node.score !== 0)
                ARRAY.add(node);
            node = node.right;
        }
    }
    return ARRAY.pop();
};
const highlightBoard = () => {
    const RANDOM_MARGIN = ~~(Math.random() * 4 + 1), POINTER = POINTER_MAP.get(RANDOM_MARGIN);
    let i = 0;
    while (i++ < 11)
        highlight(i, POINTER);
};
const highlight = (i, POINTER) => {
    let node = POINTER === 'up' ? nodeAt(11, i)
        : POINTER === 'down' ? nodeAt(1, i)
            : POINTER === 'left' ? nodeAt(i, 11)
                : POINTER === 'right' ? nodeAt(i, 1) : null;
    scanEachColumn(node, POINTER);
};
const scanEachColumn = (node, POINTER) => {
    setTimeout(() => {
        twinkle(node);
        if (node.has(POINTER)) {
            node = node.to(POINTER);
            scanEachColumn(node, POINTER);
        }
        else
            clearCanvas(POINTER);
    }, 50);
};
const twinkle = (NODE) => {
    if (NODE.hasStone())
        return;
    const fill = (canvas, color) => {
        canvas.beginPath();
        canvas.arc(NODE.coord_x, NODE.coord_y, 2.5, 0, 2 * Math.PI, false);
        canvas.fillStyle = color;
        canvas.fill();
    };
    if (NODE.hasScore())
        fill(HCTX, colorBy(NODE.score));
    else
        fill(AICX, 'white');
};
const clearCanvas = (POINTER) => {
    let i = POINTER === 'right' || POINTER === 'down' ? 0 : 550;
    let clearCol = (i) => {
        if (i > 550 || i < 0)
            return;
        setTimeout(() => {
            if (POINTER === 'right' || POINTER === 'down') {
                POINTER === 'right' ? AICX.clearRect(0, 0, i, 550)
                    : AICX.clearRect(0, 0, 550, i);
                clearCol(i + 50);
            }
            else {
                POINTER === 'left' ? AICX.clearRect(i, 0, 50, 550)
                    : AICX.clearRect(0, i, 550, 50);
                clearCol(i - 50);
            }
        }, 50);
    };
    clearCol(i);
};
const colorBy = (SCORE) => {
    return SCORE < 1 ? 'transparent' : SCORE < 2 ? 'red' :
        SCORE < 3 ? 'orange' : SCORE < 4 ? 'yellow' :
            SCORE < 5 ? 'green' : SCORE < 6 ? 'blue' :
                SCORE < 7 ? 'violet' : SCORE < 8 ? 'grey' :
                    'black';
};
const clearAllScore = () => {
    for (let x = 1; x <= 11; x++)
        for (let y = 1; y <= 11; y++)
            nodeAt(x, y).score = 0;
};
let visualAI = false;
const toggleVis = () => {
    visualAI = visualAI === false ? true : false;
    var VISUAL_TEXT = document.querySelector('p').classList;
    VISUAL_TEXT.contains('hidden') ?
        VISUAL_TEXT.remove('hidden') :
        VISUAL_TEXT.add('hidden');
};
