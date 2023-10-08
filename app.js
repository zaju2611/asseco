const btnDice = document.querySelector(".button");

function diceAction() {
	let diceOneOne = document.querySelector(".dice_one_f1");
	let diceOneTwo = document.querySelector(".dice_one_f2");
	let diceOneThree = document.querySelector(".dice_one_f3");
	let diceOneFour = document.querySelector(".dice_one_f4");
	let diceOneFive = document.querySelector(".dice_one_f5");
	let diceOneSix = document.querySelector(".dice_one_f6");

	let diceOne = Math.floor(Math.random() * 6 + 1);

	diceOne === 1
		? (diceOneOne.style.zIndex = "1")
		: (diceOneOne.style.zIndex = "0");
	diceOne === 2
		? (diceOneTwo.style.zIndex = "1")
		: (diceOneTwo.style.zIndex = "0");
	diceOne === 3
		? (diceOneThree.style.zIndex = "1")
		: (diceOneThree.style.zIndex = "0");
	diceOne === 4
		? (diceOneFour.style.zIndex = "1")
		: (diceOneFour.style.zIndex = "0");
	diceOne === 5
		? (diceOneFive.style.zIndex = "1")
		: (diceOneFive.style.zIndex = "0");
	diceOne === 6
		? (diceOneSix.style.zIndex = "1")
		: (diceOneSix.style.zIndex = "0");
}

btnDice.addEventListener("click", diceAction);
