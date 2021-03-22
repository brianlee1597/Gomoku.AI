const STONECANVAS = document.getElementById('stoneLayer')
const CONTEXT = STONECANVAS.getContext('2d')

let x, y = 0
let currentStoneColor = 'black'

/*------PLACE STONE AND SWITCH BETWEEN WHITE/BLACK------*/
makeStone = function (event) {
    getRoundedCursorPosition(STONECANVAS, event)
    const ROWNUM = (y + 25) / 50
    const COLNUM = (x + 25) / 50

    if(boxAt(ROWNUM, COLNUM).data == null)
    {
        boxAt(ROWNUM, COLNUM).data = currentStoneColor
        const RADIUS = 20
        CONTEXT.beginPath()
        CONTEXT.arc(x, y, RADIUS, 0, 2 * Math.PI, false)
        CONTEXT.fillStyle = currentStoneColor
        CONTEXT.fill()
        CONTEXT.lineWidth = 1
        CONTEXT.strokeStyle = currentStoneColor == 'white' ? 'black' : 'white'
        CONTEXT.stroke()
        currentStoneColor   = currentStoneColor == 'white' ? 'black' : 'white'
    }
    else return

    console.log(boxAt(ROWNUM, COLNUM).name + ": " + boxAt(ROWNUM, COLNUM).data)
}
/*------PLACE STONE AND SWITCH BETWEEN WHITE/BLACK------*/

/*------GET ROUNDED CURSOR LOCATION ON MOUSECLICK------*/
function getRoundedCursorPosition(STONECANVAS, event) {
    //Get accurate cursor location
    const RECT = STONECANVAS.getBoundingClientRect()
    x = event.clientX - RECT.left
    y = event.clientY - RECT.top

    //Round the X, Y Coordinates to zero in on closest intersection coordinate of the board.
    let lastTwoDigitsOfX = parseInt("" + (Math.floor(x/10)%10) + (x%10))
    let lastTwoDigitsOfY = parseInt("" + (Math.floor(y/10)%10) + (y%10))

    lastTwoDigitsOfX = lastTwoDigitsOfX <= 50? 25: 75
    lastTwoDigitsOfY = lastTwoDigitsOfY <= 50? 25: 75
    x = parseInt("" + Math.floor(x/100) + lastTwoDigitsOfX)
    y = parseInt("" + Math.floor(y/100) + lastTwoDigitsOfY)
}
/*------GET ROUNDED CURSOR LOCATION ON MOUSECLICK------*/