'use strict'
// For a space that is 'populated':
// Each cell with one or no neighbors dies, as if by solitude.
// Each cell with four or more neighbors dies, as if by overpopulation.
// Each cell with two or three neighbors survives.
// For a space that is 'empty' or 'unpopulated'
// Each cell with three neighbors becomes populated.

function Cell(x, y) {
  this.x = x
  this.y = y
}

Cell.prototype.add = function(other) {
  return new Cell(this.x + other.x, this.y + other.y)
}

Cell.prototype.inspect = function() {
  console.log(`Cell(${this.x}, ${this.y}`)
}

Cell.prototype.getNeighbors = function() {
  return [
    new Cell(-1, -1), new Cell(0, -1) ,new Cell(1, -1),
    new Cell(-1,  0),                  new Cell(1,  0),
    new Cell(-1,  1), new Cell(0,  1) ,new Cell(1,  1)
  ].map(neighbor => this.add(neighbor))
}

function Board(xLength, yLength) {
  this.xLength = xLength
  this.yLength = yLength

  // creates the board with the size of `xLength` and `yLength`
  // the board is initialized with `false`
  this._board = Array.from({ length: yLength }, _ => Array.from({ length: xLength }, _ => false))
}

Board.prototype.toggleCell = function(cell) {
  this._board[cell.y][cell.x] = !this._board[cell.y][cell.x]
}

Board.prototype.isCellAlive = function(cell) {
  return this._board[cell.y][cell.x] 
}

Board.prototype.livingNeighborsOf = function(cell) {
  return cell
    .getNeighbors()
    .reduce((total, c) => {
      try {
        if (this._board[c.y][c.x]) total++
      } catch (e) {}
      return total
    }, 0)
}

// return a deep bopy of `this`
Board.prototype.clone = function() {
  let newBoard = new Board(this.xLength, this.yLength)
  newBoard._board = JSON.parse(JSON.stringify(this._board))

  return newBoard
}

// compare `this` board to `other` board
Board.prototype.equals = function(other) {
  for (let y=0; y < this._board.length; y++) {
    for (let x=0; x < this._board[y].length; x++) {
      if (this._board[y][x] !== other._board[y][x])
        return false
    }
  }
  return true
}

// returns a new board with the next state
// this is where the heart of the game logic happens
Board.prototype.step = function() {
  let next = this.clone()

  this._board.map((rows, y) =>
    rows.map((_, x) => {
      let cell = new Cell(x, y)
      let homies = this.livingNeighborsOf(cell)
      let vitality = this.isCellAlive(cell)

      if (vitality) {
        if ([2, 3].includes(homies))
          return // let it live

        if (homies < 2 || homies > 3)
          return next.toggleCell(cell) // kill it
      } else {
        // cell is dead
        if (homies === 3)
          return next.toggleCell(cell)
      }
    })
  )

  return next
}

// Log the current state of the board in a readable way
Board.prototype.print = function() {
  console.log(
    this._board
    .map(row => row.map(c => c ? '*' : ' '))
    .join('\n') + '\n'
  )
}

module.exports = { Cell, Board }
