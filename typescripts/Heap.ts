class MaxNode{

    maxVal: GraphNode[]

    constructor () { this.maxVal = [] }

    add = (node: GraphNode) => {
        if(node.isEmpty()){
            if(this.maxVal.length === 0)
                this.maxVal.push(node)
            else if(node.score > this.maxVal[0].score)
                this.maxVal[0] = node
        }
    }

    pop = (): GraphNode => { 
        var CHAD = this.maxVal[0]
        this.maxVal.splice(0) 
        return CHAD
    }
}