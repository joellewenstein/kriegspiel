import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./index.css";

class Piece extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    };
  }

  render() {
    if (this.props.team === "black" && this.props.type === "rook") {
      return (
        <div onClick={() => this.setState({ isActive: !this.state.isActive })}>
          <img
            className={"piece " + (this.state.isActive ? "active" : "")}
            src="rook-black.png"
          />
        </div>
      );
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
  getMyPiece() {
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

    return myPiece;
  }

  render() {
    var isWhite =
      this.props.x % 2 === 0 ? this.props.y % 2 === 0 : this.props.y % 2 === 1;

    var myPiece = this.getMyPiece();

    return (
      <div
        onClick={() => this.props.onSquareClicked(this.props.x, this.props.y)}
        className={"square " + (isWhite ? "white" : "black")}
      >
        <div className="identifier">
          {this.props.x},{this.props.y}
        </div>
        {myPiece}
      </div>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pieces: [
        <Piece type="rook" team="black" positionX={3} positionY={3} />,
        <Piece type="rook" team="black" positionX={1} positionY={1} />
      ],
      moveStartX: null,
      moveStartY: null
    };
  }

  onSquareClicked(x, y) {
    // If a move to the same location, cancelMove
    if (this.state.moveStartX === x && this.state.moveStartY === y) {
      this.setState({ moveStartX: null, moveStartY: null });
      return;
    }
    // Starting move
    if (!this.state.moveStartX && !this.state.moveStartY) {
      this.setState({ moveStartX: x, moveStartY: y });
      return;
    }

    // Ending a move
    if (this.state.moveStartX && this.state.moveStartY) {
      let newPieces = [];

      // Find the piece that is on that spot
      let myPiece = null;
      for (var i = 0; i < this.state.pieces.length; i++) {
        let piece = this.state.pieces[i];

        if (
          piece.props.positionX === this.state.moveStartX &&
          piece.props.positionY === this.state.moveStartY
        ) {
          // Create new piece with new coordinates
          let newPiece = (
            <Piece
              type={piece.props.type}
              team={piece.props.team}
              positionX={x}
              positionY={y}
            />
          );

          newPieces.push(newPiece);
        } else {
          newPieces.push(piece);
        }
      }

      this.setState({
        pieces: newPieces,
        moveStartX: null,
        moveStartY: null
      });
    }
  }

  render() {
    var squares = [];
    for (var x = 0; x < 8; x++) {
      for (var y = 0; y < 8; y++) {
        squares.push(
          <Square
            key={`${x}${y}`}
            x={x}
            y={y}
            pieces={this.state.pieces}
            onSquareClicked={(x, y) => this.onSquareClicked(x, y)}
          />
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
