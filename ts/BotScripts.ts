const AICV = <HTMLCanvasElement> document.getElementById('botScanLayer'),
      AICX = <CanvasRenderingContext2D> AICV.getContext('2d'),
      HLCV = <HTMLCanvasElement> document.getElementById('scoredNodeHighlightLayer'),
      HCTX = <CanvasRenderingContext2D> HLCV.getContext('2d')

const highlightBoardWithEmphasisOn = (maxNode: GraphNode): void => {
    const RANDOM_MARGIN = ~~(Math.random() * 4 + 1),
    POINTER: string = POINTER_MAP.get(RANDOM_MARGIN)

    let i = 0
    while(i++ < 11) highlight(i, POINTER, maxNode) 
}

const highlight = (i: number, POINTER: string, maxNode: GraphNode): void => {
    let node: node = POINTER === 'up'   ? nodeAt(11, i)
                    :POINTER === 'down' ? nodeAt(1, i)
                    :POINTER === 'left' ? nodeAt(i, 11)
                    :POINTER === 'right'? nodeAt(i, 1): null
 
    scanEachColumn(node, POINTER, maxNode)
}

const scanEachColumn = (node: any, POINTER: string, maxNode: GraphNode): void => { 
    setTimeout(() => {
        twinkle(node, maxNode)
        
        if (node.has(POINTER)){
            node = node.to(POINTER)
            scanEachColumn(node, POINTER, maxNode)
        }
        else
            clearCanvas(POINTER)
    }, 50)
}

const twinkle = (NODE: GraphNode, MAX_NODE: GraphNode): void => {
    if (NODE.hasStone())
        return

    var fill = (canvas: CanvasRenderingContext2D) => {
        canvas.fillStyle = colorBy(NODE.score)
        canvas.beginPath()
        canvas.arc(NODE.coord_x, NODE.coord_y, NODE.score === MAX_NODE.score ? 5 : 2.5, 0, 2 * Math.PI, false)
        canvas.fill()
    }

    fill(NODE.hasScore() ? HCTX : AICX)
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

    }
    clearCol(i)
}

const colorBy = (SCORE: number): string => {
    return SCORE < 1? 'white'      : SCORE < 2? 'red'   :
           SCORE < 3? 'orange'     : SCORE < 4? 'yellow':
           SCORE < 5? 'green'      : SCORE < 6? 'blue'  :
           SCORE < 7? 'violet'     : SCORE < 8? 'grey'  :
           'black'
}

const clearAllScoreAndHighLights = (): void => {
    for(let x: number = 1; x <= 11; x++) 
        for(let y: number = 1; y <= 11; y++)
            nodeAt(x ,y).score = 0

    HCTX.clearRect(0, 0, 550, 550)
}

let visualAI: boolean = false

const toggleVisual = (): void => {
    var text: HTMLParagraphElement = document.querySelector('p')

    visualAI = visualAI === true ? false : true
    text.hasAttribute('hidden')?
    text.removeAttribute('hidden'):
    text.setAttribute('hidden', '')
}