const runScoringAlgorithm = () => {
    // checkForFork()

    checkForFourInRow()
    checkForThreeInRow()
    checkForTwoInRow()
    checkForAdjacent()
}

// const checkForFork = (): void => {
//     for (let i = 1; i <= 11; i++) {
//         var node: any = nodeAt(i, 1)
//         while (node !== undefined) {
//             if(node.hasStone())
//         }
//     }
// }

const checkForAdjacent = (): void => {
    for (let i = 1; i <= 11; i++) {
        var node: any = nodeAt(i, 1)
        while (node !== undefined) {
            if(node.hasStone() && !node.isChecked()) {
                POINTER_MAP.forEach(pointer => {
                    if(node[pointer] !== undefined && !node[pointer].isChecked())
                        node[pointer].score += 1
                })
                node.checked === true
            }
            node = node.right
        }
    }
}

const checkForTwoInRow = (): void => {
    var getPatternAndScore = (color: string) => {
        var weight = color === Player.StoneColor? 5: 6

        PATTERN_MAP.forEach(pointer => {

            if (node.pointer !== undefined 
                && !node.pointer.isChecked() 
                && node.pointer.colorIs(color)) {

                if(node.opDirOf(pointer) !== undefined 
                && node.opDirOf(pointer).isEmpty()) {

                    if(node.opDirOf(pointer).opDirOf(pointer) !== undefined 
                    && node.opDirOf(pointer).opDirOf(pointer).hasStone() 
                    && !node.opDirOf(pointer).opDirOf(pointer).colorIs(color))
                        node.opDirOf(pointer).score += (weight/2)
                    else if (node.opDirOf(pointer).opDirOf(pointer) !== undefined 
                    && node.opDirOf(pointer).opDirOf(pointer).hasStone() 
                    && node.opDirOf(pointer).opDirOf(pointer).colorIs(color)) 
                        node.opDirOf(pointer).score += (weight*2)
                    else
                        node.opDirOf(pointer).score += weight
                }
                if(node.numOfPAway(2, pointer) !== undefined 
                && node.numOfPAway(2, pointer).isEmpty()) {

                    if(node.numOfPAway(3, pointer) !== undefined 
                    && !node.numOfPAway(3, pointer).isEmpty()
                    && node.node.numOfPAway(3, pointer).colorIs(color))
                        node.numOfPAway(2, pointer).score += (weight*2)
                    else if(node.numOfPAway(3, pointer) !== undefined 
                    && !node.numOfPAway(3, pointer).isEmpty()
                    && !node.node.numOfPAway(3, pointer).colorIs(color))
                        node.numOfPAway(2, pointer).score += (weight/2)
                    else
                        node.numOfPAway(2, pointer).score += weight
                }  
                node.checked === true
                node.pointer.checked === true
            }   
        })
    }
    for (let i = 1; i <= 11; i++) {
        var node: any = nodeAt(i, 1)
        while (node !== undefined)  {
            if(node.hasStone() && !node.isChecked()) {
                getPatternAndScore(node.color)
            }
            node = node.right
        }
    }
}

const checkForThreeInRow = (): void => {
    var node: any
    var getPatternAndScore = (color: string) => {
        var weight = color === Player.StoneColor? 8: 10
        PATTERN_MAP.forEach(pointer => {

            if(node[pointer] !== undefined && !node[pointer].isChecked() 
            && node[pointer].colorIs(color)){

                if(node.numOfPAway(2, pointer) !== undefined 
                && !node.numOfPAway(2, pointer).isChecked() 
                && node.numOfPAway(2, pointer).colorIs(color)) {

                    if(node.opDirOf(pointer) !== undefined && node.opDirOf(pointer).isEmpty())
                        node.opDirOf(pointer).score += weight
                    if(node.numOfPAway(3, pointer) !== undefined && node.numOfPAway(3, pointer).isEmpty())
                        node.numOfPAway(3, pointer).score += weight
                    
                    node.numOfPAway(2, pointer).checked === true
                    node[pointer].checked === true
                }
            }
        })
    }
    let i = 1; while(i++ < 11) {
        node = nodeAt(i, 1)
        while (node !== undefined)  {
            if(node.hasStone() && !node.isChecked()) {
                getPatternAndScore(node.color)
                node.checked === true
            }
            node = node.right
        }
    }
}

const checkForFourInRow = () => {
    var node: any
    var getPatternAndScore = (color: string) => {
        var weight = color === Player.StoneColor? 100: 1000
        PATTERN_MAP.forEach(pointer => {
            if(node[pointer] !== undefined && !node[pointer].isChecked() 
            && node[pointer].colorIs(color)){

                if(node.numOfPAway(2, pointer) !== undefined 
                && !node.numOfPAway(2, pointer).isChecked() 
                && node.numOfPAway(2, pointer).colorIs(color)){

                    if(node.numOfPAway(3, pointer) !== undefined 
                    && !node.numOfPAway(3, pointer).isChecked() 
                    && node.numOfPAway(3, pointer).colorIs(color)){

                        if(node.opDirOf(pointer) !== undefined && node.opDirOf(pointer).isEmpty())
                            node.opDirOf(pointer).score += weight
                        if(node.numOfPAway(4, pointer) !== undefined && node.numOfPAway(4, pointer).isEmpty())
                            node.numOfPAway(4, pointer).score += weight

                        node.numOfPAway(3, pointer).checked === true
                        node.numOfPAway(2, pointer).checked === true
                        node[pointer].checked === true
                    }
                }
            }
        })
    }
    let i = 1 
    while(i++ < 11) {
        node = nodeAt(i, 1)
        while (node !== undefined)  {
            if(node.hasStone() && !node.isChecked()) {
                getPatternAndScore(node.color)
                node.checked === true
            }
            node = node.right
        }
    }
}

const oppositeOf = (color: string): string => color === Player.StoneColor? AI.StoneColor: Player.StoneColor