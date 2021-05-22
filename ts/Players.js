"use strict";
const STCV = document.getElementById('placeStoneLayer'), CTXT = STCV.getContext('2d'), playerChoice = '#2D2D2A', AIChoice = playerChoice == '#2D2D2A' ? '#E5DCC5' : '#2D2D2A';
const drawStone = (X, Y) => {
    CTXT.beginPath();
    CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false);
    CTXT.fill(), CTXT.stroke();
};
const Player = {
    StoneColor: playerChoice,
    PlaceStone: (X, Y) => {
        CTXT.fillStyle = Player.StoneColor;
        drawStone(X, Y);
    }
};
const AI = {
    StoneColor: AIChoice,
    PlaceStone: () => {
        runScoringAlgorithm();
        var maxNode = AI.maxScoredNode();
        if (visualAI)
            highlightBoardWithEmphasisOn(maxNode);
        setTimeout(() => {
            AI.DrawStoneOn(maxNode);
            clearAllScoreAndHighLights();
        }, visualAI ? 1500 : 0);
    },
    maxScoredNode: () => {
        var ARRAY = new MaxNode();
        let i = 1, node;
        while (i++ < 11) {
            node = nodeAt(i, 1);
            while (node.has('right')) {
                if (node.score !== 0)
                    ARRAY.add(node);
                node = node.right;
            }
        }
        return ARRAY.pop();
    },
    DrawStoneOn: (NODE) => {
        NODE.stone = true;
        NODE.color = AI.StoneColor;
        CTXT.fillStyle = AI.StoneColor;
        drawStone(NODE.coord_x, NODE.coord_y);
    }
};
