const highlightCanvas = <HTMLCanvasElement> document.getElementById('scoredNodeHighlightLayer')
const highlightCtx = <CanvasRenderingContext2D> highlightCanvas.getContext('2d')

const arrayOfColors: string[] = ['transparent', 'red', 'blue', 'green', 'violet', 'yellow', 'grey', 'black']

const colorBy = (score: number): string => {
    if(score < arrayOfColors.length)
        return arrayOfColors[score]
    throw new Error("error on ColorBy: score is out of Array Bounds")
}