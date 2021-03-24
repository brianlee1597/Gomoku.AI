

function AIPlaceStone()
{
    for(let x = 1; x <= 11; x++)
    {
        for(let y = 1; y <= 11; y++)
        {
            if(boxAt(x, y).data != null)
            {
                if(boxAt(x, y).left != null)
                {
                    PlaceStone(x, y-1)
                }
                else console.log(boxAt(x, y).left)
            }
        }
    }
}


function PlaceStone (ROWNUM, COLNUM){
    const x = COLNUM * 25 + (25 * (COLNUM - 1))
    const y = ROWNUM * 25 + (25 * (ROWNUM - 1))

    if(boxAt(ROWNUM, COLNUM) != null && boxAt(ROWNUM, COLNUM).isEmpty()) //Draw stone on the intersection
    {
        boxAt(ROWNUM, COLNUM).data = currentStoneColor
        drawStoneOnCoordinate(x, y)
    }
    else return
}