const STCV = <HTMLCanvasElement> document.getElementById('placeStoneLayer')
const CTXT = <CanvasRenderingContext2D> STCV.getContext('2d')
const playerChoice = '#CBB9A8'
const AIChoice = playerChoice == '#CBB9A8' ? '#1F271B' : '#CBB9A8'

//-----------------------------------------------------------------------//

async function drawStone (X: number, Y: number): Promise<void> {
    CTXT.beginPath()
    CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false)
    CTXT.fill(), CTXT.stroke()
}

async function checkIfFive (fillStyle: string, rootNode: GraphNode): Promise<void> {
    let recursivelyCountUntilFive = (count: number, node: GraphNode, direction: string): void => {

        if(count === 5) 
            endGame(fillStyle)
        else if (!node.has(direction) || 
            node.at(direction).isEmpty() || 
            node.at(direction).color !== fillStyle)
            return
        else 
            recursivelyCountUntilFive(count + 1, node[direction], direction)
    }

    POINTER_MAP.forEach(direction => recursivelyCountUntilFive(1, rootNode, direction))
}

//-----------------------------------------------------------------------//

interface Players {
    StoneColor: string
    PlaceStone: (X?: number, Y?: number) => Promise<void>
    [key: string]: any
}

const Player: Players = {
    StoneColor: playerChoice,
    PlaceStone: async (X: number, Y: number): Promise<void> => {
        CTXT.fillStyle = Player.StoneColor
        await drawStone(X, Y)

        var row = (Y+25)/50, col = (X+25)/50
        checkIfFive(Player.StoneColor, nodeAt(row, col))
    }
}

const AI: Players = {
    StoneColor: AIChoice,
    PlaceStone: async (): Promise<void> =>{
        await runScoringAlgorithm()
        let maxNode: GraphNode = await AI.maxScoredNode()

        if (visualAI) {
            isLoading = true
            highlightBoardWithEmphasisOn(maxNode)
        }
        setTimeout(async (): Promise<void> => {
            await AI.DrawStoneOn(maxNode)
            await checkIfFive(AI.StoneColor, maxNode)
            await clearAllScoreAndHighLights()

            isLoading = false
        }, visualAI ? 1500 : 0)
    },
    maxScoredNode: async (): Promise<GraphNode> => {
        let max_node_filter = new MaxNode()
        let i = 1, node: any

        while(i++ <= 11) { 
            node = nodeAt(i, 1)

            while (node) {
                if(node.score) {
                    max_node_filter.add(node)
                } 
                node = node.right
            }
        }
        
        return max_node_filter.pop()
    },
    DrawStoneOn: async (NODE: GraphNode): Promise<void> => {
        NODE.stone = true
        NODE.color = AI.StoneColor 
        CTXT.fillStyle = AI.StoneColor 
        drawStone(NODE.coord_x, NODE.coord_y)
    }
}
