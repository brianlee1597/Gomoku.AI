"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const STCV = document.getElementById('placeStoneLayer'), CTXT = STCV.getContext('2d'), playerChoice = '#CBB9A8', AIChoice = playerChoice == '#CBB9A8' ? '#1F271B' : '#CBB9A8';
function drawStone(X, Y) {
    return __awaiter(this, void 0, void 0, function* () {
        CTXT.beginPath();
        CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false);
        CTXT.fill(), CTXT.stroke();
    });
}
const endGame = (color) => {
    setTimeout(() => alert((color === AI.StoneColor ? "AI" : "Player") + " Wins!"), 50);
};
const checkIfFive = (fillStyle, rootNode) => __awaiter(void 0, void 0, void 0, function* () {
    const recursivelyCountUntilFive = (count, node, direction) => {
        if (count === 5)
            endGame(fillStyle);
        else if (!node.has(direction) ||
            node[direction].isEmpty() ||
            node[direction].color !== fillStyle)
            return;
        else
            recursivelyCountUntilFive(count + 1, node[direction], direction);
    };
    PATTERN_MAP.forEach(direction => recursivelyCountUntilFive(1, rootNode, direction));
});
const Player = {
    StoneColor: playerChoice,
    PlaceStone: (X, Y) => __awaiter(void 0, void 0, void 0, function* () {
        CTXT.fillStyle = Player.StoneColor;
        yield drawStone(X, Y);
        var ROW = (Y + 25) / 50, COL = (X + 25) / 50;
        checkIfFive(Player.StoneColor, nodeAt(ROW, COL));
    })
};
const AI = {
    StoneColor: AIChoice,
    PlaceStone: () => {
        runScoringAlgorithm();
        var maxNode = AI.maxScoredNode();
        if (visualAI) {
            isLoading = true;
            highlightBoardWithEmphasisOn(maxNode);
        }
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield AI.DrawStoneOn(maxNode);
            yield checkIfFive(AI.StoneColor, maxNode);
            clearAllScoreAndHighLights();
            isLoading = false;
        }), visualAI ? 1500 : 0);
    },
    maxScoredNode: () => {
        var ARRAY = new MaxNode();
        let i = 1, node;
        while (i++ <= 11) {
            node = nodeAt(i, 1);
            while (node !== undefined) {
                if (node.score !== 0)
                    ARRAY.add(node);
                node = node.right;
            }
        }
        return ARRAY.pop();
    },
    DrawStoneOn: (NODE) => __awaiter(void 0, void 0, void 0, function* () {
        NODE.stone = true;
        NODE.color = AI.StoneColor;
        CTXT.fillStyle = AI.StoneColor;
        drawStone(NODE.coord_x, NODE.coord_y);
    })
};
