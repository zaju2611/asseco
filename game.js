
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

	
};

dice.addEventListener("click", game);
