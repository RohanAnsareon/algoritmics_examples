const operators = ['+', '-', 'x', '/'];

const buttons = document.querySelectorAll('.keyboard .btn');
const display = document.querySelector('#display');
const clearBtn = document.querySelector('#clear-btn');

let displayValue = '';

buttons.forEach(b => b.addEventListener('click', e => commit(e.target.outerText)));

clearBtn.addEventListener('click', e => clean());

function commit(input) {
    if (operators.includes(input) && displayValue.length !== 0) {
        if(operators.includes(displayValue[displayValue.length - 1])) {
            return;
        }
    }

    displayValue += input;

    display.value = displayValue;
}

function clean() {
    displayValue = '';
    display.value = '';
}