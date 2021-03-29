const AICanvas  = document.getElementById('AIVisualizationLayer')
const AIContext = AICanvas.getContext('2d')

function visualizeAI(box){
    function myLoop() {
        setTimeout( function() {
            highlight(box)
            if(box.hasNextRight()){
                box = box.right
                myLoop()
            }
            else if(!box.hasNextRight()){
                setTimeout(clearCanvas(),300)
            }
        }, 25)
    }
    myLoop()
}

function highlight(box){
    const x = getCoordinate(box.y)
    const y = getCoordinate(box.x)
    if(box.data !== null) return
    const RADIUS = 2.5
    AIContext.beginPath()
    AIContext.arc(x, y, RADIUS, 0, 2 * Math.PI, false)
    AIContext.fillStyle = 'red'
    AIContext.fill()
    AIContext.lineWidth = 1
    AIContext.strokeStyle = 'red'
    AIContext.stroke()
}

function clearCanvas(){
    let i = 0
    function myLoop(i) {
        setTimeout( function() {
            if(i<=550){
                AIContext.clearRect(0,0,i,550)
                myLoop(i+50)
            }
        }, 25)
    }
    myLoop(i+50)
}
