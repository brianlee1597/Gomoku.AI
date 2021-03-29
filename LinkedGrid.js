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
        return this !== null
    }
    isEmpty(){
        return this.data === null
    }
    hasNextLeft(){
        return this.left !== null
    }
    hasNextRight(){
        return this.right !== null
    }
}

function boxAt(x,y) 
{
    const  boxAt = window['boxAt' + x + 'x' + y] != undefined? window['boxAt' + x + 'x' + y]: null
    return boxAt
}