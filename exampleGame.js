const { Cell, Board } = require('./src/Game')

// terminal view of the game

const testBoard = new Board(35, 35)

testBoard.toggleCell(new Cell(2, 1))
testBoard.toggleCell(new Cell(1, 3))
testBoard.toggleCell(new Cell(3, 2))
testBoard.toggleCell(new Cell(2, 3))
testBoard.toggleCell(new Cell(3, 3))
testBoard.print()

let next = testBoard.step()

setInterval(() => {
  process.stdout.write('\x1Bc');
  next.print()
  next = next.step()
}, 50)

