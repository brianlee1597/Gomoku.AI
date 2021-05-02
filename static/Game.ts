const PLAYING_FIELD = document.getElementById('placeStoneLayer')
const on = PLAYING_FIELD.addEventListener

let isLoading = true
setTimeout(() => { isLoading = false }, makeBoard(11))

on('mousedown', function (e: MouseEvent): void {
    const RECT: DOMRect = PLAYING_FIELD.getBoundingClientRect(),
             X: number  = e.clientX - RECT.left, 
             Y: number  = e.clientY - RECT.top 

    if(X < 0 || X > 550 || Y < 0 || Y > 550 || isLoading === true)
        return
    
    console.time()
    playRound(X, Y)
    console.timeEnd()
})

const playRound = (X: number, Y: number): void => {
    var getRounded = (RAW: number): number => {
        const FIRST_DIGITS = Math.floor(RAW/100), 
          LAST_TWO_ROUNDED = parseInt(`${~~(RAW/10)%10}${RAW%10}`) <= 50? 25: 75
    
        return parseInt("" + FIRST_DIGITS + LAST_TWO_ROUNDED)
    } 

    X = getRounded(X), Y = getRounded(Y)

    var ROW_NUM = (Y+25)/50, 
        COL_NUM = (X+25)/50,
        CLICKED_NODE = nodeAt(ROW_NUM, COL_NUM)
    
    if (CLICKED_NODE.isEmpty()) {
        CLICKED_NODE.stone = true
        CLICKED_NODE.color = Player.StoneColor
        Player.PlaceStone(X, Y)
        AI.PlaceStone()
    }
}
