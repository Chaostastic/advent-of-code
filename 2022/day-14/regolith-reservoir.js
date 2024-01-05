const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const directions = [0, -1, 1];
let board;

function createLine(line) {
    const points = line.split(" -> ").map(point => point.split(",").map(str => +str));
    for (let i = 1; i < points.length; i++) {
        let [minX, minY] = [...points[i-1]];
        let [maxX, maxY] = [...points[i]];
        if (minX > maxX) [minX, maxX] = [maxX, minX];
        if (minY > maxY) [minY, maxY] = [maxY, minY];
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                addTile(x, y);
            }
        }
    }
}

function addTile(x, y) {
    if (!board[y]) board[y] = [];
    board[y][x] = true;
}

function isBlocked(x, y, hasFloor, floorHeight) {
    if (hasFloor && y === floorHeight) return true;
    if (!board[y]) return false;
    return (board[y][x]);
}

function dropSandGrain(hasFloor, floorHeight) {
    let x = 500;
    if (isBlocked(x, 0)) return false;
    a: for (let y = 0; y <= floorHeight; y++) {
        for (const direction of directions) {
            if (!isBlocked(x + direction, y + 1, hasFloor, floorHeight)) {
                x += direction;
                continue a;
            }
        }
        addTile(x, y);
        return true;
    }
    return false;
}

function getSandAmount(hasFloor) {
    board = [];
    input.split("\n").forEach(createLine);
    const floorHeight = 1 + board.length;
    let grains = 0;
    while (dropSandGrain(hasFloor, floorHeight)) {
        grains++;
    }
    return grains;
}

console.log(getSandAmount());
console.log(getSandAmount(true));