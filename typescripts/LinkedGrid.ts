class LinkedNode {

    x: number
    y: number
    coord_x: number
    coord_y: number
    name: string
    stone: boolean
    score: number
    color: string
    topLeft:     LinkedNode | void
    up:          LinkedNode | void
    topRight:    LinkedNode | void
    left:        LinkedNode | void
    right:       LinkedNode | void
    bottomLeft:  LinkedNode | void
    down:        LinkedNode | void
    bottomRight: LinkedNode | void

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

    to  = (POINTER: string): LinkedNode | void => this[POINTER]

    colorIs   = (i: string): boolean => i === this.color? true: false
}

const nodeAt = (x: number,y: number): LinkedNode => window['nodeAt' + x + 'x' + y]

const clearAllScore = (): void => {
    for(let x: number = 1; x <= 11; x++){
        for(let y: number = 1; y <= 11; y++){
            nodeAt(x ,y).score = 0
        }
    }
}