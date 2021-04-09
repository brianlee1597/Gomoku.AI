const AICanvas  = document.getElementById('botScanLayer')
const AIContext = AICanvas.getContext('2d')

const AIPlaceStone = () => {
    if(visualAI) {
        const dir = dirArr[~~(Math.random() * 4)]
        checkForAdjacent()
        scanBoard(dir)
        setTimeout(highlightCtx.clearRect(0,0,550,550), 1000)
        setTimeout(clearAllScore, 1000)
    }
}

//Helper Functions
// const drawOnNodeAt = (x, y) => {
//     const x = coordinateOf(node.y), y = coordinateOf(node.x)
// }

const scanBoard = dir => { //move to ai
    let i = 1
    if (dir === 'up') do { scan(nodeAt(11, i++), dir) } while (i <= 11)
    if (dir === 'down') do { scan(nodeAt(1, i++), dir) } while (i <= 11)
    if (dir === 'left') do { scan(nodeAt(i++, 11), dir) } while (i <= 11)
    if (dir === 'right') do { scan(nodeAt(i++, 1), dir) } while (i <= 11)
}

const scan = (node, dir) => { 
    let scanEachColumn = () => { setTimeout(() => {
            highlight(node)
            if(!node.has(dir)) {
                clearCanvas(dir)
                return
            }
            node = node.to(dir), and, scanEachColumn() 
        }, 50)
    }; scanEachColumn()
}

const highlight = (node) => { 
    if(node.hasScore()) {
        const x = coordinateOf(node.y), y = coordinateOf(node.x)
        highlightCtx.beginPath()
        highlightCtx.arc(x, y, 3, 0, 2 * Math.PI, false)
        highlightCtx.fillStyle = colorBy(node.score)
        highlightCtx.fill()
        return
    }
    else if(node.hasStone()) 
        return
    const x = coordinateOf(node.y), y = coordinateOf(node.x)
    AIContext.beginPath()
    AIContext.arc(x, y, 3, 0, 2 * Math.PI, false)
    AIContext.fillStyle = 'red', and, AIContext.fill()
}

const clearCanvas = dir => {
    let i = dir === 'right' || dir === 'down'? 0
           :dir === 'left'  || dir === 'up'? 550
           :console.log('Error on clearCanvas(): input is ' + dir)
    let clearCol = i => { setTimeout(() => { 
        switch (dir){
            case 'right': case 'down':
                if (i <= 550) {
                    dir === 'right'? AIContext.clearRect(0,0,i,550)
                                   : AIContext.clearRect(0,0,550,i)
                    clearCol(i+50)
                } break
            case 'up': case 'left':
                if (i >= 0) {
                    dir === 'up'? AIContext.clearRect(0,i,550,50) 
                                : AIContext.clearRect(i,0,50,550)        
                    clearCol(i-50)         
                } break
            }
        }, 50)
    }; clearCol(i+50) // i+50 = clears 1 column at a time each loop
}

const coordinateOf = xOrY => xOrY * 25 + (25 * (xOrY - 1))
const dirArr = ['up','down','right','left']

const toggleVis = () => {
    visualAI = visualAI == false? true: false
    const vizAlert = document.querySelector('p').classList
    vizAlert.contains('hidden')? vizAlert.remove('hidden'): vizAlert.add('hidden')
}