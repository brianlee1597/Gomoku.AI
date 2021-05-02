"use strict";
const STCV = document.getElementById('placeStoneLayer'), CTXT = STCV.getContext('2d'), playerChoice = document.querySelector("data").value, AIChoice = playerChoice == '#2D2D2A' ? '#E5DCC5' : '#2D2D2A';
console.log(playerChoice);
const drawStone = (X, Y) => {
    CTXT.beginPath();
    CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false);
    CTXT.fill();
    CTXT.stroke();
};
var Player = {
    StoneColor: playerChoice,
    PlaceStone: (X, Y) => {
        CTXT.fillStyle = Player.StoneColor;
        drawStone(X, Y);
    }
};
var AI = {
    StoneColor: AIChoice,
    PlaceStone: () => {
        checkAllPatterns();
        if (visualAI)
            highlightBoard();
        setTimeout(() => {
            AI.DrawStoneOn(AI.maxScoredNode());
            clearAllScore();
            HCTX.clearRect(0, 0, 550, 550);
        }, visualAI ? 1500 : 0);
    },
    maxScoredNode: () => {
        var ARRAY = new MaxNode();
        console.time();
        let i = 1, node;
        while (i++ < 11) {
            node = nodeAt(i, 1);
            while (node.has('right')) {
                if (node.score !== 0)
                    ARRAY.add(node);
                node = node.right;
            }
        }
        console.timeEnd();
        return ARRAY.pop();
    },
    DrawStoneOn: (NODE) => {
        NODE.stone = true;
        NODE.color = AI.StoneColor;
        CTXT.fillStyle = AI.StoneColor;
        drawStone(NODE.coord_x, NODE.coord_y);
    }
};
