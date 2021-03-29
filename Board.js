/*------------Board Visualizing Animation------------*/
const canvas  = document.getElementById('boardUI')
const ctx     = canvas.getContext('2d')
const boardWH = document.getElementById('boardUI').width

function visualizeBoard() {
    let margin = 0
    while(margin <= boardWH)
    {
        drawHorizontalLine(margin)
        drawVerticalLine(margin)
        margin += 50
    }
}
/*------------Board Visualizing Animation------------*/

/*------------Make Board Grid with LinkedGrid------------*/
function makeBoard(i, j)
{
    const NUM_OF_ROWS = i
    const NUM_OF_COLS = j

    //Make x*y amount of nodes and name them boxAt + coordinate
    for(let x = 1; x <= NUM_OF_ROWS; x++){
        for(let y = 1; y <= NUM_OF_COLS; y++){
            window['boxAt' + x + 'x' + y] = new LinkedGrid(x, y)
        }
    }   
    //Doubly link all the nodes to each other by using their name properties
    for(let x = 1; x <= NUM_OF_ROWS; x++){
        for(let y = 1; y <= NUM_OF_COLS; y++){
            boxAt(x, y).left = boxAt(x, y-1)
            boxAt(x, y).right = boxAt(x, y+1)
        }
    }
}
/*------------Make Board Grid with LinkedGrid------------*/

let horizontalLine = 0
let verticalLine   = 0
const speed = 0.5

function drawHorizontalLine(m){
    function drawLine() {
        horizontalLine = horizontalLine < boardWH? horizontalLine+speed: horizontalLine;
        ctx.beginPath();
        ctx.moveTo(m+25, 0)
        ctx.lineWidth = 0.5
        ctx.strokeStyle = 'lightgrey'
        ctx.lineTo(m+25, horizontalLine)
        ctx.stroke()
        window.requestAnimationFrame(drawLine)
    }
    window.requestAnimationFrame(drawLine)
}
function drawVerticalLine(m){
    function drawLine2() {
        verticalLine = verticalLine < boardWH? verticalLine+speed: verticalLine
        ctx.beginPath()
        ctx.moveTo(0, m+25)
        ctx.lineTo(verticalLine, m+25)
        ctx.stroke()
        window.requestAnimationFrame(drawLine2)
    }
    window.requestAnimationFrame(drawLine2)
}