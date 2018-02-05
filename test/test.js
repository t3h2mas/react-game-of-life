const chai = require('chai')
const should = chai.should()

const { Cell, Board } = require('../src/Game')

//describe('Board')

describe('Cell', function() {
  describe('init()', function() {
    it('should set properties based on args', function() {
      let c = new Cell(0, 0)

      c.x.should.equal(0)
      c.y.should.equal(0)
    })
    it('should handle out of bounds errors')
  })

  describe('#Add', function() {
    it('should return the proper cell when adding positive cells', function() {
      let c1 = new Cell(1, 2)
      let c2 = new Cell(1, 2)

      let c3 = c1.add(c2)

      c3.x.should.equal(2)
      c3.y.should.equal(4)
    })
    it('should return the proper cell when adding a negative to a possitive cell', function() {
      let c1 = new Cell(1, 2)
      let c2 = new Cell(-11, -12)

      let c3 = c1.add(c2)

      c3.x.should.equal(-10)
      c3.y.should.equal(-10)
    })
  })
})

describe('Cell#methods', function() {
  describe('#getNeighbors', function() {
    it('returns an array of neighbors of a cell', function() {
      let seedCell = new Cell(4, 4)
      
      let expected = [
        new Cell(3, 3), new Cell(4, 3), new Cell(5, 3),
        new Cell(3, 4), new Cell(5, 4),
        new Cell(3, 5), new Cell(4, 5), new Cell(5, 5)
      ]

      let actual = seedCell.getNeighbors()

      let badCells = expected.filter((_, i) => {
        if (actual[i].x !== expected[i].x || actual[i].y !== expected[i].y)
          return true
        return false
      })
      badCells.length.should.equal(0)
    })
  })
  describe('#toggleCell', function () {
    it('toggles the appropriate cell', function() {
      
      const board = new Board(2, 2)
      board._board[1][1] = true
      const expected = new Board(2, 2)
      expected.toggleCell(new Cell(1, 1))


      board.equals(expected).should.be.true
    })
    it('should handle out of bounds errors')
  })

  describe('#isCellAlive', function () {
    // TODO: test truthy state and falsy
    it('returns the truthyness of a board cell position', function() {
      const board = new Board(2, 2)
      console.dir(board._board)
      board.print()

      const seed = new Cell(1, 1)
      console.dir({seed})
      let actual = board.isCellAlive(seed)

      console.dir({actual})

      actual.should.not.be.true
    })
    it('should handle out of bounds errors')
  })
  describe('#livingNeighbors', function() {
    it('should return the correct amount of living neighbors', function () {
      //const testBoard = Array.from({ length: 8 }, _ => Array.from({ length: 8 }, _ => false))
      const testBoard = new Board(8, 8)
      const seedCell = new Cell(4, 5)

      testBoard.toggleCell(new Cell(5, 3))
      testBoard.toggleCell(new Cell(4, 2))
      testBoard.toggleCell(new Cell(3, 4))
      testBoard.toggleCell(new Cell(4, 4))
      testBoard.toggleCell(new Cell(5, 4))

      const expected = 3
     
      let actual = testBoard.livingNeighborsOf(seedCell)

      actual.should.equal(expected)
    }),
    it('should handle out of bounds errors')
  })
})

describe('logic', function () {
  describe('#step', function () {
    it('should take a board, and return a new board with the correct state', function() {
      const testBoard = new Board(5, 5)

      testBoard.toggleCell(new Cell(2, 1))
      testBoard.toggleCell(new Cell(1, 3))
      testBoard.toggleCell(new Cell(3, 2))
      testBoard.toggleCell(new Cell(2, 3))
      testBoard.toggleCell(new Cell(3, 3))

      testBoard.print()

      const expected = new Board(5, 5)

      expected.toggleCell(new Cell(1, 2))
      expected.toggleCell(new Cell(2, 3))
      expected.toggleCell(new Cell(2, 4))
      expected.toggleCell(new Cell(3, 2))
      expected.toggleCell(new Cell(3, 3))
      expected.print()

      let actual = testBoard.step()
      actual.print()

      expected.equals(actual).should.be.true
    })
  })
})
