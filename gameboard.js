export class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.missedShots = [];
    this.ships = [];
  }

  renderBoard(computer) {
    let cells = "";
    let ship = "";

    if (computer) {
      cells = "hidden";
    } else {
      cells = "cell";
      ship = "player-ship";
    }

    return this.board
      .map((row, rowIndex) =>
        row
          .map(
            (cell, colIndex) =>
              `<div class="${cells} ${
                cell ? ship : ""
              }" data-row="${rowIndex}" data-col="${colIndex}"></div>`
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

  receiveAttack(row, col, player) {
    const target = this.board[row][col];
    const targetCell = this.getCell(row, col, player);

    if (target) {
      target.hit();
      return { result: "target hit", target: targetCell };
    } else {
      this.missedShots.push([row, col]);
      return { result: "target miss", target: targetCell };
    }
  }

  getCell(row, col, player) {
    const cellClass = player === "Player" ? ".hidden" : ".cell";

    const cells = document.querySelectorAll(cellClass);

    let targetCell;

    cells.forEach((cell) => {
      if (
        cell.dataset.row === String(row) &&
        cell.dataset.col === String(col)
      ) {
        targetCell = cell;
      }
    });

    return targetCell;
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
