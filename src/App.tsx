import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  console.log("Board");
  const handleClick = (i: number) => {
    squares[i] = "X";
    setSquares([...squares]);
  };

  return (
    <>
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

const Square = ({ value, onClick }: { value: number; onClick: any }) => {
  console.log("Square");

  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};
