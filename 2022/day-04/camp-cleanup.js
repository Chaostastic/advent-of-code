const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const pairList = input.split("\n").map(pair => pair.split(/[,-]/g).map(str => +str));

function doesContain(arr) {
    let [min1, max1, min2, max2] = arr;
    return (min1 >= min2 && max1 <= max2) || (min1 <= min2 && max1 >= max2);
}

function doesOverlap(arr) {
    let [min1, max1, min2, max2] = arr;
    return (max1 >= min2 && max2 >= min1);
}

console.log(pairList.filter(doesContain).length);
console.log(pairList.filter(doesOverlap).length);