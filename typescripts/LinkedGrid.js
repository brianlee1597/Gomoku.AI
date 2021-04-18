"use strict";
var LinkedGrid = /** @class */ (function () {
    function LinkedGrid(x, y) {
        var _this = this;
        this.exists = function () { return _this !== null; };
        this.isEmpty = function () { return _this.stone === false; };
        this.hasStone = function () { return _this.stone === true; };
        this.hasScore = function () { return _this.score !== 0; };
        this.has = function (POINTER) {
            switch (POINTER) {
                case 'up':
                    return _this.up !== undefined;
                case 'down':
                    return _this.down !== undefined;
                case 'left':
                    return _this.left !== undefined;
                case 'right':
                    return _this.right !== undefined;
                case 'topLeft':
                    return _this.topLeft !== undefined;
                case 'topRight':
                    return _this.topRight !== undefined;
                case 'bottomLeft':
                    return _this.bottomLeft !== undefined;
                case 'bottomRight':
                    return _this.bottomRight !== undefined;
            }
            throw new Error('LinkedGrid / has() Line 38: illegal pointer argument');
        };
        this.to = function (POINTER) {
            if (POINTER === 'up')
                return _this.up;
            if (POINTER === 'down')
                return _this.down;
            if (POINTER === 'left')
                return _this.left;
            if (POINTER === 'right')
                return _this.right;
            throw new Error("LinkedGrid.js to() Line 59: illegal pointer parameter");
        };
        this.colorIs = function (i) { return i === _this.color ? true : false; };
        this.x = x;
        this.y = y;
        this.name = "Node at (" + "Row " + x + ", Col " + y + ")";
        this.stone = false;
        this.score = 0;
        this.color = "";
        this.topLeft = this.up = this.topRight = undefined;
        //                    \        |        /
        this.left = this.right = undefined;
        //                    /        |        \
        this.bottomLeft = this.down = this.bottomRight = undefined;
    }
    return LinkedGrid;
}());
var nodeAt = function (x, y) {
    return window['nodeAt' + x + 'x' + y];
};
var clearAllScore = function () {
    for (var x_1 = 1; x_1 <= 11; x_1++) {
        for (var y_1 = 1; y_1 <= 11; y_1++) {
            nodeAt(x_1, y_1).score = 0;
        }
    }
};
