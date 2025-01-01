import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

const gameboard = new Gameboard();
const ship = new Ship(3);

gameboard.placeShip(ship, 0, 0, "vertical");

console.log(gameboard.receiveAttack(0, 0));
console.log(gameboard.receiveAttack(1, 0));
console.log(gameboard.receiveAttack(2, 0));

console.log(gameboard.receiveAttack(3, 0));
console.log(gameboard.receiveAttack(0, 1));
