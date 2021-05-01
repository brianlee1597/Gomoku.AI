interface Players{
    StoneColor: string
    PlaceStone: () => void
    [key: string]: any
}

const whateverPlayerChose = '#2D2D2A'

const Player = {
    StoneColor: whateverPlayerChose,
    PlaceStone: (X: number, Y: number): void => {
        CTXT.beginPath()
        CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false)
        CTXT.fillStyle = Player.StoneColor
        CTXT.fill()
        CTXT.stroke()
    }
}

const AI = {
    StoneColor: whateverPlayerChose == '#2D2D2A' ? '#E5DCC5' : '#2D2D2A',
    PlaceStone: (): void => {
        checkAllPatterns()
        var MAX_NODE: GraphNode = maxScoredNode()
    
        if (visualAI) {
            highlightBoard()
            setTimeout(() => {
                clearAllScore()
                HCTX.clearRect(0, 0, 550, 550)
                AI.DrawStone(MAX_NODE)
            }, 1500)
        }
        else {
          clearAllScore()
          AI.DrawStone(MAX_NODE)
        }
    },
    DrawStone: (NODE: GraphNode): void => {
        NODE.stone = true
        NODE.color,
        CTXT.fillStyle = AI.StoneColor 
        CTXT.beginPath()
        CTXT.arc(NODE.coord_x, NODE.coord_y, 20, 0, 2 * Math.PI, false)
        CTXT.fill()
        CTXT.stroke()
    }
}
