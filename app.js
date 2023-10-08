const btnDice = document.querySelector(".button");
const diceContainer = document.querySelector(".dice_container_One");

function diceAction() {
	diceContainer.classList.add("hide");
	diceContainer.style.animation = "flyDice 2s";

	setTimeout(() => {
		let diceOneOne = document.querySelector(".dice_one_f1");
		let diceOneTwo = document.querySelector(".dice_one_f2");
		let diceOneThree = document.querySelector(".dice_one_f3");
		let diceOneFour = document.querySelector(".dice_one_f4");
		let diceOneFive = document.querySelector(".dice_one_f5");
		let diceOneSix = document.querySelector(".dice_one_f6");

		let diceOne = Math.floor(Math.random() * 6 + 1);

		diceContainer.style.animation = "none";

		diceOneOne.style.zIndex = diceOne === 1 ? "1" : "0";
		diceOneTwo.style.zIndex = diceOne === 2 ? "1" : "0";
		diceOneThree.style.zIndex = diceOne === 3 ? "1" : "0";
		diceOneFour.style.zIndex = diceOne === 4 ? "1" : "0";
		diceOneFive.style.zIndex = diceOne === 5 ? "1" : "0";
		diceOneSix.style.zIndex = diceOne === 6 ? "1" : "0";

		diceContainer.classList.remove("hide");
	}, 1000);
}

btnDice.addEventListener("click", diceAction);
