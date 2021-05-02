"use strict";
const checkAllPatterns = () => {
    checkForAdjacent();
    checkForTwoInRow();
    checkForThreeInRow();
};
const checkForAdjacent = () => {
    for (let i = 1; i <= 11; i++) {
        var node = nodeAt(i, 1);
        while (node !== undefined) {
            if (node.hasStone())
                POINTER_MAP.forEach(pointer => {
                    if (node[pointer] !== undefined)
                        node[pointer].score += 1;
                });
            node = node.right;
        }
    }
};
const checkForTwoInRow = () => {
    var getPatternAndScore = (color) => {
        var weight = color === Player.StoneColor ? 3 : 4;
        PATTERN_MAP.forEach(pointer => {
            if (node[pointer] !== undefined && node[pointer].colorIs(color)) {
                if (node.opDirOf(pointer) !== undefined && node.opDirOf(pointer).isEmpty())
                    node.opDirOf(pointer).score += weight;
                if (node.numOfPAway(2, pointer) !== undefined && node.numOfPAway(2, pointer).isEmpty())
                    node.numOfPAway(2, pointer).score += weight;
            }
        });
    };
    for (let i = 1; i <= 11; i++) {
        var node = nodeAt(i, 1);
        while (node !== undefined) {
            if (node.hasStone())
                getPatternAndScore(node.color);
            node = node.right;
        }
    }
};
const checkForThreeInRow = () => {
    var node;
    var getPatternAndScore = (color) => {
        var weight = color === Player.StoneColor ? 4 : 5;
        PATTERN_MAP.forEach(pointer => {
            if (node[pointer] !== undefined && node[pointer].colorIs(color)) {
                if (node.numOfPAway(2, pointer) !== undefined && node.numOfPAway(2, pointer).colorIs(color)) {
                    if (node.opDirOf(pointer) !== undefined && node.opDirOf(pointer).isEmpty())
                        node.opDirOf(pointer).score += weight;
                    if (node.numOfPAway(3, pointer) !== undefined && node.numOfPAway(3, pointer).isEmpty())
                        node.numOfPAway(3, pointer).score += weight;
                }
            }
        });
    };
    let i = 1;
    while (i++ < 11) {
        node = nodeAt(i, 1);
        while (node !== undefined) {
            if (node.hasStone())
                getPatternAndScore(node.color);
            node = node.right;
        }
    }
};
const oppositeOf = (color) => color === Player.StoneColor ? AI.StoneColor : Player.StoneColor;
