// Select elements
const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

let currentInput = "";
let currentOperator = "";
let firstOperand = "";

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        handleInput(value);
    });
});

// Add event listeners to operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        handleInput(value);
    });
});

// Handle user input
function handleInput(value) {
    if (isNumber(value)) {
        currentInput += value;
        updateDisplay(currentInput);
    } else if (isOperator(value)) {
        if (currentInput !== "") {
            firstOperand = currentInput;
            currentInput = "";
            currentOperator = value;
        }
    } else if (value === "=") {
        if (currentInput !== "") {
            const result = calculate(firstOperand, currentOperator, currentInput);
            updateDisplay(result);
            currentInput = result;
        }
    } else if (value === "C") {
        currentInput = "";
        currentOperator = "";
        firstOperand = "";
        updateDisplay("");
    }
}

// Update the display
function updateDisplay(value) {
    display.value = value;
}

// Check if a value is a number
function isNumber(value) {
    return !isNaN(value);
}

// Check if a value is an operator
function isOperator(value) {
    return ["+", "-", "*", "/"].includes(value);
}

// Perform calculations
function calculate(operand1, operator, operand2) {
    operand1 = parseFloat(operand1);
    operand2 = parseFloat(operand2);
    switch (operator) {
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            return operand1 / operand2;
        default:
            return operand2;
    }
}
