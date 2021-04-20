var stoneCanvas = <HTMLCanvasElement> document.getElementById('placeStoneLayer')
var context = <CanvasRenderingContext2D> stoneCanvas.getContext('2d')

const playOneRound = (onClick: MouseEvent): void => {
    const RECT: DOMRect = stoneCanvas.getBoundingClientRect()
    x = onClick.clientX - RECT.left
    y = onClick.clientY - RECT.top 

    if( x < 0 || x > 550 || y < 0 || y > 550 ) 
        return
    
    try{   
        getRoundedXY()

        const ROW_NUM: number = (y+25)/50, 
              COL_NUM: number = (x+25)/50,
              CLICKED_NODE: LinkedNode = nodeAt(ROW_NUM, COL_NUM)
    
        if (CLICKED_NODE.isEmpty()) {
            CLICKED_NODE.stone  = true
            CLICKED_NODE.color  = playerStoneColor
            youPlaceStone(x, y)
            AIPlaceStone()
        }
        x= null, y = null
    } catch (e) {
        console.log(e)
    }
}

//Helper Functions
const getRoundedXY = (): void => {
    const FIRST_DIGITS_X: number = Math.floor(x/100), 
      LAST_TWO_ROUNDED_X: number = parseInt(`${~~(x/10)%10}${x%10}`) <= 50? 25: 75,

          FIRST_DIGITS_Y: number = Math.floor(y/100), 
      LAST_TWO_ROUNDED_Y: number = parseInt(`${~~(y/10)%10}${y%10}`) <= 50? 25: 75

    x = parseInt("" + FIRST_DIGITS_X + LAST_TWO_ROUNDED_X)
    y = parseInt("" + FIRST_DIGITS_Y + LAST_TWO_ROUNDED_Y)
} 

const youPlaceStone = (X: number, Y: number): void => {
    context.beginPath()
    context.arc(X, Y, 20, 0, 2 * Math.PI, false)
    context.fillStyle = playerStoneColor
    playerStoneColor  = playerStoneColor === '#457b9d'? '#f1faee': '#457b9d'
    context.fill()
    context.stroke()
}