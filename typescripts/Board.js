"use strict";
var canvas = document.getElementById('boardUILayer');
var ctx = canvas.getContext('2d');
/*------------Make Board Grid with LinkedGrid------------*/
var makeBoard = function (margin) {
    //Make x*y amount of nodes and name them nodeAt + coordinate
    for (var x_1 = 1; x_1 <= margin; x_1++) {
        for (var y_1 = 1; y_1 <= margin; y_1++) {
            window['nodeAt' + x_1 + 'x' + y_1] = new LinkedGrid(x_1, y_1);
        }
    }
    //Then doubly link all the nodes to each other by using their name properties
    for (var x_2 = 1; x_2 <= margin; x_2++) {
        for (var y_2 = 1; y_2 <= margin; y_2++) {
            nodeAt(x_2, y_2).left = nodeAt(x_2, y_2 - 1), nodeAt(x_2, y_2).right = nodeAt(x_2, y_2 + 1);
            nodeAt(x_2, y_2).up = nodeAt(x_2 - 1, y_2), nodeAt(x_2, y_2).down = nodeAt(x_2 + 1, y_2);
            nodeAt(x_2, y_2).bottomLeft = nodeAt(x_2 + 1, y_2 - 1), nodeAt(x_2, y_2).bottomRight = nodeAt(x_2 + 1, y_2 + 1);
            nodeAt(x_2, y_2).topLeft = nodeAt(x_2 - 1, y_2 - 1), nodeAt(x_2, y_2).topRight = nodeAt(x_2 - 1, y_2 + 1);
        }
    }
    var coord = 0;
    do {
        drawLine('horizontal', coord), drawLine('vertical', coord);
        coord += 550 / margin;
    } while (coord <= 550);
};
/*------------Make Board Grid with LinkedGrid------------*/
var line = 0, speed = 0.25;
var drawLine = function (hOrV, margin) {
    var drawTheLine = function () {
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
        window.requestAnimationFrame(drawTheLine);
    };
    window.requestAnimationFrame(drawTheLine);
};
