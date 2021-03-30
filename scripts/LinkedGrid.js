class LinkedGrid
{
    constructor(x,y)
    {
        this.x = x
        this.y = y
        this.name = "Node at ("+ "Row " + x + ", Col " + y + ")"

        this.topLeft    =  this.up     =  this.topRight     = null
//                    \        |        /
        this.left       =  this.data   =  this.right        = null
//                    /        |        \
        this.bottomLeft =  this.down   =  this.bottomRight  = null
    }
    exists  = () => { return this !== null       }
    isEmpty = () => { return this.data === null  }
    has = (pointer) => {
        return pointer === 'left'?  this.left  !== null
              :pointer === 'right'? this.right !== null
              :pointer === 'up'?    this.up    !== null
              :pointer === 'down'?  this.down  !== null
              :pointer === 'topLeft'?  this.topLeft  !== null
              :pointer === 'topRight'? this.topRight !== null
              :pointer === 'bottomLeft'?  this.bottomLeft  !== null
              :pointer === 'bottomRight'? this.bottomRight !== null
              :false
    }
}

const nodeAt = (x,y) => {
    const  node  = window['nodeAt' + x + 'x' + y]
    return node != undefined? node: null
}