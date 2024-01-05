const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();

function compare(value1, value2) {
    const length = Math.max(value1.length, value2.length);
    if (length === 0) return null;
    for (let i = 0; i < length; i++) {
        if (typeof(value1[i]) === "number" && typeof(value2[i]) === "number")  {
            if (value1[i] === value2[i]) continue;
            return (value1[i] < value2[i]);
        }   
        if (value1[i] === undefined) return true;
        if (value2[i] === undefined) return false;
        if (typeof(value1[i]) === "number") value1[i] = [value1[i]];
        if (typeof(value2[i]) === "number") value2[i] = [value2[i]];
        const eval = compare(value1[i], value2[i]);
        if (eval !== null) return eval;
    }
    return null;
}

function getIndexSum() {
    const packetPairList = input.split("\n\n")
        .map(pair => pair.split("\n").map(packet => eval(packet)));
    return packetPairList.reduce((total, pair, i) => compare(...pair) ? total + i + 1 : total, 0);
}

function getDecoderKey() {
    const dividerPackets = [[[2]],[[6]]];
    const packetList = input.split(/\n+/g).map(packet => eval(packet));
    packetList.push(...dividerPackets);
    packetList.sort((a, b) => compare(a, b) ? -1 : 1)
    return dividerPackets.reduce((key, divider) => {
        return key * (packetList.findIndex(packet => packet === divider) + 1)
    }, 1);
}

console.log(getIndexSum());
console.log(getDecoderKey());