let x, y

function getRoundedCursorPosition(canvas, onClick) {
    //get the initial accurate x,y coordiates from mouseclick
    const rect = canvas.getBoundingClientRect()
    x = onClick.clientX - rect.left 
    y = onClick.clientY - rect.top 
    //Round the X, Y Coordinates to zero in on closest intersection coordinate of the board.
    let lastTwoDigitsOfX = parseInt("" + (Math.floor(x/10)%10) + (x%10)) <= 50? 25: 75
    let lastTwoDigitsOfY = parseInt("" + (Math.floor(y/10)%10) + (y%10)) <= 50? 25: 75
    x = parseInt("" + Math.floor(x/100) + lastTwoDigitsOfX)
    y = parseInt("" + Math.floor(y/100) + lastTwoDigitsOfY)
}

function getCoordinate(xOrY){
    return xOrY * 25 + (25 * (xOrY - 1))
}