# react-game-of-life
> Conway's Game of Life brought to you by React.js

## usage instructions
### install dependencies
`npm install`

### run react app
`npm start`

this should bring the app up on `localhost:3000`

# the code
## exampleGame.js
A terminal example using `Cell` and `Board` from `src/Game.js`

usage: `node exampleGame.js`

## src/Game.js
Game logic that provides `Cell` and `Board` where

`Cell` represents directions to a single cell on the board

`Board` represents the current state of the board. Each element of the board is either
`true` for an alive cell, or `false` for a dead cell

`Board.step()` returns a new board instance with the calculated next state of the board

## src/App.js
The react view of the game

### components
#### App (presentational)
The root level react component

#### Grid (smart)
Holds the state of the board, as well as the game timer. `Grid` provides the default board state (a glider) when 
`compnentDidMount` is called


#### Row
A row of cells

#### CCell
CCell renders a '*' if it's alive, and '' otherwise


## tests (WIP)
`npm run test-logic` will run the mocha tests in `./tests`

not complete.
## current bugs
* the click event is toggling the wrong cell


