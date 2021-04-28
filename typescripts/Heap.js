"use strict";
class MaxNode {
    constructor() {
        this.add = (node) => {
            if (node.isEmpty()) {
                if (this.maxVal.length === 0)
                    this.maxVal.push(node);
                else if (node.score > this.maxVal[0].score)
                    this.maxVal[0] = node;
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
