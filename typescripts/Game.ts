const stoneCanvas = <HTMLCanvasElement> document.getElementById('placeStoneLayer')
const context = <CanvasRenderingContext2D> stoneCanvas.getContext('2d')

const playOneRound = (onClick: MouseEvent): void => {
    getRoundedXY(stoneCanvas, onClick)

    if(x < 0 || x > 550 || y < 0 || y > 550)
        return

    let rownum: number = (y+25)/50, colnum: number = (x+25)/50
    const clickedNode: LinkedGrid = nodeAt(rownum, colnum)

    if (clickedNode === undefined) 
        return  
    if (!clickedNode.hasStone()) {
        clickedNode.stone = true
        clickedNode.color  = playerStoneColor
        youPlaceStone(x, y)
        AIPlaceStone()
    }
    console.log(clickedNode.name)  
}

//Helper Functions

const getRoundedXY = (canvas: HTMLCanvasElement, onClick: MouseEvent): void => {
    const rect: DOMRect = canvas.getBoundingClientRect()
    x = onClick.clientX - rect.left
    y = onClick.clientY - rect.top 

    if(x < 0 || x > 550 || y < 0 || y > 550)
        return

    const firstDigitsX: number = ~~(x/100), lastTwoDigitX: number = (+("" + (~~(x/10)%10) + (x%10)) <= 50? 25: 75)
    const firstDigitsY: number = ~~(y/100), lastTwoDigitY: number = (+("" + (~~(y/10)%10) + (y%10)) <= 50? 25: 75)
    x = +("" + firstDigitsX + lastTwoDigitX)
    y = +("" + firstDigitsY + lastTwoDigitY)
} 

const youPlaceStone = (x: number, y: number): void => {
    context.beginPath()
    context.arc(x, y, 20, 0, 2 * Math.PI, false)
    context.fillStyle = playerStoneColor
    playerStoneColor = playerStoneColor === '#457b9d'? '#f1faee': '#457b9d'
    context.fill()
    context.stroke()
}