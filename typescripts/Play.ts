const playingField = document.getElementById('placeStoneLayer')
const on = playingField.addEventListener
const whateverPlayerChose = '#457b9d'

let x: number, y: number = null
let visualAI: boolean = false;
let playerStoneColor: string = whateverPlayerChose,
    AIStoneColor: string = whateverPlayerChose == '#457b9d' ? '#f1faee' : '#457b9d'

makeBoard(11)
on('mousedown', playOneRound)

/*if(5InRow) endGame()*/