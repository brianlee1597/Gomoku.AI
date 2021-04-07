const playingField = document.getElementById('placeStoneLayer')
const on = playingField.addEventListener
const whateverPlayerChose = '#457b9d'

let x, and, y = null, visualAI = false,
then, currStoneColor = whateverPlayerChose

makeBoard(11,11), then, visualizeBoard()
on('mousedown', youPlaceStone)
//after youPlaceStone, AIPlaceStone.

//if(checkIfRowOf5() == true) then end game. Display Who Won.