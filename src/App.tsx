import { useState } from "react";
import "./App.css";

// Congratulations! You now have a working tic-tac-toe game
export default function Board() {
  const [squares, setSquares] = useState(Array<string>(9).fill(""));
  const [value, setValue] = useState("X");
  const winner = calculateWinner(squares);
  const tie = !winner && squares.every((square) => square !== "");

  console.log("Board");
  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    setSquares(Object.assign([], squares, { [i]: value }));
    setValue(value === "X" ? "O" : "X");
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
