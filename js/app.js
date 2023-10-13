const btnDice = document.querySelector(".button");
const resetBtn = document.querySelector(".resetBtn");

let currentPosition = 1;
let previousPosition = 1;
let totalRolls = 0;
let totalPoints = 0;

//funkcja odpowiedzialna za animację kostki
function rollDice(diceContainer) {
	const diceFaces = [
		"diceFace1",
		"diceFace2",
		"diceFace3",
		"diceFace4",
		"diceFace5",
		"diceFace6",
	];
	const diceValue = Math.floor(Math.random() * 6 + 1);
	diceContainer.style.animation = "none";
	diceFaces.forEach((face, index) => {
		const diceElement = document.querySelector(`.${face}`);
		diceElement.style.zIndex = diceValue === index + 1 ? "1" : "0";
	});
	diceContainer.classList.remove("hide");
	return diceValue;
}

//funkcja do obługi pól specjalnych
function movePlayerSpecialFields(specialFields, fields) {
	const backSound = new Audio("assets/sounds/back.mp3");
	backSound.playbackRate = 3;
	if (currentPosition in specialFields) {
		previousPosition = currentPosition;
		currentPosition = specialFields[currentPosition];
		setTimeout(() => {
			fields[previousPosition - 1].classList.remove("active");
			fields[currentPosition - 1].classList.add("active");
			if (currentPosition !== 20 && currentPosition !== 12) {
				backSound.play();
				setText(`Pole specjalne, przeskakujesz na pole ${currentPosition}`);
			}
		}, 0);
	}
}

// wartość 12 - przegrana, wartośc 20 - wygrana
//funckja obsługi gry
function game() {
	const specialFields = {
		12: 12,
		19: 11,
		20: 20,
	};
	const boardSize = 20;
	const fields = document.querySelectorAll(".boardPleace");
	const diceContainer = document.querySelector(".diceContainer");
	const jumpSound = new Audio("assets/sounds/step.mp3");
	previousPosition = currentPosition;
	diceContainer.classList.add("hide");
	diceContainer.style.animation = "flyDice 2s";
	jumpSound.playbackRate = 3;
	btnDice.disabled = true;

	setTimeout(() => {
		const diceValue = rollDice(diceContainer);
		totalRolls++;
		totalPoints += diceValue;
		currentPosition += diceValue;
		if (currentPosition > boardSize) {
			setText(
				`Przekroczyłeś rozmiar planszy o ${
					currentPosition - boardSize
				}, idziesz na pole ${boardSize - (currentPosition - boardSize)}`
			);

			currentPosition = boardSize - (currentPosition - boardSize);
		} else {
			setText(`Rzut: ${diceValue}, Aktualna pozycja: ${currentPosition}`);
		}
		setTimeout(() => {
			movePlayerSpecialFields(specialFields, fields);
		}, 500);

		jumpSound.play();

		updateFieldClasses(fields);
		currentPosition === 20 || currentPosition === 12
			? endGame()
			: (btnDice.disabled = false);
	}, 1000);
}

//funkcja do uaktualnienia aktualnej pozycji na planszy
function updateFieldClasses(fields) {
	fields[currentPosition - 1].classList.add("active");
	fields[previousPosition - 1].classList.remove("active");
	if (currentPosition === previousPosition) {
		setTimeout(() => {
			fields[currentPosition - 1].classList.add("active");
		}, 500);
	}
}

//funkcja do obsługi końca gry
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

	setText(
		`Liczba rzutów: ${totalRolls}, Średnia wartość rzutu: ${(
			totalPoints / totalRolls
		).toFixed(2)}`
	);
}

//funckja do pokazania modala po końcu gry
function showModal(text, counter, average) {
	const modal = document.querySelector(".modal");
	const modalText = document.querySelector(".modal h2");
	const results = document.querySelectorAll(".result p");
	modalText.textContent = text;
	results[0].textContent = counter;
	results[1].textContent = average;
	modal.style.display = "flex";
}

//funckja do resetowania ustawień
function resetGame(fields) {
	currentPosition = 1;
	previousPosition = 1;
	totalRolls = 0;
	totalPoints = 0;

	fields.forEach((field) => field.classList.remove("active"));
	fields[currentPosition - 1].classList.add("active");

	const modal = document.querySelector(".modal");
	modal.style.display = "none";
	console.clear();
	setText(`Rzuć kostką`);
	btnDice.disabled = false;
}

//funkcja do ustawiania powiadomień o grze
function setText(text) {
	const info = document.querySelector(".text");
	info.textContent = text;
	console.log(text);
}

btnDice.addEventListener("click", game);
resetBtn.addEventListener("click", () => {
	const fields = document.querySelectorAll(".boardPleace");
	resetGame(fields);
});
