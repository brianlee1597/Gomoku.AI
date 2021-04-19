"use strict";
class LinkedNode {
    constructor(x, y) {
        this.exists = () => this !== null;
        this.isEmpty = () => this.stone === false;
        this.hasStone = () => this.stone === true;
        this.hasScore = () => this.score !== 0;
        this.has = (POINTER) => this[POINTER] !== undefined;
        this.to = (POINTER) => this[POINTER];
        this.colorIs = (i) => i === this.color ? true : false;
        this.x = x;
        this.y = y;
        this.name = "Node at (" + "Row " + x + ", Col " + y + ")";
        this.stone = false;
        this.score = 0;
        this.color = "";
        this.topLeft = this.up = this.topRight = undefined;
        //                    \        |         /
        this.left /*this*/ = this.right = undefined;
        //                    /        |         \
        this.bottomLeft = this.down = this.bottomRight = undefined;
    }
}
const nodeAt = (x, y) => window['nodeAt' + x + 'x' + y];
const clearAllScore = () => {
    for (let x = 1; x <= 11; x++) {
        for (let y = 1; y <= 11; y++) {
            nodeAt(x, y).score = 0;
        }
    }
};
