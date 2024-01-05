const fs = require("fs");

class Monkey {
    constructor(string) {
        const arr = string.split(": ");
        this.name = arr[0];
        if (isNaN(arr[1])) {
            this.operation = arr[1].split(" ");
        } else {
            this.value = +arr[1];
        }
    }
}

const input = fs.readFileSync("./input.txt", { encoding: "utf-8" }).trim();
const monkeys = input.split("\n").map(string => new Monkey(string));

function getMonkey(name) {
    return monkeys.find(monkey => monkey.name === name);
}

function calculate(operand1, operation, operand2, reverse) {
    if (reverse) {
        switch (operation) {
            case "-": return operand1 + operand2;
            case "+": return operand1 - operand2;
            case "/": return operand1 * operand2;
            case "*": return operand1 / operand2;
        } 
    }
    switch (operation) {
        case "+": return operand1 + operand2;
        case "-": return operand1 - operand2;
        case "*": return operand1 * operand2;
        case "/": return operand1 / operand2;
    } 
}

function getRoot() {
    getMonkey("humn").variable = true;
    const root = getMonkey("root");
    while (!root.value) {
        for (let i = 0; i < monkeys.length; i++) {
            if (monkeys[i].value) continue;
            const [name1, operation, name2] = monkeys[i].operation;
            const monkey1 = getMonkey(name1);
            if (!monkey1.value) continue;
            if (monkey1.variable) monkeys[i].variable = true;
            const monkey2 = getMonkey(name2);
            if (!monkey2.value) continue;
            if (monkey2.variable) monkeys[i].variable = true;
            monkeys[i].value = calculate(monkey1.value, operation, monkey2.value);
        }
    }
    return root.value;
}

function getHumn() {
    let value = 0;
    let monkey = getMonkey("root");
    monkey.operation[1] = "-";
    while (monkey.name !== "humn") {
        const [name1, operation, name2] = monkey.operation;
        const monkey1 = getMonkey(name1);
        const monkey2 = getMonkey(name2);
        if (monkey1.variable) {
            value = calculate(value, operation, monkey2.value, true);
            monkey = monkey1;
        } else {
            if (operation === "/" || operation === "-") {
                value = calculate(monkey1.value, operation, value);
            } else {
                value = calculate(value, operation, monkey1.value, true);
            }
            monkey = monkey2;
        }
    }
    return value;
}

console.log(getRoot());
console.log(getHumn());
