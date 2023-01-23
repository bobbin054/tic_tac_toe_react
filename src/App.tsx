import { useState } from "react";
import "./App.css";

export default function Game() {
  const [history, setHistory] = useState([Array<string>(9).fill("")]);
  const [stepNumber, setStepNumber] = useState(0);
  const value = stepNumber % 2 === 0 ? "O" : "X";
  const currentSquares = history[stepNumber];

  const handlePlay = (nextSquares: string[]) => {
    const nextHistory = [...history.slice(0, stepNumber + 1), nextSquares];
    setHistory(nextHistory);
    setStepNumber(nextHistory.length - 1);
  };

  function jumpTo(nextMove: number) {
    setStepNumber(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board value={value} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export function Board({
  value,
  squares,
  onPlay,
}: {
  value: string;
  squares: string[];
  onPlay: (squares: string[]) => void;
}) {
  const winner = calculateWinner(squares);
  const tie = !winner && squares.every((square) => square !== "");
  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const squaresCopy = [...squares];
    squaresCopy[i] = value;
    onPlay(squaresCopy);
  };

  return (
    <>
      <div className="status"> {winner && "And the winner is: " + winner}</div>
      <div className="status"> {tie && "It's a tie!"}</div>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>
    </>
  );
}

const Square = ({ value, onClick }: { value: string; onClick: any }) => {
  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
