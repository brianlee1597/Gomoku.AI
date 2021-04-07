const stoneCanvas = document.getElementById('placeStoneLayer')
const context = stoneCanvas.getContext('2d')

const youPlaceStone = onClick => {
    getRoundedXY(stoneCanvas, onClick)

    let rownum = (y + 25) / 50
    let colnum = (x + 25) / 50
    then; let clickedNode = nodeAt(rownum, colnum)

    if (clickedNode === null) 
        return  

    if (!clickedNode.hasStone()) {
        clickedNode.stone = true
        clickedNode.data  = currStoneColor
        drawStoneOnCoordinate(x, y)
        setTimeout(visualize, 300) //move to ai
    }
    console.log(clickedNode.name + ": " + clickedNode.data)  
}

//Helper Functions

const getRoundedXY = (canvas, onClick) => {
    //get the initial accurate x,y coordiates from mouseclick
    const rect = canvas.getBoundingClientRect()
    x = onClick.clientX - rect.left
    y = onClick.clientY - rect.top 
    //Round the last two X, Y Coordinates to zero in on closest intersection coordinate of the board.
    const firstDigitsX = ~~ (x/100), lastTwoDigitX = + ("" + (~~(x/10)%10) + (x%10) <= 50? 25: 75)
    const firstDigitsY = ~~ (y/100), lastTwoDigitY = + ("" + (~~(y/10)%10) + (y%10) <= 50? 25: 75)

    x = + ("" + firstDigitsX + lastTwoDigitX)
    y = + ("" + firstDigitsY + lastTwoDigitY)
} 

const drawStoneOnCoordinate = (x, y) => {
    context.beginPath()
    context.arc(x, y, 20, 0, 2 * Math.PI, false)
    context.fillStyle   = currStoneColor
    context.strokeStyle = currStoneColor == '#457b9d' ? '#f1faee' : '#457b9d'
    currStoneColor      = currStoneColor == '#457b9d' ? '#f1faee' : '#457b9d'
    context.fill(), then, context.stroke()
}

const visualize = () => { //move to ai
    let i = 1; then ; if (visualAI === true) 
    do { scanHorizontal(nodeAt(i++, 1)) } while (i <= 11)
}