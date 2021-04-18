const playingField = document.getElementById('placeStoneLayer')
const on = playingField.addEventListener
const whateverPlayerChose = '#457b9d'

let x, and, y = null, visualAI = false,
    then, playerStoneColor = whateverPlayerChose,
    AIStoneColor = whateverPlayerChose == '#457b9d' ? '#f1faee' : '#457b9d'

makeBoard(11), then, on('mousedown', playOneRound)

/*if(5InRow) endGame()*/