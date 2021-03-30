/*------------Board Visualizing Animation------------*/
const canvas  = document.getElementById('boardUILayer')
const ctx     = canvas.getContext('2d')

const visualizeBoard = () => {
    let margin = 0
    while(margin <= 550){
        drawHorizontalLine(margin)
        drawVerticalLine(margin)
        margin += 50
    }
}
/*------------Board Visualizing Animation------------*/

/*------------Make Board Grid with LinkedGrid------------*/
const makeBoard = (rownum, colnum) => {
    //Make x*y amount of nodes and name them nodeAt + coordinate
    for(let x = 1; x <= rownum; x++){
        for(let y = 1; y <= colnum; y++){
            window['nodeAt' + x + 'x' + y] = new LinkedGrid(x, y)
        }
    }   
    //Doubly link all the nodes to each other by using their name properties
    for(let x = 1; x <= rownum; x++){
        for(let y = 1; y <= colnum; y++){
            nodeAt(x, y).left = nodeAt(x, y-1)
            nodeAt(x, y).right =  nodeAt(x, y+1)
        }
    }
}
/*------------Make Board Grid with LinkedGrid------------*/

let horizontalLine = 0
let verticalLine   = 0
const speed = 0.5

const drawHorizontalLine = m => {
    const drawLineH = () => {
        horizontalLine = horizontalLine < 550? horizontalLine+speed: horizontalLine;
        ctx.beginPath();
        ctx.moveTo(m+25, 0)
        ctx.lineWidth = 0.5
        ctx.strokeStyle = 'lightgrey'
        ctx.lineTo(m+25, horizontalLine)
        ctx.stroke()
        window.requestAnimationFrame(drawLineH)
    }
    window.requestAnimationFrame(drawLineH)
}
const drawVerticalLine = m => {
    const drawLineV = () => {
        verticalLine = verticalLine < 550? verticalLine+speed: verticalLine
        ctx.beginPath()
        ctx.moveTo(0, m+25)
        ctx.lineTo(verticalLine, m+25)
        ctx.stroke()
        window.requestAnimationFrame(drawLineV)
    }
    window.requestAnimationFrame(drawLineV)
}