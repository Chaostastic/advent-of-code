const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" });
const moveList = input.trim().split("\n").map(move => move.match(/\d{1,}/g));
moveList.splice(0,10);
const supplyStart = input.split("\n").splice(0,8).reverse();

function getSupplyStart() {
    const supplyStacks = [];
    for (let i = 1; i < supplyStart[0].length; i += 4) {
        const crateStack = [];
        supplyStart.forEach(row => {
            const crate = row[i];
            if (crate !== " ") crateStack.push(crate);
        });
        supplyStacks.push(crateStack);
    }
    return supplyStacks;
}

function moveCommand(move, supplyStacks, moveMultiple) {
    const [amount, start, end] = move;
    const crates = supplyStacks[start - 1].splice(-amount);
    if (!moveMultiple) {
        crates.reverse();
    }
    supplyStacks[end - 1].push(...crates);
}

function operateCrane(moveMultiple) {
    const supplyStacks = getSupplyStart();
    moveList.forEach(move => moveCommand(move, supplyStacks, moveMultiple));
    return supplyStacks.reduce((total, current) => total + current.pop(), "");
}

console.log(operateCrane());
console.log(operateCrane(true));