import { Ship } from "./ship.js";
import { Player } from "./player.js";

const player2 = new Player("Player 2");

player2.gameboard.placeShip(new Ship(3), 4, 4, "horizontal");

console.log("opponent Gb: " + JSON.stringify(player2.gameboard));

console.log(player2.gameboard.receiveAttack(4, 5));
console.log(player2.gameboard.receiveAttack(4, 4));
console.log(player2.gameboard.receiveAttack(4, 7));
