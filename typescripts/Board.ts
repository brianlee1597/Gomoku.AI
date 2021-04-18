const canvas = <HTMLCanvasElement> document.getElementById('boardUILayer')
const ctx = <CanvasRenderingContext2D> canvas.getContext('2d')

/*------------Make Board Grid with LinkedGrid------------*/
const makeBoard = (margin: number): void => {
    try{
        //Make x*y amount of nodes and name them nodeAt + coordinate
        for (let x: number = 1; x <= margin; x++) {
            for (let y: number = 1; y <= margin; y++) {
                window['nodeAt' + x + 'x' + y] = new LinkedGrid(x, y)
            }
        }
        //Then doubly link all the nodes to each other by using their name properties
        for (let x: number = 1; x <= margin; x++) {
            for (let y: number = 1; y <= margin; y++) {
                nodeAt(x, y).left = nodeAt(x, y - 1), nodeAt(x, y).right = nodeAt(x, y + 1)
                nodeAt(x, y).up = nodeAt(x - 1, y), nodeAt(x, y).down = nodeAt(x + 1, y)
                nodeAt(x, y).bottomLeft = nodeAt(x + 1, y - 1), nodeAt(x, y).bottomRight = nodeAt(x + 1, y + 1)
                nodeAt(x, y).topLeft = nodeAt(x - 1, y - 1), nodeAt(x, y).topRight = nodeAt(x - 1, y + 1)
            }
        }
        let coord: number = 0
        do {
            drawLine('horizontal', coord), drawLine('vertical', coord)
            coord += 550 / margin
        } while (coord <= 550)
    } catch (e){
        console.log(e)
    }
}
/*------------Make Board Grid with LinkedGrid------------*/

let line: number = 0, speed: number = 0.25

const drawLine = (hOrV: string, margin: number) => {
    const drawTheLine = (): void => {
        ctx.beginPath()
        line = line < 550 ? line + speed : line
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