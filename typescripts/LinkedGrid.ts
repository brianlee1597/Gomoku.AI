class LinkedGrid {

    x: number
    y: number
    name: string
    stone: boolean
    score: number
    color: string
    topLeft: LinkedGrid | void
    up: LinkedGrid | void
    topRight: LinkedGrid | void
    left: LinkedGrid | void
    right: LinkedGrid | void
    bottomLeft: LinkedGrid | void
    down: LinkedGrid | void
    bottomRight: LinkedGrid | void

    constructor (x: number, y: number) 
    {
        this.x = x
        this.y = y
        this.name  = "Node at ("+ "Row " + x + ", Col " + y + ")"
        this.stone = false
        this.score = 0
        this.color = ""

        this.topLeft    =  this.up     =  this.topRight     = undefined
//                    \        |        /
        this.left                      =  this.right        = undefined
//                    /        |        \
        this.bottomLeft =  this.down   =  this.bottomRight  = undefined
    }

    exists   = (): boolean => this !== null
    isEmpty  = (): boolean => this.stone === false
    hasStone = (): boolean => this.stone === true
    hasScore = (): boolean => this.score !== 0
    has = (pointer: string): boolean | void => {
        switch (pointer) {
            case 'up':
                return this.up !== undefined
            case 'down':
                return this.down !== undefined
            case 'left':
                return this.left !== undefined
            case 'right':
                return this.right !== undefined
            case 'topLeft':
                return this.topLeft !== undefined
            case 'topRight':
                return this.topRight !== undefined
            case 'bottomLeft':
                return this.bottomLeft !== undefined
            case 'bottomRight':
                return this.bottomRight !== undefined
        }
        throw new Error('Error on LinkedGrid / has: ' + pointer + ' doesnt exist on LinkedGrid')
    }
    to = (dir: string): LinkedGrid | void => {
        if (dir === 'up') 
            return this.up
        if (dir === 'down') 
            return this.down
        if (dir === 'left') 
            return this.left
        if (dir === 'right') 
            return this.right
        throw new Error("Error on LinkedGrid.js Line 50: No matching dir")
    }
    colorIs = (i: string): boolean => i === this.color? true: false
}

const nodeAt = (x: number,y: number): LinkedGrid => {
    return window['nodeAt' + x + 'x' + y]
}

const clearAllScore = (): void => {
    for(let x: number = 1; x <= 11; x++){
        for(let y: number = 1; y <= 11; y++){
            nodeAt(x ,y).score = 0
        }
    }
}