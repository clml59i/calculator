const calculatorButtons = document.querySelectorAll(".calc-button");
const screen = document.querySelector("input");
init();

let currentOperator;
let lastOperationResult;
let isLastInputOperator = false;

// Operation functions
const add = (number1, number2) => parseFloat(number1) + parseFloat(number2);
const substract = (number1, number2) => number1 - number2;
const multiply = (number1, number2) => number1 * number2;
const divide = (number1, number2) => number1 / number2;

const operate = function(operator, number1, number2) {
    if (operator === "add"){
        return add(number1, number2);
    } else if (operator === "substract"){
        return substract(number1, number2);
    } else if (operator === "multiply"){
        return multiply(number1, number2);
    } else if (operator === "divide"){
        return divide(number1, number2);
    }
};

function init() {
    calculatorButtons.forEach(button => {
        button.addEventListener("click", function(){

        // we just used an operator sign, we clear the screen before adding the new number
        if(button.classList.contains("number")){
            if(isLastInputOperator){
                screen.value = "";
                isLastInputOperator = false;
            }
            screen.value += button.textContent;
        }
        else if (button.classList.contains("operator")){
            // check if the last input is already an operator, in that case do nothing.
            if(!isLastInputOperator){
            // if we already have an operator saved(meaning chain operation)
                if(currentOperator) {
                    screen.value = operate(currentOperator, lastOperationResult, screen.value);
                    lastOperationResult = screen.value;
                    currentOperator = button.id;
                }else {
                // We save the operator, and save the first number
                currentOperator = button.id;
                lastOperationResult = screen.value;
                }
            }
            isLastInputOperator = true;
        }
        else if(button.classList.contains("equalsButton")){
            screen.value = operate(currentOperator, lastOperationResult, screen.value);
            lastOperationResult = screen.value;
            currentOperator="";
        } 
        else if (button.classList.contains("clearButton")){
            screen.value = "";
            currentOperator = "";
            lastOperationResult = "";
        }
        else if (button.classList.contains("erase")){
            screen.value = screen.value.slice(0, -1);
        }
        else if (button.classList.contains("decimalButton")){
            // We automatically put a 0 if the dot is selected when no number
            if (screen.value === ""){
                screen.value = "0."
            } else if(!screen.value.includes(".")){
                screen.value += ".";
            }
        }
    })
    });
}






