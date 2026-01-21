// basic functions in calculator
const add = function(a, b) {
    return a + b;
};
const subtract = function(a, b) {
    return a - b;
};
const multiply = function(a, b) {
    return a * b;
};
const divide = function(a, b) {
    return a / b;
};

let firstNumber;
let secondNumber;
let operator;

const operate = function(first, second, operator) {
    switch (operator) {
        case "+":
            return add(first, second);
        case "-":
            return subtract(first, second);
        case "*":
            return multiply(first, second);
        default:
            return divide(first, second);
    }
};
