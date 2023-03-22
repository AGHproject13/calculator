const display = document.querySelector(".display .result");
const clearButton = document.querySelector(".buttons .clear-delete-row #clear");
const deleteButton = document.querySelector(
  ".buttons .clear-delete-row #delete"
);
const numbers = document.querySelectorAll(".buttons .row .number");
const operators = document.querySelectorAll(".buttons .row .operator");
const resultButton = document.querySelector(".buttons .row #equals");

let result;
let firstNumber;
let secondNumber;
let operator;
let equalsClicked = false;

clearDisplay(); // Default display
clearButton.addEventListener("click", clearDisplay);
deleteButton.addEventListener("click", deleteNumber);
numbers.forEach((num) => {
  num.addEventListener("click", addNumber);
});
operators.forEach((op) => {
  op.addEventListener("click", addOperator);
});
resultButton.addEventListener("click", () => {
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

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
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
