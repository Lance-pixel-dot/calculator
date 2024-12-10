const numberButtons = Array.from(document.querySelectorAll('.numbers'));
const operatorButtons = Array.from(document.querySelectorAll('.operators'));
const displayResult = document.querySelector('.display-result')
const clear = document.querySelector('.clear');
const result = document.querySelector('.result');

numberButtons.map( number => {
    number.addEventListener('click', (e) => {
        let targetNum = e.target.textContent;
        displayResult.textContent += targetNum;
    })
});

let targetOp;

operatorButtons.map( operators => {
    operators.addEventListener('click', (e) => {
        targetOp = e.target.textContent;
        displayResult.textContent += targetOp;
    })
});

result.addEventListener('click', () => {
    let separate
    let finalResult
    
    if(targetOp === '+'){
        separate = displayResult.textContent.split('+');
        finalResult = separate.reduce((num1, num2) => +num1 + +num2);
        displayResult.textContent = finalResult;

    }else if(targetOp === '-'){
        separate = displayResult.textContent.split('-');
        finalResult = separate.reduce((num1, num2) => +num1 - +num2);
        displayResult.textContent = finalResult;

    }else if(targetOp === 'x'){
        separate = displayResult.textContent.split('x');
        finalResult = separate.reduce((num1, num2) => +num1 * +num2);
        displayResult.textContent = finalResult;

    }else if(targetOp === '÷'){
        separate = displayResult.textContent.split('÷');
        finalResult = separate.reduce((num1, num2) => +num1 / +num2);
        displayResult.textContent = finalResult;
    }
})

clear.addEventListener('click', () => displayResult.textContent = null);

