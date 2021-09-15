const PLAYING_FIELD = document.getElementById('placeStoneLayer')
const on = PLAYING_FIELD.addEventListener
const START_BUTTON = document.getElementById("start_button")

//-----------------------------------------------------------------------//

async function playRound (x: number, y: number): Promise<void> {
    let getRounded = async (raw: number): Promise<number> => {
        let first_digits = Math.floor(raw/100) 
        let last_two_rounded = parseInt(`${~~(raw/10)%10}${raw%10}`) <= 50? 25: 75
    
        return parseInt("" + first_digits + last_two_rounded)
    } 

    x = await getRounded(x)
    y = await getRounded(y)

    let row = (y+25)/50, col = (x+25)/50
    let clicked_node = nodeAt(row, col)
    
    if (clicked_node.isEmpty()) {
        clicked_node.stone = true
        clicked_node.color = Player.StoneColor

        await Player.PlaceStone(x, y)
        AI.PlaceStone()
    }
}

function endGame (color: string): void {
    setTimeout(() => alert((color === AI.StoneColor? "AI": "Player") + " Wins!"), 50)
}

//-----------------------------------------------------------------------//

let isLoading = true

START_BUTTON.onclick = function (): void {
    setTimeout(() => { isLoading = false }, makeBoard(11))

    document.getElementById("intro").style.display = "none";
    document.getElementById("game_container").style.display = "flex";
}

on('mousedown', (event: MouseEvent): void => {
    const RECT: DOMRect = PLAYING_FIELD.getBoundingClientRect()

    const X: number = event.clientX - RECT.left
    const Y: number = event.clientY - RECT.top 

    if(X < 0 || X > 550 || Y < 0 || Y > 550 || isLoading === true)
        return
    
    console.time()
    playRound(X, Y)
    console.timeEnd()
})
