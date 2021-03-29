const stoneCanvas = document.getElementById('stoneLayer')
const context = stoneCanvas.getContext('2d')

let test = false

function switchTest(){
    test = test == false? true: false
}

youPlaceStone = function (onClick) {
    getRoundedCursorPosition(stoneCanvas, onClick)

    const rownum = (y + 25) / 50 
    const colnum = (x + 25) / 50
    const clickedIntersection = boxAt(rownum, colnum)

    if (clickedIntersection === null) return  
    if (clickedIntersection.isEmpty()) {
        clickedIntersection.data = currentStoneColor
        drawStoneOnCoordinate(x, y)
        if(test === true){
            for(let i = 1; i <= 11; i++){
                visualizeAI(boxAt(i,1))
            }
        }
    }
    console.log(clickedIntersection.name + ": " + clickedIntersection.data)  
}

//Call Functions
function drawStoneOnCoordinate(x, y){
    const RADIUS = 20
    context.beginPath()
    context.arc(x, y, RADIUS, 0, 2 * Math.PI, false)
    context.fillStyle = currentStoneColor
    context.fill()
    context.lineWidth = 1
    context.strokeStyle = currentStoneColor == 'white' ? 'black' : 'white'
    context.stroke()
    currentStoneColor   = currentStoneColor == 'white' ? 'black' : 'white'
}