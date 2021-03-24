class LinkedGrid
{
    constructor(x,y)
    {
        this.x = x
        this.y = y
        this.name = "Box At: "+ "(" + x + ", " + y + ")"

        this.topLeft    =  this.up     =  this.topRight     = null
//                    \        |        /
        this.left       =  this.data   =  this.right        = null
//                    /        |        \
        this.bottomLeft =  this.down   =  this.bottomRight  = null
    }

    exists(){
        return boxAt(x, y)
    }
    isEmpty(){
        return this.data === null
    }
    hasNextLeft(){
        return boxAt(x, y).left !== null
    }
    hasNextRight(){
        return boxAt(x, y).right !== null
    }
}

function boxAt(x,y) 
{
    const  boxAt = window['boxAt' + x + y] != undefined? window['boxAt' + x + y]: null
    return boxAt
}