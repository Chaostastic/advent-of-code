const fs = require("fs");

class BluePrint {
    constructor(string) {
        const arr = string.match(/\d+/g).map(str => +str);
        this.index = arr[0];
        this.robots = {
            geode: {ore: arr[5], obsidian: arr[6]},
            obsidian: {ore: arr[3], clay: arr[4]},
            clay: {ore: arr[2]},
            ore: {ore: arr[1]},
            none: null,
        }
    }
}

class Build {
    constructor(build) {
        this.minerals = {
            ore: build.minerals.ore,
            clay: build.minerals.clay,
            obsidian: build.minerals.obsidian,
            geode: build.minerals.geode,
        }
        this.robots = {
            ore: build.robots.ore,
            clay: build.robots.clay,
            obsidian: build.robots.obsidian,
            geode: build.robots.geode,
        }
    }   
}

const input = fs.readFileSync("./input/day-19.txt", { encoding: "utf-8" }).trim();
const bluePrints = input.split("\n").map(string => new BluePrint(string));
const startBuild = {
        minerals: {ore: 0, clay: 0, obsidian: 0, geode: 0},
        robots: {ore: 1, clay: 0, obsidian: 0, geode: 0}
}

function buy(build, robot, bluePrint) {
    if (robot === "none") return true;
    const costs = bluePrint.robots[robot];
    for (const mineral in costs) {
        build.minerals[mineral] -= costs[mineral];
        if (build.minerals[mineral] < 0) return false;
    }
    return true;
}

function removeWorst(newBuilds, mostGeodes, keep) {
    newBuilds = newBuilds.filter(build => build.minerals.geode === mostGeodes);
    if (newBuilds.length > keep) {
        newBuilds.sort((a, b) => b.score - a.score);
        newBuilds.splice(keep, newBuilds.length - keep);
    }
    return newBuilds;
}

function checkBuilds(builds, newBuilds, bluePrint) {
    for (const build of builds) {
        for (const robot in bluePrint.robots) {
            const newBuild = new Build(build);
            if (!buy(newBuild, robot, bluePrint)) continue;
            for (const mineral in newBuild.minerals) {
                newBuild.minerals[mineral] += newBuild.robots[mineral];
            }
            if (robot !== "none") newBuild.robots[robot]++;
            newBuild.score = newBuild.robots.ore + newBuild.robots.clay * 10 + 
                newBuild.robots.obsidian * 100 + newBuild.robots.geode * 1000;
            newBuilds.push(newBuild);
        }
    }
}

function getMostGeodes(bluePrint, minutes) {
    let mostGeodes;
    let builds = [startBuild]
    for (let minute = 1; minute <= minutes; minute++) {
        const newBuilds = [];
        checkBuilds(builds, newBuilds, bluePrint);
        mostGeodes = newBuilds.reduce((geodes, build) => {
            return build.minerals.geode > geodes ? build.minerals.geode : geodes;
        }, 0)
        builds = removeWorst(newBuilds, mostGeodes, 1000);
    }
    console.log(`Blueprint ${bluePrint.index}: ${mostGeodes} geodes`);
    return mostGeodes;
}

function getQualityLevelTotal(minutes) {
    const qualityLevels = bluePrints.map(bluePrint => {
        return getMostGeodes(bluePrint, minutes) * bluePrint.index;
    });
    return qualityLevels.reduce((total, level) => level + total, 0);
}

function getTotalGeodes(minutes) {
    let total = 1;
    for (let i = 0; i < 3; i++) {
        total *= getMostGeodes(bluePrints[i], minutes);
    }
    return total;
}

console.log(getQualityLevelTotal(24));
console.log(getTotalGeodes(32));