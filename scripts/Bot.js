const AICanvas  = document.getElementById('botScanLayer')
const AIContext = AICanvas.getContext('2d')

let scanHorizontal = (node) => {
    let scanEachColumn = () => {
        setTimeout(() => {
            highlight(node)
            if(node.has('right')){
                node = node.right
                scanEachColumn()
            }
            else if(!node.has('right')) 
                clearCanvas()
        }, 20)
    }
    scanEachColumn()
}

//Helper Functions
const clearCanvas = () => {
    let i = 0
    let clearCol = (i) => {
        setTimeout(()=> {
            if(i<=550){
                AIContext.clearRect(0,0,i,550)
                clearCol(i+50)
            }
        }, 20)
    }
    clearCol(i+50) // i+50 = clears 1 column at a time each loop
}

const highlight = (node) => {
    const x = getCoordinate(node.y)
    const y = getCoordinate(node.x)

    if(node.data !== null) return
    
    const RADIUS = 2.5
    AIContext.beginPath()
    AIContext.arc(x, y, RADIUS, 0, 2 * Math.PI, false)
    AIContext.fillStyle = 'grey'
    AIContext.fill()
    AIContext.lineWidth = 1
    AIContext.strokeStyle = 'grey'
    AIContext.stroke()
}

const getCoordinate = xOrY => {
    return xOrY * 25 + (25 * (xOrY - 1)) 
}