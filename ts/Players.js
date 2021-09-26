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
const STCV = document.getElementById('placeStoneLayer');
const CTXT = STCV.getContext('2d');
const playerChoice = '#CBB9A8';
const AIChoice = playerChoice == '#CBB9A8' ? '#1F271B' : '#CBB9A8';
function drawStone(X, Y) {
    return __awaiter(this, void 0, void 0, function* () {
        CTXT.beginPath();
        CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false);
        CTXT.fill(), CTXT.stroke();
    });
}
function checkIfFive(fillStyle, rootNode) {
    return __awaiter(this, void 0, void 0, function* () {
        let recursivelyCountUntilFive = (count, node, direction) => {
            if (count === 5)
                endGame(fillStyle);
            else if (!node.has(direction) ||
                node.at(direction).isEmpty() ||
                node.at(direction).color !== fillStyle)
                return;
            else
                recursivelyCountUntilFive(count + 1, node[direction], direction);
        };
        POINTER_MAP.forEach(direction => recursivelyCountUntilFive(1, rootNode, direction));
    });
}
const Player = {
    StoneColor: playerChoice,
    PlaceStone: (X, Y) => __awaiter(void 0, void 0, void 0, function* () {
        CTXT.fillStyle = Player.StoneColor;
        yield drawStone(X, Y);
        var row = (Y + 25) / 50, col = (X + 25) / 50;
        checkIfFive(Player.StoneColor, nodeAt(row, col));
    })
};
const AI = {
    StoneColor: AIChoice,
    PlaceStone: () => __awaiter(void 0, void 0, void 0, function* () {
        yield scoringAlgorithm();
        let maxNode = yield AI.maxScoredNode();
        if (visualAI) {
            isLoading = true;
            highlightBoardWithEmphasisOn(maxNode);
        }
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            yield AI.DrawStoneOn(maxNode);
            yield checkIfFive(AI.StoneColor, maxNode);
            yield clearAllScoreAndHighLights();
            isLoading = false;
        }), visualAI ? 1500 : 0);
    }),
    maxScoredNode: () => __awaiter(void 0, void 0, void 0, function* () {
        let max_node_filter = new MaxNode();
        let i = 1, node;
        while (i++ <= 11) {
            node = nodeAt(i, 1);
            while (node) {
                if (node.score) {
                    max_node_filter.add(node);
                }
                node = node.right;
            }
        }
        return max_node_filter.pop();
    }),
    DrawStoneOn: (NODE) => __awaiter(void 0, void 0, void 0, function* () {
        NODE.stone = true;
        NODE.color = AI.StoneColor;
        CTXT.fillStyle = AI.StoneColor;
        drawStone(NODE.coord_x, NODE.coord_y);
    })
};
