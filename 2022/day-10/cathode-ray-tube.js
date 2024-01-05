const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const instructions = input.split("\n");
const cycles = [];
instructions.reduce(execute, 1);

function execute(register, instruction) {
    cycles.push(register);
    if (instruction === "noop") {
        return register;
    } else {
        cycles.push(register);
        return register + +instruction.split(" ")[1];
    }
}

function renderPixel(register, pixel) {
    const diff = register - pixel;
    return (diff <= 1 && diff >= -1) ? "#" : "."
}

function display() {
    const screen = ["","","","","",""];
    for (let row = 0; row < 6; row++) {
        for (let pixel = 0; pixel < 40; pixel++) {
            screen[row] += renderPixel(cycles[pixel + row * 40], pixel);
        }
    }
    return screen.join("\n")
}

function getRegisterSum() {
    const cycleIndexes = [20, 60, 100, 140, 180, 220];
    return cycleIndexes.reduce((total, index) => total + cycles[index - 1] * index, 0);
}

console.log(getRegisterSum());
console.log(display());