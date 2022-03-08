import React, { Component } from "react";

function Square(props) {
  
    return (
      <button
        className="square"
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
  
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext : true
    };
  }

  handleClick = (i) => {
    const updatedSquare = this.state.squares.slice();
    // console.log(updatedSquare);
    if (calculateWinner(updatedSquare) || updatedSquare[i]) {
        return;
    }
    updatedSquare[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
        squares : updatedSquare,
        xIsNext : !this.state.xIsNext,
    });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {

    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner){
        status = "Winner is " + winner; 
    } else {
        status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>

        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div></div>
          <ol></ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(square) {
    const winLines= [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let i = 0; i < winLines.length; i++) {
        const [a,b,c] = winLines[i];
        if (square[a] && square[a] === square[b] && square[a] === square[c]){
            return square[a];
        }
    }
    return null;
    
}
