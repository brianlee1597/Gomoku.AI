"use strict";
const canvas = document.getElementById('boardUILayer');
const ctx = canvas.getContext('2d');
const makeBoard = (margin) => {
    for (let x = 1; x <= margin; x++) {
        for (let y = 1; y <= margin; y++) {
            window['nodeAt' + x + 'x' + y] = new GraphNode(x, y);
        }
    }
    for (let x = 1; x <= margin; x++) {
        for (let y = 1; y <= margin; y++) {
            nodeAt(x, y).left = nodeAt(x, y - 1), nodeAt(x, y).right = nodeAt(x, y + 1);
            nodeAt(x, y).up = nodeAt(x - 1, y), nodeAt(x, y).down = nodeAt(x + 1, y);
            nodeAt(x, y).bottomLeft = nodeAt(x + 1, y - 1), nodeAt(x, y).bottomRight = nodeAt(x + 1, y + 1);
            nodeAt(x, y).topLeft = nodeAt(x - 1, y - 1), nodeAt(x, y).topRight = nodeAt(x - 1, y + 1);
        }
    }
    let coordinate = 0;
    do {
        drawLine('horizontal', coordinate);
        drawLine('vertical', coordinate);
    } while ((coordinate += 550 / margin) <= 550);
};
let line = 0, speed = 0.25;
const drawLine = (hOrV, margin) => {
    const drawTheLine = () => {
        ctx.beginPath();
        line = line < 550 ? line + speed : line;
        ctx.lineWidth = 0.5, ctx.strokeStyle = '#e5e5e5';
        if (hOrV === 'horizontal') {
            ctx.moveTo(0, margin + 25);
            ctx.lineTo(line, margin + 25);
        }
        else {
            ctx.moveTo(margin + 25, 0);
            ctx.lineTo(margin + 25, line);
        }
        ctx.stroke();
        requestAnimationFrame(drawTheLine);
    };
    requestAnimationFrame(drawTheLine);
};
