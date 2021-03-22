class LinkedGrid
{
    constructor(x,y)
    {
        this.name = "Box At: "+ "(" + x + ", " + y + ")"
        this.data = null
        this.x = x
        this.y = y
        this.left  = null
        this.right = null
        this.up    = null
        this.down  = null
        this.bottomLeft  = null
        this.bottomRight = null
        this.topLeft     = null
        this.topRight    = null
    }
}

function boxAt(x,y) 
{
    return window['boxAt' + x + y]
}

function makeBoard(x, y)
{
    const NUM_OF_ROWS = x
    const NUM_OF_COLS = y

    for(let x = 1; x <= NUM_OF_ROWS; x++)
    {
        for(let y = 1; y <= NUM_OF_COLS; y++){
            window['boxAt' + x + y] = new LinkedGrid(x, y)
        }
    }   

    for(let x = 1; x < NUM_OF_ROWS; x++)
    {
        for(let y = 1; y < NUM_OF_COLS; y++){
            window['boxAt' + x + y].left  = window['boxAt' + (x-1) + y] == undefined? null: window['boxAt' + (x-1) + y]
            window['boxAt' + x + y].right = window['boxAt' + (x+1) + y] == undefined? null: window['boxAt' + (x+1) + y]
            window['boxAt' + x + y].up    = window['boxAt' + x + (y-1)] == undefined? null: window['boxAt' + x + (y-1)]
            window['boxAt' + x + y].down  = window['boxAt' + x + (y+1)] == undefined? null: window['boxAt' + x + (y+1)]
            window['boxAt' + x + y].bottomLeft  = window['boxAt' + (x-1) + (y+1)] == undefined? null: window['boxAt' + (x-1) + (y+1)]
            window['boxAt' + x + y].bottomRight = window['boxAt' + (x+1) + (y+1)] == undefined? null: window['boxAt' + (x+1) + (y+1)]
            window['boxAt' + x + y].topLeft     = window['boxAt' + (x-1) + (y-1)] == undefined? null: window['boxAt' + (x-1) + (y-1)]
            window['boxAt' + x + y].topRight    = window['boxAt' + (x+1) + (y-1)] == undefined? null: window['boxAt' + (x+1) + (y-1)]
        }   
    }
}