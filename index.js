import { Player } from "./player.js";
import { Ship } from "./ship.js";

const GameController = () => {
  const player = new Player("Player");
  const computer = new Player("Computer");

  function initializer() {
    player.gameboard.placeShip(new Ship(3), 0, 0, "vertical");
    computer.gameboard.placeShip(new Ship(3), 4, 4, "horizontal");
    renderBoards();
  }

  function renderBoards() {
    document.getElementById("player-board").innerHTML =
      player.gameboard.renderBoard();
    document.getElementById("computer-board").innerHTML =
      computer.gameboard.renderBoard();
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

  return { initializer };
};

const button = document
  .getElementById("start")
  .addEventListener("click", () => {
    const game = GameController();
    game.initializer();
  });

button;
