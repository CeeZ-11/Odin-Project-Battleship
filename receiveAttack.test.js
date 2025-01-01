import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";
import { Player } from "./player.js";

const player2 = new Player("Player 2");
const gameboard = new Gameboard();

gameboard.placeShip(new Ship(3), 0, 0, "vertical");

console.log(gameboard.receiveAttack(0, 0));
console.log(gameboard.receiveAttack(1, 0));
console.log(gameboard.receiveAttack(2, 0));

console.log(gameboard.receiveAttack(3, 0));
console.log(gameboard.receiveAttack(0, 1));
