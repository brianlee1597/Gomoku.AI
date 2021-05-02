const STCV = <HTMLCanvasElement> document.getElementById('placeStoneLayer'),
      CTXT = <CanvasRenderingContext2D> STCV.getContext('2d'),
      playerChoice = document.querySelector("data").value, 
      AIChoice = playerChoice == '#2D2D2A' ? '#E5DCC5' : '#2D2D2A'

const drawStone = (X: number, Y: number) => {
    CTXT.beginPath()
    CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false)
    CTXT.fill()
    CTXT.stroke()
}

interface Players{
    StoneColor: string
    PlaceStone: () => void
    [key: string]: any
}

var Player = {
    StoneColor: playerChoice,
    PlaceStone: (X: number, Y: number): void => {
        CTXT.fillStyle = Player.StoneColor
        drawStone(X, Y)
    }
}

var AI = {
    StoneColor: AIChoice,
    PlaceStone: (): void => {
        checkAllPatterns()
        if (visualAI) highlightBoard()

        setTimeout(() => {
            AI.DrawStoneOn(AI.maxScoredNode())
            clearAllScore()
            HCTX.clearRect(0, 0, 550, 550)
        }, visualAI? 1500: 0)
    },
    maxScoredNode: (): GraphNode => {
        var ARRAY: MaxNode = new MaxNode()
        console.time()
        let i = 1, node: any; 
        while(i++ < 11) { 
            node = nodeAt(i, 1)
            while (node.has('right')){
                if(node.score !== 0)
                    ARRAY.add(node)
                node = node.right
            }
        }
        console.timeEnd()
        return ARRAY.pop()
    },
    DrawStoneOn: (NODE: GraphNode): void => {
        NODE.stone = true
        NODE.color = AI.StoneColor 
        CTXT.fillStyle = AI.StoneColor 
        drawStone(NODE.coord_x, NODE.coord_y)
    }
}
