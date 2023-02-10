const fs = require("fs");

const input = fs.readFileSync("./input/day-6.txt", { encoding: "utf-8" }).trim();

function getMarkerPosition(markerLength) {
    for (let i = markerLength; i <= input.length; i++) {
        const marker = input.substr(i - markerLength, markerLength).split("");
        if (!hasDuplicate(marker)) return i;
    }
}

function hasDuplicate(array) {
    array.sort();
    for (let i = 1; i < array.length; i++) {
        if (array[i] === array[i-1]) return true;
    }
    return false;
}

console.log(getMarkerPosition(4));
console.log(getMarkerPosition(14));