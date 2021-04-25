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
            return pointer === 'left' ? this.right
                : pointer === 'right' ? this.left
                    : pointer === 'up' ? this.down
                        : pointer === 'down' ? this.up
                            : pointer === 'topLeft' ? this.bottomRight
                                : pointer === 'topRight' ? this.bottomLeft
                                    : pointer === 'bottomLeft' ? this.topRight
                                        : this.topLeft;
        };
        this.numOfPAway = (i, pointer) => {
            return i === 2 ? this[pointer][pointer]
                : i === 3 ? this[pointer][pointer][pointer]
                    : i === 4 ? this[pointer][pointer][pointer][pointer]
                        : this[pointer][pointer][pointer][pointer][pointer];
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
const nodeAt = (x, y) => window['nodeAt' + x + 'x' + y];
const clearAllScore = () => {
    for (let x = 1; x <= 11; x++) {
        for (let y = 1; y <= 11; y++) {
            nodeAt(x, y).score = 0;
        }
    }
};
