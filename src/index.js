import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

const Square = (props) => {
  return (
    <button className="square" onClick={props.onClickEvent}>
      {props.value}
    </button>
  );
};

//TODO add more mice

var width = 19;
var height = 13;
var brooms = [];
var totalBrooms;
const escapeCells = [//:D
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 37, 38,
  56, 57, 76, 94, 95, 113, 114, 132, 133, 151, 152, 170, 171, 189, 190, 208,
  209, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240,
  241, 242, 243, 244, 245, 246,
];

const Board = () => {
  const initialSquares = Array(width * height).fill(null);
  let start = 0;
  while (escapeCells.includes(start)) {
    start = Math.floor(Math.random() * initialSquares.length);
  }
  initialSquares[start] = "🐁";
  const [squares, setSquares] = useState(initialSquares);

  const handleClickEvent = (i) => {
    const newSquares = squares.slice();

    if (trapped || hasEscaped(newSquares)) {
      return;
    }

    if (newSquares[i] === "🧹" || newSquares[i] === "🐁") {
      return;
    }

    newSquares[i] = "🧹";
    brooms.push(i);
    if (brooms.length > totalBrooms) {
      newSquares[brooms.shift()] = null;
    }

    moveMouse(i, newSquares);
    setSquares(newSquares);
  };

  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onClickEvent={() => handleClickEvent(i)}
      />
    );
  };

  const mouseStatus = hasEscaped(squares);
  const status = trapped
    ? "You got him, good job!"
    : mouseStatus
    ? "The mouse escaped! You failed"
    : "EEEK! Dont let him escape";

  return (
    <div>
      <div className="status">
        <button className="restart" onClick={() => window.location.reload()}>
          Restart
        </button>
        <select
          onChange={(e) => (totalBrooms = e.target.value)}
          className="difficulty"
        >
          <option value="50">Easy</option>
          <option value="15">Medium</option>
          <option value="10">Hard</option>
          <option value="8" className="insane">
            Insane
          </option>
        </select>
        <div className="status-text">{status}</div>
      </div>

      <div className="board-row">
        {[
          ...Array(18 - 0 + 1)
            .fill()
            .map((_, idx) => 0 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(37 - 19 + 1)
            .fill()
            .map((_, idx) => 19 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(56 - 38 + 1)
            .fill()
            .map((_, idx) => 38 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(75 - 57 + 1)
            .fill()
            .map((_, idx) => 57 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(94 - 76 + 1)
            .fill()
            .map((_, idx) => 76 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(113 - 95 + 1)
            .fill()
            .map((_, idx) => 95 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(132 - 114 + 1)
            .fill()
            .map((_, idx) => 114 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(151 - 133 + 1)
            .fill()
            .map((_, idx) => 133 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(170 - 152 + 1)
            .fill()
            .map((_, idx) => 152 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(189 - 171 + 1)
            .fill()
            .map((_, idx) => 171 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(208 - 190 + 1)
            .fill()
            .map((_, idx) => 190 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(227 - 209 + 1)
            .fill()
            .map((_, idx) => 209 + idx),
        ].map((i) => renderSquare(i))}
      </div>
      <div className="board-row">
        {[
          ...Array(246 - 228 + 1)
            .fill()
            .map((_, idx) => 228 + idx),
        ].map((i) => renderSquare(i))}
      </div>
    </div>
  );
};

const Game = () => {
  return (
    <div className="game">
      Trap the mouse
      <Board />
    </div>
  );
};

createRoot(document.getElementById("root")).render(<Game />);

var trapped = false;

function desperateEvade(positions, squares) {
  if (positions.length === 0) {
    return (trapped = true);
  }
  const randomPosition =
    positions[Math.floor(Math.random() * positions.length)];
  if (squares[randomPosition] === "🧹") {
    positions.splice(positions.indexOf(randomPosition), 1);
    desperateEvade(positions, squares);
  } else {
    squares[randomPosition] = "🐁";
  }
}

function evade(positions, squares, mousePosition) {
  if (positions.length === 0) {
    let lastPositions = [
      mousePosition + 1,
      mousePosition - 1,
      mousePosition + width - 1,
      mousePosition - width - 1,
      mousePosition + width,
      mousePosition - width,
      mousePosition + width + 1,
      mousePosition - width + 1,
    ];
    desperateEvade(lastPositions, squares);
  }
  const randomPosition =
    positions[Math.floor(Math.random() * positions.length)];
  if (squares[randomPosition] === "🧹") {
    positions.splice(positions.indexOf(randomPosition), 1);
    evade(positions, squares, mousePosition);
  } else {
    squares[randomPosition] = "🐁";
  }
  return squares;
}

function moveMouse(i, squares) {
  const mousePosition = squares.indexOf("🐁");
  const mouseRow = Math.floor(mousePosition / height);
  const mouseCol = mousePosition % width;
  const clickRow = Math.floor(i / height);
  const clickCol = i % width;

  squares[mousePosition] = null;
  const j = Math.floor(Math.random() * 3);
  if (mouseRow === clickRow) {
    if (mouseCol > clickCol) {
      let newPositions = [
        mousePosition + (width + 1),
        mousePosition - (width - 1),
        mousePosition + 1,
      ];
      evade(newPositions, squares, mousePosition);
    } else {
      let newPositions = [
        mousePosition + (width - 1),
        mousePosition - 1,
        mousePosition - (width + 1),
      ];
      evade(newPositions, squares, mousePosition);
    }
  } else if (mouseCol === clickCol) {
    if (mouseRow > clickRow) {
      let newPositions = [
        mousePosition + (width + 1),
        mousePosition + width,
        mousePosition + (width - 1),
      ];
      evade(newPositions, squares, mousePosition);
    } else {
      let newPositions = [
        mousePosition - (width + 1),
        mousePosition - width,
        mousePosition - (width - 1),
      ];
      evade(newPositions, squares, mousePosition);
    }
  } else if (mouseRow > clickRow) {
    if (mouseCol > clickCol) {
      let newPositions = [
        mousePosition + (width - 1),
        mousePosition - (width - 1),
        mousePosition + (width + 1),
        mousePosition + 1,
        mousePosition + width,
      ];
      evade(newPositions, squares, mousePosition);
    } else {
      let newPositions = [
        mousePosition + (width - 1),
        mousePosition - (width + 1),
        mousePosition + (width + 1),
        mousePosition - 1,
        mousePosition + width,
      ];
      evade(newPositions, squares, mousePosition);
    }
  } else if (mouseRow < clickRow) {
    if (mouseCol > clickCol) {
      let newPositions = [
        mousePosition + (width + 1),
        mousePosition - (width + 1),
        mousePosition - (width - 1),
        mousePosition + 1,
        mousePosition - width,
      ];
      evade(newPositions, squares, mousePosition);
    } else {
      let newPositions = [
        mousePosition - (width + 1),
        mousePosition - width,
        mousePosition - (width - 1),
        mousePosition - 1,
        mousePosition + (width - 1),
      ];
      evade(newPositions, squares, mousePosition);
    }
  }
  return squares;
}

function hasEscaped(squares) {
  if (escapeCells.includes(squares.indexOf("🐁"))) {
    return true;
  }
  return false;
}
