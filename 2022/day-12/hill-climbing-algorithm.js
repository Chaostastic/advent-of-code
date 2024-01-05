const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const sides = [
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -1}, 
    {x: 0, y: 1}
]

function createGrid(input) {
    const squares = [];
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            const char = input[y][x];
            squares.push({height: getHeight(char), char, x, y});
        }
    }
    return squares;
}

function getHeight(char) {
    if (char === "S") return 1;
    if (char === "E") return 26;
    const charCode = char.charCodeAt(0);
    return charCode - "a".charCodeAt(0) + 1;
}

function checkAdjacentSquares(grid, square, newSquares) {
    for (const side of sides) {
        const x = square.x + side.x;
        const y = square.y + side.y;
        const adjSquare = grid.find(square => square.x === x && square.y === y);
        if (adjSquare && !adjSquare.crossed && square.height - adjSquare.height >= -1) {
            if (adjSquare.char === "E") return true;
            newSquares.push(adjSquare);
            adjSquare.crossed = true;
        }
    }
    return false;
}

function getFewestSteps(startFilter) {
    const grid = createGrid(input.split("\n"));
    let squares = grid.filter(startFilter);
    squares.forEach(square => square.crossed = true);
    for (let steps = 1; squares.length > 0; steps++) {
        const newSquares = [];
        if (squares.some(square => checkAdjacentSquares(grid, square, newSquares))) {
            return steps;
        }
        squares = newSquares;
    }
    return "No path found";
}

console.log(getFewestSteps(square => square.char === "S"));
console.log(getFewestSteps(square => square.height === 1));