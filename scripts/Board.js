const canvas = document.getElementById('boardUILayer')
const ctx = canvas.getContext('2d')

/*------------Board Visualizing Animation------------*/
const visualizeBoard = margin => { 
    let coord = 0; then; do {
        drawLine('horizontal', coord), drawLine('vertical', coord)
        coord += 550/margin
    } while (coord <= 550)
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
    //Then doubly link all the nodes to each other by using their name properties
    for(let x = 1; x <= rownum; x++) {
        for(let y = 1; y <= colnum; y++) {
            nodeAt(x, y).left  = nodeAt(x, y-1), nodeAt(x, y).right = nodeAt(x, y+1)
            nodeAt(x, y).up    = nodeAt(x-1, y), nodeAt(x, y).down  = nodeAt(x+1, y)
            nodeAt(x, y).bottomLeft = nodeAt(x+1, y-1), nodeAt(x, y).bottomRight = nodeAt(x+1, y+1)
            nodeAt(x, y).topLeft = nodeAt(x-1, y-1), nodeAt(x, y).topRight = nodeAt(x-1, y+1)
        }
    }
}
/*------------Make Board Grid with LinkedGrid------------*/

let line = 0, speed = 0.25

const drawLine = (hOrV, margin) => { 
    const drawTheLine = () => {
        ctx.beginPath()
        line = line < 550? line + speed: line
        ctx.lineWidth = 0.5, ctx.strokeStyle = '#e5e5e5'
        if (hOrV === 'horizontal') { 
            ctx.moveTo(0, margin + 25)
            ctx.lineTo(line, margin + 25)
        }
        else {
            ctx.moveTo(margin + 25, 0)
            ctx.lineTo(margin + 25, line)
        }
        ctx.stroke()
        window.requestAnimationFrame(drawTheLine)
    }
    window.requestAnimationFrame(drawTheLine)
}