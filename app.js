// functionality needed:
// ac clears prevDisplay and resets currentDisplay to 0
// plus-minus button toggles between positive and negative for currentDisplay
// plus-minus button does nothing if the value of currentDisplay is zero
// percent button does nothing, I'd like it to multiply prevDisplay value by 100 and add a percent symbol
// number button press puts number in currentDisplay
// operator button sends currentDisplay value to prevDisplay followed by the operator that was pushed
// decimal operator adds a decimal point to the currentDisplay
// equal button triggers the calculation based on the values of currentDisplay, prevDisplay, and which operator was used. 
// equal button assigns the result to prevDisplay and removes the operator



const currentDisplay = document.querySelector('.current');
const prevDisplay = document.querySelector('.previous');
const controls = document.querySelector('.btn-wrapper');
let operator = '';
let firstNum = '';
let sameOperator = false;

controls.addEventListener('click', (event) => {
    if (!event.target.classList.contains('button')) return;

    let currentEntry = currentDisplay.innerHTML;
    let value = event.target.innerHTML;

    if (event.target.classList.contains('clear')) {
        operator = '';
        firstNum = '';
        currentDisplay.innerHTML = '0';
        prevDisplay.innerHTML = '';
    }

    if (event.target.classList.contains('decimal')) {
        if (!currentEntry.includes('.')) {
            currentDisplay.innerHTML += '.';
        }
    }

    if(event.target.classList.contains('number')) {
        if (currentEntry.length < 8)
            if(currentEntry !== '0') {
                currentDisplay.innerHTML += value;
            } else if (value !== '0') {
                currentDisplay.innerHTML = value;
            }
    }

    if(event.target.classList.contains('plus-minus')) {
        if (currentEntry !== '0' && currentEntry.length < 9)
            currentDisplay.innerHTML = '-' + currentEntry;
        else if (currentEntry[0] == '-')
            currentDisplay.innerHTML = currentEntry.substring(1); 
    }
});
