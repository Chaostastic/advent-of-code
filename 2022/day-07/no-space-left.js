const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const commandList = input.split("\n");
const dirSizes = {};
const currentDirList = [];

function readOutput(output) {
    if (output.includes("dir ") || output === "$ ls") return;
    if (output === "$ cd ..") {
        currentDirList.pop();
    } else if (output.includes("$ cd ")) {
        const dirName = output.replace("$ cd ","");
        currentDirList.push(dirName);
    } else {
        const fileSize = +output.split(" ")[0];
        for (let i = 1; i <= currentDirList.length; i++) { 
            const dir = currentDirList.slice(0, i).join("/");
            dirSizes[dir] ? dirSizes[dir] += fileSize : dirSizes[dir] = fileSize;
        }
    }
}

function getDirSum(dirSizes) {
    let total = 0;
    for (const dirName in dirSizes) {
        if (dirSizes[dirName] <= 100000) total += dirSizes[dirName];
    }
    return total;
}

function findDirToDelete() {
    let lowest = dirSizes["/"];
    const minimumSize = lowest - 40000000;
    for (const dirName in dirSizes) {
        const dirSize = dirSizes[dirName];
        if (dirSize >= minimumSize && dirSize < lowest) lowest = dirSize;
    }
    return lowest;
}

commandList.forEach(readOutput);

console.log(getDirSum());
console.log(findDirToDelete());