const highlightCanvas = document.getElementById('scoredNodeHighlightLayer')
const highlightCtx = highlightCanvas.getContext('2d')

const colorBy = score => {
    return score === 1? 'red'
          :score <=  2? 'blue'
          :score >   2? 'black'
          :'grey'
}