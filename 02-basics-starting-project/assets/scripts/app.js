let defaultResult = 0;
currentResult = defaultResult;
const logs = [];

function calculateResult(type) {
  const enteredNumber = parseInt(userInput.value);
  let mathOperator;
  let operation = "";
  if (type === "add") {
    mathOperator = "+";
    operation = "Addition";
    currentResult += enteredNumber;
  } else if (type === "sub") {
    mathOperator = "-";
    operation = "Subtraction";
    currentResult -= enteredNumber;
  } else if (type === "mul") {
    mathOperator = "*";
    operation = "Multiplication";
    currentResult *= enteredNumber;
  } else if (type === "div") {
    mathOperator = "/";
    operation = "Division";
    currentResult /= enteredNumber;
  }

  displayDetails(mathOperator, currentResult, enteredNumber);
  log(operation, enteredNumber);
}

function log(action, value) {
  const logString = action + " of: " + value;
  console.log(logString);
  logs.push(logString);
}

function add() {
  calculateResult("add");
}

function subtract() {
  calculateResult("sub");
}

function multiply() {
  calculateResult("mul");
}

function divide() {
  calculateResult("div ");
}

function displayDetails(operator, currentResult, enteredNumber) {
  const calcDescription = `${currentResult} ${operator} ${enteredNumber}`;
  outputResult(currentResult, calcDescription);
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
