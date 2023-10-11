const btnDice = document.querySelector(".button");
const resetBtn = document.querySelector(".resetBtn");

let currentPosition = 1;
let previousPosition = 1;
let totalRolls = 0;
let totalPoints = 0;

function rollDice(diceContainer) {
	const diceFaces = [
		"dice_one_f1",
		"dice_one_f2",
		"dice_one_f3",
		"dice_one_f4",
		"dice_one_f5",
		"dice_one_f6",
	];
	const diceOne = Math.floor(Math.random() * 6 + 1);
	diceContainer.style.animation = "none";
	diceFaces.forEach((face, index) => {
		const diceElement = document.querySelector(`.${face}`);
		diceElement.style.zIndex = diceOne === index + 1 ? "1" : "0";
	});
	diceContainer.classList.remove("hide");
	return diceOne;
}

function game() {
	const specialFields = {
		12: -1,
		19: 11,
		20: -10,
	};
	const boardSize = 20;
	const fields = document.querySelectorAll(".boardPleace");
	const diceContainer = document.querySelector(".dice_container_One");
	const backSound = new Audio("assets/sounds/back.mp3");
	const jumpSound = new Audio("assets/sounds/step.mp3");

	diceContainer.classList.add("hide");
	diceContainer.style.animation = "flyDice 2s";
	jumpSound.playbackRate = 3;
	backSound.playbackRate = 3;
	btnDice.disabled = true;

	setTimeout(() => {
		const diceOne = rollDice(diceContainer);
		totalRolls++;
		totalPoints += diceOne;
		previousPosition = currentPosition;
		currentPosition += diceOne;
		jumpSound.play();

		setTimeout(() => {
			if (currentPosition === 19) {
				currentPosition = 11;
				backSound.play();
				setTimeout(() => {
					fields[10].classList.add("active");
					fields[18].classList.remove("active");
				}, 0);
			}
		}, 500);

		if (currentPosition > boardSize) {
			currentPosition = boardSize - (currentPosition - boardSize);
		}
		console.log(`Rzut: ${diceOne}, Pozycja gracza: ${currentPosition}`);
		updateFieldClasses(fields);
		if (currentPosition === 20 || currentPosition === 12) {
			endGame();
		}
		btnDice.disabled = false;
	}, 1000);
}

function updateFieldClasses(fields) {
	fields[previousPosition - 1].classList.remove("active");
	fields[currentPosition - 1].classList.add("active");
	if (currentPosition === previousPosition) {
		setTimeout(() => {
			fields[currentPosition - 1].classList.add("active");
		}, 500);
	}
}

function endGame() {
	const winSound = new Audio("assets/sounds/win.mp3");
	const lostSound = new Audio("assets/sounds/lost.mp3");

	setTimeout(() => {
		const text =
			currentPosition === 20
				? "Gratulacje!! Wygrałeś!!"
				: "Przegrałeś, spróbuj jeszcze raz";
		showModal(text, totalRolls, (totalPoints / totalRolls).toFixed(2));

		currentPosition === 20 ? winSound.play() : lostSound.play();
	}, 1000);

	console.log(
		`Liczba rzutów: ${totalRolls}, Średnia wartość rzutu: ${
			totalPoints / totalRolls
		}`
	);
	btnDice.disabled = true;
}

function showModal(text, counter, average) {
	const modal = document.querySelector(".modal");
	const modalText = document.querySelector(".modal h2");
	const results = document.querySelectorAll(".result p");
	modalText.textContent = text;
	results[0].textContent = counter;
	results[1].textContent = average;
	modal.style.display = "flex";
}

function resetGame(fields) {
	currentPosition = 1;
	previousPosition = 1;
	totalRolls = 0;
	totalPoints = 0;

	fields.forEach((field) => field.classList.remove("active"));
	fields[currentPosition - 1].classList.add("active");

	const modal = document.querySelector(".modal");
	modal.style.display = "none";
	btnDice.disabled = false;
}

btnDice.addEventListener("click", game);
resetBtn.addEventListener("click", () => {
	const fields = document.querySelectorAll(".boardPleace");
	resetGame(fields);
});
