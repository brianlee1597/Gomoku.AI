const PLAYINGFIELD = document.getElementById('stoneLayer')

makeBoard(11,11)

PLAYINGFIELD.addEventListener('mousedown', makeStone)