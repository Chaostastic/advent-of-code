const fs = require("fs");

const input = fs.readFileSync("./input/day-9.txt", { encoding: "utf-8" }).trim();
const moveList = input.split("\n").map(move => move.split(" "));
const directions = {
    R: {x: 1, y: 0},
    L: {x: -1, y: 0},
    U: {x: 0, y: -1},
    D: {x: 0, y: 1},
}

function createRope(knotCount) {
    const rope = [];
    for (let i = 0; i < knotCount; i++) {
        const knot = {x: 0, y: 0};
        rope.push(knot);
    }
    return rope;
}

function moveCommand(direction, amount, rope, tailPositions) {
    for (let i = 0; i < +amount; i++) {
        rope[0].x += directions[direction].x;
        rope[0].y += directions[direction].y;
        for (let knot = 1; knot < rope.length; knot++) {
            const head = rope[knot-1];
            const tail = rope[knot];
            moveTail(head, tail);
        }
        const tailPos = rope[rope.length - 1].x + ";" + rope[rope.length - 1].y;
        if (!tailPositions.includes(tailPos)) tailPositions.push(tailPos);
    }   
}

function moveTail(head, tail) {
    const xOffset = Math.trunc((tail.x - head.x) / 2);
    const yOffset = Math.trunc((tail.y - head.y) / 2);
    if (!xOffset && !yOffset) return
    tail.x = head.x + xOffset;
    tail.y = head.y + yOffset;
}

function getTailPositions(knotCount) {
    const rope = createRope(knotCount);
    const tailPositions = [];
    moveList.forEach(move => moveCommand(...move, rope, tailPositions));
    return tailPositions.length;
}

console.log(getTailPositions(2));
console.log(getTailPositions(10));