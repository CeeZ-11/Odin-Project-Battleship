import {
  addStartButtonListener,
  addFormSubmitListener,
} from "./eventListeners.js";
import { Player } from "./player.js";
import { Ship } from "./ship.js";

const player = new Player("Player");
const computer = new Player("Computer");
export const GameController = () => {
  function initializer() {
    player.gameboard.placeShip(new Ship(3), 0, 0, "vertical");
    computer.gameboard.placeShip(new Ship(3), 4, 4, "horizontal");
    renderBoards();
    renderAttackInput();
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
      computer.gameboard.renderBoard();
  }

  function renderAttackInput() {
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

  function playerTurn(x, y) {
    const result = player.attack(computer.gameboard, x, y);
    console.log(`Player attacked (${x}, ${y}) and it was a ${result}`);
    if (computer.gameboard.allShipReport() === true) {
      console.log("Player wins!");
    } else {
      computerTurn();
    }
  }

  function computerTurn() {
    let x, y;
    do {
      x = getRandomCoordinate();
      y = getRandomCoordinate();
    } while (
      computer.gameboard.missedShots.some(([mx, my]) => mx === x && my === y)
    );
    const result = computer.attack(player.gameboard, x, y);
    console.log(`Computer attacked (${x}, ${y}) and it was a ${result}`);
    if (player.gameboard.allShipReport() === true) {
      console.log("Computer wins!");
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

  return { initializer, playerTurn, displayShipHitCounts };
};

addStartButtonListener();
