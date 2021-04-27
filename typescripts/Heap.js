"use strict";
class MaxNode {
    constructor() {
        this.add = (node) => {
            if (node.isEmpty()) {
                if (this.oneValuePQ.length === 0)
                    this.oneValuePQ.push(node);
                else if (node.score > this.oneValuePQ[0].score)
                    this.oneValuePQ[0] = node;
            }
        };
        this.peek = () => this.oneValuePQ[0];
        this.dispose = () => {
            this.oneValuePQ = [];
        };
        this.oneValuePQ = [];
    }
}
