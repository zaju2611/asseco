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
const dice = document.querySelector(".dice");

const diceRoll = () => {
	return Math.floor(Math.random() * 6 + 1);
};

const boardSize = 20;
const specialFields = {
	12: -1,
	19: 11,
};
let currentPosition = 1;
let totalRolls = 0;
let totalPoints = 0;
let isGameInProgress = true;

const game = () => {
	if (isGameInProgress) {
		playTurn();
	}
};

const playTurn = () => {
	const diceValue = diceRoll();

	totalRolls++;
	totalPoints += diceValue;

	if (specialFields[currentPosition]) {
		currentPosition = specialFields[currentPosition];
		console.log(`Gracz na polu specjalnym ${currentPosition}`);
	} else {
		currentPosition += diceValue;
	}

	if (currentPosition > boardSize) {
		currentPosition = boardSize - (currentPosition - boardSize);
	}
	console.log(`Rzut: ${diceValue}, Pozycja gracza: ${currentPosition}`);

	if (currentPosition === 20 || currentPosition === -1) {
		isGameInProgress = false;
		console.log(
			`${
				currentPosition === 20 ? "Gratulacje, wygrałeś!" : "Gracz przegrał."
			} Liczba rzutów: ${totalRolls}, Średnia wartość rzutu: ${
				totalPoints / totalRolls
			}`
		);
	}
};

dice.addEventListener("click", game);
