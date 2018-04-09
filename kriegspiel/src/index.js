import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.css";

class Piece extends React.Component {
  render() {
    if (this.props.team === "black" && this.props.type === "rook") {
      return <img className="piece" src="rook-black.png" />;
    }
  }
}

Piece.propTypes = {
  type: PropTypes.string,
  team: PropTypes.string,
  positionX: PropTypes.number,
  positiony: PropTypes.number
};

class Square extends React.Component {
  render() {
    var isWhite =
      this.props.x % 2 === 0 ? this.props.y % 2 === 0 : this.props.y % 2 === 1;

    let myPiece = null;

    var arrayLength = this.props.pieces.length;

    for (var i = 0; i < arrayLength; i++) {
      let piece = this.props.pieces[i];

      if (
        piece.props.positionX === this.props.x &&
        piece.props.positionY === this.props.y
      ) {
        myPiece = piece;
      }
    }

    return (
      <div className={"square " + (isWhite ? "white" : "black")}>
        {this.props.x},{this.props.y}
        {myPiece}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [<Piece type="rook" team="black" positionX={3} positionY={3} />]
    };
  }

  render() {
    var squares = [];
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        squares.push(
          <Square key={`${x}${y}`} x={x} y={y} pieces={this.state.pieces} />
        );
      }
    }
    return <div className="board">{squares}</div>;
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
