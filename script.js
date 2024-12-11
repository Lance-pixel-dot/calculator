const numberButtons = Array.from(document.querySelectorAll('.numbers'));
const operatorButtons = Array.from(document.querySelectorAll('.operators'));
const displayResult = document.querySelector('.display-result')
const clear = document.querySelector('.clear');
const result = document.querySelector('.result');

function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}

let operator = null;
let num1;
let num2;

function operate(){

    if(operator === '+'){
       tempResult = add(+num1, +num2);
       num1 = tempResult;
       displayResult.textContent = tempResult;
    }else if(operator === '-'){
       tempResult = subtract(+num1, +num2);
       num1 = tempResult;
       displayResult.textContent = tempResult;
    }else if(operator === 'x'){
      tempResult = multiply(+num1, +num2);
      num1 = tempResult;
      displayResult.textContent = tempResult;
    }else if(operator === '÷'){
      tempResult = divide(+num1, +num2);
      num1 = tempResult;
      displayResult.textContent = tempResult;
    }

}

clear.addEventListener('click', () => displayResult.textContent = null);

//make num1 hold the first few inputted numbers 

numberButtons.map(number => {
    number.addEventListener('click', (e) => {
        let targetNum = e.target.textContent;
        displayResult.textContent += targetNum;

        if(operator !== null){
            num2 = displayResult.textContent;
            console.log(num2);
            operate();
        }else{
            num1 = displayResult.textContent;
            console.log(num1);
        }
    })
});

//then when the an operator is chosen store the next inputted numbers in num2 and temporary calculate 

operatorButtons.map(operators => {
    operators.addEventListener('click', (e) => {
        operator = e.target.textContent;
        console.log(operator)
        displayResult.textContent = null;
    })
});
    
//then store the calculated results in a variable  until another operator is chosen
let tempResult;
 
//when another set few of numbers is inputted store them as num2 
//and make the temporary calculated results num1
//until the user press equals and that will be the overall results of the calculation


result.addEventListener('click', () => {
    let separate
    let output;
    
    if(operator === '+'){
        separate = displayResult.textContent.split('+');
        output = separate.reduce((num1, num2) => +num1 + +num2);
        displayResult.textContent = output;

    }else if(operator === '-'){
        separate = displayResult.textContent.split('-');
        output = separate.reduce((num1, num2) => +num1 - +num2);
        displayResult.textContent = output;

    }else if(operator === 'x'){
        separate = displayResult.textContent.split('x');
        output = separate.reduce((num1, num2) => +num1 * +num2);
        displayResult.textContent = output;

    }else if(operator === '÷'){
        separate = displayResult.textContent.split('÷');
        output = separate.reduce((num1, num2) => +num1 / +num2);
        displayResult.textContent = output;
    }
});

