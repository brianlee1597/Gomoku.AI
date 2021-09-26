async function scoringAlgorithm (): Promise<void> {
    let node: any
    let adjacentBaseScore = () => {
        POINTER_MAP.forEach(pointer => {
            if(node[pointer] !== undefined 
                && !node[pointer].isChecked())
                node[pointer].score += 1
        })
        node.checked === true
    }
    let twoReverseBoomerangScore = async (color: string) => {
        let weight = color === Player.StoneColor? 5: 6
        POINTER_MAP.forEach(pointer => {
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
        }})
    }
    let threeChainCount = async (color: string) => {
        let weight = color === Player.StoneColor? 8: 10
        POINTER_MAP.forEach(pointer => {
            if(node[pointer] !== undefined 
                && !node[pointer].isChecked() 
            && node[pointer].colorIs(color)){
            if(node.numOfPAway(2, pointer) !== undefined 
            && !node.numOfPAway(2, pointer).isChecked() 
            && node.numOfPAway(2, pointer).colorIs(color)) {
            if(node.opDirOf(pointer) !== undefined 
            && node.opDirOf(pointer).isEmpty())
            node.opDirOf(pointer).score += weight
            if(node.numOfPAway(3, pointer) !== undefined 
            && node.numOfPAway(3, pointer).isEmpty())
            node.numOfPAway(3, pointer).score += weight
            node.numOfPAway(2, pointer).checked === true
            node[pointer].checked === true
        }}})
    }
    let fourChainCount = async (color: string) => {
        let weight = color === Player.StoneColor? 100: 1000
        POINTER_MAP.forEach(pointer => {
            if(node[pointer] !== undefined 
                && !node[pointer].isChecked() 
            && node[pointer].colorIs(color)){
            if(node.numOfPAway(2, pointer) !== undefined 
            && !node.numOfPAway(2, pointer).isChecked() 
            && node.numOfPAway(2, pointer).colorIs(color)){
            if(node.numOfPAway(3, pointer) !== undefined 
            && !node.numOfPAway(3, pointer).isChecked() 
            && node.numOfPAway(3, pointer).colorIs(color)){
            if(node.opDirOf(pointer) !== undefined 
            && node.opDirOf(pointer).isEmpty())
            node.opDirOf(pointer).score += weight
            if(node.numOfPAway(4, pointer) !== undefined 
            && node.numOfPAway(4, pointer).isEmpty())
            node.numOfPAway(4, pointer).score += weight
            node.numOfPAway(3, pointer).checked === true
            node.numOfPAway(2, pointer).checked === true
            node[pointer].checked === true
        }}}})
    }

    let i = 1
    while(i++ < 11) {
        node = nodeAt(i, 1)
        while (node !== undefined)  {
            let condition = node.hasStone() && !node.isChecked()
            if (condition === true) {
                await fourChainCount(node.color)
                await threeChainCount(node.color)
                await twoReverseBoomerangScore(node.color)
                adjacentBaseScore()
            }
            node = node.right
        }
    }
}