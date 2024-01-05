const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();

function getCoordinates(amount, applyKey) {
    const file = input.split("\n").map((str, i) => {return {index: i, value: +str}});
    if (applyKey) file.forEach(num => num.value *= 811589153);
    for (let i = 0; i < amount; i++) {
        for (let index = 0; index < file.length; index++) {
            const currentIndex = file.findIndex(num => num.index === index);
            const num = file.splice(currentIndex, 1)[0];
            const newIndex = (currentIndex + num.value - 1) % file.length + 1;
            file.splice(newIndex, 0, num);
        }
    }
    const zeroPos = file.findIndex(num => num.value === 0);
    let coordinates = 0;
    for (let i = 1000; i <= 3000; i += 1000) {
        const pos = (i + zeroPos) % file.length;
        coordinates += file[pos].value;
    }
    return coordinates;
}

console.log(getCoordinates(1));
console.log(getCoordinates(10, true));