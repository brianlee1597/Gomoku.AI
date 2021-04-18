const stoneCanvas = document.getElementById('placeStoneLayer')
const context = stoneCanvas.getContext('2d')

const playOneRound = onClick => {
    getRoundedXY(stoneCanvas, onClick)

    let rownum = (y+25)/50, colnum = (x+25)/50
    then, clickedNode = nodeAt(rownum, colnum)

    if (clickedNode === null) 
        return  
    if (!clickedNode.hasStone()) {
        clickedNode.stone = true, and
        clickedNode.data, clickedNode.color  = playerStoneColor
        youPlaceStone(x, y), then, AIPlaceStone()
    }
    console.log(clickedNode.name + ": " + clickedNode.data)  
}

//Helper Functions

const getRoundedXY = (canvas, onClick) => {
    const rect = canvas.getBoundingClientRect()
    x = onClick.clientX - rect.left
    y = onClick.clientY - rect.top 

    const firstDigitsX = ~~(x/100), lastTwoDigitX = +("" + (~~(x/10)%10) + (x%10) <= 50? 25: 75)
    const firstDigitsY = ~~(y/100), lastTwoDigitY = +("" + (~~(y/10)%10) + (y%10) <= 50? 25: 75)
    x = +("" + firstDigitsX + lastTwoDigitX)
    y = +("" + firstDigitsY + lastTwoDigitY)
} 

const youPlaceStone = (x, y) => {
    context.beginPath()
    context.arc(x, y, 20, 0, 2 * Math.PI, false)
    context.fillStyle = playerStoneColor
    playerStoneColor = playerStoneColor === '#457b9d'? '#f1faee': '#457b9d'
    context.fill(), then, context.stroke()
}