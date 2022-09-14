// functionality needed:

const currentDisplay = document.querySelector(".current");
const prevDisplay = document.querySelector(".previous");
const controls = document.querySelector(".btn-wrapper");
let operator = "";
let firstNum = "";
let existingOperator = false;

function calculate() {
	switch (operator) {
		case "÷":
			return Number(firstNum) / Number(currentDisplay.innerHTML);
		case "×":
			return Number(firstNum) * Number(currentDisplay.innerHTML);
		case "-":
			return Number(firstNum) - Number(currentDisplay.innerHTML);
		case "+":
			return Number(firstNum) + Number(currentDisplay.innerHTML);
	}
}

controls.addEventListener("click", (e) => {
	if (!e.target.classList.contains("button")) {
		return;
	}
	let currentEntry = currentDisplay.innerHTML;
	let value = e.target.innerHTML;

	// ac clears prevDisplay and resets currentDisplay to 0
	if (e.target.classList.contains("clear")) {
		operator = "";
		firstNum = "";
		currentDisplay.innerHTML = "0";
		prevDisplay.innerHTML = "";
	}

	// decimal button adds a decimal point to the currentDisplay
	if (e.target.classList.contains("decimal")) {
		if (!currentEntry.includes(".")) {
			currentDisplay.innerHTML += ".";
		}
	}

	// number button press puts number in currentDisplay
	if (e.target.classList.contains("number")) {
		if (currentEntry.length < 8)
			if (currentEntry !== "0") {
				currentDisplay.innerHTML += value;
			} else if (value !== "0") {
				currentDisplay.innerHTML = value;
			}
	}

	// plus-minus button toggles between positive and negative for currentDisplay
	// plus-minus button does nothing if the value of currentDisplay is zero
	if (e.target.classList.contains("plus-minus")) {
		if (currentEntry[0] == "-") {
			currentDisplay.innerHTML = currentEntry.substring(1);
		} else if (currentEntry !== "0" && currentEntry.length < 9) {
			currentDisplay.innerHTML = "-" + currentEntry;
		}
	}

	// operator buttons trigger the calculation of prevDisplay, operator, and currentDisplay only if a number is already in prevDisplay.
	// operator buttons send currentDisplay value to prevDisplay followed by the operator that was pushed
	if (e.target.classList.contains("operator")) {

		if (!existingOperator) {
			if (prevDisplay.innerHTML && operator) {
				firstNum = calculate();
			} else {
				firstNum = currentEntry;
			}
			currentDisplay.innerHTML = "0";
		}
		operator = value;
		prevDisplay.innerHTML = firstNum + " " + operator;
		existingOperator = true;
	} else {
		existingOperator = false;
	}

	// equal button assigns the result to prevDisplay and removes the operator
	if(e.target.classList.contains('equal')) {
		firstNum = calculate();
		operator = '';
		prevDisplay.innerHTML = firstNum;
		currentDisplay.innerHTML = '0';
		existingOperator = false;
	}

	// percent button does nothing, I'd like it to multiply prevDisplay value by 100 and add a percent symbol
	if(e.target.classList.contains('percent')) {
		let result = prevDisplay.innerHTML;

		if (result.includes('%')) {
			firstNum /= 100;
			prevDisplay.innerHTML = firstNum;
		} else if (!prevDisplay.innerHTML == '') {
			firstNum *= 100;
			prevDisplay.innerHTML = firstNum + '%';
			
		} else if(prevDisplay.innerHTML == '') {
			return;
		}
	}

});
