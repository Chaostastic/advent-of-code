const fs = require("fs");

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const primes = [2, 3, 5, 7, 11, 13, 17, 19];
let monkeys;

function createMonkey(input) {
    const monkey = {};
    monkey.inspectedItems = 0;
    monkey.index = +input[0].match(/\d/);
    monkey.items = input[1].match(/\d{2}/g).map(createItem);
    monkey.operation = input[2].split(" = ")[1];
    monkey.testDivisible = +input[3].match(/\d+/);
    monkey.nextIfTrue = +input[4].match(/\d/);
    monkey.nextIfFalse = +input[5].match(/\d/);
    return monkey;
}

function createItem(worryLevel) {
    const item = {};
    item.mod = {};
    item.worryLevel = +worryLevel;
    primes.forEach(prime => item.mod[prime] = item.worryLevel % prime);
    return item;
}

function inspectItemsDivide(monkey) {
    for (let i = 0; i < monkey.items.length; i++) {
        const item = monkey.items[i];
        const old = item.worryLevel;
        item.worryLevel = Math.floor(eval(monkey.operation) / 3);
        const nextMonkey = (item.worryLevel % monkey.testDivisible === 0) ? monkey.nextIfTrue : monkey.nextIfFalse;
        monkeys.find(m => m.index === nextMonkey).items.push(item);
        monkey.inspectedItems++;
    }
    monkey.items = [];
}

function inspectItems(monkey) {
    for (let i = 0; i < monkey.items.length; i++) {
        const item = monkey.items[i];
        primes.forEach(prime => {
            const old = item.mod[prime];
            item.mod[prime] = eval(monkey.operation) % prime;
        })
        const nextMonkey = (item.mod[monkey.testDivisible] === 0) ? monkey.nextIfTrue : monkey.nextIfFalse;
        monkeys.find(m => m.index === nextMonkey).items.push(item);
        monkey.inspectedItems++;
    }
    monkey.items = [];
}

function getMonkeyBusiness(rounds, divideWorry) {
    monkeys = input.split("\n\n").map(string => createMonkey(string.split("\n")));
    for (let i = 0; i < rounds; i++) {
        if (divideWorry) {
            monkeys.forEach(inspectItemsDivide);
        } else {
            monkeys.forEach(inspectItems);
        }
    }
    monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems);
    return monkeys[0].inspectedItems * monkeys[1].inspectedItems;
}

console.log(getMonkeyBusiness(20, true));
console.log(getMonkeyBusiness(10000));