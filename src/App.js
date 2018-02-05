import React, { Component } from 'react';
import { Cell, Board } from './Game'

import logo from './logo.svg';
import './App.css';

// return an iterable range with the length of n, starting at 0
// ex: range(3) == [0, 1, 2]
const range = n => [...Array(n).keys()]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">The Game</h1>
        </header>
        <Grid x={40} y={40} delay={150} />
      </div>
    );
  }
}

class Grid extends Component {
  constructor (props) {
    super(props)
    this.state = {
      x: this.props.x,
      y: this.props.y,
      board: new Board(this.props.x, this.props.y),
      paused: false,
      speed: 250,
      timer: undefined
    }

    this.startTimer = this.startTimer.bind(this)
    this.adjustSpeed = this.adjustSpeed.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.toggleTimer = this.toggleTimer.bind(this)
    this.toggleCell = this.toggleCell.bind(this)
  }

  componentDidMount () {
    let next = this.state.board.clone()

    next.toggleCell(new Cell(2, 1))
    next.toggleCell(new Cell(1, 3))
    next.toggleCell(new Cell(3, 2))
    next.toggleCell(new Cell(2, 3))
    next.toggleCell(new Cell(3, 3))

    this.setState({board: next})

    this.startTimer(this.state.speed)
  }

  adjustSpeed(speed) {
    this.stopTimer()
    this.setState({speed: speed}, () => {
      this.startTimer() 
    })
  }

  startTimer () {
    let t = setInterval(() => {
      let next = this.state.board.step()

      this.setState({board: next})
    }, this.state.speed)

    this.setState({timer: t})
  }

  stopTimer () {
    if (this.state.timer !== undefined) {
      clearTimeout(this.state.timer) 
      this.setState({timer: undefined})
    }
  }

  toggleTimer (e) {
    this.state.timer ? this.stopTimer() : this.startTimer() 
    e.preventDefault()
    return false
  }

  toggleCell(x, y) {
    let next = this.state.board.clone()
    next.toggleCell(new Cell(x, y))

    console.log(`toggling cell x: ${x}, y: ${y}`)
    this.setState({board: next})
  }

  render() {
    //ProcessBoard(this.state.board)
    //let cells = this.state.board.map(i => i.map(j => <CCell alive={j} />))
    let rows = this.state.board._board.map((row, y) => <Row toggleCell={this.toggleCell} cells={row} y={y} />)
    return (
      <div>
        <button onClick={() => this.adjustSpeed(this.state.speed + 125)} style={{marginLeft: '10px'}}>slower</button> | 
        <button onClick={this.toggleTimer}>timer</button> | 
        <button onClick={() => this.adjustSpeed(this.state.speed - 125)} style={{marginRight: '10px'}}>faster</button>
        <div className="grid">
          {rows}
        </div>
      </div>
    )
  }
}

class Row extends Component {
  render() {
    return (
      <div className="row">
        {this.props.cells.map((cell, x) => <CCell key={10 * x} x={this.props.y} y={x} alive={cell} toggleCell={this.props.toggleCell} />)}
      </div>
    )
  }
}

class CCell extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.alive !== nextProps.alive
  }
  render() {
    let life = this.props.alive

    // todo: make the symbols variables
    return (
      <div className="cell" onClick={() => this.props.toggleCell(this.props.y, this.props.x)}>
        {life ? '*' : ''}
      </div>
    )
  }
}

export default App;
