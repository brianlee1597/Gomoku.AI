"use strict";
const AICV = document.getElementById('botScanLayer'), AICX = AICV.getContext('2d'), HLCV = document.getElementById('scoredNodeHighlightLayer'), HCTX = HLCV.getContext('2d');
const AIPlaceStone = () => {
    checkAllPatterns();
    var MAX_NODE = maxScoredNode();
    if (visualAI) {
        highlightBoard();
        setTimeout(() => {
            clearAllScore();
            HCTX.clearRect(0, 0, 550, 550);
            AIDrawStone(MAX_NODE);
        }, 1500);
    }
    else {
        clearAllScore();
        AIDrawStone(MAX_NODE);
    }
};
const AIDrawStone = (NODE) => {
    NODE.stone = true;
    NODE.color,
        CTXT.fillStyle = AIStoneColor;
    CTXT.beginPath();
    CTXT.arc(NODE.coord_x, NODE.coord_y, 20, 0, 2 * Math.PI, false);
    CTXT.fill();
    CTXT.stroke();
};
const maxScoredNode = () => {
    var ARRAY = new MaxNode();
    for (let i = 1; i <= 11; i++) {
        let node = nodeAt(i, 1);
        while (node.has('right')) {
            ARRAY.add(node);
            node = node.right;
        }
    }
    return ARRAY.pop();
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
};
const highlight = (node, POINTER) => {
    let scanEachColumn = () => {
        setTimeout(() => {
            twinkle(node);
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
        fill(AICX, 'grey');
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
const toggleVis = () => {
    visualAI = visualAI === false ? true : false;
    var VISUAL_TEXT = document.querySelector('p').classList;
    VISUAL_TEXT.contains('hidden') ?
        VISUAL_TEXT.remove('hidden') :
        VISUAL_TEXT.add('hidden');
};
