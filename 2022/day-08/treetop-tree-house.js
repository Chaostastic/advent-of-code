const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim().split("\n");
const trees = generateTrees(input);
const directions = ["up", "down", "left", "right"];

function generateTrees(input) {
    const treeList = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            treeList.push({height: input[y][x], x, y});
        }
    }
    return treeList;
}

function getTreesInDirection(treeHouse, direction) {
    switch (direction) {
        case "up": return trees.filter(tree => (tree.x === treeHouse.x && tree.y < treeHouse.y)).sort((a, b) => b.y - a.y);
        case "down": return trees.filter(tree => (tree.x === treeHouse.x && tree.y > treeHouse.y)).sort((a, b) => a.y - b.y);
        case "left": return trees.filter(tree => (tree.x < treeHouse.x && tree.y === treeHouse.y)).sort((a, b) => b.x - a.x);
        case "right": return trees.filter(tree => (tree.x > treeHouse.x && tree.y === treeHouse.y)).sort((a, b) => a.x - b.x);
    }
}

function getTotalVisibleTrees(total, treeHouse) {
    if (directions.every((direction) => getTreesInDirection(treeHouse, direction).some(tree => tree.height >= treeHouse.height))) {
            return total;
        }
    return ++total;
}

function getVisibleTreesInDirection(treeHouse, direction) {
    const treeList = getTreesInDirection(treeHouse, direction);
    for (let i = 0; i < treeList.length; i++) {
        if (treeList[i].height >= treeHouse.height) return i + 1;
    }
    return treeList.length;
}

function getBestTreeScore(bestScore, treeHouse) {
    let scenicScore = directions.reduce((total, direction) => total *= getVisibleTreesInDirection(treeHouse, direction), 1);
    return scenicScore > bestScore ? scenicScore : bestScore;
}

console.log(trees.reduce(getTotalVisibleTrees, 0));
console.log(trees.reduce(getBestTreeScore, 0));