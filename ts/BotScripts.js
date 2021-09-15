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
const AICV = document.getElementById('botScanLayer');
const AICX = AICV.getContext('2d');
const HLCV = document.getElementById('scoredNodeHighlightLayer');
const HCTX = HLCV.getContext('2d');
function highlightBoardWithEmphasisOn(maxNode) {
    let random_margin = ~~(Math.random() * 4 + 1);
    let pointer = POINTER_MAP.get(random_margin);
    let i = 0;
    while (i <= 11)
        highlight(i++, pointer, maxNode);
}
function highlight(i, POINTER, maxNode) {
    let node = POINTER === 'up' ? nodeAt(11, i)
        : POINTER === 'down' ? nodeAt(1, i)
            : POINTER === 'left' ? nodeAt(i, 11)
                : POINTER === 'right' ? nodeAt(i, 1)
                    : null;
    scanEachColumn(node, POINTER, maxNode);
}
function scanEachColumn(node, pointer, maxNode) {
    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
        yield twinkle(node, maxNode);
        if (node === undefined)
            return;
        if (node.has(pointer) === false) {
            clearCanvas(pointer);
        }
        else {
            node = node.at(pointer);
            scanEachColumn(node, pointer, maxNode);
        }
    }), 50);
}
function twinkle(NODE, MAX_NODE) {
    return __awaiter(this, void 0, void 0, function* () {
        if (NODE === undefined || NODE.hasStone())
            return;
        let fill = (canvas) => {
            canvas.fillStyle = colorBy(NODE.score);
            canvas.beginPath();
            canvas.arc(NODE.coord_x, NODE.coord_y, NODE.score === MAX_NODE.score ? 5 : 2.5, 0, 2 * Math.PI, false);
            canvas.fill();
        };
        fill(NODE.hasScore() ? HCTX : AICX);
    });
}
function clearCanvas(pointer) {
    let i = pointer === 'right' || pointer === 'down' ? 0 : 550;
    let clearCol = (i) => {
        if (i > 550 || i < 0)
            return;
        setTimeout(() => {
            if (pointer === 'right' || pointer === 'down') {
                pointer === 'right' ? AICX.clearRect(0, 0, i, 550)
                    : AICX.clearRect(0, 0, 550, i);
                clearCol(i + 50);
            }
            else {
                pointer === 'left' ? AICX.clearRect(i, 0, 50, 550)
                    : AICX.clearRect(0, i, 550, 50);
                clearCol(i - 50);
            }
        }, 50);
    };
    clearCol(i);
}
function clearAllScoreAndHighLights() {
    return __awaiter(this, void 0, void 0, function* () {
        let clearScore = () => __awaiter(this, void 0, void 0, function* () {
            for (let i = 1; i <= 11; i++) {
                var node = nodeAt(i, 1);
                while (node !== undefined) {
                    node.score === 0;
                    node.checked === false;
                    node = node.right;
                }
            }
        });
        yield clearScore();
        HCTX.clearRect(0, 0, 550, 550);
    });
}
let visualAI = false;
function toggleVisual() {
    let text = document.querySelector('p');
    visualAI = visualAI === true ? false : true;
    if (text.hasAttribute('hidden')) {
        text.removeAttribute('hidden');
    }
    else {
        text.setAttribute('hidden', '');
    }
}
