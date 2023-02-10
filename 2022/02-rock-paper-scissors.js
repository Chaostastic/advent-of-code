const fs = require("fs");

const input = fs.readFileSync("./input/day-2.txt", { encoding: "utf-8" }).trim();
const roundList = input.split("\n");
const outcomeScore = {X: 0, Y: 3, Z: 6};
const selectScore = {X: 1, Y: 2, Z: 3};
const opponentScore = {A: 1, B: 2, C: 3};

function getRoundScore(round, isOutcome) {
    let opponent, response, outcome, score;
    if (isOutcome) {
        [opponent, outcome] = round.split(" ");
        score = getRoundScoreByOutcome(opponentScore[opponent], outcomeScore[outcome]);
    } else {
        [opponent, response] = round.split(" ");
        score = getRoundScoreByResponse(opponentScore[opponent], selectScore[response]);
    }
    return score;
}

function getRoundScoreByResponse(opponent, response) {
    let difference = opponent - response;
    if (difference < 0) difference += 3;
    switch (difference) {
        case 0: return 3 + response;
        case 1: return 0 + response;
        case 2: return 6 + response;
    }
}

function getRoundScoreByOutcome(opponent, outcome) {
    switch (outcome) {
        case 3: return opponent + outcome;
        case 0: return ((opponent === 1) ? 3 : opponent - 1) + outcome;
        case 6: return ((opponent === 3) ? 1 : opponent + 1) + outcome;
    }
}

function getTotalScore(isOutcome) {
    return roundList.reduce((total, current) => total + getRoundScore(current, isOutcome), 0);
}

console.log(getTotalScore());
console.log(getTotalScore(true));