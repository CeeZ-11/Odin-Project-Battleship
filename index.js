import { Player } from "./player.js";
import { Ship } from "./ship.js";

const GameController = () => {
  const player = new Player("Player");
  const computer = new Player("Computer");

  function initializer() {
    player.gameboard.placeShip(new Ship(3), 0, 0, "vertical");
    computer.gameboard.placeShip(new Ship(3), 4, 4, "horizontal");
    renderBoards();
    renderAttackInput();
  }

  function renderBoards() {
    document.getElementById("player-board").innerHTML =
      player.gameboard.renderBoard();
    document.getElementById("computer-board").innerHTML =
      computer.gameboard.renderBoard();
  }

  function renderAttackInput() {
    const attackInput = document.getElementById("attack");
    const button = document.createElement("button");
    button.textContent = "Attack";
    button.classList.add("attack");
    attackInput.appendChild(button);

    const inputX = document.createElement("input");
    inputX.type = "number";
    inputX.placeholder = "X";
    inputX.classList.add("x");
    inputX.min = 0;
    inputX.max = 10;
    attackInput.appendChild(inputX);

    const inputY = document.createElement("input");
    inputY.type = "number";
    inputY.placeholder = "Y";
    inputY.classList.add("y");
    inputY.min = 0;
    inputY.max = 10;
    attackInput.appendChild(inputY);
  }

  function playerTurn(x, y) {
    const result = player.attack(computer.gameboard, x, y);
    console.log(`Player attacked (${x}, ${y}) and it was a ${result}`);
    if (computer.gameboard.allShipsSunk()) {
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
    if (player.gameboard.allShipsSunk()) {
      console.log("Computer wins!");
    }
  }

  function getRandomCoordinate() {
    return Math.floor(Math.random() * 10);
  }

  return { initializer, playerTurn };
};

const button = document
  .getElementById("start")
  .addEventListener("click", () => {
    const game = GameController();
    game.initializer();
  });

button;
