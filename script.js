const numberButtons = Array.from(document.querySelectorAll('.numbers'));
const operatorButtons = Array.from(document.querySelectorAll('.operators'));
const displayResult = document.querySelector('.display-result')
const decimal = document.querySelector('#decimal');
const positiveOrNegative = document.querySelector('#positiveOrNegative');
const clear = document.querySelector('.clear');
const result = document.querySelector('.result');
const backspace = document.querySelector('.backspace');

let operator = '';
let num1 = '';
let num2 = '';
let tempResult = '';
let rndNum;

if (!displayResult.textContent.includes('.')) {
    decimal.disabled = false;
}

function add() {
    rndNum = +num1 + +num2;
    if (rndNum % 1 !== 0) {
        return rndNum.toFixed(2);
    } else {
        return rndNum;
    }
}

function subtract() {
    rndNum = +num1 - +num2;
    if (rndNum % 1 !== 0) {
        return rndNum.toFixed(2);
    } else {
        return rndNum;
    }
}

function multiply() {
    rndNum = +num1 * +num2;
    if (rndNum % 1 !== 0) {
        return rndNum.toFixed(2);
    } else {
        return rndNum;
    }
}

function divide() {
    rndNum = +num1 / +num2;
    if (+num2 === 0) {
        return 'ERROR';
    } else if (rndNum % 1 !== 0) {
        return rndNum.toFixed(2);
    } else {
        return rndNum;
    }
}

function toNegativeOrPositive() {
    let currentDisplay = parseFloat(displayResult.textContent);
    if (isNaN(currentDisplay)) return '';

    if (currentDisplay === 0) {
        return '0';
    } else {
        let newValue = -currentDisplay;
        if (num2 !== '') {
            num2 = newValue.toString();
            return num2;
        } else {
            num1 = newValue.toString();
            return num1;
        }
    }
}

function operate() {
    if (num1 === '' || num2 === '' || operator === '') {
        return;
    }

    switch (operator) {
        case '+':
            tempResult = add();
            break;
        case '-':
            tempResult = subtract();
            break;
        case 'x':
            tempResult = multiply();
            break;
        case '÷':
            tempResult = divide();
            break;
        default:
            return;
    }
    num1 = tempResult;
}

clear.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operator = '';
    tempResult = '';
    displayResult.textContent = '';
    decimal.disabled = false;
    backspace.disabled = false;
});

numberButtons.map(number => {
    number.addEventListener('click', (e) => {
        let targetNum = e.target.textContent;

        if (targetNum === '.' && displayResult.textContent.includes('.') && operator === '') {
            return;
        }
        if (targetNum === '.' && num2.includes('.') && operator !== '') {
            return;
        }

        if (operator !== '' && num1 !== '') {
            if (num2 === '' && targetNum === '.') {
                num2 = '0.';
            } else {
                num2 += targetNum;
            }
            displayResult.textContent = num2;
        } else {
            if (num1 === '' && targetNum === '.') {
                num1 = '0.';
            } else {
                num1 += targetNum;
            }
            displayResult.textContent = num1;
            num2 = '';
            tempResult = '';
        }

        if (displayResult.textContent.includes('.')) {
            decimal.disabled = true;
        } else {
            decimal.disabled = false;
        }
    });
});

document.addEventListener('keydown', (e) => {
    let key = e.key;
    let targetNum = '';

    if (key >= '0' && key <= '9') {
        targetNum = key;
    } else if (key === '.') {
        targetNum = key;
    } else if (key === 'Backspace') {
        erase();
        return;
    } else if (key === 'Enter') {
        revealResult();
        return;
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        let displayOperator = key;
        if (key === '*') displayOperator = 'x';
        if (key === '/') displayOperator = '÷';
        
        operate();
        operator = displayOperator;
        if (num1 !== '' && num2 !== '') {
            displayResult.textContent = tempResult;
            num2 = '';
        } else if (displayResult.textContent !== '' && num1 === '') {
            num1 = displayResult.textContent;
            num2 = '';
        }
        decimal.disabled = false;
        return;
    }

    if (targetNum !== '') {
        if (targetNum === '.' && displayResult.textContent.includes('.') && operator === '') {
            return;
        }
        if (targetNum === '.' && num2.includes('.') && operator !== '') {
            return;
        }

        if (operator !== '' && num1 !== '') {
            if (num2 === '' && targetNum === '.') {
                num2 = '0.';
            } else {
                num2 += targetNum;
            }
            displayResult.textContent = num2;
        } else {
            if (num1 === '' && targetNum === '.') {
                num1 = '0.';
            } else {
                num1 += targetNum;
            }
            displayResult.textContent = num1;
            num2 = '';
            tempResult = '';
        }

        if (displayResult.textContent.includes('.')) {
            decimal.disabled = true;
        } else {
            decimal.disabled = false;
        }
    }
});

decimal.addEventListener('click', () => {
    if (!displayResult.textContent.includes('.')) {
        if (operator !== '' && num1 !== '') {
            num2 += '.';
            displayResult.textContent = num2;
        } else {
            num1 += '.';
            displayResult.textContent = num1;
        }
        decimal.disabled = true;
    }
});

positiveOrNegative.addEventListener('click', () => {
    displayResult.textContent = toNegativeOrPositive();
    if (operator === '') {
        num1 = displayResult.textContent;
    } else {
        num2 = displayResult.textContent;
    }
});

function erase() {
    if (displayResult.textContent !== '') {
        let currentDisplay = displayResult.textContent;
        if (currentDisplay.endsWith('.')) {
            decimal.disabled = false;
        }
        displayResult.textContent = currentDisplay.substring(0, currentDisplay.length - 1);

        if (operator === '') {
            num1 = displayResult.textContent;
        } else {
            num2 = displayResult.textContent;
        }

        if (displayResult.textContent.length === 0) {
            num1 = '';
            num2 = '';
            decimal.disabled = false;
        }
    }
}

backspace.addEventListener('click', erase);

operatorButtons.map(operators => {
    operators.addEventListener('click', (e) => {
        if (num1 !== '' && num2 !== '' && operator !== '') {
            operate();
            displayResult.textContent = tempResult;
            num1 = tempResult;
            num2 = '';
        } else if (displayResult.textContent !== '' && num1 === '') {
            num1 = displayResult.textContent;
        }
        operator = e.target.textContent;
        decimal.disabled = false;
    });
});

function revealResult() {
    if (num1 === '') {
        displayResult.textContent = '';
        return;
    }

    if (operator === '' || num2 === '') {
        displayResult.textContent = num1;
    } else {
        operate();
        displayResult.textContent = tempResult;
        operator = '';
        num1 = tempResult;
        num2 = '';

        if (displayResult.textContent.includes('.')) {
            decimal.disabled = true;
        } else {
            decimal.disabled = false;
        }

        if (displayResult.textContent === 'ERROR') {
            num1 = '';
            num2 = '';
            operator = '';
            decimal.disabled = false;
        }
    }
    if (displayResult.textContent === '') {
        displayResult.textContent = '';
    }
}

result.addEventListener('click', revealResult);
