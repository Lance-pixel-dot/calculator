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

function add(){
    rndNum = +num1 + +num2;
     if(rndNum % 1 !== 0){
       return rndNum.toFixed(2);    
    }else{ 
       return rndNum;
    }
}
function subtract(){
    rndNum = +num1 - +num2;
    if(rndNum % 1 !== 0){
       return rndNum.toFixed(2);    
    }else{ 
       return rndNum;
    }
}
function multiply(){
    rndNum = +num1 * +num2;
    if(rndNum % 1 !== 0){
       return rndNum.toFixed(2);    
    }else{ 
       return rndNum;
    }
}
function divide(){
    rndNum = +num1 / +num2;
    if(num1 == 0 || num2 == 0){
       return 'ERROR';
    }else if(rndNum % 1 !== 0){
       return rndNum.toFixed(2);    
    }else{ 
       return rndNum;
    }
}
function toNegativeOrPositive(){
    if(num1 > 0 ){
        displayResult.textContent = -displayResult.textContent;
        num1 = displayResult.textContent;
        return displayResult.textContent;
    }else if(num2 > 0){
        displayResult.textContent = -displayResult.textContent;
        num2 = displayResult.textContent
        return displayResult.textContent;
    }else if(num1 < 0){
        displayResult.textContent = Math.abs(displayResult.textContent);
        num1 = displayResult.textContent;
        return displayResult.textContent;
    }else if(num2 < 0){
        displayResult.textContent = Math.abs(displayResult.textContent);
        num2 = displayResult.textContent;
        return displayResult.textContent;
    }

}

function operate(){

    if(operator === '+' && num2 !== ''){
       tempResult = add();
       num1 = tempResult;
    }else if(operator === '-' && num2 !== ''){
       tempResult = subtract();
       num1 = tempResult;
    }else if(operator === 'x' && num2 !== ''){
      tempResult = multiply();
      num1 = tempResult;
    }else if(operator === '÷' && num2 !== ''){
      tempResult = divide();
      num1 = tempResult;
    }

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
    
        if(operator !== '' && num1 !== ''){
            if(targetNum === '.'){
                num2 = targetNum;
                displayResult.textContent += num2;
                num2 = displayResult.textContent;
            }else{
                num2 += targetNum;
                displayResult.textContent = num2;
            }
        }else if(num2 === '' && operator === ''){
            if(targetNum === '.'){
                num1 = targetNum;
                displayResult.textContent += num1;
                num1 = displayResult.textContent;
            }else{
                num1 += targetNum;
                displayResult.textContent = num1;
            }
        }else if(operator === '' && num2 !== ''){
            if(targetNum === '.'){
                num1 = targetNum;
                displayResult.textContent += num1;
                num1 = displayResult.textContent;
            }else{
                num1 = targetNum;
                displayResult.textContent = num1;
            }
            num2 = '';
            tempResult = num1;
        }
    
        if(!displayResult.textContent.includes('.')){
            decimal.disabled = false;
        }
    
    })
});

document.addEventListener('keydown', (e) => {
    let numKey = e.code;
    let numSelect = e.key;
    let targetNum;
    switch(numKey){
        case 'Digit1':
            targetNum = numSelect;
            break;
        case 'Digit2':
            targetNum = numSelect;
            break;
        case 'Digit3':
            targetNum = numSelect;
            break;
        case 'Digit4':
            targetNum = numSelect;
            break;
        case 'Digit5':
            targetNum = numSelect;
            break;
        case 'Digit6':
            targetNum = numSelect;
            break;
        case 'Digit7':
            targetNum = numSelect;
            break;
        case 'Digit8':
            targetNum = numSelect;
            break;
        case 'Digit9':
            targetNum = numSelect;
            break;
        case 'Digit0':
            targetNum = numSelect;
            break;
        default:
            targetNum = '';
    }

    if(operator !== '' && num1 !== ''){
        num2 += targetNum;
        displayResult.textContent = num2;
    }else if(num2 === '' && operator === ''){
        num1 += targetNum;
        displayResult.textContent = num1;
    }else if(operator === '' && num2 !== ''){
        num1 = targetNum;
        displayResult.textContent = num1;
        num2 = '';
        tempResult = num1;
    }
})

decimal.addEventListener('click', () => {;
    decimal.disabled = true;
})

positiveOrNegative.addEventListener('click', () => {

    if(displayResult.textContent == 0){
        displayResult.textContent = '';  
    }else{
        displayResult.textContent = toNegativeOrPositive();
    }
})

let erase = (e) => {

    let keyCode = e.code;

    console.log(keyCode);

    if(keyCode === 'Backspace'){

        if(displayResult.textContent != 0){
        displayResult.textContent = displayResult.textContent.substring(0, displayResult.textContent.length - 1);
        }

        if(displayResult.textContent.length === 0){
            displayResult.textContent = '';
        }

        if(num2 === ''){
            num1 = displayResult.textContent;
        }else{
            num2 = displayResult.textContent;
        }

    }

}

backspace.addEventListener('click', erase);

backspace.addEventListener('keydown', erase);

operatorButtons.map(operators => {
    operators.addEventListener('click', (e) => {

        operate();
        operator = e.target.textContent;

        if(num1 !== '' && num2 !== ''){
            displayResult.textContent = tempResult;
            num2 = '';
        }

    })
});

result.addEventListener('click', () => {
    
    if(num2 === '' && operator === ''){
        displayResult.textContent = num1;
    }else{
        operate();
        displayResult.textContent = tempResult;
        operator = '';
        if(displayResult.textContent.includes('.')){
            decimal.disabled = true;
        }else{
            decimal.disabled = false;
        }
    }
    if(displayResult.textContent === ''){
        displayResult.textContent = '';
    }

});

