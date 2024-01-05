const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const jetList = input.split("").map(char => char === ">" ? {x: 1, y: 0} : {x: -1, y: 0});
const down = {x: 0, y: -1};
let board;
const pieces = [
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}],
    [{x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}, {x: 1, y: 2}],
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}],
    [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}],
    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}],
]

function isBlocked(x, y) {
    if (x === -1 || x === 7 || y === -1) return true;
    if (!board[y]) return false;
    return (board[y][x]);
}

function canMove(piece, x, y, direction) {
    return piece.every(part => {
        return !isBlocked(x + part.x + direction.x, y + part.y + direction.y);
    })
}

function addTile(x, y) {
    if (!board[y]) board[y] = [];
    board[y][x] = true;
}

function dropRocks(count) {
    let jetIndex = 0;
    let removedRows = 0;
    board = [];
    for (let i = 0; i < count; i++) {
        let x = 2;
        let y = board.length + 3;
        let piece = pieces[i % 5];
        while (true) {
            const direction = jetList[jetIndex];
            if (++jetIndex === jetList.length) jetIndex = 0;
            if (canMove(piece, x, y, direction)) x += direction.x;
            if (canMove(piece, x, y, down)) {
                y--;
            } else {
                piece.forEach(part => addTile(x + part.x, y + part.y));
                break;
            }
        }
        if (board.length > 100) {
            const diff = board.length - 100;
            board.splice(0, diff);
            removedRows += diff;
        }
    }
    return board.length + removedRows;
}

console.log(dropRocks(2022));