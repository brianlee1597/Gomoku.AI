"use strict";
class GraphNode {
    constructor(x, y) {
        this.exists = () => this !== null;
        this.isEmpty = () => this.stone === false;
        this.hasStone = () => this.stone === true;
        this.hasScore = () => this.score !== 0;
        this.has = (POINTER) => this[POINTER] !== undefined;
        this.to = (POINTER) => this[POINTER];
        this.colorIs = (i) => i === this.color ? true : false;
        this.opDirOf = (pointer) => {
            return pointer === 'up' ? this.down
                : pointer === 'down' ? this.up
                    : pointer === 'left' ? this.right
                        : pointer === 'right' ? this.left
                            : pointer === 'topLeft' ? this.bottomRight
                                : pointer === 'topRight' ? this.bottomLeft
                                    : pointer === 'bottomLeft' ? this.topRight
                                        : this.topLeft;
        };
        this.numOfPAway = (i, pointer) => {
            return i === 1 ? this[pointer]
                : i === 2 ? this[pointer][pointer]
                    : i === 3 ? this[pointer][pointer][pointer]
                        : this[pointer][pointer][pointer][pointer];
        };
        this.x = x;
        this.y = y;
        this.coord_x = y * 25 + (25 * (y - 1));
        this.coord_y = x * 25 + (25 * (x - 1));
        this.name = "Node at (" + "Row " + x + ", Col " + y + ")";
        this.stone = false;
        this.score = 0;
        this.color = "";
        this.topLeft = this.up = this.topRight = undefined;
        this.left = this.right = undefined;
        this.bottomLeft = this.down = this.bottomRight = undefined;
    }
}
class MaxNode {
    constructor() {
        this.add = (node) => {
            if (node.isEmpty()) {
                if (this.maxVal.length === 0) {
                    this.maxVal.push(node);
                }
                else if (node.score > this.maxVal[0].score) {
                    this.maxVal[0] = node;
                }
            }
        };
        this.pop = () => {
            var CHAD = this.maxVal[0];
            this.maxVal.splice(0);
            return CHAD;
        };
        this.maxVal = [];
    }
}
const POINTER_MAP = new Map([
    [1, 'up'], [2, 'down'], [3, 'left'], [4, 'right'],
    [5, 'topLeft'], [6, 'topRight'], [7, 'bottomLeft'], [8, 'bottomRight']
]);
const PATTERN_MAP = new Map([
    [1, 'up'], [2, 'right'], [3, 'topLeft'], [4, 'topRight']
]);
