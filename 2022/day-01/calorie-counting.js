const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const elfList = input.split("\n\n").map(elf => elf.split("\n").map(str => +str));
const calorieList = elfList.map(sum).sort((a, b) => (a > b) ? -1 : 1);

function sum(array) {
    return array.reduce((total, current) => total + current, 0);
}

console.log(calorieList[0]);
console.log(calorieList[0] + calorieList[1] + calorieList[2]);