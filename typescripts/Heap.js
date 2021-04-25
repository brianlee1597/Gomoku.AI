"use strict";
class MaxHeap {
    constructor() {
        this.parent = (index) => Math.floor((index - 1) / 2);
        this.leftChild = (index) => (index * 2) + 1;
        this.rightChild = (index) => (index * 2) + 2;
        this.isLeaf = (index) => {
            return index >= Math.floor(this.pQueue.length / 2) && index <= this.pQueue.length - 1;
        };
        this.swap = (index1, index2) => {
            [this.pQueue[index1], this.pQueue[index2]] = [this.pQueue[index2], this.pQueue[index1]];
        };
        this.add = (node) => {
            this.pQueue.push(node);
            this.percolateUp(this.pQueue.length - 1);
        };
        this.percolateUp = (index) => {
            let currIndex = index, parentIndex = this.parent(currIndex);
            while (currIndex > 0 && this.pQueue[currIndex] > this.pQueue[parentIndex]) {
                this.swap(currIndex, parentIndex);
                currIndex = parentIndex;
                parentIndex = this.parent(parentIndex);
            }
        };
        this.peek = () => this.pQueue[0];
        this.dispose = () => {
            this.pQueue = [];
        };
        this.pQueue = [];
    }
}
