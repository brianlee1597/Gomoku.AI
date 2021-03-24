let x, y = 0

function getRoundedCursorPosition(canvas, onClick) {
    //get the initial accurate x,y coordiates from mouseclick
    const rect = canvas.getBoundingClientRect()
    x = onClick.clientX - rect.left 
    y = onClick.clientY - rect.top 

    //Round the X, Y Coordinates to zero in on closest intersection coordinate of the board.
    let lastTwoDigitsOfX = parseInt("" + (Math.floor(x/10)%10) + (x%10))
    let lastTwoDigitsOfY = parseInt("" + (Math.floor(y/10)%10) + (y%10))
    lastTwoDigitsOfX = lastTwoDigitsOfX <= 50? 25: 75
    lastTwoDigitsOfY = lastTwoDigitsOfY <= 50? 25: 75
    x = parseInt("" + Math.floor(x/100) + lastTwoDigitsOfX)
    y = parseInt("" + Math.floor(y/100) + lastTwoDigitsOfY)

    console.log("" + x + y)
}

function drawStoneOnCoordinate(x, y){
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