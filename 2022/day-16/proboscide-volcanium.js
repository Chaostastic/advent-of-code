const fs = require("fs");

class Position {
    constructor(currentValves, pressure = 0, openValves = []) {
        this.currentValves = currentValves;
        this.openValves = openValves;
        this.pressure = pressure;
    }
}

class Valve {
    constructor(input) {
        const names = input.match(/[A-Z]{2}/g);
        this.name = names[0];
        this.rate = +input.match(/\d+/);
        this.leads = names;
    }
}

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const valves = input.split("\n").map(valve => new Valve(valve));
valves.forEach(valve => valve.leads = valve.leads.map(createRefrence));

function createRefrence(name) {
    return valves.find(valve => valve.name === name);
}

function removeWorstPositions(positions, keep) {
    if (positions.length < keep) return
    positions.sort((a, b) => b.pressure - a.pressure);
    positions.splice(keep, positions.length - keep);
}

function getNextMovesDouble(position, nextRound) {
    const valve = position.currentValves[0];
    const valveE = position.currentValves[1];
    for (const lead of valve.leads) {
        for (const leadE of valveE.leads) {
            const openValves = [...position.openValves];
            if (valve === lead) {
                if (openValves.includes(valve) || valve.rate === 0) continue;
                openValves.push(valve);
            }
            if (valveE === leadE) {
                if (openValves.includes(valveE) || valveE.rate === 0) continue;
                openValves.push(valveE);
            }
            nextRound.push(new Position([lead, leadE], position.pressure, openValves)); 
        }  
    }
}

function getNextMoves(position, nextRound) {
    const valve = position.currentValves[0];
    for (const lead of valve.leads) {
        const openValves = [...position.openValves];
        if (valve === lead) {
            if (openValves.includes(valve) || valve.rate === 0) continue;
            openValves.push(valve);
        }
        nextRound.push(new Position([lead], position.pressure, openValves));   
    }
}

function findBestPath(minutes, double) {
    const startValve = (valves.find(valve => valve.name === "AA"));
    let possiblePositions = [new Position([startValve, startValve])];
    for (let minute = 1; minute <= minutes; minute++) {
        const nextRound = [];
        for (const position of possiblePositions) {
            position.pressure = position.openValves.reduce((pressure, valve) => {
                return pressure + valve.rate;
            }, position.pressure);
            if (double) {
                getNextMovesDouble(position, nextRound);
            } else {
                getNextMoves(position, nextRound);
            }
        }
        removeWorstPositions(nextRound, 50000);
        possiblePositions = nextRound;
        console.log(minute);
    }
    return possiblePositions[0].pressure;
}

console.log(findBestPath(30));
console.log(findBestPath(26, true));