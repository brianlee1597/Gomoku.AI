"use strict";
const UICV = document.getElementById('boardUILayer');
const BCTX = UICV.getContext('2d');
const makeBoard = (margin) => {
    for (let x = 1; x <= margin; x++)
        for (let y = 1; y <= margin; y++)
            window['nodeAt' + x + 'x' + y] = new GraphNode(x, y);
    for (let x = 1; x <= margin; x++)
        for (let y = 1; y <= margin; y++) {
            var NODE = nodeAt(x, y);
            NODE.left = nodeAt(x, y - 1), NODE.bottomLeft = nodeAt(x + 1, y - 1);
            NODE.up = nodeAt(x - 1, y), NODE.bottomRight = nodeAt(x + 1, y + 1);
            NODE.right = nodeAt(x, y + 1), NODE.topLeft = nodeAt(x - 1, y - 1);
            NODE.down = nodeAt(x + 1, y), NODE.topRight = nodeAt(x - 1, y + 1);
        }
    let coord = 0, totalTimeOut = 1500;
    do {
        drawLine('horizontal', coord);
        drawLine('vertical', coord);
    } while ((coord += 550 / margin) < 550);
    return totalTimeOut;
};
let line = 25, speed = 0.25;
const drawLine = (H_OR_V, MARGIN) => {
    const drawTheLine = () => {
        line = line < 525 ? line + speed : line;
        BCTX.beginPath();
        BCTX.lineWidth = 1;
        BCTX.strokeStyle = '#a1a1a1';
        if (H_OR_V === 'horizontal') {
            BCTX.moveTo(25, MARGIN + 25);
            BCTX.lineTo(line, MARGIN + 25);
        }
        else {
            BCTX.moveTo(MARGIN + 25, 25);
            BCTX.lineTo(MARGIN + 25, line);
        }
        BCTX.stroke();
        requestAnimationFrame(drawTheLine);
    };
    requestAnimationFrame(drawTheLine);
};
const nodeAt = (x, y) => window['nodeAt' + x + 'x' + y];
