const AICanvas = <HTMLCanvasElement> document.getElementById('botScanLayer')
const AIContext = <CanvasRenderingContext2D> AICanvas.getContext('2d')

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
    const dir: string = dirArr[~~(Math.random() * 4)]
    if (dir === 'up')
        do { scan(nodeAt(11, i++), dir) } while (i <= 11)
    else if (dir === 'down')
        do { scan(nodeAt(1, i++), dir) } while (i <= 11)
    else if (dir === 'left')
        do { scan(nodeAt(i++, 11), dir) } while (i <= 11)
    else if (dir === 'right')
        do { scan(nodeAt(i++, 1), dir) } while (i <= 11)
    else
        throw new Error("Error on Bot.ts / scanBoard: dir array has invalid value")
}

const scan = (node: LinkedGrid | any, dir: string): void => {
    let scanEachColumn = (): void => {
        setTimeout(() => {
            highlight(node)
            if (!node.has(dir)) {
                clearCanvas(dir)
                return
            }
            node = node.to(dir)
            scanEachColumn()
        }, 50)
    }; scanEachColumn()
}

const highlight = (node: LinkedGrid): void => {
    if (node.hasStone())
        return
    const x: number = coordinateOf(node.y), y: number = coordinateOf(node.x),
    fill = (canvas: CanvasRenderingContext2D, color: string) => {
        canvas.beginPath()
        canvas.arc(x, y, 3, 0, 2 * Math.PI, false)
        canvas.fillStyle = color
        canvas.fill()
    }
    if (node.hasScore())
        fill(highlightCtx, colorBy(node.score))
    else
        fill(AIContext, 'red')
}

const clearCanvas = (dir: string): void => {
    let i: number
    if (dir === 'right' || dir === 'down')
        i = 0
    else if (dir === 'left' || dir === 'up')
        i = 550
    else
        throw new Error('Error on Bot.ts / clearCanvas(): input is ' + dir)
    let clearCol = (i: number): void => {
        setTimeout(() => {
            switch (dir) {
                case 'right': case 'down':
                    if (i <= 550) {
                        dir === 'right' ? AIContext.clearRect(0, 0, i, 550)
                            : AIContext.clearRect(0, 0, 550, i)
                        clearCol(i + 50)
                    } break
                case 'up': case 'left':
                    if (i >= 0) {
                        dir === 'up' ? AIContext.clearRect(0, i, 550, 50)
                            : AIContext.clearRect(i, 0, 50, 550)
                        clearCol(i - 50)
                    } break
            }
        }, 50)
    }; clearCol(i + 50) // i+50 = clears 1 column at a time each loop
}

const toggleVis = (): void => {
    visualAI = visualAI === false ? true : false
    const vizAlert: DOMTokenList = document.querySelector('p').classList
    vizAlert.contains('hidden') ? vizAlert.remove('hidden') : vizAlert.add('hidden')
}

const coordinateOf = (xOrY: number): number => xOrY * 25 + (25 * (xOrY - 1))
const dirArr: string[] = ['up', 'down', 'right', 'left']