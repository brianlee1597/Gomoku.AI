//are these patterns or spaghetti

const checkForAdjacent = () => {
    for (let i = 1; i <= 11; i++) {
        let node = nodeAt(i, 1)
        while (node.has('right')) {
            if (node.right.hasStone() && !node.hasStone())
                node.score += 1
            node = node.right
        }
        node = nodeAt(i, 11)
        while (node.has('left')) {
            if (node.left.hasStone() && !node.hasStone())
                node.score += 1
            node = node.left
        }
        node = nodeAt(11, i)
        while (node.has('up')) {
            if (node.up.hasStone() && !node.hasStone())
                node.score += 1
            node = node.up
        }
        node = nodeAt(1, i)
        while (node.has('down')) {
            if (node.down.hasStone() && !node.hasStone())
                node.score += 1
            node = node.down
        }
        node = nodeAt(1, i)
        while (node.has('bottomLeft')) {
            if (node.bottomLeft.hasStone() && !node.hasStone())
                node.score += 1
            node = node.bottomLeft
        }
        node = nodeAt(i, 1)
        while (node.has('topRight')) {
            if (node.topRight.hasStone() && !node.hasStone())
                node.score += 1
            node = node.topRight
        }
        node = nodeAt(i, 1)
        while (node.has('bottomRight')) {
            if (node.bottomRight.hasStone() && !node.hasStone())
                node.score += 1
            node = node.bottomRight
        }
        node = nodeAt(11, i)
        while (node.has('topLeft')) {
            if (node.topLeft.hasStone() && !node.hasStone())
                node.score += 1
            node = node.topLeft
        }
    }
    for (let i = 2; i <= 11; i++) {
        node = nodeAt(i, 11)
        while (node.has('bottomLeft')) {
            if (node.bottomLeft.hasStone() && !node.hasStone())
                node.score += 1
            node = node.bottomLeft
        }
        node = nodeAt(11, i)
        while (node.has('topRight')) {
            if (node.topRight.hasStone() && !node.hasStone())
                node.score += 1
            node = node.topRight
        }
        node = nodeAt(1, i)
        while (node.has('bottomRight')) {
            if (node.bottomRight.hasStone() && !node.hasStone())
                node.score += 1
            node = node.bottomRight
        }
    }
    for (let i = 10; i >= 1; i--) {
        node = nodeAt(i, 11)
        while (node.has('topLeft')) {
            if (node.topLeft.hasStone() && !node.hasStone())
                node.score += 1
            node = node.topLeft
        }
    }
}

const checkForTwoInRow = () => {
    for (let i = 1; i <= 11; i++) {
        let node = nodeAt(i, 1)
        while (node.has('right')) {
            if (node.hasStone() && node.right.hasStone()
                && node.colorIs(playerStoneColor) && node.right.colorIs(playerStoneColor)) {
                if (node.left !== null && !node.left.hasStone())
                    node.left.score += 2;
            }
            node = node.right
        }
    }
}