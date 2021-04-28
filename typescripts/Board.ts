const UICV = <HTMLCanvasElement> document.getElementById('boardUILayer')
const BCTX = <CanvasRenderingContext2D> UICV.getContext('2d')

const makeBoard = (margin: number): void => {
    //Make x*y amount of nodes and name them nodeAt + coordinate
    for (let x = 1; x <= margin; x++)
        for (let y = 1; y <= margin; y++)
            window['nodeAt' + x + 'x' + y] = new GraphNode(x, y)

    //Then doubly link all the nodes to each other by using their name properties
    for (let x = 1; x <= margin; x++)
        for (let y = 1; y <= margin; y++) {
            var NODE   = nodeAt(x, y)
            NODE.left  = nodeAt(x, y - 1), NODE.bottomLeft  = nodeAt(x + 1, y - 1)
            NODE.up    = nodeAt(x - 1, y), NODE.bottomRight = nodeAt(x + 1, y + 1)
            NODE.right = nodeAt(x, y + 1), NODE.topLeft     = nodeAt(x - 1, y - 1)
            NODE.down  = nodeAt(x + 1, y), NODE.topRight    = nodeAt(x - 1, y + 1)
        }

    let coord = 0
    do {
        drawLine('horizontal', coord)
        drawLine('vertical',   coord)
    } while ((coord += 550 / margin) <= 550)
}

let line: number = 0, speed = 0.25, zero = 0

const drawLine = (H_OR_V: string, MARGIN: number) => {
    const drawTheLine = (): void => {
        line = line < 550 ? line + speed : line

        BCTX.beginPath()
        BCTX.lineWidth = 1
        BCTX.strokeStyle = '#e1e1e1'

        if (H_OR_V === 'horizontal') {
            BCTX.moveTo(zero, MARGIN + 25)
            BCTX.lineTo(line, MARGIN + 25)
        }
        else {
            BCTX.moveTo(MARGIN + 25, zero)
            BCTX.lineTo(MARGIN + 25, line)
        }

        BCTX.stroke()

        requestAnimationFrame(drawTheLine)
    }
        requestAnimationFrame(drawTheLine)
}