const display = document.querySelector('#display');
const keys = document.querySelector('.calculator-keys');
let currentInput = '0';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

keys.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.matches('button')) return;

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        return;
    }

    if (target.classList.contains('equal-sign')) {
        calculate();
        return;
    }

    inputNumber(target.value);
});

function inputNumber(number) {
    if (shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateDisplay();
}

function inputDecimal(dot) {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    if (firstOperand === null) {
        firstOperand = parseFloat(currentInput);
    } else if (operator) {
        const result = calculate();
        currentInput = `${parseFloat(result.toFixed(7))}`;
        firstOperand = result;
    }

    shouldResetDisplay = true;
    operator = nextOperator;
}

function calculate() {
    if (operator === null || shouldResetDisplay) return;

    const secondOperand = parseFloat(currentInput);
    let result = 0;
    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            result = firstOperand / secondOperand;
            break;
        default:
            return;
    }

    currentInput = `${result}`;
    operator = null;
    shouldResetDisplay = true;
    updateDisplay();
    return result;
}

function resetCalculator() {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}
