// basic functions in calculator
const add = function(a, b) {
    return +a + +b;
};
const subtract = function(a, b) {
    return a - b;
};
const multiply = function(a, b) {
    return a * b;
};
const divide = function(a, b) {
    if (b === 0) {
        return "Don't try this nonsense again. You hear me?";
    }
    return a / b;
};

let firstNumber = 0;
let secondNumber = 0;
let operator;
let which = "first";

// function to update the display
const calcDisplay = document.querySelector(".calculator-display");
function updateDisplay() {
    if (which === "first") {
        calcDisplay.textContent = firstNumber;
    } else if (which === "op") {
        calcDisplay.textContent = firstNumber + " " + operator;
    } else {
        calcDisplay.textContent = firstNumber + " " + operator + " " + secondNumber;
    }
}

// function that runs when you press AC
function clearDisplay() {
    firstNumber = 0;
    secondNumber = 0;
    which = "first";
    calcDisplay.textContent = 0;
}

const operate = function(first, second, op) {
    switch (op) {
        case "+":
            return add(first, second);
        case "-":
            return subtract(first, second);
        case "*":
            return multiply(first, second);
        case "÷":
            return divide(first, second);
        case "=":
            return operate(first, second, operator);

    }
};
// Function to update globals
function updateVal(val) {
    if (val === "AC") {
        clearDisplay();
        return;
    } else if (val === "=" && (which === "first" || which === "op")) {
        return;
    } else if (which === "first") {
        if (+val || +val === 0 || val === ".") {
            if (val === "." && firstNumber.includes(".")) {
                return;
            }
            firstNumber = addDigit(firstNumber, val);
        } else if (val === "del") {
            if (firstNumber != 0) {
                firstNumber = +`${firstNumber}`.substring(0, firstNumber.length - 1);
            }
        } else {
            operator = val;
            which = "op";
        }
    } else if (which === "second") {
        if (+val || +val === 0 || val === ".") {
            if (val === "." && secondNumber.includes(".")) {
                return;
            }
            secondNumber = addDigit(secondNumber, val);
        } else if (val === "del") {
            if (secondNumber != 0) {
                secondNumber = +`${secondNumber}`.substring(0, secondNumber.length - 1);
                if (secondNumber === 0) {
                    which = "op";
                }
            }
        } else {
            if (val !== "=") {
                firstNumber = operate(firstNumber, secondNumber, operator);
                operator = val;
                which = "second";
            } else {
                firstNumber = operate(firstNumber, secondNumber, val);
                which = "first";
            }
            secondNumber = 0;
        }
    } else {
        if (+val || +val === 0) {
            secondNumber = +val;
            which = "second";
        } else if (val === "del") {
            operator = "";
            which = "first";
        } else if (val === ".") {
            secondNumber = addDigit(secondNumber, val);
            which = "second";
        } else {
            operator = val;
        }
    }
    if (firstNumber === "Don't try this nonsense again. You hear me?" || firstNumber === "Infinity") {
        clearDisplay();
        alert("Don't try that again.");
    }
    updateDisplay();
    // if (val === "=") {
    //     firstNumber = 0;
    // }
}

// New mechanism to add digits with concatenation rather than mathematically.
function addDigit(original, digit) {
    return original !== 0 ? `${original}${digit}` : `${digit}`;
}

// Each digit button gets a function to update our globals
const digitButtons = document.querySelectorAll(".calculator-buttons *");
digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", (e) => updateVal(e.target.textContent));
});

// Adding keyboard support here
const htmlSelected = document.querySelector("html");
const supportedOperations = ["+", "-", "*", "."]
htmlSelected.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (+e.key || supportedOperations.includes(e.key)) {
        updateVal(`${e.key}`);
    } else if (e.key === "0") {
        updateVal("0");
    } else if (e.key === "/") {
        updateVal(`÷`);
    } else if (e.key === "Backspace") {
        updateVal("del");
    } else if (e.key === "Enter") {
        updateVal("=");
    } else if (e.key === "c") {
        updateVal("AC");
    }
});