
// Time function
function time() {
    const today = new Date();
    let hours = today.getHours();
    hours = (hours % 12) || 12;
    let mins = today.getMinutes();
    mins = mins < 10 ? '0' + mins : mins;
    const time = hours + ':' + mins;
    document.getElementById('time').innerHTML = time;
}

// create a class for storing the calculator functions
class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.clear();
        display.innerText = 0;
    }

    clear() {
        this.currentOperand = ''; 
        this.previousOperand = '';
        this.operation = undefined;
        
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    
    appendNumber(number) {
        if (number === '.' && display.innerText === '0') { number = 0 + number;}
        if (display.innerText.length >= 11 && this.previousOperand === '') return; 
        if (number === '.' && this.currentOperand.includes('.')) return; 
        this.currentOperand = this.currentOperand.toString() + number.toString();
        
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        display.innerText = this.getDisplayNumber(this.previousOperand);
    }

    compute() {

        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '–':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        } 
   }

  
    updateDisplay() {
        display.innerText = this.getDisplayNumber(this.currentOperand);     
    }
}


// Button functions and other variables to be used 

const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector(`[data-equals]`);
const clearAllButton = document.querySelector(`[data-clearAll]`);
const deleteButton = document.querySelector(`[data-delete]`);
const negateButton = document.querySelector(`[data-negate]`);
const percentButton = document.querySelector(`.percent`);
const previousNumber = document.querySelector(`[data-previousNumber]`);
const currentNumber = document.querySelector(`[data-currentNumber]`);
const display = document.getElementById('display');
const calculator = new Calculator(previousNumber, currentNumber);


// Button event listeners
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
        if (display != 0) {
            operationButtons.forEach(button => {
                switch (button.innerText) {
                    case '÷':
                    case '×':
                    case '–':
                    case '+':
                        button.style.cssText = 'background-color: #ff9500; color: white; transition: color 1s ease;';
                        break;
                    default:
                        return;
                }
            });
        }
       resize();
    }); 

});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        switch (button.innerText) {
            case '÷':
            case '×':
            case '–':
            case '+':
                button.style.cssText = 'background-color: white; color: #ff9500;';
                break;
            default:
                return;
        }
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
    resize();
});

clearAllButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
    display.innerText = 0;
    resize();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
    resize();
});


// Reduce the font of the digits to fit inside of the display
function resize() {
    if (display.innerText.length < 7) {
        display.style.fontSize = '80px';
    } else if (display.innerText.length == 7 && display.innerText !== '111,111' ) {
        display.style.fontSize = '75px';
    } else if (display.innerText.length == 9 && display.innerText !== '1,111,111') {
        display.style.fontSize = '65px';
    } else if (display.innerText.length == 10 && display.innerText !== '11,111,111') {
        display.style.fontSize = '55px';
    } else if (display.innerText.length == 11 && display.innerText !== '111,111,111') {
        display.style.fontSize = '50px';
    } else if (display.innerText == '111,111,111') {
        display.style.fontSize = '75px';
    }
}




   






