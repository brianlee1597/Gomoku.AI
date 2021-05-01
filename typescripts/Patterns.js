"use strict";
const checkAllPatterns = () => {
    checkForAdjacent();
    checkForTwoInRow();
};
const checkForAdjacent = () => {
    try {
        var node, weight = 1;
        for (let i = 1; i <= 11; i++) {
            node = nodeAt(i, 1);
            while (node.has('right')) {
                if (node.hasStone()) {
                    POINTER_MAP.forEach(pointer => {
                        node[pointer].score += weight;
                    });
                }
                node = node.right;
            }
        }
    }
    catch (e) {
        console.log(e);
    }
};
const checkForTwoInRow = () => {
    try {
        var node;
        var getPatternAndScore = (color) => {
            var weight = color === Player.StoneColor ? 2 : 3;
            PATTERN_MAP.forEach(pointer => {
                if (node[pointer] !== undefined && node[pointer].colorIs(color)) {
                    if (node.numOfPAway(2, pointer) !== undefined && node.numOfPAway(2, pointer).color !== oppositeOf(color)) {
                        if (node.opDirOf(pointer) !== undefined && node.opDirOf(pointer).isEmpty())
                            node.opDirOf(pointer).score += weight;
                        if (node.numOfPAway(2, pointer).score !== null && node.numOfPAway(2, pointer).isEmpty())
                            node.opDirOf(pointer).score += weight;
                    }
                    else {
                        if (node.opDirOf(pointer) !== undefined && node.opDirOf(pointer).isEmpty())
                            node.opDirOf(pointer).score += (weight - 2);
                    }
                }
            });
        };
        for (let i = 1; i <= 11; i++) {
            node = nodeAt(i, 1);
            while (node.has('right')) {
                if (node.colorIs(Player.StoneColor)) {
                    getPatternAndScore(Player.StoneColor);
                }
                if (node.colorIs(AI.StoneColor)) {
                    getPatternAndScore(AI.StoneColor);
                }
                node = node.right;
            }
        }
    }
    catch (e) {
        console.log(e);
    }
};
const oppositeOf = (color) => color === Player.StoneColor ? AI.StoneColor : Player.StoneColor;
