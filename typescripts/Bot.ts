const AICV = <HTMLCanvasElement> document.getElementById('botScanLayer'),
      AICX = <CanvasRenderingContext2D> AICV.getContext('2d'),
      HLCV = <HTMLCanvasElement> document.getElementById('scoredNodeHighlightLayer'),
      HCTX = <CanvasRenderingContext2D> HLCV.getContext('2d')

const AIPlaceStone = (): void => {
    checkAllPatterns()
    var MAX_NODE = maxScoredNode()

    if (visualAI) {
        highlightBoard()
        setTimeout(() => {
            clearAllScore()
            HCTX.clearRect(0, 0, 550, 550)
            AIDrawStone(MAX_NODE)
        }, 1500)
    }
    else {
        clearAllScore()
        AIDrawStone(MAX_NODE)
    }
}

const AIDrawStone = (NODE: GraphNode): void => {
    NODE.stone = true
    NODE.color,
    CTXT.fillStyle = AIStoneColor 
    CTXT.beginPath()
    CTXT.arc(NODE.coord_x, NODE.coord_y, 20, 0, 2 * Math.PI, false)
    CTXT.fill()
    CTXT.stroke()
}

const maxScoredNode = (): GraphNode => {
    var ARRAY = new MaxNode()

    for (let i = 1; i <= 11; i++) {
        let node: any = nodeAt(i, 1)
        while (node.has('right')) {
                ARRAY.add(node)
                node = node.right
        }
    }
    
    return ARRAY.pop()
}

const highlightBoard = (): void => {
    let i: number = 1, random = ~~(Math.random() * 4 + 1)
    const POINTER: string = POINTER_MAP.get(random)

    if (POINTER === 'up')
        do { highlight(nodeAt(11, i++), POINTER) } while (i <= 11)
    else if (POINTER === 'down')
        do { highlight(nodeAt(1, i++),  POINTER) } while (i <= 11)
    else if (POINTER === 'left')
        do { highlight(nodeAt(i++, 11), POINTER) } while (i <= 11)
    else if (POINTER === 'right')
        do { highlight(nodeAt(i++, 1),  POINTER) } while (i <= 11)
}

const highlight = (node: GraphNode | any, POINTER: string): void => {
    let scanEachColumn = (): void => { 
        setTimeout(() => {
            twinkle(node)

            if (node.has(POINTER)){
                node = node.to(POINTER)
                scanEachColumn()
            }
            else
                clearCanvas(POINTER)

        }, 50)
    }; scanEachColumn()
}

const twinkle = (NODE: GraphNode): void => {
    if (NODE.hasStone())
        return

    const fill = (canvas: CanvasRenderingContext2D, color: string) => {
        canvas.beginPath()
        canvas.arc(NODE.coord_x, NODE.coord_y, 2.5, 0, 2 * Math.PI, false)
        canvas.fillStyle = color
        canvas.fill()
    }

    if (NODE.hasScore()) 
        fill(HCTX, colorBy(NODE.score))
    else 
        fill(AICX, 'grey')
}

const clearCanvas = (POINTER: string): void => {
    let i: number = POINTER === 'right' || POINTER === 'down'? 0: 550
    let clearCol  = (i: number): void => {

        if(i > 550 || i < 0) return

        setTimeout(() => {
            if (POINTER === 'right' || POINTER === 'down') {
                POINTER === 'right' ? AICX.clearRect(0, 0, i, 550)
                                    : AICX.clearRect(0, 0, 550, i)
                clearCol(i + 50)
            }
            else {
                POINTER === 'left'  ? AICX.clearRect(i, 0, 50, 550)
                                    : AICX.clearRect(0, i, 550, 50)
                clearCol(i - 50)
            }
        }, 50)

    }; clearCol(i) // clears 1 column at a time each loop
}

const colorBy = (SCORE: number): string => {
    return SCORE < 1? 'transparent': SCORE < 2? 'red'   :
           SCORE < 3? 'orange'     : SCORE < 4? 'yellow':
           SCORE < 5? 'green'      : SCORE < 6? 'blue'  :
           SCORE < 7? 'violet'     : SCORE < 8? 'grey'  :
           'black'
}

const toggleVis = (): void => {
    visualAI = visualAI === false ? true : false

    var VISUAL_TEXT: DOMTokenList = document.querySelector('p').classList

    VISUAL_TEXT.contains('hidden')?
    VISUAL_TEXT.remove('hidden')  :
    VISUAL_TEXT.add('hidden')
}