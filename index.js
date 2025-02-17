import {
  addStartButtonListener,
  addResetButtonListener,
} from "./eventListeners.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";

const player = new Player("Player");
const computer = new Player("Computer");
export const GameController = () => {
  function initializer() {
    renderBoards();
    /* renderAttackInput(); */
    setBoardActiveToggle();
  }

  function setBoardActiveToggle() {
    const board = document.querySelector("#computer-board");
    board.classList.toggle("inactive");
  }

  function displayShip() {
    resetGame();

    player.gameboard.placeShip(new Ship(3), 0, 0, "vertical");
    computer.gameboard.placeShip(new Ship(3), 4, 4, "horizontal");

    console.log(
      "Player's ship coordinates:",
      player.gameboard.getShipCoordinates()
    );
    console.log(
      "Computer's ship coordinates:",
      computer.gameboard.getShipCoordinates()
    );
    console.log(JSON.stringify(player.gameboard));
    console.log(JSON.stringify(computer.gameboard));
  }

  function renderBoards() {
    document.getElementById("player-board").innerHTML =
      player.gameboard.renderBoard();

    document.getElementById("computer-board").innerHTML =
      computer.gameboard.renderBoard(computer);
  }

  function playerTurn(x, y) {
    const result = player.attack(computer.gameboard, x, y);

    console.log(`Player attacked (${x}, ${y}) and it was a ${result.result}`);
    cellAttackedColor(result.result, result.target);

    getWinner();
  }

  function computerTurn() {
    let x, y;

    do {
      x = getRandomCoordinate();
      y = getRandomCoordinate();
    } while (
      player.gameboard.missedShots.some(([mx, my]) => mx === x && my === y) ||
      player.gameboard.hitShots.some(([mx, my]) => mx === x && my === y)
    );

    const result = computer.attack(player.gameboard, x, y);

    console.log(`Computer attacked (${x}, ${y}) and it was a ${result.result}`);

    cellAttackedColor(result.result, result.target);

    if (player.gameboard.allShipReport() === true) {
      console.log("Computer wins!");
      disableBoards();
    }
  }

  function getRandomCoordinate() {
    return Math.floor(Math.random() * 10);
  }

  function displayShipHitCounts() {
    const playerShipHitCount = document.getElementById("player-hit");
    const computerShipHitCount = document.getElementById("computer-hit");

    const playerHitCounts = player.getShipHitCounts();
    const computerHitCounts = computer.getShipHitCounts();

    playerShipHitCount.innerHTML = playerHitCounts;
    computerShipHitCount.innerHTML = computerHitCounts;
  }

  function cellAttackedColor(result, cell) {
    if (result === "target hit") {
      cell.classList.add("cell-ship-hit");
      cell.classList.add("inactive");
    } else {
      cell.classList.add("cell-miss-hit");
      cell.classList.add("inactive");
    }
  }

  function getWinner() {
    const playerWin = computer.gameboard.allShipReport();

    if (playerWin === true) {
      console.log("Player wins!");
      disableBoards();
    } else {
      computerTurn();
    }
  }

  function disableBoards() {
    const cboard = document.querySelector("#computer-board");
    const pboard = document.querySelector("#player-board");

    cboard.classList.add("inactive");
    pboard.classList.add("inactive");
  }

  function resetGame() {
    player.gameboard.clearBoard();
    computer.gameboard.clearBoard();
  }

  return {
    initializer,
    playerTurn,
    displayShipHitCounts,
    displayShip,
    renderBoards,
    setBoardActiveToggle,
    computerTurn,
    resetGame,
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const game = GameController();
  addStartButtonListener();
  addResetButtonListener();
  game.initializer();
});

/* function renderAttackInput() {
  const attackInput = document.getElementById("attack");

  attackInput.innerHTML = "";

  const form = document.createElement("form");
  form.id = "attack-form";
  form.noValidate = true;

  const button = document.createElement("button");
  button.textContent = "Attack";
  button.classList.add("attack");
  form.appendChild(button);

  const inputX = document.createElement("input");
  inputX.id = "attack-x";
  inputX.type = "number";
  inputX.placeholder = "X";
  inputX.classList.add("x");
  inputX.min = 0;
  inputX.max = 10;
  form.appendChild(inputX);

  const inputY = document.createElement("input");
  inputY.id = "attack-y";
  inputY.type = "number";
  inputY.placeholder = "Y";
  inputY.classList.add("y");
  inputY.min = 0;
  inputY.max = 10;
  form.appendChild(inputY);

  attackInput.appendChild(form);

  addFormSubmitListener("attack-form");
}
 */
