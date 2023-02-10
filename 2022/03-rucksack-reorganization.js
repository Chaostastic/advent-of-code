const fs = require("fs");

const input = fs.readFileSync("./input/day-3.txt", { encoding: "utf-8" }).trim();
const rucksackList = input.split("\n").map(splitHalf);
const groupList = groupArray(input.split("\n"));

function splitHalf(string) {
    let midPoint = string.length / 2;
    return [string.slice(0, midPoint), string.slice(midPoint)];
}

function groupArray(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i += 3) {
        newArray.push([array[i], array[i+1], array[i+2]]);
    }
    return newArray;
}

function findDuplicateChar(str1, str2, str3) {
    return str1.split("").find(char => str2.includes(char) && (str3 ? str3.includes(char) : true));
}

function getCharPriority(char) {
    const charCode = char.charCodeAt(0);
    const isLowerCase = charCode >= "a".charCodeAt(0) && charCode <= "z".charCodeAt(0);
    return (isLowerCase) ? charCode - "a".charCodeAt(0) + 1 : charCode - "A".charCodeAt(0) + 27;
}

function getSum(array) {
    return array.reduce((total, current) => total + current, 0);
}

function getPrioritySum(array) {
    return getSum(array.map(stringArray => getCharPriority(findDuplicateChar(...stringArray))));
}

console.log(getPrioritySum(rucksackList));
console.log(getPrioritySum(groupList));