import { Gameboard } from "./gameboard.js";
export class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(opponentGameboard, x, y) {
    return opponentGameboard.receiveAttack(x, y);
  }
}
