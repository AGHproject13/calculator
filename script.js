const display = document.querySelector(".display .result");
const clearButton = document.querySelector(".buttons .clear-delete-row #clear");
const deleteButton = document.querySelector(
  ".buttons .clear-delete-row #delete"
);
const decimalButton = document.querySelector(".buttons .row #decimal");
const numbers = document.querySelectorAll(".buttons .row .number");
const operators = document.querySelectorAll(".buttons .row .operator");
const equalsButton = document.querySelector(".buttons .row #equals");

let result;
let firstNumber;
let secondNumber;
let operator;

// Keep track whether equalsButton was clicked,
// So that addNumber can override the result if new number is clicked
let equalsClicked = false;

clearDisplay(); // Default display
clearButton.addEventListener("click", clearDisplay);
deleteButton.addEventListener("click", deleteNumber);
decimalButton.addEventListener("click", addDecimal);
numbers.forEach((num) => {
  num.addEventListener("click", addNumber);
});
operators.forEach((op) => {
  op.addEventListener("click", addOperator);
});
equalsButton.addEventListener("click", () => {
  equalsClicked = true;
  getResult();
});

/* Functions */
function updateDisplay() {
  display.innerText = result;
}

function clearDisplay() {
  result = "0";
  firstNumber = "0";
  operator = null;
  secondNumber = null;
  equalsClicked = false;
  updateDisplay();
}

function addNumber() {
  if (result === "0") {
    result = this.innerText;
  }
  // If equals button is clicked and an operator isn't, then new number will replace the last result
  else if (equalsClicked) {
    result = this.innerText;
    equalsClicked = false;
  } else {
    result += this.innerText;
  }

  // if no operator yet, add to first number
  if (!operator) firstNumber = result;
  // If an operator already chosen, then add to second number
  else if (!secondNumber) secondNumber = this.innerText;
  else secondNumber += this.innerText;

  updateDisplay();
}

function addOperator() {
  // If a pair of numbers already exists
  if (operator && secondNumber) {
    getResult();
  }

  // If an operator already chosen, that means the last result is used as the firstNumber
  equalsClicked = false;

  if (this.getAttribute("id") === "addition") operator = "+";
  else if (this.getAttribute("id") === "subtraction") operator = "-";
  else if (this.getAttribute("id") === "multiplication") operator = "x";
  else if (this.getAttribute("id") === "division") operator = "/";
  result += operator;
  updateDisplay();
}

function getResult() {
  result = operate(operator, +firstNumber, +secondNumber);
  firstNumber = "" + result;
  operator = null;
  secondNumber = null;
  updateDisplay();
}

function deleteNumber() {
  if (!operator && firstNumber !== "0") {
    result = result.substring(0, result.length - 1);
    firstNumber = firstNumber.substring(0, firstNumber.length - 1);
  } else if (secondNumber && secondNumber !== "0") {
    result = result.substring(0, result.length - 1);
    secondNumber = secondNumber.substring(0, secondNumber.length - 1);
  }
  updateDisplay();
}

function addDecimal() {
  result += ".";
  if (!operator) {
    firstNumber += ".";
  } else if (operator && !secondNumber) {
    secondNumber = "0.";
  } else if (secondNumber) {
    secondNumber += ".";
  }
  updateDisplay();
}

function add(num1, num2) {
  return Math.round((num1 + num2) * 100000000) / 100000000;
}

function subtract(num1, num2) {
  return Math.round((num1 - num2) * 100000000) / 100000000;
}

function multiply(num1, num2) {
  return Math.round(num1 * num2 * 100000000) / 100000000;
}

function divide(num1, num2) {
  return Math.round((num1 / num2) * 100000000) / 100000000;
}

function operate(symbol, num1, num2) {
  if (symbol === "+") return add(num1, num2);
  else if (symbol === "-") return subtract(num1, num2);
  else if (symbol === "x") return multiply(num1, num2);
  else if (symbol === "/") return divide(num1, num2);
}
