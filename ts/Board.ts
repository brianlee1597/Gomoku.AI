const UICV = <HTMLCanvasElement> document.getElementById('boardUILayer')
const BCTX = <CanvasRenderingContext2D> UICV.getContext('2d')

//-----------------------------------------------------------------------//

function makeBoard (margin: number): number {
    for (let x = 1; x <= margin; x++)
        for (let y = 1; y <= margin; y++)
            window['nodeAt' + x + 'x' + y] = new GraphNode(x, y)

    for (let x = 1; x <= margin; x++)
        for (let y = 1; y <= margin; y++) {
            const NODE = nodeAt(x, y)
            NODE.left  = nodeAt(x, y - 1), NODE.bottomLeft  = nodeAt(x + 1, y - 1)
            NODE.up    = nodeAt(x - 1, y), NODE.bottomRight = nodeAt(x + 1, y + 1)
            NODE.right = nodeAt(x, y + 1), NODE.topLeft     = nodeAt(x - 1, y - 1)
            NODE.down  = nodeAt(x + 1, y), NODE.topRight    = nodeAt(x - 1, y + 1)
        }
    
    let coord = 0
    do {
        drawLine('horizontal', coord)
        drawLine('vertical',   coord)
    } while ((coord += 550 / margin) < 550)

    return 1500
}

let line: number = 25, speed = 0.25

function drawLine (h_or_v: string, margin: number): void {
    const drawPortionOfLine = (): void => {
        line = line < 525 ? line + speed : line

        BCTX.beginPath()
        BCTX.lineWidth = 1
        BCTX.strokeStyle = '#a7a7a7'

        if (h_or_v === 'horizontal') {
            BCTX.moveTo(25, margin + 25)
            BCTX.lineTo(line, margin + 25)
        }
        else {
            BCTX.moveTo(margin + 25, 25)
            BCTX.lineTo(margin + 25, line)
        }
        BCTX.stroke()

        requestAnimationFrame(drawPortionOfLine)
    }
    
    requestAnimationFrame(drawPortionOfLine)
}