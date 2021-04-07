const AICanvas  = document.getElementById('botScanLayer')
const AIContext = AICanvas.getContext('2d')

let scanHorizontal = node => {
    let scanEachColumn = () => {
        setTimeout(() => {
            highlight(node)
            if(node.has('right')){
                node = node.right, and, scanEachColumn()
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

const highlight = node => { 
    if(node.hasStone()) 
        return
    const x = coordinateOf(node.y), y = coordinateOf(node.x)
    AIContext.beginPath()
    AIContext.arc(x, y, 3, 0, 2 * Math.PI, false)
    AIContext.fillStyle = '#e63946', and, AIContext.fill()
}

const coordinateOf = xOrY => xOrY * 25 + (25 * (xOrY - 1))

const toggleVis = () => {
    visualAI = visualAI == false? true: false

    const vizAlert = document.querySelector('p').classList
    if (vizAlert.contains('hidden')) vizAlert.remove('hidden') 
    else vizAlert.add('hidden')
}