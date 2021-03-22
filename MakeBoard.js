/*Visualize the Board*/
const canvas = document.getElementById('boardUI')
const ctx = canvas.getContext('2d')
const boardWH = document.getElementById('boardUI').width

let horizontalLine = 0
let verticalLine   = 0
const speed = 0.5

let margin = 0
while(margin <= boardWH)
{
    drawHorizontalLine(margin)
    drawVerticalLine(margin)
    margin += 50
}

function drawHorizontalLine(m){
    function drawLine() {
      horizontalLine = horizontalLine < boardWH? horizontalLine+speed: horizontalLine;
      ctx.beginPath();
      ctx.moveTo(m+25, 0)
      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'lightgrey'
      ctx.lineTo(m+25, horizontalLine)
      ctx.stroke()
      window.requestAnimationFrame(drawLine)
    }
    window.requestAnimationFrame(drawLine)
  }

  function drawVerticalLine(m){
    function drawLine2() {
      verticalLine = verticalLine < boardWH? verticalLine+speed: verticalLine
      ctx.beginPath()
      ctx.moveTo(0, m+25)
      ctx.lineTo(verticalLine, m+25)
      ctx.stroke()
      window.requestAnimationFrame(drawLine2)
    }
    window.requestAnimationFrame(drawLine2)
  }
  /*Visualize the Board*/