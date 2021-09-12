const STCV = <HTMLCanvasElement> document.getElementById('placeStoneLayer'),
      CTXT = <CanvasRenderingContext2D> STCV.getContext('2d'),
      playerChoice = '#CBB9A8', 
      AIChoice = playerChoice == '#CBB9A8' ? '#1F271B' : '#CBB9A8'

async function drawStone (X: number, Y: number) {
    CTXT.beginPath()
    CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false)
    CTXT.fill(), CTXT.stroke()
}

const endGame = (color: string) => {
    setTimeout(() => alert((color === AI.StoneColor? "AI": "Player") + " Wins!"), 50)
}

const checkIfFive = async (fillStyle: string, rootNode: GraphNode) => {

    const recursivelyCountUntilFive = (count: number, node: GraphNode, direction: string) => {
        if(count === 5) 
            endGame(fillStyle)
        else if (!node.has(direction) || 
            node[direction].isEmpty() || 
            node[direction].color !== fillStyle)
            return
        else 
            recursivelyCountUntilFive(count + 1, node[direction], direction)
    }

    PATTERN_MAP.forEach(direction => recursivelyCountUntilFive(1, rootNode, direction))
}

interface Players {
    StoneColor: string
    PlaceStone: () => void
    [key: string]: any
}

const Player = {
    StoneColor: playerChoice,
    PlaceStone: async (X: number, Y: number): Promise<void> => {
        CTXT.fillStyle = Player.StoneColor
        await drawStone(X, Y)

        var ROW = (Y+25)/50, COL = (X+25)/50
        checkIfFive(Player.StoneColor, nodeAt(ROW, COL))
    }
}

const AI = {
    StoneColor: AIChoice,
    PlaceStone: (): void => {
        runScoringAlgorithm()
        var maxNode: GraphNode = AI.maxScoredNode()
        if (visualAI) {
            isLoading = true
            highlightBoardWithEmphasisOn(maxNode)
        }
        setTimeout(async () => {
            await AI.DrawStoneOn(maxNode)
            await checkIfFive(AI.StoneColor, maxNode)
            clearAllScoreAndHighLights()
            isLoading = false
        }, visualAI ? 1500 : 0)
    },
    maxScoredNode: (): GraphNode => {
        var ARRAY: MaxNode = new MaxNode()
        let i = 1, node: any; 
        while(i++ <= 11) { 
            node = nodeAt(i, 1)
            while (node !== undefined){
                if(node.score !== 0)
                    ARRAY.add(node)
                node = node.right
            }
        }
        return ARRAY.pop()
    },
    DrawStoneOn: async (NODE: GraphNode): Promise<void> => {
        NODE.stone = true
        NODE.color = AI.StoneColor 
        CTXT.fillStyle = AI.StoneColor 
        drawStone(NODE.coord_x, NODE.coord_y)
    }
}
