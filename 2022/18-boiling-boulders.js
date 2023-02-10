const fs = require("fs");

class Tile {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

const input = fs.readFileSync("./input/day-18.txt", { encoding: "utf-8" }).trim();
const lavaDroplets = input.split("\n").map(string => new Tile(...string.split(",").map(str => +str)));
const exposedAir = [];
const sides = [
    {x: 1, y: 0, z: 0},
    {x: -1, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 0, y: -1, z: 0},
    {x: 0, y: 0, z: 1},
    {x: 0, y: 0, z: -1}
]

function isSideExposed(x, y, z, side) {
    if (exposedAir.length) {
        return (includes(exposedAir, x + side.x, y + side.y, z + side.z));
    }
    return !includes(lavaDroplets, x + side.x, y + side.y, z + side.z);
}

function includes(array, x, y, z) {
    return array.some(tile => tile.x === x && tile.y === y && tile.z === z);
}

function getSurfaceArea(totalArea, lava) {
    const [x, y, z] = [lava.x, lava.y, lava.z];
    const area = sides.reduce((area, side) => area + isSideExposed(x, y, z, side), 0);
    return totalArea + area;
}

function getBoundingBox() {
    const box = {}
    box.minX = lavaDroplets.reduce((min, lava) => lava.x < min ? lava.x : min, 0) - 1;
    box.minY = lavaDroplets.reduce((min, lava) => lava.y < min ? lava.y : min, 0) - 1;
    box.minZ = lavaDroplets.reduce((min, lava) => lava.z < min ? lava.z : min, 0) - 1;
    box.maxX = lavaDroplets.reduce((max, lava) => lava.x > max ? lava.x : max, 0) + 1;
    box.maxY = lavaDroplets.reduce((max, lava) => lava.y > max ? lava.y : max, 0) + 1;
    box.maxZ = lavaDroplets.reduce((max, lava) => lava.z > max ? lava.z : max, 0) + 1;
    return box;
}

function getExposedAir() {
    const box = getBoundingBox();
    let tiles = [new Tile(box.minX, box.minY, box.minZ)];
    while (tiles.length > 0) {
        const newTiles = [];
        for (const currentTile of tiles) {
            for (const side of sides) {
                const x = currentTile.x + side.x;
                const y = currentTile.y + side.y;
                const z = currentTile.z + side.z;
                if (x < box.minX || x > box.maxX ||
                    y < box.minY || y > box.maxY ||
                    z < box.minZ || z > box.maxZ ||
                    includes(exposedAir, x, y, z) ||
                    includes(lavaDroplets, x, y, z)) {
                    continue;
                }
                const tile = new Tile(x, y, z)
                newTiles.push(tile);
                exposedAir.push(tile);
            }
        }
        tiles = newTiles;
    }
}

console.log(lavaDroplets.reduce(getSurfaceArea, 0));
getExposedAir()
console.log(lavaDroplets.reduce(getSurfaceArea, 0));