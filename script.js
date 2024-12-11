const numberButtons = Array.from(document.querySelectorAll('.numbers'));
const operatorButtons = Array.from(document.querySelectorAll('.operators'));
const displayResult = document.querySelector('.display-result')
const clear = document.querySelector('.clear');
const result = document.querySelector('.result');

let operator = '';
let num1 = '';
let num2 = '';
let tempResult = '';
let finalResult = '';

function add(){
    return +num1 + +num2;
}
function subtract(){
    return +num1 - +num2;
}
function multiply(){
    return +num1 * +num2;
}
function divide(){
    return +num1 / +num2;
}

function operate(){

    if(operator === '+'){
       tempResult = add();
       num1 = tempResult;
    }else if(operator === '-'){
       tempResult = subtract();
       num1 = tempResult;
    }else if(operator === 'x'){
      tempResult = multiply();
      num1 = tempResult;
    }else if(operator === '÷'){
      tempResult = divide();
      num1 = tempResult;
    }

}
//make the clear  button also clears the num1, num2 and operator
clear.addEventListener('click', () => {
    displayResult.textContent = '';
    num1 = '';
    num2 = '';
    operator = '';
    tempResult = '';
    finalResult = '';
});

//make num1 hold the first few inputted numbers 

numberButtons.map(number => {
    number.addEventListener('click', (e) => {

        let targetNum = e.target.textContent;
        displayResult.textContent += targetNum;

        if(operator !== ''){
            num2 += targetNum;
            displayResult.textContent = num2;
        }else{
            num1 += targetNum;
            displayResult.textContent = num1;
        }
    })
});

//then when the an operator is chosen store the next inputted numbers in num2 and temporary calculate 

operatorButtons.map(operators => {
    operators.addEventListener('click', (e) => {
        operate();
        operator = e.target.textContent;
        console.log(tempResult);
        finalResult = tempResult;

        if(num1 !== '' && num2 !== ''){
            displayResult.textContent = tempResult;
            num2 = '';
        }
    })
});
    
//then store the calculated results in a variable  until another operator is chosen
 
//when another set few of numbers is inputted store them as num2 
//and make the temporary calculated results num1
//until the user press equals and that will be the overall results of the calculation

result.addEventListener('click', () => {
    displayResult.textContent = finalResult;
});

