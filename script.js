const tiles = document.querySelectorAll(".tile");
const gameResult = document.querySelector(".game-result");
const restartBtn = document.querySelector("#restartButton");
const playerDisplay = document.querySelector(".display-player");
const gameTurn = document.querySelector(".game-turn");

/*
    Indexes within the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/
// array of index combinations of win conditions
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

let board = ["", "", "", "", "", "", "", "", ""]; // current game board array tiles to be filled with X's and O's
let currentPlayer = "X";
let isGameOver = false;

const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYER0_WON";
const DRAW = "DRAW";

initializeGame();

function initializeGame() {
	tiles.forEach((tile) => tile.addEventListener("click", checkTileClicked));
	restartBtn.addEventListener("click", restartGame);
	isGameOver = false;
}

function checkTileClicked() {
	// "this" in this case is the HTML element clicked, the "tile" clicked
	const boardTileIndex = this.getAttribute("data-index");
	if (board[boardTileIndex] != "" || isGameOver) {
		return;
	}
	updateTile(this, boardTileIndex);
	checkWinner();
}

function updateTile(tile, index) {
	board[index] = currentPlayer; // update game board array
	tile.textContent = currentPlayer;
	tile.classList.add(`player${currentPlayer}`); // add class for styling current player symbol tile
}

function changePlayer() {
	playerDisplay.classList.remove(`player${currentPlayer}`);

	currentPlayer = currentPlayer == "X" ? "O" : "X"; // switch current player

	playerDisplay.innerText = currentPlayer;
	playerDisplay.classList.add(`player${currentPlayer}`); // add class for styling current player symbol span element
}

function displayWinnerText(resultType) {
	switch (resultType) {
		case PLAYERX_WON:
			gameResult.innerHTML =
				'Player <span class="playerX">X</span> wins!';
			break;
		case PLAYERO_WON:
			gameResult.innerHTML =
				'Player <span class="playerO">O</span> wins!';
			break;
		case DRAW:
			gameResult.innerHTML = `It's a draw!`;
	}
	gameResult.classList.remove("hide");
	gameTurn.classList.add("hide");
}

function checkWinner() {
	let roundWon = false;

	for (let i = 0; i < winConditions.length; i++) {
		const condition = winConditions[i];
		const tileA = board[condition[0]];
		const tileB = board[condition[1]];
		const tileC = board[condition[2]];

		if (tileA == "" || tileB == "" || tileC == "") {
			continue;
		}
		if (tileA == tileB && tileB == tileC) {
			roundWon = true;
			break;
		}
	}

	if (roundWon) {
		displayWinnerText(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
		isGameOver = true;
	} else if (!board.includes("")) {
		displayWinnerText(DRAW);
		isGameOver = true;
	} else {
		changePlayer();
	}
}
function restartGame() {
	gameResult.classList.add("hide");
	gameTurn.classList.remove("hide");

	if (currentPlayer === "O") {
		changePlayer();
	}
	board = ["", "", "", "", "", "", "", "", ""];

	tiles.forEach((tile) => {
		tile.textContent = "";
		tile.classList.remove("playerX");
		tile.classList.remove("playerO");
	});
	isGameOver = false;
}
