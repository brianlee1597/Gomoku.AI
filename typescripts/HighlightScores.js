"use strict";
var highlightCanvas = document.getElementById('scoredNodeHighlightLayer');
var highlightCtx = highlightCanvas.getContext('2d');
var ARRAY_OF_COLORS = ['transparent', 'red', 'blue', 'green', 'violet', 'yellow', 'grey', 'black'];
var colorBy = function (score) {
    if (score < ARRAY_OF_COLORS.length)
        return ARRAY_OF_COLORS[score];
    throw new Error("error on ColorBy: score is out of Array Bounds");
};
