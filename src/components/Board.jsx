import React, { useState } from "react";
import circle from "../images/circle.png";
import cross from "../images/cross.png";

function Board() {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [title, setTitle] = useState("Start the Game");
  const [data, setData] = useState(Array(9).fill(""));
  const [boxes, setBoxes] = useState(Array(9).fill(null));

  function toggle(num) {
    if (lock) {
      return;
    }
    const newBoxes = [...boxes];
    if (data[num] === "") {
      if (count % 2 === 0) {
        newBoxes[num] = <img src={cross} alt="cross" />;
        data[num] = "x";
        setCount(count + 1);
      } else {
        newBoxes[num] = <img src={circle} alt="circle" />;
        data[num] = "o";
        setCount(count + 1);
      }
    }
    setBoxes(newBoxes);
    checkWin();
  }

  function checkWin() {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }
  }

  function won(winner) {
    setLock(true);
    setTitle(winner === "x" ? "X won" : "O won");
  }

  function reset() {
    setLock(false);
    setCount(0);
    setData(Array(9).fill(""));
    setTitle("Start the Game");
    setBoxes(Array(9).fill(null));
  }

  const boxElements = [];
  for (let i = 0; i < 9; i++) {
    boxElements.push(
      <div className="boxes" onClick={() => toggle(i)} key={i}>
        {boxes[i]}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">{title}</h1>
      <div className="table">
        <div className="row1">{boxElements.slice(0, 3)}</div>
        <div className="row2">{boxElements.slice(3, 6)}</div>
        <div className="row3">{boxElements.slice(6, 9)}</div>
      </div>
      <button className="reset" onClick={reset}>
        Reset
      </button>
    </div>
  );
}

export default Board;
