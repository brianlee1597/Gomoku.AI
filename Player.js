const stoneCanvas = document.getElementById('stoneLayer')
const CONTEXT = stoneCanvas.getContext('2d')

youPlaceStone = function (onClick) {
    getRoundedCursorPosition(stoneCanvas, onClick)

    const rownum = (y + 25) / 50 
    const colnum = (x + 25) / 50
    const clickedIntersection = boxAt(rownum, colnum)

    if (clickedIntersection !== null && clickedIntersection.isEmpty()) {
        clickedIntersection.data = currentStoneColor
        drawStoneOnCoordinate(x, y)
    }
    else return

    console.log(clickedIntersection.name + ": " + clickedIntersection.data)  
}