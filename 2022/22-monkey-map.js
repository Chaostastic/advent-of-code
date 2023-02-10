const fs = require("fs");

class Tile {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.blocked = (char === "#");
    }
}

const input = fs.readFileSync("./input/day-22.txt", { encoding: "utf-8" }).split("\n\n");
const board = input[0].split("\n").map((row, y) => row.split("")
    .map((tile, x) => (tile === " ") ? undefined : new Tile(x, y, tile)))
const moveList = input[1].match(/\d+|[RL]/g);
const directions = [
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0},
    {x: 0, y: -1}, 
]

function getTile(x, y) {
    if (!board[y]) return undefined;
    return board[y][x];
}

function getTileInDirection(x, y, direction) {
    const tile = getTile(x + direction.x, y + direction.y);
    if (tile) return tile;
    return wrapAround(x, y, direction);
}

function wrapAround(x, y, direction) {
    x -= direction.x * 150;
    y -= direction.y * 200;
    while (true) {
        const tile = getTile(x, y);
        if (tile) return tile;
        y += direction.y;
        x += direction.x;
    }
}

function getFinalPosition() {
    let x = 50;
    let y = 0;
    let facing = 0;
    for (const move of moveList) {
        if (move === "R") {
            facing = ++facing % 4;
            continue;
        }
        if (move === "L") {
            facing = (--facing + 4) % 4;
            continue;
        }
        const direction = directions[facing];
        for (let i = 0; i < +move; i++) {
            const tile = getTileInDirection(x, y, direction);
            if (tile.blocked) break;
            x = tile.x;
            y = tile.y;
        }
    }
    return 1000 * (y + 1) + 4 * (x + 1) + facing;
}

console.log(getFinalPosition());
