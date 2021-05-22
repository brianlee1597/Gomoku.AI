"use strict";
const AICV = document.getElementById('botScanLayer'), AICX = AICV.getContext('2d'), HLCV = document.getElementById('scoredNodeHighlightLayer'), HCTX = HLCV.getContext('2d');
const highlightBoardWithEmphasisOn = (maxNode) => {
    const RANDOM_MARGIN = ~~(Math.random() * 4 + 1), POINTER = POINTER_MAP.get(RANDOM_MARGIN);
    let i = 0;
    while (i < 11)
        highlight(i++, POINTER, maxNode);
};
const highlight = (i, POINTER, maxNode) => {
    let node = POINTER === 'up' ? nodeAt(11, i)
        : POINTER === 'down' ? nodeAt(1, i)
            : POINTER === 'left' ? nodeAt(i, 11)
                : POINTER === 'right' ? nodeAt(i, 1) : null;
    scanEachColumn(node, POINTER, maxNode);
};
const scanEachColumn = (node, POINTER, maxNode) => {
    setTimeout(() => {
        twinkle(node, maxNode);
        if (node === undefined)
            return;
        if (!node.has(POINTER))
            clearCanvas(POINTER);
        else {
            node = node.to(POINTER);
            scanEachColumn(node, POINTER, maxNode);
        }
    }, 50);
};
const twinkle = (NODE, MAX_NODE) => {
    if (NODE === undefined || NODE.hasStone())
        return;
    var fill = (canvas) => {
        canvas.fillStyle = colorBy(NODE.score);
        canvas.beginPath();
        canvas.arc(NODE.coord_x, NODE.coord_y, NODE.score === MAX_NODE.score ? 5 : 2.5, 0, 2 * Math.PI, false);
        canvas.fill();
    };
    fill(NODE.hasScore() ? HCTX : AICX);
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
const colorBy = (SCORE) => SCORE < 8 ? colorValues.get(SCORE) : 'black';
const clearAllScoreAndHighLights = () => {
    for (let i = 1; i <= 11; i++) {
        var node = nodeAt(i, 1);
        while (node !== undefined) {
            node.score === 0;
            node.checked === false;
            node = node.right;
        }
    }
    HCTX.clearRect(0, 0, 550, 550);
};
let visualAI = false;
const toggleVisual = () => {
    const TEXT = document.querySelector('p');
    visualAI = visualAI === true ? false : true;
    if (TEXT.hasAttribute('hidden'))
        TEXT.removeAttribute('hidden');
    else
        TEXT.setAttribute('hidden', '');
};
const colorValues = new Map([
    [0, "White"], [1, 'red'], [2, 'orange'], [3, 'yellow'],
    [4, 'green'], [5, 'blue'], [6, 'violet'], [7, 'grey']
]);
