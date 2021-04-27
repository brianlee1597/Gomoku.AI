const maxScoredNode = (): GraphNode => {
    const HEAP = new MaxNode()
    for (let i = 1; i <= 11; i++) {
        let node: any = nodeAt(i, 1)
        while (node.has('right')) {
                HEAP.add(node)
                node = node.right
        }
    }
    const chadNode = HEAP.peek()
    HEAP.dispose()
    return chadNode
}

const checkForAdjacent = (): void => {
    console.time()
    try{
        var node: any, weight = 1
        for (let i = 1; i <= 11; i++) {
            node = nodeAt(i, 1)
            while (node.has('right')) {
                if(node.hasStone()){
                    POINTER_MAP.forEach(pointer => {
                        node[pointer].score += weight
                    })
                }
                node = node.right
            }
        }
    } catch (e){
        console.log(e)
    }
    console.timeEnd()
}

const checkForTwoInRow = (): void => {
    console.time()
    try{
        var node: any
        var getPatternAndScore = (color: string) => {
            var weight = color === playerStoneColor? 2: 3
            PATTERN_MAP.forEach(pointer => {
                if(node[pointer].colorIs(color)){
                    if (node.numOfPAway(2, pointer).color !== oppositeOf(color)) {
                        if(node.opDirOf(pointer) !== null && node.opDirOf(pointer).isEmpty())
                            if(node[pointer].colorIs(playerStoneColor))
                                node.opDirOf(pointer).score += weight-1
                            else
                                node.opDirOf(pointer).score += weight
                        if(node.numOfPAway(2, pointer).score !== null && node.numOfPAway(2, pointer).isEmpty())
                            if(node[pointer].colorIs(playerStoneColor))
                                node.opDirOf(pointer).score += weight-1
                            else
                                node.opDirOf(pointer).score += weight
                    }
                    else {
                        if(node.opDirOf(pointer) !== null && node.opDirOf(pointer).isEmpty())
                            node.opDirOf(pointer).score += (weight - 2)
                    }
                }
            })
        }
        for (let i = 1; i <= 11; i++) {
            node = nodeAt(i, 1)
            while (node.has('right')) {
                if(node.colorIs(playerStoneColor)){
                    getPatternAndScore(playerStoneColor)
                }
                if(node.colorIs(AIStoneColor)){
                    getPatternAndScore(AIStoneColor)
                }
                node = node.right
            }
        }
    } catch (e) {
        console.log(e)
    }
    console.timeEnd()
}

const oppositeOf = (color: string): string => color === playerStoneColor? AIStoneColor: playerStoneColor