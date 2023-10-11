/*

Zadanie programistyczne 
•	Należy stworzyć aplikację, która będzie symulowała grę planszową. 
•	Parametrem wejściowym powinna być liczba wyrzuconych oczek klasyczną kostką sześcienną. 
•	Plansza ma 20 pól. Pola 12 i 19 są polami specjalnymi. 
•	Użytkownik rzucą kostką raz za razem. Przesuwa się po planszy zgodnie z wyrzuconą liczbą oczek. Gra kończy się w przypadku wejścia na pole o numerze 12 (gra kończy się porażką), bądź osiągnięcia pola 20 (wygrana). 
•	Jeżeli gracz po rzucie przekroczy pole 20, to cofa się o tyle oczek, o ile przekroczył pole 20 (np. stoi na 18 polu, jeżeli wyrzuci 5 oczek to cofa się do pola o numerze 17). 
•	W przypadku trafienia na pole o numerze 19, gracz przesuwa się na pole o numerze 11. 
•	Jako wynik użytkownik powinien dostać informację czy gra zakończyła się sukcesem, informację o liczbie rzutów oraz średnią liczbę wyrzuconych oczek. 
•	Należy przygotować aplikację tak, aby można było dołożyć obsługę kolejnych pól specjalnych. 
•	Przebieg gry można przedstawić za pomocą GUI lub informacji logowanych w konsoli 
 
 
•	Założenia: 
o	Język programowania: JavaScript 
o	Można użyć dowolnych bibliotek zewnętrznych 
o	Termin realizacji: do 13 października 2023 r., godzina 23:59 (piątek) 
o	Forma dostarczenia dowolna: całość na mail / zewnętrzne repo / github / etc 
 
 */
const btnDice = document.querySelector(".button");
const resetBtn = document.querySelector(".resetBtn");

const specialFields = {
	12: -1,
	19: 11,
	20: -1,
};
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
