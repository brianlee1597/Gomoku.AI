const PLAYINGFIELD = document.getElementById('placeStoneLayer')
const ON = PLAYINGFIELD.addEventListener

//Display modal, Player chooses their color, and who starts.
let currentStoneColor = 'white'

makeBoard(11,11)
visualizeBoard()

ON('mousedown', youPlaceStone)
//after youPlaceStone, AIPlaceStone.

//if(checkIfRowOf5() == true) then end game. Display Who Won.