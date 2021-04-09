class LinkedGrid {

    constructor (x,y) 
    {
        this.x = x
        this.y = y
        this.name  = "Node at ("+ "Row " + x + ", Col " + y + ")"
        this.stone = false
        this.score = 0

        this.topLeft    =  this.up     =  this.topRight     = null
//                    \        |        /
        this.left       =  this.data   =  this.right        = null
//                    /        |        \
        this.bottomLeft =  this.down   =  this.bottomRight  = null
    }

    exists   = () => this !== null
    isEmpty  = () => this.data === null
    hasStone = () => this.stone === true
    hasScore = () => this.score !== 0
    has = pointer => {
        return pointer === 'up'? this.up !== null
              :pointer === 'down'? this.down !== null
              :pointer === 'left'? this.left !== null
              :pointer === 'right'? this.right !== null
              :pointer === 'topLeft'? this.topLeft !== null
              :pointer === 'topRight'? this.topRight !== null
              :pointer === 'bottomLeft'? this.bottomLeft !== null
              :pointer === 'bottomRight'? this.bottomRight !== null
              :console.log('Error on pointer: ' + pointer + ' doesnt exist on LinkedGrid')
    }
    to = (dir) => {
        return dir === 'up'?    this.up
              :dir === 'down'?  this.down
              :dir === 'left'?  this.left
              :dir === 'right'? this.right
              :console.log('Error on to(dir): input is ' + dir)
    }
}

const nodeAt = (x,y) => {
    const  node  = window['nodeAt' + x + 'x' + y]
    return node != undefined? node: null
}

const clearAllScore = () => {
    for(let x = 1; x <= 11; x++){
        for(let y = 1; y <= 11; y++){
            nodeAt(x ,y).score = 0
        }
    }
}