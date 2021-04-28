const STCV = <HTMLCanvasElement> document.getElementById('placeStoneLayer')
const CTXT = <CanvasRenderingContext2D> STCV.getContext('2d')

const playRound = (X: number, Y: number): void => {
    X = getRounded(X), Y = getRounded(Y)

    const ROW_NUM = (Y+25)/50, 
          COL_NUM = (X+25)/50,
          CLICKED_NODE = nodeAt(ROW_NUM, COL_NUM)
    
    if (CLICKED_NODE.isEmpty()) {
        CLICKED_NODE.stone = true
        CLICKED_NODE.color = playerStoneColor
        youPlaceStone(X, Y)
        AIPlaceStone()
    }
    if(rowOfFive())
        alert("Game Ended!")
}

//Helper Functions
const getRounded = (RAW: number): number => {
    const FIRST_DIGITS = Math.floor(RAW/100), 
      LAST_TWO_ROUNDED = parseInt(`${~~(RAW/10)%10}${RAW%10}`) <= 50? 25: 75

    return parseInt("" + FIRST_DIGITS + LAST_TWO_ROUNDED)
} 

const youPlaceStone = (X: number, Y: number): void => {
    CTXT.beginPath()
    CTXT.arc(X, Y, 20, 0, 2 * Math.PI, false)
    CTXT.fillStyle = playerStoneColor
    CTXT.fill()
    CTXT.stroke()
}

const rowOfFive = () => {
    var node: any
    for (let i = 1; i <= 11; i++) {
        node = nodeAt(i, 1)
        while (node.has('right')) {
            if(node.hasStone()){
                POINTER_MAP.forEach(pointer => {
                    if(node.numOfPAway(1, pointer).hasStone()
                    && node.numOfPAway(2, pointer).hasStone()
                    && node.numOfPAway(3, pointer).hasStone()
                    && node.numOfPAway(4, pointer).hasStone()){
                        console.log('test')
                        return true
                    }
                })
            }
            node = node.right
        }
    }
    return false
}