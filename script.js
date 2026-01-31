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
// Funtion to update globals
function updateVal(val) {
    if (val === "AC" || val === ".") {
        clearDisplay();
        return;
    }
    if (val === "=" && (which === "first" || which === "op")) {
        return;
    }
    if (which === "first") {
        if (+val || +val === 0) {
            firstNumber *= 10;
            firstNumber += +val;
        } else {
            operator = val;
            which = "op";
        }
    } else if (which === "second") {
        if (+val || +val === 0) {
            secondNumber *= 10;
            secondNumber += +val;
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
        } else {
            operator = val;
        }
    }
    if (firstNumber === "Don't try this nonsense again. You hear me?" || firstNumber === "Infinity") {
        clearDisplay();
        alert("Don't try that again.");
    }
    updateDisplay();
}

// Each digit button gets a function to update our globals
const digitButtons = document.querySelectorAll(".calculator-buttons *");
digitButtons.forEach((digitButton) => {
    digitButton.addEventListener("click", (e) => updateVal(e.target.textContent));
});