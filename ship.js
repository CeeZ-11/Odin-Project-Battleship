export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits++;
      console.log("hit " + this.hits);
    }
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
