var highlightCanvas = <HTMLCanvasElement> document.getElementById('scoredNodeHighlightLayer')
var highlightCtx = <CanvasRenderingContext2D> highlightCanvas.getContext('2d')

const ARRAY_OF_COLORS: string[] = ['transparent', 'red', 'blue', 'green', 'violet', 'yellow', 'grey', 'black']

const colorBy = (score: number): string => {
    if(score < ARRAY_OF_COLORS.length)
        return ARRAY_OF_COLORS[score]
    throw new Error("error on ColorBy: score is out of Array Bounds")
}