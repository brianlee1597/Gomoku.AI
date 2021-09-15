const AICV = <HTMLCanvasElement> document.getElementById('botScanLayer')
const AICX = <CanvasRenderingContext2D> AICV.getContext('2d')
const HLCV = <HTMLCanvasElement> document.getElementById('scoredNodeHighlightLayer')
const HCTX = <CanvasRenderingContext2D> HLCV.getContext('2d')

//-----------------------------------------------------------------------//

function highlightBoardWithEmphasisOn (maxNode: GraphNode): void {
    let random_margin: number = ~~(Math.random() * 4 + 1)
    let pointer: string = POINTER_MAP.get(random_margin)

    let i = 0
    while (i <= 11)
        highlight(i++, pointer, maxNode)
}

function highlight (i: number, POINTER: string, maxNode: GraphNode): void {
    let node: node = POINTER === 'up'   ? nodeAt(11, i)
                    :POINTER === 'down' ? nodeAt(1,  i)
                    :POINTER === 'left' ? nodeAt(i, 11)
                    :POINTER === 'right'? nodeAt(i,  1)
                    :null
 
    scanEachColumn(node, POINTER, maxNode)
}

function scanEachColumn (node: any, pointer: string, maxNode: GraphNode): void { 
    setTimeout(async (): Promise<void> => {
        await twinkle(node, maxNode)
        
        if (node === undefined)
            return 

        if (node.has(pointer) === false) {
            clearCanvas(pointer) 
        } else {
            node = node.at(pointer)
            scanEachColumn(node, pointer, maxNode)
        }
    }, 50)
}

async function twinkle (NODE: GraphNode, MAX_NODE: GraphNode): Promise<void> {
    if (NODE === undefined || NODE.hasStone())
        return

    let fill = (canvas: CanvasRenderingContext2D): void => {
        canvas.fillStyle = colorBy(NODE.score)
        canvas.beginPath()
        canvas.arc(NODE.coord_x, NODE.coord_y, 
            NODE.score === MAX_NODE.score ? 5 : 2.5, 0, 2 * Math.PI, false)
        canvas.fill()
    }

    fill(NODE.hasScore() ? HCTX : AICX)
}

function clearCanvas (pointer: string): void {
    let i: number = pointer === 'right' || pointer === 'down'? 0: 550
    let clearCol  = (i: number): void => {

        if(i > 550 || i < 0) 
            return

        setTimeout((): void => {
            if (pointer === 'right' || pointer === 'down') {
                pointer === 'right' ? AICX.clearRect(0, 0, i, 550)
                                    : AICX.clearRect(0, 0, 550, i)
                clearCol(i + 50)
            }
            else {
                pointer === 'left'  ? AICX.clearRect(i, 0, 50, 550)
                                    : AICX.clearRect(0, i, 550, 50)
                clearCol(i - 50)
            }
        }, 50)

    }
    clearCol(i)
}

async function clearAllScoreAndHighLights (): Promise<void> {
    let clearScore = async (): Promise<void> => {
        for (let i = 1; i <= 11; i++) {
            var node: any = nodeAt(i, 1)
            
            while (node !== undefined) {
                node.score === 0
                node.checked === false
                node = node.right
            }
        }
    }

    await clearScore()
    HCTX.clearRect(0, 0, 550, 550)
}

let visualAI: boolean = false

function toggleVisual (): void {
    let text: HTMLParagraphElement = document.querySelector('p')
    visualAI = visualAI === true ? false : true

    if (text.hasAttribute('hidden')) {
        text.removeAttribute('hidden')
    } else {
        text.setAttribute('hidden', '')
    }
}