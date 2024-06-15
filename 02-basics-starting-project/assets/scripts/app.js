let defaultResult = 0;
currentResult = defaultResult;
const logs = [];

function log(action, value) {
  const logString = action + " of: " + value;
  console.log(logString);
  logs.push(logString);
}

function add() {
  const enteredNumber = parseInt(userInput.value);
  currentResult += enteredNumber;
  displayDetails("+", currentResult, enteredNumber);
  log("Addition", enteredNumber);
}

function subtract() {
  const enteredNumber = parseInt(userInput.value);
  currentResult -= enteredNumber;
  displayDetails("-", currentResult, enteredNumber);
  log("Subtraction", enteredNumber);
}

function multiply() {
  const enteredNumber = parseInt(userInput.value);
  currentResult *= enteredNumber;
  displayDetails("x", currentResult, enteredNumber);
  log("Multiply", enteredNumber);
}

function divide() {
  const enteredNumber = parseInt(userInput.value);
  currentResult /= enteredNumber;
  displayDetails("/", currentResult, enteredNumber);
  log("Division", enteredNumber);
}

function displayDetails(operator, currentResult, enteredNumber) {
  const calcDescription = `${currentResult} ${operator} ${enteredNumber}`;
  outputResult(currentResult, calcDescription);
}

addBtn.addEventListener("click", add);
subtractBtn.addEventListener("click", subtract);
multiplyBtn.addEventListener("click", multiply);
divideBtn.addEventListener("click", divide);
