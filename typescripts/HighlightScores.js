"use strict";
var highlightCanvas = document.getElementById('scoredNodeHighlightLayer');
var highlightCtx = highlightCanvas.getContext('2d');
var arrayOfColors = ['transparent', 'red', 'blue', 'green', 'violet', 'yellow', 'grey', 'black'];
var colorBy = function (score) {
    if (score < arrayOfColors.length)
        return arrayOfColors[score];
    throw new Error("error on ColorBy: score is out of Array Bounds");
};
