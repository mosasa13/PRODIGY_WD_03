let theplayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let Active = true;
let gameMode = "computer";
const winninglines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const messageElement = document.getElementById("message");

function GridSpace(index) {
  if (board[index] === "" && Active) {
    board[index] = theplayer;
    document.getElementsByClassName("cell")[index].innerText = theplayer;
    if (checkWin()) {
      messageElement.innerText = `Player ${theplayer} wins!`;
      Active = false;
    } else if (BoardFull()) {
      messageElement.innerText = "It's a draw!";
      Active = false;
    } else {
      theplayer = theplayer === "X" ? "O" : "X";
      if (gameMode === "computer" && theplayer === "O") {
        setTimeout(makeComputerMove, 500);
      }
    }
  }
}

function checkWin() {
  for (let combo of winninglines) {
    if (
      board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      return true;
    }
  }
  return false;
}

function BoardFull() {
  return board.every((cell) => cell !== "");
}

function resetGame() {
  theplayer = "X";
  Active = true;
  board = ["", "", "", "", "", "", "", "", ""];
  messageElement.innerText = "";
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerText = ""));
}

function makeComputerMove() {
  const emptyCells = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      emptyCells.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const computerMove = emptyCells[randomIndex];
  GridSpace(computerMove);
}

const gameModeSelect = document.getElementById("game-mode");
gameModeSelect.addEventListener("change", (event) => {
  GameMode(event.target.value);
});

function GameMode(mode) {
  gameMode = mode;
  resetGame();
}
