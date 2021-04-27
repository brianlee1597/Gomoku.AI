class MaxNode{

    oneValuePQ: GraphNode[]

    constructor() {
        this.oneValuePQ = []
    }

    add = (node: GraphNode) => {
        if(node.isEmpty()){
            if(this.oneValuePQ.length === 0)
                this.oneValuePQ.push(node)
            else if(node.score > this.oneValuePQ[0].score)
                this.oneValuePQ[0] = node
        }
    }

    peek = () => this.oneValuePQ[0]

    dispose = (): void => {
        this.oneValuePQ = []
    }
}

