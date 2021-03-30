const stoneCanvas = document.getElementById('placeStoneLayer')
const context = stoneCanvas.getContext('2d')

const youPlaceStone = (onClick) => {
    getRoundedCursorPosition(stoneCanvas, onClick)

    const rownum = (y + 25) / 50 
    const colnum = (x + 25) / 50
    const clickedNode = nodeAt(rownum, colnum)

    if (clickedNode === null) return  
    if (clickedNode.isEmpty()) {
        clickedNode.data = currentStoneColor
        drawStoneOnCoordinate(x, y)
        setTimeout(visualize, 300)
    }
    console.log(clickedNode.name + ": " + clickedNode.data)  
}

//Helper Functions
let clickedVisualize = false

const togglePBelow = () => {
    clickedVisualize = clickedVisualize == false? true: false
    vizAlert = document.querySelector('p').classList
    vizAlert.contains('hidden')? vizAlert.remove('hidden'): vizAlert.add('hidden')
}

const getRoundedCursorPosition = (canvas, onClick) => {
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

const drawStoneOnCoordinate = (x, y) => {
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

let visualize = () => {
    if(clickedVisualize === true){
        let i = 1
        while(i <= 11){ scanHorizontal(nodeAt(i++,1)) }
    }
}