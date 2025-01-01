export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missedShots = [];
    this.ships = [];
  }

  renderBoard() {
    return this.board
      .map((row, rowIndex) =>
        row
          .map(
            (cell, colIndex) =>
              `<div class="cell" data-row="${rowIndex}" data-col="${colIndex}">${
                cell ? "S" : ""
              }</div>`
          )
          .join("")
      )
      .join("");
  }

  placeShip(ship, row, col, direction) {
    if (direction === "vertical") {
      if (row + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[col][row + i] !== null) return false;
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[col][row + i] = ship;
      }
    } else {
      if (col + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (this.board[col + i][row] !== null) return false;
      }
      for (let i = 0; i < ship.length; i++) {
        this.board[col + i][row] = ship;
      }
    }
    this.ships.push(ship);
    return true;
  }

  receiveAttack(row, col) {
    const target = this.board[row][col];
    if (target) {
      target.hit();
      console.log("target hit " + target.hit());
      return "target hit";
    } else {
      this.missedShots.push([row, col]);
      return "target miss";
    }
  }

  getShipCoordinates() {
    const coordinates = [];
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        if (this.board[row][col] !== null) {
          coordinates.push([row, col]);
        }
      }
    }
    return coordinates;
  }

  allShipReport() {
    return this.ships.map((ship) => ship.isSunk());
  }
}
