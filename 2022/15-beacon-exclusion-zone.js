const fs = require("fs");

const input = fs.readFileSync("./input/day-15.txt", { encoding: "utf-8" }).trim();
const sensors = input.split("\n").map(createSensor);
const directions = [
    {x: 1, y: -1},
    {x: 1, y: 1},
    {x: -1, y: -1}, 
    {x: -1, y: 1}
]

function createSensor(string) {
    const [x, y, beaconX, beaconY] = string.match(/-*\d+/g).map(str => +str);
    const sensor = {x, y, beaconX, beaconY};
    sensor.radius = getDistance(x, beaconX, y, beaconY);
    return sensor;
}

function getDistance(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function isBeaconPossible(x, y) {
    if (y < 0 || y > 4000000 || x < 0 || x > 4000000) return false;
    return (sensors.every(sensor => getDistance(x, sensor.x, y, sensor.y) > sensor.radius));
}

function getOutruledPositions(y) {
    let positionCount = -1;
    for (let x = -1000000; x < 6000000; x++) {
        if (sensors.some(sensor => getDistance(x, sensor.x, y, sensor.y) <= sensor.radius)) {
            positionCount++;
        }
    }
    return positionCount;
}

function getTuningFrequency() {
    for (const sensor of sensors) {
        for (const direction of directions) {
            let x1 = sensor.x - (sensor.radius + 1) * direction.x;
            let y1 = sensor.y;
            while (x1 * direction.x <= sensor.x * direction.x) {
                if (isBeaconPossible(x1, y1)) return x1 * 4000000 + y1;
                x1 += direction.x;
                y1 += direction.y;
            }
        }
    }
}

console.log(getOutruledPositions(2000000))
console.log(getTuningFrequency());