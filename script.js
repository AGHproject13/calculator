const display = document.querySelector(".display .result");
const clearButton = document.querySelector(".buttons .clear-delete-row .clear");
const numbers = document.querySelectorAll(".buttons .row .number");
const operators = document.querySelectorAll(".buttons .row .operator");

let result;
let firstNumber;
let secondNumber;
let operator;

clearDisplay();
clearButton.addEventListener("click", clearDisplay);
numbers.forEach((num) => {
  num.addEventListener("click", addNumber);
});
operators.forEach((op) => {
  op.addEventListener("click", addOperator);
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
  updateDisplay();
}

function addNumber() {
  if (result === "0") {
    result = this.innerText;
  } else {
    result += this.innerText;
  }

  // if no operator yet, add to first number
  if (!operator) firstNumber = result;
  // If an operator already chosen, then add to second number
  else if (!secondNumber) secondNumber = this.innerText;
  else secondNumber += this.innerText;
  console.log(firstNumber + " " + secondNumber);
  updateDisplay();
}

function addOperator() {
  // If a pair of numbers already exists
  if (operator && secondNumber) {
    result = operate(operator, +firstNumber, +secondNumber);
    firstNumber = "" + result;
    secondNumber = null;
    console.log(result);
  }

  result += this.innerText;
  operator = this.innerText;
  console.log(operator);
  updateDisplay();
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(symbol, num1, num2) {
  if (symbol === "+") return add(num1, num2);
  if (symbol === "-") return subtract(num1, num2);
  if (symbol === "×") return multiply(num1, num2);
  else return divide(num1, num2);
}
