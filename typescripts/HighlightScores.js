"use strict";
var highlightCanvas = document.getElementById('scoredNodeHighlightLayer');
var highlightCtx = highlightCanvas.getContext('2d');
const ARRAY_OF_COLORS = new Map([
    [0, 'transparent'], [1, 'red'], [2, 'blue'], [3, 'green'],
    [4, 'violet'], [5, 'yellow'], [6, 'grey'], [7, 'black'],
    [8, 'orange']
]);
const colorBy = (score) => {
    if (ARRAY_OF_COLORS.has(score))
        return ARRAY_OF_COLORS.get(score);
    throw new Error("error on ColorBy: score is out of bounds");
};
