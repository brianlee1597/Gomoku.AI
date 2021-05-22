"use strict";
const runScoringAlgorithm = () => {
    checkForFourInRow();
    checkForThreeInRow();
    checkForTwoInRow();
    checkForAdjacent();
};
const checkForAdjacent = () => {
    for (let i = 1; i <= 11; i++) {
        var node = nodeAt(i, 1);
        while (node !== undefined) {
            if (node.hasStone() && !node.isChecked()) {
                POINTER_MAP.forEach(pointer => {
                    if (node[pointer] !== undefined && !node[pointer].isChecked())
                        node[pointer].score += 1;
                });
                node.checked === true;
            }
            node = node.right;
        }
    }
};
const checkForTwoInRow = () => {
    var getPatternAndScore = (color) => {
        var weight = color === Player.StoneColor ? 3 : 4;
        PATTERN_MAP.forEach(pointer => {
            let tempNode = node.to(pointer);
            if (tempNode !== undefined && !tempNode.isChecked() && tempNode.colorIs(color)) {
                let tempNode2 = node.opDirOf(pointer);
                if (tempNode2 !== undefined && !tempNode2.isChecked() && tempNode2.isEmpty()) {
                    tempNode2.score += weight;
                }
                if (node.numOfPAway(2, pointer) !== undefined && node.numOfPAway(2, pointer).isEmpty())
                    node.numOfPAway(2, pointer).score += weight;
                tempNode.checked === true;
            }
        });
    };
    for (let i = 1; i <= 11; i++) {
        var node = nodeAt(i, 1);
        while (node !== undefined) {
            if (node.hasStone() && !node.isChecked()) {
                getPatternAndScore(node.color);
                node.checked === true;
            }
            node = node.right;
        }
    }
};
const checkForThreeInRow = () => {
    var node;
    var getPatternAndScore = (color) => {
        var weight = color === Player.StoneColor ? 5 : 6;
        PATTERN_MAP.forEach(pointer => {
            if (node[pointer] !== undefined && !node[pointer].isChecked() && node[pointer].colorIs(color)) {
                if (node.numOfPAway(2, pointer) !== undefined && !node.numOfPAway(2, pointer).isChecked()
                    && node.numOfPAway(2, pointer).colorIs(color)) {
                    if (node.opDirOf(pointer) !== undefined && node.opDirOf(pointer).isEmpty())
                        node.opDirOf(pointer).score += weight;
                    if (node.numOfPAway(3, pointer) !== undefined && node.numOfPAway(3, pointer).isEmpty())
                        node.numOfPAway(3, pointer).score += weight;
                    node.numOfPAway(2, pointer).checked === true;
                    node[pointer].checked === true;
                }
            }
        });
    };
    let i = 1;
    while (i++ < 11) {
        node = nodeAt(i, 1);
        while (node !== undefined) {
            if (node.hasStone() && !node.isChecked()) {
                getPatternAndScore(node.color);
                node.checked === true;
            }
            node = node.right;
        }
    }
};
const checkForFourInRow = () => {
    var node;
    var getPatternAndScore = (color) => {
        var weight = color === Player.StoneColor ? 100 : 1000;
        PATTERN_MAP.forEach(pointer => {
            if (node[pointer] !== undefined && !node[pointer].isChecked() && node[pointer].colorIs(color)) {
                if (node.numOfPAway(2, pointer) !== undefined && !node.numOfPAway(2, pointer).isChecked()
                    && node.numOfPAway(2, pointer).colorIs(color)) {
                    if (node.numOfPAway(3, pointer) !== undefined && !node.numOfPAway(3, pointer).isChecked()
                        && node.numOfPAway(3, pointer).colorIs(color)) {
                        if (node.opDirOf(pointer) !== undefined && node.opDirOf(pointer).isEmpty())
                            node.opDirOf(pointer).score += weight;
                        if (node.numOfPAway(4, pointer) !== undefined && node.numOfPAway(4, pointer).isEmpty())
                            node.numOfPAway(4, pointer).score += weight;
                        node.numOfPAway(3, pointer).checked === true;
                        node.numOfPAway(2, pointer).checked === true;
                        node[pointer].checked === true;
                    }
                }
            }
        });
    };
    let i = 1;
    while (i++ < 11) {
        node = nodeAt(i, 1);
        while (node !== undefined) {
            if (node.hasStone() && !node.isChecked()) {
                getPatternAndScore(node.color);
                node.checked === true;
            }
            node = node.right;
        }
    }
};
const oppositeOf = (color) => color === Player.StoneColor ? AI.StoneColor : Player.StoneColor;
