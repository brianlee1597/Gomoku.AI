const playingField = document.getElementById('placeStoneLayer')
const on = playingField.addEventListener
const whateverPlayerChose = '#457b9d'

let x, and, y = null, visualAI = false,
then, currStoneColor = whateverPlayerChose

makeBoard(11,11), then, visualizeBoard(11)
on('mousedown', youPlaceStone)
on('mouseup', AIPlaceStone)

/*if(5InRow) endGame()*/