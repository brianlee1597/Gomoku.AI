type node = GraphNode | void

class GraphNode {

    x: number
    y: number
    coord_x: number
    coord_y: number
    name : string
    stone: boolean
    score: number
    color: string
    topLeft:     node
    up:          node
    topRight:    node
    left:        node
    right:       node
    bottomLeft:  node
    down:        node
    bottomRight: node
    checked: boolean

    constructor (x: number, y: number) 
    {
        this.x = x
        this.y = y
        this.coord_x = y * 25 + (25 * (y - 1))
        this.coord_y = x * 25 + (25 * (x - 1))
        this.name  = "Node at ("+ "Row " + x + ", Col " + y + ")"
        this.stone = false
        this.score = 0
        this.color = ""
        this.checked = false

        this.topLeft    =  this.up      =  this.topRight     = undefined
//                    \        |         /
        this.left           /*this*/    =  this.right        = undefined
//                    /        |         \
        this.bottomLeft =  this.down    =  this.bottomRight  = undefined
    }

    exists   = (): boolean => this !== null

    isEmpty  = (): boolean => this.stone === false

    hasStone = (): boolean => this.stone === true

    hasScore = (): boolean => this.score !== 0

    has = (POINTER: string): boolean | void => this[POINTER] !== undefined

    to  = (POINTER: string): node=> this[POINTER]

    colorIs   = (i: string): boolean => i === this.color ? true : false

    opDirOf = (pointer: string): node => {
        return pointer === 'up'? this.down
              :pointer === 'down'? this.up
              :pointer === 'left'? this.right
              :pointer === 'right'? this.left
              :pointer === 'topLeft'? this.bottomRight
              :pointer === 'topRight'? this.bottomLeft
              :pointer === 'bottomLeft'? this.topRight
              :this.topLeft
    }

    numOfPAway = (i: number, pointer: string): node => {
        return i === 1? this[pointer]
              :i === 2? this[pointer][pointer]
              :i === 3? this[pointer][pointer][pointer]
              :this[pointer][pointer][pointer][pointer]
    }

    isChecked = (): boolean => this.checked
}

class MaxNode {

    maxVal: GraphNode[]

    constructor () { this.maxVal = [] }

    add = (node: GraphNode) => {
        if(node.isEmpty()){
            if (!this.maxVal.length) 
                this.maxVal.push(node)
            else if (node.score > this.maxVal[0].score){
                this.maxVal[0] = node
        }
    }
}

    pop = (): GraphNode => { 
        var CHAD = this.maxVal[0]
        this.maxVal.splice(0)
        return CHAD
    }
}

const POINTER_MAP: Map<number, string> = new Map([
    [1, 'up'], [2, 'down'], [3, 'left'], [4, 'right'],
    [5, 'topLeft'], [6, 'topRight'], [7, 'bottomLeft'], [8, 'bottomRight']
])

const PATTERN_MAP: Map<number, string> = new Map([
    [1, 'up'], [2, 'right'], [3, 'topLeft'], [4, 'topRight'], [5, 'left'], [6, 'down'],
    [7, 'bottomLeft'], [8, 'bottomRight']
])