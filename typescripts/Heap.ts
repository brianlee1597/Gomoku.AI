class MaxHeap{

    pQueue: GraphNode[]

    constructor() {
        this.pQueue = []
    }

    parent     = (index: number): number => Math.floor((index - 1) / 2)

    leftChild  = (index: number): number => (index * 2) + 1

    rightChild = (index: number): number => (index * 2) + 2

    isLeaf     = (index: number): boolean => {
        return index >= Math.floor(this.pQueue.length / 2) && index <= this.pQueue.length - 1
    }

    swap = (index1: number, index2: number): void => {
        [this.pQueue[index1], this.pQueue[index2]] = [this.pQueue[index2], this.pQueue[index1]];
    }

    add = (node: GraphNode): void => {
        this.pQueue.push(node)
        this.percolateUp(this.pQueue.length - 1)
    }

    percolateUp = (index: number): void => {
        let currIndex = index, parentIndex = this.parent(currIndex)
        while (currIndex > 0 && this.pQueue[currIndex] > this.pQueue[parentIndex]){
            this.swap(currIndex, parentIndex)
            currIndex   = parentIndex
            parentIndex = this.parent(parentIndex)
        }
    }

    peek = (): GraphNode => this.pQueue[0]

    dispose = (): void => {
        this.pQueue = []
    }
}

