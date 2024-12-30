export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missedShots = [];
    this.ships = [];
  }

  placeShip(ship, row, col, direction) {
    if (direction === "vertical") {
      for (let i = 0; i < ship.length; i++) {
        this.board[col][row + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[col + i][row] = ship;
      }
    }
    this.ships.push(ship);
  }

  receiveAttack(row, col) {
    const target = this.board[col][row];
    if (target) {
      target.hit();
      return "target hit";
    } else {
      this.missedShots.push([row, col]);
      return "target miss";
    }
  }

  allShipReport() {
    return this.ships.map((ship) => ship.isSunk());
  }
}
