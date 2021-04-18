var AICanvas = <HTMLCanvasElement> document.getElementById('botScanLayer')
var AIContext = <CanvasRenderingContext2D> AICanvas.getContext('2d')

const AIPlaceStone = (): void => {
    if (visualAI) {
        checkForAdjacent()
        checkForTwoInRow()
        scanBoard()
        highlightCtx.clearRect(0, 0, 550, 550)
        setTimeout(clearAllScore, 1000)
    }
}

const scanBoard = (): void => { //move to ai
    let i: number = 1
    const POINTER: string = POINTER_ARRAY[~~(Math.random() * 4)]
    if (POINTER === 'up')
        do { scan(nodeAt(11, i++), POINTER) } while (i <= 11)
    else if (POINTER === 'down')
        do { scan(nodeAt(1, i++),  POINTER) } while (i <= 11)
    else if (POINTER === 'left')
        do { scan(nodeAt(i++, 11), POINTER) } while (i <= 11)
    else if (POINTER === 'right')
        do { scan(nodeAt(i++, 1),  POINTER) } while (i <= 11)
    else
        throw new Error("Error on Bot.ts / scanBoard: pointer array has invalid value")
}

const scan = (node: LinkedGrid | any, POINTER: string): void => {
    let scanEachColumn = (): void => {
        setTimeout(() => {
            highlight(node)
            if (!node.has(POINTER)) {
                clearCanvas(POINTER)
                return
            }
            node = node.to(POINTER)
            scanEachColumn()
        }, 50)
    }; scanEachColumn()
}

const highlight = (NODE: LinkedGrid): void => {
    if (NODE.hasStone())
        return
    let x: number = coordinateOf(NODE.y), 
        y: number = coordinateOf(NODE.x),

    fill = (canvas: CanvasRenderingContext2D, color: string) => {
        canvas.beginPath()
        canvas.arc(x, y, 3, 0, 2 * Math.PI, false)
        canvas.fillStyle = color
        canvas.fill()
    }

    if (NODE.hasScore())
        fill(highlightCtx, colorBy(NODE.score))
    else
        fill(AIContext, 'red')
}

const clearCanvas = (POINTER: string): void => {
    let i: number
    if (POINTER === 'right' || POINTER === 'down')
        i = 0
    else if (POINTER === 'left' || POINTER === 'up')
        i = 550
    else
        throw new Error('Error on Bot.ts / clearCanvas(): input is ' + POINTER)
    let clearCol = (i: number): void => {
        setTimeout(() => {
            switch (POINTER) {
                case 'right': case 'down':
                    if (i <= 550) {
                        POINTER === 'right' ? AIContext.clearRect(0, 0, i, 550)
                                            : AIContext.clearRect(0, 0, 550, i)
                        clearCol(i + 50)
                    } break
                case 'up': case 'left':
                    if (i >= 0) {
                        POINTER === 'up' ? AIContext.clearRect(0, i, 550, 50)
                                         : AIContext.clearRect(i, 0, 50, 550)
                        clearCol(i - 50)
                    } break
            }
        }, 50)
    }; clearCol(i) // clears 1 column at a time each loop
}

const toggleVis = (): void => {
    visualAI = visualAI === false ? true : false

    let visual_text: DOMTokenList = document.querySelector('p').classList
    if( visual_text.contains('hidden') )
        visual_text.remove('hidden') 
    else
        visual_text.add('hidden')
}

const coordinateOf = (X_OR_Y: number): number => X_OR_Y * 25 + (25 * (X_OR_Y - 1))
const POINTER_ARRAY: string[] = ['up', 'down', 'right', 'left']