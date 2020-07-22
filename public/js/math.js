export class Matrix { //adding collision, this sets up a 0 based grid matrix, so the computer knows where the tiles are
  constructor() {
    this.grid =[];
  }

  forEach(callback) {

    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }

  clear() {
    this.grid.length = 0;
  }

  get(x, y) {
    const col = this.grid[x];
    if (col) {
      return col[y];
    }
    return undefined
  }

  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }
    this.grid[x][y] = value;
  }
}

export class Vec2 {
    constructor(x, y) {
      this.set(x, y)
    }
    set(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  